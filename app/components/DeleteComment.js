"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteComment(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <span
      className="cursor-pointer"
      onClick={async () => {
        setIsDeleting(true);
        await fetch("/api/comment/delete", {
          method: "DELETE",
          body: props.commentDatumId,
        });
        setIsDeleting(false);
        router.replace(`/detail/${props.postDatumId}`, { scroll: false });
        router.refresh();
      }}
    >
      <MdDelete />
      {isDeleting ? <span> Deleting the comment...</span> : null}
    </span>
  );
}
