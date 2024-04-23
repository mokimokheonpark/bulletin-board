"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeletePost(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    await fetch("/api/post/delete", {
      method: "DELETE",
      body: props.postDatumId,
    });
    setIsDeleting(false);
    setShowConfirmation(false);
    if (pathname === "/list") {
      router.replace("/list", { scroll: false });
    } else if (pathname === "/my-posts") {
      router.replace("/my-posts", { scroll: false });
    } else if (pathname === "/my-likes") {
      router.replace("/my-likes", { scroll: false });
    } else {
      router.replace("/deleted");
    }
    router.refresh();
  };

  return (
    <span>
      {showConfirmation ? (
        <span>
          Are you sure you want to delete this post?{" "}
          <button onClick={handleDelete}>Yes</button>{" "}
          <button onClick={() => setShowConfirmation(false)}>No</button>
          {isDeleting ? <span> Deleting the post...</span> : null}
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
