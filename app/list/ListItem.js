"use client";

import Link from "next/link";
import { MdEdit } from "react-icons/md";

export default function ListItem(props) {
  return (
    <div>
      {props.postData.map((item, index) => {
        return (
          <div className="list-item" key={index}>
            <Link href={`/detail/${item._id}`} prefetch={false}>
              <h4>{item.title}</h4>
            </Link>
            <Link href={`/edit/${item._id}`}>
              <MdEdit />
            </Link>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
