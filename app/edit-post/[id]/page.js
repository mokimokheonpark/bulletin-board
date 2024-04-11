import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import EditForm from "@/app/components/EditForm";
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
  postDatum._id = postDatum._id.toString();

  return (
    <div className="p-20">
      <h2>Edit the post</h2>
      <EditForm postDatum={postDatum} />
    </div>
  );
}
