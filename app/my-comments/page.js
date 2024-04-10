import { getServerSession } from "next-auth";
import Link from "next/link";
import { MdShortcut } from "react-icons/md";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export const dynamic = "force-dynamic";

export default async function MyComments() {
  const session = await getServerSession(authOptions);
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const myCommentData = await db
    .collection("comment")
    .find({ commenterEmail: session.user.email })
    .toArray();

  return (
    <div className="list-bg">
      <div className="p-20">
        <h2>My Comments</h2>
      </div>
      {myCommentData.length > 0 ? (
        myCommentData.map((item, index) => {
          return (
            <div className="list-item" key={index}>
              <div className="list-item-div">
                <h4>{item.content}</h4>
                <Link href={`/detail/${item.postDatumId}`}>
                  <MdShortcut />
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-20">
          <h2>You have not added any comments yet.</h2>
        </div>
      )}
    </div>
  );
}
