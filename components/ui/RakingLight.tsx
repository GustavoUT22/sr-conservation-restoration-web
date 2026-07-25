"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import styles from "./RakingLight.module.css";

/**
 * Raking light — the low-angle beam a conservator sweeps across a surface to
 * reveal relief, craquelure and past interventions that flat light hides.
 *
 * One slow pass on mount rather than a loop: the hero already carries an
 * infinite marquee, and a second endless animation would turn a technique into
 * noise. Decorative only.
 */

interface RakingLightProps {
  /** Seconds before the sweep begins. */
  delay?: number;
  className?: string;
}

export default function RakingLight({
  delay = 1.2,
  className,
}: RakingLightProps) {
  const prefersReduced = usePrefersReducedMotion();

  // The whole point of the effect is the movement; with reduced motion there is
  // nothing meaningful left to show, so render nothing at all.
  if (prefersReduced) return null;

  return (
    <motion.span
      className={`${styles.beam} ${className ?? ""}`}
      aria-hidden="true"
      initial={{ x: "-120%", opacity: 0 }}
      animate={{ x: "120%", opacity: [0, 0.85, 0.85, 0] }}
      transition={{
        duration: 2.6,
        delay,
        ease: [0.33, 0, 0.15, 1],
        opacity: { times: [0, 0.15, 0.7, 1], duration: 2.6, delay },
      }}
    />
  );
}
