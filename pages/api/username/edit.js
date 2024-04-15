import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.username === "") {
      return res.status(500).json("Username is required.");
    }
    const updatedUserData = { username: req.body.username };
    const updatedPostData = { username: req.body.username };
    const updatedCommentData = { commenterUsername: req.body.username };
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db
        .collection("user")
        .updateOne({ email: req.body.email }, { $set: updatedUserData });
      await db
        .collection("post")
        .updateMany({ userEmail: req.body.email }, { $set: updatedPostData });
      await db
        .collection("comment")
        .updateMany(
          { commenterEmail: req.body.email },
          { $set: updatedCommentData }
        );
      res.redirect(302, "/profile");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
