import bcrypt from "bcrypt";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.username === "") {
      return res.status(500).json("Username is required.");
    }
    if (req.body.email === "") {
      return res.status(500).json("Email is required.");
    }
    if (req.body.password === "") {
      return res.status(500).json("Password is required.");
    }
    if (req.body.passwordCheck === "") {
      return res.status(500).json("Password-Check is required.");
    }
    if (req.body.password !== req.body.passwordCheck) {
      return res.status(500).json("Password-Check failed");
    }
    delete req.body.passwordCheck;
    try {
      const client = await connectDB;
      const db = client.db("Bulletin-Board");
      const user = await db
        .collection("user")
        .findOne({ email: req.body.email });
      if (user) {
        return res.status(500).json("The email already exists");
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      await db.collection("user").insertOne(req.body);
      res.redirect(302, "/");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
