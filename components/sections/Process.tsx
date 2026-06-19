"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "@/lib/constants";
import styles from "./Process.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Process() {
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
            Metodología
          </motion.span>
          <motion.h2
            className={styles.title}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Mi proceso de trabajo
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {PROCESS_STEPS.map((step) => (
            <motion.article
              key={step.id}
              className={styles.card}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className={styles.imageWrapper}>
                {/* TODO: Replace with real process photography per step */}
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.image}
                />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.stepNumber}>{step.id}</span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
