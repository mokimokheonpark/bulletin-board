"use client";

import { signIn } from "next-auth/react";

export default function GitHubLogIn() {
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
