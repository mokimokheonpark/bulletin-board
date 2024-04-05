"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function DarkMode() {
  useEffect(() => {
    const cookieModeValue = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      .split(";")[0];
    if (cookieModeValue === "") {
      document.cookie = "mode=light; max-age=" + 60 * 60 * 24 * 365;
    }
  }, []);
  const router = useRouter();
  const cookieModeValue = ("; " + document.cookie)
    .split(`; mode=`)
    .pop()
    .split(";")[0];

  return (
    <span
      className="dark-mode-btn"
      onClick={() => {
        const cookieModeValue = ("; " + document.cookie)
          .split(`; mode=`)
          .pop()
          .split(";")[0];
        if (cookieModeValue === "light") {
          document.cookie = "mode=dark; max-age=" + 60 * 60 * 24 * 365;
        } else {
          document.cookie = "mode=light; max-age=" + 60 * 60 * 24 * 365;
        }
        router.refresh();
      }}
    >
      {cookieModeValue === "light" ? <MdDarkMode /> : <MdLightMode />}
    </span>
  );
}
