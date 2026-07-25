"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import styles from "./Craquelure.module.css";

/**
 * Craquelure — the fracture network that opens across an ageing paint film.
 *
 * The cracks are drawn already present, then retract and seal as the section
 * enters view. It is the one gesture that reads as conservation rather than as
 * generic web decoration, and it costs nothing but a few SVG paths.
 *
 * Purely decorative: aria-hidden, and it never carries meaning a reader needs.
 */

/**
 * Hand-authored rather than generated: real craquelure branches at irregular
 * angles and terminates against neighbouring cracks. A procedural grid reads as
 * a net, which is the tell of a fake.
 */
const CRACKS: string[] = [
  "M20,10 L58,74 L44,150 L82,214 L70,290",
  "M58,74 L128,52 L196,88",
  "M44,150 L112,168 L182,140",
  "M82,214 L150,236 L214,206",
  "M196,88 L242,150 L228,226 L268,290",
  "M128,52 L164,8",
  "M182,140 L242,150",
  "M214,206 L228,226",
  "M268,290 L320,242 L306,166 L352,104",
  "M306,166 L242,150",
  "M352,104 L392,150 L380,228",
  "M320,242 L380,228",
  "M112,168 L96,244 L134,290",
  "M164,8 L228,34 L296,16",
  "M296,16 L352,104",
];

interface CraquelureProps {
  /** Extra class for positioning inside the parent. */
  className?: string;
  /** 0–1. Keep it low: this sits behind text. */
  opacity?: number;
}

export default function Craquelure({
  className,
  opacity = 0.14,
}: CraquelureProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <svg
      ref={ref}
      className={`${styles.svg} ${className ?? ""}`}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      {CRACKS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          className={styles.crack}
          // Cracks start whole and retract — sealing, not appearing.
          initial={{ pathLength: 1, opacity: 1 }}
          animate={
            inView
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: 1 }
          }
          transition={
            prefersReduced
              ? { duration: 0.3, ease: EASE_OUT }
              : {
                  duration: 1.6,
                  ease: EASE_OUT,
                  // Staggered so the network closes progressively rather than
                  // vanishing all at once.
                  delay: 0.2 + i * 0.045,
                }
          }
        />
      ))}
    </svg>
  );
}
