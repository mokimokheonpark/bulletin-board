import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import Link from "next/link";
import DarkMode from "./components/DarkMode";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./globals.css";

export const metadata = {
  title: "Bulletin-Board",
  description: "Bulletin-Board project using create-next-app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const mode = cookies().get("mode");

  return (
    <html lang="en">
      <body
        className={
          mode !== undefined && mode.value === "dark" ? "dark-mode" : ""
        }
      >
        <div className="navbar">
          <Link href="/" className="logo">
            Bulletin-Board
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {!session ? (
            <Link href="/signup">Sign-Up</Link>
          ) : (
            <Link href="/profile">Profile</Link>
          )}
          {!session ? <LogIn /> : <LogOut />}
          <DarkMode />
        </div>
        {children}
      </body>
    </html>
  );
}
