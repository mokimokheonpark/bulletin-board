import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function EditComment(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const commentDatum = await db
    .collection("comment")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (commentDatum === null) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  if (!session || session.user.email !== commentDatum.commenterEmail) {
    return (
      <div className="p-20">
        <h2>You are not authorized to edit this comment.</h2>
      </div>
    );
  }

  return (
    <div className="p-20">
      <h4>Edit the comment</h4>
      <form action="/api/comment/edit" method="POST">
        <input
          name="content"
          defaultValue={commentDatum.content}
          placeholder="Content"
          required
        />
        <input
          name="_id"
          defaultValue={commentDatum._id.toString()}
          style={{ display: "none" }}
        />
        <input
          name="postDatumId"
          defaultValue={commentDatum.postDatumId.toString()}
          style={{ display: "none" }}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
