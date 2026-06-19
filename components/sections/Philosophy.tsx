"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        {/* TODO: Replace with close-up of restoration detail */}
        <Image
          src="/mural-cyr.webp"
          alt="Detalle de restauración de un mural histórico en Lima"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.span
          className={styles.eyebrow}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
        >
          Filosofía
        </motion.span>

        <motion.blockquote
          className={styles.quote}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          "Conservar no es detener el tiempo, sino comprender su paso y proteger
          lo que hace única a cada obra."
        </motion.blockquote>

        <motion.span
          className={styles.divider}
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.p
          className={styles.body}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Mi práctica se basa en el respeto absoluto por la materia original, la
          reversibilidad de cada tratamiento y la documentación rigurosa de cada
          proceso. Cada pieza es un testimonio irrepetible que merece ser
          comprendido antes de ser intervenido.
        </motion.p>
      </motion.div>
    </section>
  );
}
