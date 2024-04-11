import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json("Title is required.");
    }
    if (req.body.content === "") {
      return res.status(500).json("Content is required.");
    }
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    };
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db
        .collection("post")
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: updatedData });
      res.redirect(302, `/detail/${req.body._id}`);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
