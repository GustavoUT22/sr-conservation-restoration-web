"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { WORKS } from "@/lib/constants";
import styles from "./Works.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Works() {
  return (
    <section className={styles.section} id="works">
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div
          className={styles.eyebrow}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Trabajos seleccionados</span>
        </motion.div>

        <motion.h2
          className={styles.title}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Obras intervenidas y
          <br />
          patrimonio conservado
        </motion.h2>

        <motion.p
          className={styles.description}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Cada intervención es un testimonio del cuidado meticuloso aplicado a
          la preservación del legado cultural.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        {WORKS.map((work) => (
          <motion.article
            key={work.id}
            className={`${styles.card} ${styles[`card--${work.size}`]}`}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />
            </div>

            <div className={styles.overlay} />

            <div className={styles.cardInfo}>
              <div className={styles.cardMeta}>
                <span>{work.category}</span>
                <span className={styles.cardDash} />
                <span>{work.year}</span>
              </div>

              <h3 className={styles.cardTitle}>{work.title}</h3>

              <div className={styles.cardLine} />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
