import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="p-20">
      <h4>EDIT</h4>
      <form action="/api/write" method="POST">
        <input
          name="title"
          defaultValue={postDatum.title}
          placeholder="Title"
          required
        />
        <input
          name="content"
          defaultValue={postDatum.content}
          placeholder="Content"
          required
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
