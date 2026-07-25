"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import styles from "./DamageMap.module.css";

/**
 * Damage map — the schematic a conservator draws over a piece before treatment,
 * marking losses, craquelure, previous retouching and lifting paint. It is the
 * document that accompanies a condition report.
 *
 * The regions trace themselves in sequence, hold, then fade to leave the piece
 * clean. Illustrative of the method, not a record of a real examination — the
 * caption says so.
 */

type DamageKind = "laguna" | "craquelado" | "repinte" | "levantamiento";

interface DamageRegion {
  kind: DamageKind;
  /** SVG path in the 100x100 viewBox — percentages of the frame. */
  d: string;
  /** Label anchor, viewBox units. */
  x: number;
  y: number;
}

const LEGEND: Record<DamageKind, string> = {
  laguna: "Laguna",
  craquelado: "Craquelado",
  repinte: "Repinte",
  levantamiento: "Levantamiento",
};

/**
 * Irregular on purpose. Damage does not occur in rounded rectangles, and a
 * tidy shape is what makes an overlay look like a UI mock instead of a survey.
 */
const REGIONS: DamageRegion[] = [
  { kind: "laguna", d: "M22,26 L31,21 L38,28 L34,38 L24,37 Z", x: 30, y: 30 },
  { kind: "craquelado", d: "M52,18 L69,15 L76,27 L71,41 L57,39 L49,29 Z", x: 63, y: 28 },
  { kind: "repinte", d: "M18,58 L33,54 L41,63 L36,74 L21,72 Z", x: 30, y: 65 },
  { kind: "levantamiento", d: "M62,58 L79,61 L83,73 L70,80 L59,71 Z", x: 71, y: 69 },
];

interface DamageMapProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

export default function DamageMap({ src, alt, sizes, className }: DamageMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReduced = usePrefersReducedMotion();

  const traceDuration = prefersReduced ? 0.2 : 1.1;

  return (
    <figure ref={ref} className={`${styles.wrapper} ${className ?? ""}`}>
      <div className={styles.frame}>
        <Image src={src} alt={alt} fill sizes={sizes} className={styles.image} />

        <svg
          className={styles.overlay}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {REGIONS.map((region, i) => (
            <g key={region.kind}>
              <motion.path
                d={region.d}
                className={`${styles.region} ${styles[region.kind]}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: traceDuration,
                  ease: EASE_OUT,
                  delay: prefersReduced ? 0 : 0.3 + i * 0.35,
                }}
              />
              <motion.circle
                cx={region.x}
                cy={region.y}
                r="0.6"
                className={styles.anchor}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  delay: prefersReduced ? 0 : 0.3 + i * 0.35 + traceDuration * 0.7,
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.legend}>
        {REGIONS.map((region, i) => (
          <motion.span
            key={region.kind}
            className={styles.legendItem}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: prefersReduced ? 0 : 0.5 + i * 0.35,
            }}
          >
            <span
              className={`${styles.swatch} ${styles[region.kind]}`}
              aria-hidden="true"
            />
            {LEGEND[region.kind]}
          </motion.span>
        ))}
      </div>

      <figcaption className={styles.caption}>
        Esquema ilustrativo de mapeo de daños. Cada intervención parte de un
        registro como este.
      </figcaption>
    </figure>
  );
}
