import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Bulletin-Board",
  description: "Bulletin-Board project using create-next-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Bulletin-Board
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
