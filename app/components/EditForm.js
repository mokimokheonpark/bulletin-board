"use client";

import { useState } from "react";

export default function EditForm(props) {
  const previousImageState = props.postDatum.imageUrl ? true : false;
  const previousImageUrl = props.postDatum.imageUrl
    ? props.postDatum.imageUrl
    : "";
  const [doesPreviousImageExist, setDoesPreviousImageExist] =
    useState(previousImageState);
  const [currentImageUrl, setCurrentImageUrl] = useState(previousImageUrl);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div>
      <form action="/api/post/edit" method="POST">
        <input
          name="title"
          defaultValue={props.postDatum.title}
          placeholder="Title"
          required
        />
        <input
          name="content"
          defaultValue={props.postDatum.content}
          placeholder="Content"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            setIsUploading(true);
            const file = e.target.files[0];
            if (file) {
              const fileName = encodeURIComponent(file.name);
              const response = await fetch(
                `/api/post/get-presigned-url?file=${fileName}`
              );
              const result = await response.json();
              const formData = new FormData();
              Object.entries({ ...result.fields, file }).forEach(
                ([key, value]) => {
                  formData.append(key, value);
                }
              );
              const postResponse = await fetch(result.url, {
                method: "POST",
                body: formData,
              });
              if (postResponse.ok) {
                setCurrentImageUrl(postResponse.url + "/" + fileName);
              }
            } else {
              setCurrentImageUrl("");
            }
            setIsUploading(false);
          }}
          disabled={isUploading || doesPreviousImageExist}
        />
        <input type="hidden" name="imageUrl" value={currentImageUrl} />
        <input
          name="_id"
          defaultValue={props.postDatum._id}
          style={{ display: "none" }}
        />
        <button type="submit" disabled={isUploading}>
          Edit
        </button>
      </form>
      {doesPreviousImageExist ? (
        <div>
          <p>Current Image</p>
          <img
            src={props.postDatum.imageUrl}
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
          <div>
            <button
              onClick={() => {
                setDoesPreviousImageExist(false);
                setCurrentImageUrl("");
              }}
            >
              Remove the current image
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isUploading ? (
            <p>Uploading the image...</p>
          ) : (
            <div>
              {currentImageUrl ? <p>Image Preview</p> : null}
              <img
                src={currentImageUrl}
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
