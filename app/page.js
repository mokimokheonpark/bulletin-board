import { connectDB } from "/util/database.js";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const dbTest = await db.collection("post").find().toArray();
  return (
    <div>
      <h1>{dbTest[0].title}</h1>
      <h2>{dbTest[0].content}</h2>
    </div>
  );
}
