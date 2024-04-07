"use client";

import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function DeletePost(props) {
  const router = useRouter();

  return (
    <span
      onClick={() => {
        fetch("/api/post/delete", {
          method: "DELETE",
          body: props.postDatumId,
        });
        router.refresh();
      }}
    >
      <MdDelete />
    </span>
  );
}
