import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>{postDatum.title}</h4>
      <p>{postDatum.content}</p>
    </div>
  );
}
