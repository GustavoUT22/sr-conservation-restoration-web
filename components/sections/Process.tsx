"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "@/lib/constants";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Process.module.css";

export default function Process() {
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
          {/* Eyebrow dropped: the heading names the section already. */}
          <motion.h2
            className={styles.title}
            variants={v.stratum}
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
          {PROCESS_STEPS.map((step, index) => (
            <motion.article
              key={step.id}
              className={styles.card}
              variants={v.stratum}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Stratigraphic marker: each step sits one layer deeper into the
                  piece, the way a cross-section reads from varnish to support.
                  Depth is expressed by the bar's height, so the sequence is
                  legible without numbering every section of the site. */}
              <span
                className={styles.stratum}
                aria-hidden="true"
                style={
                  {
                    "--depth": `${25 + index * 25}%`,
                  } as React.CSSProperties
                }
              />

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
