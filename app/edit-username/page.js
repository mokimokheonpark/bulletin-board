import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function EditUsername() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="p-20">
        <h2>You have to log in first to edit your username.</h2>
      </div>
    );
  }
  const client = await connectDB;
  const db = client.db("Bulletin-Board");
  const userDatum = await db
    .collection("user")
    .findOne({ email: session.user.email });

  return (
    <div className="p-20">
      <h2>Edit your username</h2>
      <form action="/api/username/edit" method="POST">
        <input
          name="username"
          defaultValue={userDatum.username}
          placeholder="Username"
          required
        />
        <input
          name="email"
          defaultValue={userDatum.email}
          style={{ display: "none" }}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
