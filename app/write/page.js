"use client";

import { useState } from "react";

export default function Write() {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="p-20">
      <h4>WRITE</h4>
      <form action="/api/post/write" method="POST">
        <input name="title" placeholder="Title" required />
        <input name="content" placeholder="Content" required />
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
                setImageUrl(postResponse.url + "/" + fileName);
              }
            } else {
              setImageUrl("");
            }
            setIsUploading(false);
          }}
          disabled={isUploading}
        />
        <input type="hidden" name="imageUrl" value={imageUrl} />
        <button type="submit" disabled={isUploading}>
          Post
        </button>
      </form>
      {isUploading ? (
        <p>Uploading the image...</p>
      ) : (
        <div>
          {imageUrl ? <p>Image Preview</p> : null}
          <img
            src={imageUrl}
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
}
