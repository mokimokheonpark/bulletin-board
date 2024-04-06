import { getServerSession } from "next-auth";
import WriteForm from "../components/WriteForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Write() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-20">
      <h4>WRITE</h4>
      <WriteForm session={session} />
    </div>
  );
}
