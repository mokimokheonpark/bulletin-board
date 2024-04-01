import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import Comment from "@/app/components/Comment";
import LogInBtn from "@/app/components/LogInBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postDatum = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  const session = await getServerSession(authOptions);

  return (
    <div className="p-20">
      <h4>{postDatum.title}</h4>
      <p>{postDatum.content}</p>
      {!session ? (
        <div>
          <h4>To add a comment, please log in first.</h4>
          <LogInBtn />
        </div>
      ) : (
        <Comment postDatumId={postDatum._id.toString()} />
      )}
    </div>
  );
}
