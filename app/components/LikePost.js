"use client";

import { useState } from "react";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

export default function LikePost(props) {
  const likeState = props.userDatumLikes.includes(props.postDatumId)
    ? true
    : false;
  const [isLiked, setIsLiked] = useState(likeState);
  const [likeCount, setLikeCount] = useState(props.postDatumLikeCount);
  const doLike = async () => {
    setIsLiked(true);
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
    await fetch("/api/like/do", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDatumEmail: props.userDatumEmail,
        userDatumLikes: props.userDatumLikes,
        postDatumId: props.postDatumId,
        postDatumUpdatedLikeCount: likeCount,
      }),
    });
  };
  const undoLike = async () => {
    setIsLiked(false);
    setLikeCount((prevLikeCount) => prevLikeCount - 1);
    await fetch("/api/like/undo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDatumEmail: props.userDatumEmail,
        userDatumLikes: props.userDatumLikes,
        postDatumId: props.postDatumId,
        postDatumUpdatedLikeCount: likeCount,
      }),
    });
  };

  return (
    <span>
      {!isLiked ? (
        <span className="cursor-pointer" onClick={doLike}>
          <MdOutlineThumbUp />
        </span>
      ) : (
        <span className="cursor-pointer" onClick={undoLike}>
          <MdThumbUp />
        </span>
      )}
      <span>{likeCount}</span>
    </span>
  );
}
