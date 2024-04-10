import { getServerSession } from "next-auth";
import ListItem from "../components/ListItem";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export const dynamic = "force-dynamic";

export default async function MyPosts() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const myPostData = await db
    .collection("post")
    .find({ userEmail: session.user.email })
    .toArray();

  return (
    <div className="list-bg">
      <div className="p-20">
        <h4>My Posts</h4>
      </div>
      <ListItem postData={myPostData} session={session} />
    </div>
  );
}
