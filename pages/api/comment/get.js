import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  try {
    const client = await connectDB;
    const db = client.db("Bulletin-Board");
    const commentData = await db
      .collection("comment")
      .find({ postDatumId: new ObjectId(req.query.id) })
      .toArray();
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
}
