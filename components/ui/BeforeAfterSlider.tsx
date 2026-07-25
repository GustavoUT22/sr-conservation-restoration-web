"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./BeforeAfterSlider.module.css";

/**
 * Documented before/after comparison. Takes two genuinely different photographs
 * of the same piece — unlike <CleaningReveal>, which is a stylistic effect over
 * a single image. Only use this for real documentation.
 *
 * Accessibility approach: a native range input drives the split. It is visually
 * hidden but sits over the whole frame, which buys keyboard support, screen
 * reader semantics and touch handling for free — a div with pointer listeners
 * would need all three reimplemented, and usually gets keyboard wrong.
 */

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  /** Describe the deteriorated state, in Spanish. */
  beforeAlt: string;
  /** Describe the restored state, in Spanish. */
  afterAlt: string;
  sizes: string;
  /** Optional technical caption shown under the frame. */
  caption?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  sizes,
  caption,
  className,
}: BeforeAfterSliderProps) {
  const [split, setSplit] = useState<number>(50);

  return (
    <figure className={`${styles.wrapper} ${className ?? ""}`}>
      <div className={styles.frame}>
        {/* Restored state sits underneath and is always fully painted. */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes={sizes}
          className={styles.image}
        />

        {/* Deteriorated state, clipped to the left of the split. */}
        <div
          className={styles.beforeLayer}
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes={sizes}
            className={styles.image}
          />
        </div>

        <span className={`${styles.tag} ${styles.tagBefore}`} aria-hidden="true">
          Antes
        </span>
        <span className={`${styles.tag} ${styles.tagAfter}`} aria-hidden="true">
          Después
        </span>

        {/* Divider and handle are decorative; the input below owns interaction. */}
        <div
          className={styles.divider}
          style={{ left: `${split}%` }}
          aria-hidden="true"
        >
          <span className={styles.handle} />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          className={styles.range}
          aria-label="Comparar estado antes y después de la intervención"
          aria-valuetext={`${split}% del estado inicial visible`}
        />
      </div>

      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
