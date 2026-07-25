"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { IntroPhase } from "@/lib/types";
import styles from "./IntroOverlay.module.css";

const SESSION_KEY = "sr-intro-seen";

/**
 * Brand splash. Deliberately short and non-blocking.
 *
 * It used to run 2.8s with `pointer-events` only released at t=2000ms, so a
 * full-screen layer swallowed every click on the navbar and the hero CTAs for
 * the first two seconds of each page load. Three changes fix that:
 *   - pointer-events stay off the whole time (see the module CSS)
 *   - the sequence is roughly halved
 *   - it runs once per session, not on every navigation
 *
 * Skipped outright when the visitor asked for reduced motion.
 */
export default function IntroOverlay() {
  const prefersReduced = useReducedMotion();
  // Start as done during SSR; the effect opts back in. Keeps the server HTML
  // free of a layer that would otherwise flash before hydration decides.
  const [phase, setPhase] = useState<IntroPhase>("done");

  useEffect(() => {
    if (prefersReduced) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");

    // Deferred rather than set synchronously here: a direct setState in the
    // effect body triggers an extra render pass before paint.
    const start = setTimeout((): void => setPhase("enter"), 0);
    const idle = setTimeout((): void => setPhase("idle"), 260);
    const exit = setTimeout((): void => setPhase("exit"), 1050);
    const done = setTimeout((): void => setPhase("done"), 1550);

    return () => {
      clearTimeout(start);
      clearTimeout(idle);
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, [prefersReduced]);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.splash} ${phase === "exit" ? styles.splashExit : ""}`}
      aria-hidden="true"
    >
      <span
        className={`${styles.logo} ${phase !== "enter" ? styles.logoVisible : ""}`}
      >
        S.R
      </span>
    </div>
  );
}
