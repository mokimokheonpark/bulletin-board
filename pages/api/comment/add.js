import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    if (req.body.comment === "") {
      return res.status(500).json("Comment is required.");
    }
    const newCommentDatum = {
      postDatumId: new ObjectId(req.body.postDatumId),
      content: req.body.comment,
      commenterUsername: req.body.commenterUsername,
      commenterEmail: req.body.commenterEmail,
    };
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db.collection("comment").insertOne(newCommentDatum);
      res.status(200).json("The comment has been successfully added.");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
