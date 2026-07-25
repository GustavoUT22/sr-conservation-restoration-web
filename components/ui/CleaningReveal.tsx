"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { DURATION, EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import styles from "./CleaningReveal.module.css";

/**
 * Presentation effect: a swab-like wipe travels across the image, leaving the
 * clean version behind it. It mirrors how a conservator removes an oxidised
 * varnish layer, which is the single most recognisable gesture of the craft.
 *
 * IMPORTANT — this is a stylistic device, not documentation. Both layers are
 * the same photograph; the "dirty" side is a CSS filter, not a real before
 * state. Never label it as an actual before/after: a curator would read that as
 * a false claim about the work. For genuine documented pairs use
 * <BeforeAfterSlider>, which takes two distinct images.
 */

interface CleaningRevealProps {
  src: string;
  alt: string;
  /** Passed straight to next/image. Required when using fill layout. */
  sizes: string;
  priority?: boolean;
  /** Extra class for the outer frame, e.g. to set aspect-ratio. */
  className?: string;
  /** Delay before the wipe starts, seconds. */
  delay?: number;
}

export default function CleaningReveal({
  src,
  alt,
  sizes,
  priority = false,
  className,
  delay = 0,
}: CleaningRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReduced = usePrefersReducedMotion();

  const wipe = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: DURATION.reveal, ease: EASE_OUT, delay },
    },
  };

  const fade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.fast, ease: EASE_OUT, delay },
    },
  };

  return (
    <div ref={ref} className={`${styles.frame} ${className ?? ""}`}>
      {/* Aged layer: stays underneath, revealed as "before" until wiped. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${styles.layer} ${styles.aged}`}
      />

      {/* Clean layer, uncovered by the wipe. aria-hidden: same image, same alt
          would be announced twice. */}
      <motion.div
        className={styles.cleanLayer}
        variants={prefersReduced ? fade : wipe}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        aria-hidden="true"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={styles.layer}
        />
      </motion.div>

      {/* The travelling edge. This is what makes it read as cleaning rather
          than a generic wipe transition — without it the effect looks like a
          slide. Hidden under reduced motion.

          Spans the full frame with the glow painted on its right edge, then
          slides on translateX. Animating `left` instead would reflow on every
          frame; transform stays on the compositor. */}
      {!prefersReduced ? (
        <motion.span
          className={styles.edge}
          initial={{ x: "-100%", opacity: 0 }}
          animate={
            inView
              ? { x: "0%", opacity: [0, 1, 1, 0] }
              : { x: "-100%", opacity: 0 }
          }
          transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
