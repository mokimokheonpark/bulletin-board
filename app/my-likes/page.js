import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import ListItem from "../components/ListItem";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export const dynamic = "force-dynamic";

export default async function MyLikes() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const userDatum = await db
    .collection("user")
    .findOne({ email: session.user.email });
  const likesIds = userDatum.likes;
  const likesObjectIds = [];
  for (let i = 0; i < likesIds.length; i++) {
    likesObjectIds.push(new ObjectId(likesIds[i]));
  }
  const myLikedPostData = await db
    .collection("post")
    .find({ _id: { $in: likesObjectIds } })
    .toArray();

  return (
    <div className="list-bg">
      <div className="p-20">
        <h2>Posts you have liked</h2>
      </div>
      {myLikedPostData.length > 0 ? (
        <ListItem
          session={session}
          postData={myLikedPostData}
          userDatum={userDatum}
        />
      ) : (
        <div className="p-20">
          <h2>You have not liked any posts yet.</h2>
        </div>
      )}
    </div>
  );
}
