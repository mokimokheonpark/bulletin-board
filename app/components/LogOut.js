"use client";

import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      Log-Out
    </span>
  );
}
