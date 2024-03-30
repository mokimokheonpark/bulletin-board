"use client";

import { useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");

  return (
    <div>
      <div>Comment List</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/add", {
            method: "POST",
            body: JSON.stringify({
              postDatumId: props.postDatumId,
              comment: comment,
            }),
          });
        }}
      >
        Add a comment
      </button>
    </div>
  );
}
