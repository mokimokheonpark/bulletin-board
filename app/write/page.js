import { getServerSession } from "next-auth";
import WriteForm from "../components/WriteForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Write() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const userDatum = await db
    .collection("user")
    .findOne({ email: session.user.email });

  return (
    <div className="p-20">
      <h2>Write a post</h2>
      <WriteForm email={userDatum.email} username={userDatum.username} />
    </div>
  );
}
