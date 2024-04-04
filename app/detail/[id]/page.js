import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import Comment from "@/app/components/Comment";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  if (postDatum === null) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  return (
    <div className="p-20">
      <h2>{postDatum.title}</h2>
      <p>{postDatum.content}</p>
      <hr />
      {postDatum.imageUrl ? (
        <img
          src={postDatum.imageUrl}
          style={{ maxWidth: "600px", maxHeight: "600px" }}
        />
      ) : (
        <p>No Image Yet</p>
      )}
      <Comment postDatumId={postDatum._id.toString()} session={session} />
    </div>
  );
}
