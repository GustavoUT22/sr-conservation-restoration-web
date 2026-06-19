"use client";

import { motion } from "motion/react";
import { TIMELINE_MILESTONES } from "@/lib/constants";
import styles from "./Timeline.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Timeline() {
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
          <motion.span
            className={styles.eyebrow}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Trayectoria
          </motion.span>
          <motion.h2
            className={styles.title}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Hitos profesionales
          </motion.h2>
        </motion.div>

        <motion.ol
          className={styles.list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {TIMELINE_MILESTONES.map((milestone, i) => (
            <motion.li
              key={milestone.year}
              className={styles.item}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.line} aria-hidden="true" />

              <div className={styles.content}>
                <span className={styles.year}>{milestone.year}</span>
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
