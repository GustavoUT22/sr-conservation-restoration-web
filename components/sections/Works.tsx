"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { WORKS } from "@/lib/constants";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Works.module.css";

export default function Works() {
  const v = useMotionVariants();

  // id in Spanish to match NAV_LINKS and the hero CTA target.
  return (
    <section className={styles.section} id="obra">
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Eyebrow removed: "Trabajos seleccionados" only restated the heading
            below it. It sat on 12 of 13 sections, which reads as scaffolding. */}
        <motion.h2
          className={styles.title}
          variants={v.stratum}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Obras intervenidas y
          <br />
          patrimonio conservado
        </motion.h2>

        <motion.p
          className={styles.description}
          variants={v.stratum}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Cada intervención es un testimonio del cuidado meticuloso aplicado a
          la preservación del legado cultural.
        </motion.p>
      </motion.div>

      {/* On phones this grid becomes a horizontal snapping band. It needs a
          name and a tabstop so it can be reached and scrolled with a keyboard —
          the cards themselves are articles, not focusable controls. */}
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.08 }}
        tabIndex={0}
        role="group"
        aria-label="Galería de obras intervenidas"
      >
        {WORKS.map((work) => (
          <motion.article
            key={work.id}
            /* `card--${work.size}` matched no rule and rendered class="undefined";
               the mosaic silently relied on nth-child instead. */
            className={`${styles.card} ${work.size === "tall" ? styles.cardTall : ""}`}
            /* chromatic, not a generic fade: the piece arrives desaturated and
               recovers its colour — the visual signature of reintegration. */
            variants={v.chromatic}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={work.image}
                alt={`${work.title} — ${work.category}, ${work.year}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />
            </div>

            <div className={styles.overlay} />

            <div className={styles.cardInfo}>
              <div className={styles.cardMeta}>
                <span className={styles.cardMetaItem}>{work.category}</span>
                <span className={styles.cardDash} />
                <span className={styles.cardMetaItem}>{work.year}</span>
              </div>

              <h3 className={styles.cardTitle}>{work.title}</h3>
              <div className={styles.cardLine} aria-hidden="true" />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
