"use client";

import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import Craquelure from "@/components/ui/Craquelure";
import styles from "./About.module.css";

export default function About() {
  const v = useMotionVariants();

  return (
    <section className={styles.about} id="about-me">
      {/* The crack network seals as the claim about care comes into view. */}
      <Craquelure opacity={0.12} />

      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Label dropped — 9px uppercase over a quote added nothing. */}
        <motion.blockquote className={styles.quote} variants={v.chromatic}>
          «Cada pieza merece el mismo cuidado con el que fue creada.»
        </motion.blockquote>

        <motion.span
          className={styles.divider}
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.p className={styles.body} variants={v.settle}>
          He participado en proyectos de conservación y restauración de bienes
          culturales, trabajando con pintura, escultura, cerámica y otras piezas
          patrimoniales. En cada proceso busco cuidar tanto la integridad
          material de la obra como la historia que conserva.
        </motion.p>
      </motion.div>
    </section>
  );
}
