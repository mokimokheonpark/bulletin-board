import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json("Title is required.");
    }
    if (req.body.content === "") {
      return res.status(500).json("Content is required.");
    }
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db.collection("post").insertOne(req.body);
      res.redirect(302, "/list");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
