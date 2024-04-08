"use client";

import { signIn } from "next-auth/react";

export default function LogInBtn() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      Log In
    </button>
  );
}
