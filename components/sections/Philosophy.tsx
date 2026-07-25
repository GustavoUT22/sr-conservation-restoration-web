"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  const v = useMotionVariants();

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
        {/* Eyebrow dropped: the quote speaks for itself, and a label above it
            only announced what the reader was about to work out anyway. */}
        {/* chromatic: the statement recovers its colour, mirroring reintegration. */}
        <motion.blockquote className={styles.quote} variants={v.chromatic}>
          «Conservar no es detener el tiempo, sino comprender su paso y proteger
          lo que hace única a cada obra.»
        </motion.blockquote>

        <motion.span
          className={styles.divider}
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.p className={styles.body} variants={v.settle}>
          Mi práctica se basa en el respeto absoluto por la materia original, la
          reversibilidad de cada tratamiento y la documentación rigurosa de cada
          proceso. Cada pieza es un testimonio irrepetible que merece ser
          comprendido antes de ser intervenido.
        </motion.p>
      </motion.div>
    </section>
  );
}
