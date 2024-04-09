"use client";

import { signOut } from "next-auth/react";

export default function LogOutBtn() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </button>
  );
}
