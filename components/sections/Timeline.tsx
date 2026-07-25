"use client";

import { motion } from "motion/react";
import { TIMELINE_MILESTONES } from "@/lib/constants";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Timeline.module.css";

/**
 * Career timeline on a vertical axis.
 *
 * It was briefly a horizontal snapping band. That failed on both ends: with a
 * mouse nobody discovers a sideways scroll, and the band ran full-bleed while
 * the heading was capped at --content-max, so the two never lined up. Vertical
 * costs no discoverability and keeps one alignment for the whole section.
 *
 * The years sit in their own column against the axis, which is what stops it
 * reading as yet another stacked list.
 */
export default function Timeline() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v.stratum}
        >
          Hitos profesionales
        </motion.h2>

        <motion.ol
          className={styles.track}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {TIMELINE_MILESTONES.map((milestone) => (
            <motion.li
              key={milestone.year}
              className={styles.milestone}
              variants={v.stratum}
            >
              <span className={styles.year}>{milestone.year}</span>

              <div className={styles.content}>
                <span className={styles.node} aria-hidden="true" />
                <h3 className={styles.itemTitle}>{milestone.title}</h3>
                <p className={styles.itemDesc}>{milestone.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
