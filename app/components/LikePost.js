"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

export default function LikePost(props) {
  const likeState = props.userDatumLikes.includes(props.postDatumId)
    ? true
    : false;
  const [isLiked, setIsLiked] = useState(likeState);
  const [likeCount, setLikeCount] = useState(props.postDatumLikeCount);
  const router = useRouter();
  const handleDoLike = async () => {
    await fetch("/api/like/do", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDatumEmail: props.userDatumEmail,
        userDatumLikes: props.userDatumLikes,
        postDatumId: props.postDatumId,
        postDatumLikeCount: props.postDatumLikeCount,
      }),
    });
    setIsLiked(true);
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
    router.refresh();
  };
  const handleUndoLike = async () => {
    await fetch("/api/like/undo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDatumEmail: props.userDatumEmail,
        userDatumLikes: props.userDatumLikes,
        postDatumId: props.postDatumId,
        postDatumLikeCount: props.postDatumLikeCount,
      }),
    });
    setIsLiked(false);
    setLikeCount((prevLikeCount) => prevLikeCount - 1);
    router.refresh();
  };

  return (
    <span>
      {!isLiked ? (
        <span className="cursor-pointer" onClick={handleDoLike}>
          <MdOutlineThumbUp />
        </span>
      ) : (
        <span className="cursor-pointer" onClick={handleUndoLike}>
          <MdThumbUp />
        </span>
      )}
      <span>{likeCount}</span>
    </span>
  );
}
