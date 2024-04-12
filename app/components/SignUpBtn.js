"use client";

import { useRouter } from "next/navigation";

export default function SignUpBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/signup");
      }}
    >
      Sign Up
    </button>
  );
}
