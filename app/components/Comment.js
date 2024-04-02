"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`/api/comment/get?id=${props.postDatumId}`)
      .then((r) => r.json())
      .then((result) => {
        setCommentData(result);
      });
  }, []);

  return (
    <div>
      <hr />
      {commentData.length > 0 ? (
        commentData.map((item, index) => {
          return (
            <p key={index}>
              {item.commenterUsername}: {item.content}
            </p>
          );
        })
      ) : (
        <p>No Comments yet</p>
      )}
      <hr />
      <input
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/add", {
            method: "POST",
            body: JSON.stringify({
              postDatumId: props.postDatumId,
              comment: newComment,
            }),
          });
        }}
      >
        Add a comment
      </button>
    </div>
  );
}
