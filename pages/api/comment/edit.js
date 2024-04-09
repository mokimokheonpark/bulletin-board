import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.content === "") {
      return res.status(500).json("Content is required.");
    }
    const updatedData = { content: req.body.content };
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db
        .collection("comment")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: updatedData });
      res.redirect(302, `/detail/${req.body.postDatumId}`);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
