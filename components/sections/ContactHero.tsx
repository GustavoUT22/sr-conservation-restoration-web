"use client";

import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
      >
        <motion.div
          className={styles.eyebrow}
          variants={v.settle}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowText}>Contacto</span>
        </motion.div>

        <motion.h1
          className={styles.heading}
          variants={v.settle}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Conversemos sobre
          <br />
          <em className={styles.headingAccent}>tu proyecto</em>
        </motion.h1>

        <motion.p
          className={styles.tagline}
          variants={v.settle}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Si tienes una pieza que necesita atención, una colección que requiere
          diagnóstico o simplemente quieres saber más sobre mi trabajo, escríbeme.
        </motion.p>
      </motion.div>
    </section>
  );
}
