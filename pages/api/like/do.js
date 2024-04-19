import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      const updatedLikes = req.body.userDatumLikes;
      updatedLikes.push(req.body.postDatumId);
      await db
        .collection("user")
        .updateOne(
          { email: req.body.userDatumEmail },
          { $set: { likes: updatedLikes } }
        );
      await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.body.postDatumId) },
          { $set: { likeCount: req.body.postDatumUpdatedLikeCount } }
        );
      res.status(200).json({ message: "Success!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
