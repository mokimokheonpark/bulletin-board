"use client";

import { useRouter } from "next/navigation";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";

export default function LikePost(props) {
  let isLiked;
  if (props.session) {
    isLiked = props.userDatumLikes.includes(props.postDatumId) ? true : false;
  } else {
    isLiked = false;
  }
  let likeCount = props.postDatumLikeCount;
  let isHandling = false;
  const router = useRouter();
  const handleDoLike = async () => {
    isHandling = true;
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
    isLiked = true;
    likeCount += 1;
    isHandling = false;
    router.refresh();
  };
  const handleUndoLike = async () => {
    isHandling = true;
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
    isLiked = false;
    likeCount -= 1;
    isHandling = false;
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
