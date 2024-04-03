import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogInBtn from "../components/LogInBtn";

export default async function Write() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-20">
      {!session ? (
        <div>
          <h2>To write a post, please log in first.</h2>
          <LogInBtn />
        </div>
      ) : (
        <div>
          <h4>WRITE</h4>
          <form action="/api/write" method="POST">
            <input name="title" placeholder="Title" required />
            <input name="content" placeholder="Content" required />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}
