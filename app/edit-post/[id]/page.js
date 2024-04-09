import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function EditPost(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (postDatum === null) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  if (!session || session.user.email !== postDatum.userEmail) {
    return (
      <div className="p-20">
        <h2>You are not authorized to edit this post.</h2>
      </div>
    );
  }

  return (
    <div className="p-20">
      <h4>EDIT</h4>
      <form action="/api/post/edit" method="POST">
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
        <input
          name="_id"
          defaultValue={postDatum._id.toString()}
          style={{ display: "none" }}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
