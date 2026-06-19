"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./ServicesHero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesHero() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        {/* TODO: Replace with real workshop/process image */}
        <Image
          src="/mural-cyr-2.webp"
          alt="Proceso de restauración de mural histórico"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
      >
        <motion.div
          className={styles.eyebrow}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowText}>Servicios</span>
        </motion.div>

        <motion.h1
          className={styles.heading}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Conservación y restauración profesional
        </motion.h1>

        <motion.p
          className={styles.tagline}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Cada intervención sigue criterios de mínima intervención,
          reversibilidad y respeto por la materia original.
        </motion.p>
      </motion.div>
    </section>
  );
}
