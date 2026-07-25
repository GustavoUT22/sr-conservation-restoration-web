"use client";

import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import CleaningReveal from "@/components/ui/CleaningReveal";
import styles from "./Biography.module.css";

export default function Biography() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* The portrait is uncovered with the same gesture she uses on a piece:
            revealing the person the way she reveals the work. */}
        {/* TODO: Replace with real portrait of Solange */}
        <CleaningReveal
          src="/hero-cyr-solange.webp"
          alt="Solange Rodríguez trabajando en su taller de restauración"
          sizes="(max-width: 768px) 100vw, 45vw"
          className={styles.imageCol}
        />

        <motion.div
          className={styles.textCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <motion.blockquote className={styles.quote} variants={v.chromatic}>
            «Cada intervención es un diálogo entre el presente y la historia de
            la obra.»
          </motion.blockquote>

          <motion.span
            className={styles.divider}
            aria-hidden="true"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.p
            className={styles.body}
            variants={v.emerge}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Soy conservadora y restauradora de bienes culturales con más de ocho
            años de experiencia en la preservación del patrimonio peruano. Mi
            formación comenzó en la Universidad Nacional Mayor de San Marcos,
            donde descubrí la vocación de devolver la vida a piezas que el
            tiempo ha tocado.
          </motion.p>

          <motion.p
            className={styles.body}
            variants={v.emerge}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            A lo largo de mi trayectoria he intervenido pintura colonial sobre
            lienzo y tabla, escultura policromada, cerámica histórica, murales
            in situ y documentos de archivo. He colaborado con instituciones
            como el Ministerio de Cultura, museos regionales y colecciones
            privadas, siempre bajo criterios de mínima intervención y
            reversibilidad.
          </motion.p>

          <motion.p
            className={styles.body}
            variants={v.emerge}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Creo firmemente que conservar el patrimonio material es también
            preservar la memoria colectiva. Cada obra guarda un testimonio
            irrepetible, y mi compromiso es garantizar que ese testimonio
            perdure para las generaciones futuras.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
