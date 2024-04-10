import { getServerSession } from "next-auth";
import ListItem from "../components/ListItem";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export const dynamic = "force-dynamic";

export default async function List() {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postData = await db.collection("post").find().toArray();
  const session = await getServerSession(authOptions);

  return (
    <div className="list-bg">
      <div className="p-20">
        <h2>Post List</h2>
      </div>
      <ListItem postData={postData} session={session} />
    </div>
  );
}
