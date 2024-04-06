"use client";

import { useEffect, useState } from "react";
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
  const [mode, setMode] = useState("light");
  const router = useRouter();

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
          setMode("dark");
        } else {
          document.cookie = "mode=light; max-age=" + 60 * 60 * 24 * 365;
          setMode("light");
        }
        router.refresh();
      }}
    >
      {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
    </span>
  );
}