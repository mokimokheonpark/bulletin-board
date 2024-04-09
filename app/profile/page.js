import { getServerSession } from "next-auth";
import LogOutBtn from "../components/LogOutBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
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
      <h2>PROFILE</h2>
      <p>
        <strong>username</strong>: {session.user.username}
      </p>
      <p>
        <strong>email</strong>: {session.user.email}
      </p>
      <p>
        <strong>Total Posts</strong>: {postData.length}
      </p>
      <p>
        <strong>Total Comments</strong>: {commentData.length}
      </p>
      <LogOutBtn />
    </div>
  );
}
