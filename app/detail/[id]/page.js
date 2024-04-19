import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { ObjectId } from "mongodb";
import Comment from "@/app/components/Comment";
import DeletePost from "@/app/components/DeletePost";
import LikePost from "@/app/components/LikePost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (postDatum === null) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  let userDatum;
  if (session) {
    userDatum = await db
      .collection("user")
      .findOne({ email: session.user.email });
  }

  return (
    <div className="p-20">
      <p className="detail-username">{postDatum.username}</p>
      <h2>
        {postDatum.title}{" "}
        <LikePost
          postDatumId={postDatum._id.toString()}
          postDatumLikeCount={postDatum.likeCount}
          userDatumEmail={userDatum.email}
          userDatumLikes={userDatum.likes}
        />
        {session && session.user.email === postDatum.userEmail ? (
          <span>
            <Link href={`/edit-post/${postDatum._id}`}>
              <MdEdit />
            </Link>
            <DeletePost postDatumId={postDatum._id.toString()} />
          </span>
        ) : null}
      </h2>
      <p className="detail-content">{postDatum.content}</p>
      <hr />
      {postDatum.imageUrl ? (
        <img
          src={postDatum.imageUrl}
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        />
      ) : (
        <p>No image uploaded</p>
      )}
      {session ? (
        <Comment
          postDatumId={postDatum._id.toString()}
          session={session}
          commenterUsername={userDatum.username}
          commenterEmail={userDatum.email}
        />
      ) : (
        <Comment postDatumId={postDatum._id.toString()} session={session} />
      )}
    </div>
  );
}
