"use client";

import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <span
      className="log-out"
      onClick={() => {
        signOut();
      }}
    >
      Log-Out
    </span>
  );
}
