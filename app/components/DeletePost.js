"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeletePost(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <span
      className="cursor-pointer"
      onClick={async () => {
        setIsDeleting(true);
        await fetch("/api/post/delete", {
          method: "DELETE",
          body: props.postDatumId,
        });
        setIsDeleting(false);
        router.replace("/list", { scroll: false });
        router.refresh();
      }}
    >
      <MdDelete />
      {isDeleting ? <span> Deleting the post...</span> : null}
    </span>
  );
}
