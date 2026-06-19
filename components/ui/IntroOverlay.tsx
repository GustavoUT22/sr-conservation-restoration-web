"use client";

import { useEffect, useState } from "react";
import type { IntroPhase } from "@/lib/types";
import styles from "./IntroOverlay.module.css";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<IntroPhase>("enter");

  useEffect(() => {
    const idle = setTimeout((): void => setPhase("idle"), 600);
    const exit = setTimeout((): void => setPhase("exit"), 2000);
    const done = setTimeout((): void => setPhase("done"), 2800);

    return () => {
      clearTimeout(idle);
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.splash} ${phase === "exit" ? styles.splashExit : ""}`}
    >
      <span
        className={`${styles.logo} ${phase !== "enter" ? styles.logoVisible : ""}`}
      >
        S.R
      </span>
    </div>
  );
}
