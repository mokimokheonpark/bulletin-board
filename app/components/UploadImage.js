"use client";

import { useState } from "react";

export default function UploadImage() {
  const [src, setSrc] = useState("");

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          const fileName = encodeURIComponent(file.name);
          const response = await fetch(
            `/api/post/get-presigned-url?file=${fileName}`
          );
          const result = await response.json();
          const formData = new FormData();
          Object.entries({ ...result.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          const response2 = await fetch(result.url, {
            method: "POST",
            body: formData,
          });
          if (response2.ok) {
            setSrc(response2.url + "/" + fileName);
          }
        }}
      />
      <img src={src} style={{ maxWidth: "300px", maxHeight: "300px" }} />
    </div>
  );
}
