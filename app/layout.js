import { getServerSession } from "next-auth";
import Link from "next/link";
import GitHubLogIn from "./GitHubLogIn";
import LogOut from "./LogOut";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./globals.css";

export const metadata = {
  title: "Bulletin-Board",
  description: "Bulletin-Board project using create-next-app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Bulletin-Board
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {session ? (
            <span>
              <LogOut />
            </span>
          ) : (
            <GitHubLogIn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
