"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

export default function LikePost(props) {
  let likeState;
  if (props.session) {
    likeState = props.userDatumLikes.includes(props.postDatumId) ? true : false;
  } else {
    likeState = false;
  }
  const [isLiked, setIsLiked] = useState(likeState);
  const [likeCount, setLikeCount] = useState(props.postDatumLikeCount);
  const [isHandling, setIsHandling] = useState(false);
  const router = useRouter();
  const handleDoLike = async () => {
    setIsHandling(true);
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
    setIsHandling(false);
    router.refresh();
  };
  const handleUndoLike = async () => {
    setIsHandling(true);
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
    setIsHandling(false);
    router.refresh();
  };

  return (
    <span>
      {!props.session ? (
        <span
          className="cursor-pointer"
          onClick={() => router.push("/message/like")}
        >
          <MdOutlineThumbUp />
        </span>
      ) : !isLiked ? (
        <span
          className="cursor-pointer"
          onClick={isHandling ? null : handleDoLike}
        >
          <MdOutlineThumbUp />
        </span>
      ) : (
        <span
          className="cursor-pointer"
          onClick={isHandling ? null : handleUndoLike}
        >
          <MdThumbUp />
        </span>
      )}
      <span>{likeCount}</span>
    </span>
  );
}
