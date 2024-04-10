import { getServerSession } from "next-auth";
import WriteForm from "../components/WriteForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Write() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-20">
      <h2>Write a post</h2>
      <WriteForm session={session} />
    </div>
  );
}
