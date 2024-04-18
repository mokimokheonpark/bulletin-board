"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeleteComment(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    await fetch("/api/comment/delete", {
      method: "DELETE",
      body: props.commentDatumId,
    });
    setIsDeleting(false);
    setShowConfirmation(false);
    router.refresh();
  };

  return (
    <span>
      {showConfirmation ? (
        <span>
          Are you sure you want to delete this comment?{" "}
          <button onClick={handleDelete}>Yes</button>{" "}
          <button onClick={() => setShowConfirmation(false)}>No</button>
          {isDeleting ? <span> Deleting the comment...</span> : null}
        </span>
      ) : (
        <span
          className="cursor-pointer"
          onClick={async () => {
            setShowConfirmation(true);
          }}
        >
          <MdDelete />
        </span>
      )}
    </span>
  );
}
