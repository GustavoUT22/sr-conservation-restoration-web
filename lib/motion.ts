"use client";

import { useReducedMotion, type Transition, type Variants } from "motion/react";

/**
 * Shared motion system.
 *
 * The site previously repeated one `fadeUp` ({opacity:0, y:24}) in every
 * section, which reads as templated no matter how well each section is built.
 * These variants are named after the conservation craft the site describes, so
 * a reveal says something about the work instead of decorating it:
 *
 *   reveal    — a wipe that uncovers the piece, like removing a darkened varnish
 *   stratum   — layers settling into place, like a stratigraphic cross-section
 *   emerge    — surfacing out of shadow, like raking light across a surface
 *   chromatic — desaturated to full colour, like chromatic reintegration
 *   settle    — the quiet one, for body copy that should not perform
 *
 * Every set has a reduced-motion twin. Use the hook, never the raw objects:
 * `const v = useMotionVariants()` then `variants={v.reveal}`.
 */

/** Exponential ease-out. No bounce, no elastic — this is a museum, not a toy. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.75,
  slow: 1.1,
  /** Wipes need room to read as a deliberate gesture rather than a glitch. */
  reveal: 1.5,
} as const;

/** Standard viewport config — `once` is a hard performance requirement here. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
export const VIEWPORT_EARLY = { once: true, margin: "-40px" } as const;

export interface MotionSet {
  reveal: Variants;
  stratum: Variants;
  emerge: Variants;
  chromatic: Variants;
  settle: Variants;
  /** Parent wrapper that staggers its children. */
  stagger: Variants;
  staggerTight: Variants;
}

const transition = (
  duration: number,
  ease: [number, number, number, number] = EASE_OUT,
  delay = 0,
): Transition => ({ duration, ease, delay });

const FULL: MotionSet = {
  // Wipe from bottom to top: the piece is uncovered rather than slid in.
  reveal: {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      transition: transition(DURATION.reveal, EASE_OUT),
    },
  },

  // Compressed then released, as a layer finding its depth.
  stratum: {
    hidden: { opacity: 0, scaleY: 0.94, transformOrigin: "bottom" },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: transition(DURATION.slow, EASE_OUT_QUART),
    },
  },

  // Rises out of shadow. Blur carries the "coming into focus" reading that a
  // plain translate cannot.
  emerge: {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: transition(DURATION.slow, EASE_OUT),
    },
  },

  // Grey to full colour — the visual signature of chromatic reintegration.
  chromatic: {
    hidden: { opacity: 0, filter: "saturate(0%) contrast(1.15)" },
    visible: {
      opacity: 1,
      filter: "saturate(100%) contrast(1)",
      transition: transition(DURATION.reveal, EASE_OUT_QUART),
    },
  },

  settle: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transition(DURATION.base, EASE_OUT),
    },
  },

  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  },

  staggerTight: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  },
};

/**
 * Reduced-motion twin. Crossfade only: no transform, no clip-path, no blur.
 * Content still animates in so nothing depends on a transition that never
 * fires, but nothing moves.
 */
const REDUCED_FADE: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.fast, EASE_OUT) },
};

const REDUCED: MotionSet = {
  reveal: REDUCED_FADE,
  stratum: REDUCED_FADE,
  emerge: REDUCED_FADE,
  chromatic: REDUCED_FADE,
  settle: REDUCED_FADE,
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  },
  staggerTight: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.02 } },
  },
};

/**
 * Returns the motion set matching the user's OS preference. Always prefer this
 * over importing variants directly — it is what keeps the site usable for
 * people with vestibular sensitivity.
 */
export function useMotionVariants(): MotionSet {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? REDUCED : FULL;
}

/** True when the user asked for less motion — for effects beyond variants. */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
