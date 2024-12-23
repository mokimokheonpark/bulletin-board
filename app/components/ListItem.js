import { cookies } from "next/headers";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";

export default function ListItem(props) {
  const mode = cookies().get("mode");

  return (
    <div
      className={
        mode !== undefined && mode.value === "dark" ? "p-20 dark-mode" : "p-20"
      }
    >
      {props.postData.map((item, index) => {
        return (
          <div
            className={
              props.session && props.session.user.email === item.userEmail
                ? "list-item my-list-item"
                : "list-item"
            }
            key={index}
          >
            <div className="list-item-div">
              <Link href={`/detail/${item._id}`} prefetch={false}>
                <h4>{item.title}</h4>
              </Link>
              {props.session ? (
                <LikePost
                  session={props.session}
                  postDatumId={item._id.toString()}
                  postDatumLikeCount={item.likeCount}
                  userDatumEmail={props.userDatum.email}
                  userDatumLikes={props.userDatum.likes}
                />
              ) : (
                <LikePost
                  session={props.session}
                  postDatumId={item._id.toString()}
                  postDatumLikeCount={item.likeCount}
                />
              )}
              {props.session && props.session.user.email === item.userEmail ? (
                <span className="ml-20">
                  <Link href={`/edit-post/${item._id}`}>
                    <MdEdit />
                  </Link>
                  <DeletePost postDatumId={item._id.toString()} />
                </span>
              ) : null}
            </div>
            <p>{item.username}</p>
          </div>
        );
      })}
    </div>
  );
}
