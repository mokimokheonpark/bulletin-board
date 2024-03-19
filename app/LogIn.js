"use client";

import { signIn } from "next-auth/react";

export default function LogIn() {
  return (
    <span
      className="log-in"
      onClick={() => {
        signIn();
      }}
    >
      Log-In
    </span>
  );
}
