"use client";

import { signIn } from "next-auth/react";

export default function LogIn() {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        signIn();
      }}
    >
      Log-In
    </span>
  );
}
