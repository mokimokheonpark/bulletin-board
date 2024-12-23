"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import DeleteComment from "./DeleteComment";
import LogInBtn from "./LogInBtn";

export default function Comment(props) {
  const [isLoadingCommentData, setIsLoadingCommentData] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    fetch(`/api/comment/get?id=${props.postDatumId}`)
      .then((response) => response.json())
      .then((result) => {
        setCommentData(result);
      })
      .then(setIsLoadingCommentData(false));
  }, [commentData]);
  const router = useRouter();

  return (
    <div>
      <hr />
      {isLoadingCommentData ? (
        <p>Loading the comments...</p>
      ) : (
        <div>
          {commentData.length > 0 ? (
            commentData.map((item, index) => {
              return (
                <div
                  className={
                    props.session &&
                    props.session.user.email === item.commenterEmail
                      ? "list-item-div my-comment"
                      : "list-item-div"
                  }
                  key={index}
                >
                  <p>
                    <strong>{item.commenterUsername}</strong>: {item.content}
                  </p>
                  {props.session &&
                  props.session.user.email === item.commenterEmail ? (
                    <div>
                      <Link href={`/edit-comment/${item._id}`}>
                        <MdEdit />
                      </Link>
                      <DeleteComment commentDatumId={item._id.toString()} />
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      )}

      <hr />
      {!props.session ? (
        <div>
          <h4>To add a comment, please log in first.</h4>
          <LogInBtn />
        </div>
      ) : (
        <div>
          <input
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              await fetch("/api/comment/add", {
                method: "POST",
                body: JSON.stringify({
                  postDatumId: props.postDatumId,
                  comment: newComment,
                  commenterUsername: props.commenterUsername,
                  commenterEmail: props.commenterEmail,
                }),
              });
              setNewComment("");
              router.refresh();
            }}
          >
            Add a comment
          </button>
        </div>
      )}
    </div>
  );
}
