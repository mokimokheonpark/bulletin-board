"use client";

import { signIn } from "next-auth/react";

export default function LogInBtn() {
  return (
    <button
      className="log-in"
      onClick={() => {
        signIn();
      }}
    >
      Log In
    </button>
  );
}
