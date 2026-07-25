"use client";

import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import DamageMap from "@/components/ui/DamageMap";
import styles from "./Diagnosis.module.css";

/**
 * Diagnosis — the examination that precedes any intervention.
 *
 * Earns technical credibility by describing a method rather than claiming
 * expertise. The copy stays specific about what each light reveals.
 *
 * NOTE — `components/ui/TechnicalExamination.tsx` (visible / raking / UV
 * fluorescence) was built for this section and deliberately unwired. Simulating
 * UV over a studio photograph shows nothing, because there is nothing to
 * reveal: a section promising technical rigour it cannot back reads as weaker
 * than no section at all, especially sitting next to the credentials. Wire it
 * back in once there is photography of a varnished polychrome surface — the
 * component takes a `src` and needs no other change.
 */
export default function Diagnosis() {
  const v = useMotionVariants();

  return (
    <section className={styles.section} id="diagnostico">
      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.14 }}
      >
        <motion.div className={styles.text} variants={v.settle}>
          <h2 className={styles.title}>
            Antes de intervenir,
            <br />
            leer la obra
          </h2>

          <p className={styles.body}>
            Ninguna intervención empieza con un tratamiento: empieza con un
            diagnóstico. Cada pieza se examina bajo distintas fuentes de luz,
            porque cada una revela una capa de información que las demás
            ocultan: la luz rasante muestra el relieve y las craqueladuras; la
            fluorescencia ultravioleta distingue los barnices originales de los
            repintes posteriores.
          </p>

          <p className={styles.body}>
            Lo observado se traduce en un mapa de daños: lagunas, craqueladuras,
            repintes y levantamientos quedan localizados y descritos antes de
            tocar la pieza. Ese registro es la memoria del proceso y hace
            trazable cada decisión posterior.
          </p>
        </motion.div>

        <motion.div className={styles.mapCol} variants={v.reveal}>
          <DamageMap
            src="/ceramica-cyr.webp"
            alt="Pieza cerámica histórica con mapeo de daños superpuesto"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
