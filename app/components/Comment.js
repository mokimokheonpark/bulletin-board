"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`/api/comment/get?id=${props.postDatumId}`)
      .then((response) => response.json())
      .then((result) => {
        setCommentData(result);
      });
  }, []);

  const handleAddComment = () => {
    fetch("/api/comment/add", {
      method: "POST",
      body: JSON.stringify({
        postDatumId: props.postDatumId,
        comment: newComment,
      }),
    })
      .then(() => {
        return fetch(`/api/comment/get?id=${props.postDatumId}`);
      })
      .then((response) => response.json())
      .then((result) => {
        setCommentData(result);
        setNewComment("");
      });
  };

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
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleAddComment();
        }}
      >
        Add a comment
      </button>
    </div>
  );
}
