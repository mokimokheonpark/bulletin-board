import ListItem from "./ListItem";
import { connectDB } from "@/util/database";

export default async function List() {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postData = await db.collection("post").find().toArray();
  for (let i = 0; i < postData.length; i++) {
    postData[i]._id = postData[i]._id.toString();
  }

  return (
    <div className="list-bg">
      <ListItem postData={postData} />
    </div>
  );
}
