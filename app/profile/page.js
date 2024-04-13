import { getServerSession } from "next-auth";
import Link from "next/link";
import { MdEdit, MdShortcut } from "react-icons/md";
import LogOutBtn from "../components/LogOutBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const userData = await db
    .collection("user")
    .findOne({ email: session.user.email });
  const postData = await db
    .collection("post")
    .find({ userEmail: session.user.email })
    .toArray();
  const commentData = await db
    .collection("comment")
    .find({ commenterEmail: session.user.email })
    .toArray();

  return (
    <div className="p-20">
      <h2>Profile</h2>
      <p>
        <strong>Username</strong>: {userData.username}{" "}
        <Link href={"/edit-username"}>
          <MdEdit />
        </Link>
      </p>
      <p>
        <strong>Email</strong>: {userData.email}
      </p>
      <p>
        <strong>Total Posts</strong>: {postData.length}{" "}
        <Link href="/my-posts">
          <MdShortcut />
        </Link>
      </p>

      <p>
        <strong>Total Comments</strong>: {commentData.length}{" "}
        <Link href="/my-comments">
          <MdShortcut />
        </Link>
      </p>
      <LogOutBtn />
    </div>
  );
}
