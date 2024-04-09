import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db.collection("post").deleteOne({ _id: new ObjectId(req.body) });
      await db
        .collection("comment")
        .deleteMany({ postDatumId: new ObjectId(req.body) });
      res.status(200).json("Successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
