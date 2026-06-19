"use client";

import { motion } from "motion/react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about-me">
      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.p
          className={styles.label}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
        >
          Sobre mí
        </motion.p>

        <motion.blockquote
          className={styles.quote}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          "Cada pieza merece el mismo cuidado con el que fue creada."
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
          He participado en proyectos de conservación y restauración de bienes
          culturales, trabajando con pintura, escultura, cerámica y otras piezas
          patrimoniales. En cada proceso busco cuidar tanto la integridad
          material de la obra como la historia que conserva.
        </motion.p>
      </motion.div>
    </section>
  );
}
