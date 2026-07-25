"use client";

import { motion } from "motion/react";
import { TIMELINE_MILESTONES } from "@/lib/constants";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Timeline.module.css";

/**
 * Career timeline as a horizontal band.
 *
 * It was a vertical list on a page that is already entirely vertical — five
 * more stacked blocks between two other stacked blocks. A timeline wants to run
 * along an axis, so the hairline is now a continuous time axis and the
 * milestones sit on it, scroll-snapped.
 *
 * The 01/02/03 index is gone: the years already order the sequence, and the
 * numbering was one of four sections repeating the same device.
 */
export default function Timeline() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.h2 className={styles.title} variants={v.stratum}>
            Hitos profesionales
          </motion.h2>
          <motion.p className={styles.hint} variants={v.settle}>
            Desliza para recorrer la trayectoria
          </motion.p>
        </motion.div>
      </div>

      <motion.ol
        className={styles.track}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.12 }}
        // Keyboard users scroll the band with arrow keys; the region needs a
        // name and a tabstop for that to be discoverable.
        tabIndex={0}
        role="group"
        aria-label="Línea de tiempo de hitos profesionales"
      >
        {TIMELINE_MILESTONES.map((milestone) => (
          <motion.li
            key={milestone.year}
            className={styles.milestone}
            variants={v.stratum}
          >
            <span className={styles.year}>{milestone.year}</span>

            <span className={styles.node} aria-hidden="true" />

            <div className={styles.content}>
              <h3 className={styles.itemTitle}>{milestone.title}</h3>
              <p className={styles.itemDesc}>{milestone.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
