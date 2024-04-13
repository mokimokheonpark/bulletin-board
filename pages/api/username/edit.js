import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.username === "") {
      return res.status(500).json("Username is required.");
    }
    const updatedData = { username: req.body.username };
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      await db
        .collection("user")
        .updateOne({ email: req.body.email }, { $set: updatedData });
      res.redirect(302, "/profile");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
