import Link from "next/link";
import { MdEdit } from "react-icons/md";
import DeletePost from "./DeletePost";

export default function ListItem(props) {
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
                <DeletePost postDatumId={item._id} />
              </div>
            ) : null}
            <p>{item.username}</p>
          </div>
        );
      })}
    </div>
  );
}
