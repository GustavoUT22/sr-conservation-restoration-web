"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import styles from "./TechnicalExamination.module.css";

/**
 * Technical examination — the three lights a conservator reads a piece under
 * before touching it:
 *
 *   visible — what anyone sees
 *   raking  — low-angle light that throws relief, craquelure and deformation
 *   uv      — ultraviolet fluorescence, where varnishes glow and later
 *             retouching stays dark, exposing previous interventions
 *
 * IMPORTANT — the UV and raking states are CSS filters over the same
 * photograph, not real technical imaging. The caption says so on the page. This
 * illustrates the method; it must never be presented as documentation of an
 * actual examination, which a conservator or curator would spot immediately.
 */

type LightMode = "visible" | "raking" | "uv";

interface LightOption {
  id: LightMode;
  label: string;
  /** Shown while that mode is active. */
  reading: string;
}

const LIGHTS: LightOption[] = [
  {
    id: "visible",
    label: "Luz visible",
    reading: "Estado general de la superficie y lectura cromática.",
  },
  {
    id: "raking",
    label: "Luz rasante",
    reading: "Revela relieve, craqueladuras y deformaciones del soporte.",
  },
  {
    id: "uv",
    label: "Fluorescencia UV",
    reading: "Los barnices fluorescen; los repintes permanecen oscuros.",
  },
];

interface TechnicalExaminationProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

export default function TechnicalExamination({
  src,
  alt,
  sizes,
  className,
}: TechnicalExaminationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<LightMode>("visible");
  const [userPicked, setUserPicked] = useState<boolean>(false);

  /**
   * One automatic pass through the three lights on first view, so the visitor
   * sees what the control does without having to discover it. Stops the moment
   * they take over, and never runs under reduced motion.
   */
  useEffect(() => {
    if (!inView || prefersReduced || userPicked) return;

    const toRaking = setTimeout((): void => setMode("raking"), 900);
    const toUv = setTimeout((): void => setMode("uv"), 2300);
    const back = setTimeout((): void => setMode("visible"), 4100);

    return () => {
      clearTimeout(toRaking);
      clearTimeout(toUv);
      clearTimeout(back);
    };
  }, [inView, prefersReduced, userPicked]);

  const active = LIGHTS.find((l) => l.id === mode) ?? LIGHTS[0];

  const pick = (id: LightMode): void => {
    setUserPicked(true);
    setMode(id);
  };

  return (
    <figure ref={ref} className={`${styles.wrapper} ${className ?? ""}`}>
      <div className={`${styles.frame} ${styles[mode]}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className={styles.image} />

        {/* Fluorescence cast. Kept as a separate blended layer so the filter on
            the image stays reversible and cheap to animate. */}
        <motion.span
          className={styles.uvCast}
          aria-hidden="true"
          animate={{ opacity: mode === "uv" ? 1 : 0 }}
          transition={{ duration: prefersReduced ? 0.15 : 0.7, ease: EASE_OUT }}
        />

        {/* The raking beam only exists while raking light is selected. */}
        <motion.span
          className={styles.rakeBeam}
          aria-hidden="true"
          animate={{
            opacity: mode === "raking" ? 1 : 0,
            x: mode === "raking" ? "115%" : "-115%",
          }}
          transition={{
            duration: prefersReduced ? 0 : 2.2,
            ease: [0.33, 0, 0.15, 1],
          }}
        />
      </div>

      <div className={styles.controls} role="group" aria-label="Modo de examen">
        {LIGHTS.map((light) => (
          <button
            key={light.id}
            type="button"
            className={`${styles.control} ${mode === light.id ? styles.controlActive : ""}`}
            onClick={() => pick(light.id)}
            aria-pressed={mode === light.id}
          >
            {light.label}
          </button>
        ))}
      </div>

      <figcaption className={styles.caption}>
        {/* aria-live so the reading is announced when the mode changes. */}
        <span className={styles.reading} aria-live="polite">
          {active.reading}
        </span>
        <span className={styles.disclaimer}>
          Simulación ilustrativa del método de diagnóstico.
        </span>
      </figcaption>
    </figure>
  );
}
