"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import styles from "./AboutCta.module.css";

export default function AboutCta() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        {/* TODO: Replace with studio/workshop image */}
        <Image
          src="/taller-uni-cyr.webp"
          alt="Taller de conservación y restauración de Solange Rodríguez"
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
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div
          className={styles.eyebrow}
          variants={v.settle}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowText}>Conversemos</span>
        </motion.div>

        <motion.h2
          className={styles.heading}
          variants={v.settle}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          ¿Tienes una pieza que necesita conservación?
        </motion.h2>

        <motion.p
          className={styles.body}
          variants={v.settle}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Cada obra cuenta una historia. Si tienes una pieza que necesita
          atención profesional, me encantaría conocerla.
        </motion.p>

        <motion.div
          variants={v.settle}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/contacto" className={styles.cta}>
            Contactar
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
