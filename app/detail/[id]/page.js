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
      <h4>{postDatum.title}</h4>
      <p>{postDatum.content}</p>
      <Comment postDatumId={postDatum._id.toString()} session={session} />
    </div>
  );
}
