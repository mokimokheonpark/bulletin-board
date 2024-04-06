"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ListItem(props) {
  const router = useRouter();

  return (
    <div>
      {props.postData.map((item, index) => {
        return (
          <div className="list-item" key={index}>
            <Link href={`/detail/${item._id}`} prefetch={false}>
              <h4>{item.title}</h4>
            </Link>
            {props.session && props.session.user.email === item.userEmail ? (
              <div>
                <Link href={`/edit/${item._id}`}>
                  <MdEdit />
                </Link>
                <span
                  onClick={() => {
                    fetch("/api/post/delete", {
                      method: "DELETE",
                      body: item._id,
                    });
                    router.refresh();
                  }}
                >
                  <MdDelete />
                </span>
              </div>
            ) : null}
            <p>{item.username}</p>
          </div>
        );
      })}
    </div>
  );
}
