"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { SPECIALTIES } from "@/lib/constants";
import styles from "./Specialties.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Specialties() {
  return (
    <section className={styles.section} id="servicios">
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div
          className={styles.headerLeft}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>Especialidades</span>
          <h2 className={styles.title}>Áreas de intervención</h2>
        </motion.div>
        <motion.p
          className={styles.headerDesc}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Las tres disciplinas principales de nuestra práctica de restauración.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.12 }}
      >
        {SPECIALTIES.map((item) => (
          <motion.article
            key={item.id}
            className={styles.card}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <p className={styles.meta}>
                <span className={styles.metaId}>{item.id}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaCategory}>{item.category}</span>
              </p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link href="#obra" className={styles.ctaLink}>
          Ver todas las especialidades →
        </Link>
      </motion.div>
    </section>
  );
}
