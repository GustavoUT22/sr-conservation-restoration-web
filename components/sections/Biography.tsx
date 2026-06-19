"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./Biography.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Biography() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* TODO: Replace with real portrait of Solange */}
          <Image
            src="/hero-cyr-solange.webp"
            alt="Solange Rodríguez trabajando en su taller de restauración"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={styles.image}
          />
        </motion.div>

        <motion.div
          className={styles.textCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <motion.blockquote
            className={styles.quote}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            "Cada intervención es un diálogo entre el presente y la historia de
            la obra."
          </motion.blockquote>

          <motion.span
            className={styles.divider}
            aria-hidden="true"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.p
            className={styles.body}
            variants={fadeUp}
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
            variants={fadeUp}
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
            variants={fadeUp}
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
