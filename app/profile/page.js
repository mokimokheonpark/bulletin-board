import { getServerSession } from "next-auth";
import Link from "next/link";
import { MdEdit, MdShortcut } from "react-icons/md";
import { ObjectId } from "mongodb";
import LogOutBtn from "../components/LogOutBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const userDatum = await db
    .collection("user")
    .findOne({ email: session.user.email });
  const postData = await db
    .collection("post")
    .find({ userEmail: session.user.email })
    .toArray();
  const likesIds = userDatum.likes;
  const likesObjectIds = [];
  for (let i = 0; i < likesIds.length; i++) {
    likesObjectIds.push(new ObjectId(likesIds[i]));
  }
  const myLikedPostData = await db
    .collection("post")
    .find({ _id: { $in: likesObjectIds } })
    .toArray();
  const commentData = await db
    .collection("comment")
    .find({ commenterEmail: session.user.email })
    .toArray();

  return (
    <div className="p-20">
      <h2>Profile</h2>
      <p>
        <strong>Username</strong>: {userDatum.username}{" "}
        <Link href={"/edit-username"}>
          <MdEdit />
        </Link>
      </p>
      <p>
        <strong>Email</strong>: {userDatum.email}
      </p>
      <p>
        <strong>Total posts I have written</strong>: {postData.length}{" "}
        <Link href="/my-posts">
          <MdShortcut />
        </Link>
      </p>
      <p>
        <strong>Total posts I have liked</strong>: {myLikedPostData.length}{" "}
        <Link href="/my-likes">
          <MdShortcut />
        </Link>
      </p>
      <p>
        <strong>Total comments I have added</strong>: {commentData.length}{" "}
        <Link href="/my-comments">
          <MdShortcut />
        </Link>
      </p>
      <LogOutBtn />
    </div>
  );
}
