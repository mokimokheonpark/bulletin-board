import { connectDB } from "@/util/database";

export default async function List() {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const postData = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {postData.map((item, index) => {
        return (
          <div className="list-item" key={index}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
