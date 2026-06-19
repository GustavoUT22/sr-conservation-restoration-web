"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HOME_STATS, MARQUEE_WORDS } from "@/lib/constants";
import styles from "./Hero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgImage}>
        <Image
          src="/hero-cyr-solange.webp"
          alt="Solange Rodríguez restaurando una pieza"
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
          <span className={styles.eyebrowText}>
            Lima, Perú · Conservación &amp; Restauración
          </span>
        </motion.div>

        <motion.h1
          className={styles.heading}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className={styles.headingFirst}>Solange</span>
          <em className={styles.headingLast}>Rodríguez</em>
        </motion.h1>

        <motion.p
          className={styles.tagline}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Devuelvo la vida a las obras que el tiempo ha tocado.
        </motion.p>

        <motion.div
          className={styles.ctas}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="#obra" className={styles.ctaPrimary}>
            Ver mi obra
          </Link>
          <Link href="#contacto" className={styles.ctaSecondary}>
            Contacto
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.stats}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 1 }}
      >
        {HOME_STATS.map(({ value, label }) => (
          <motion.div
            key={label}
            className={styles.stat}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className={styles.marqueeItem}>
              {word}
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
