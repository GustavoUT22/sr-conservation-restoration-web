"use client";

import Image from "next/image";
import styles from "./Intervention.module.css";

/**
 * Intervention — a restoration read as a sequence of states on one object.
 *
 * Scroll drives time. The piece stays pinned while the stages cross-fade over
 * it and the notes advance alongside. Built on `view-timeline` + `position:
 * sticky`, so there is no JavaScript at all: no scroll listener, no rAF loop,
 * and the whole thing runs on the compositor.
 *
 * Without `animation-timeline` support the CSS degrades to a plain vertical
 * list of stages — every stage still has its own image and text in the markup,
 * so nothing depends on the animation firing.
 *
 * HONESTY NOTE — the stage images are currently the same photograph under
 * different CSS filters, because no documented sequence exists yet. It is
 * presented as an illustration of the method, never as a record of one
 * intervention. When Solange supplies five frames of a single piece, swap the
 * `image` field per stage and drop the `filterClass`; nothing else changes.
 */

interface Stage {
  id: string;
  phase: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Temporary: simulates the stage until real frames exist. */
  filterClass: string;
}

/**
 * PREVIEW MODE — five different pieces, one per stage.
 *
 * This makes the choreography obvious at a glance, which is the point while the
 * effect is being evaluated. It does break the premise: a restoration is a
 * sequence of states on ONE object, and right now the object changes every
 * stage. Revert to a single `image` across all five (plus the filter classes)
 * before this ships, or replace them with real frames of one piece.
 */
const STAGES: Stage[] = [
  {
    id: "01",
    phase: "Estado inicial",
    title: "Lo que el tiempo dejó",
    description:
      "La obra llega con una capa de suciedad superficial y un barniz oxidado que amarillea los tonos y aplana la profundidad. Bajo esa película, el color original sigue intacto.",
    image: "/mural-cyr.webp",
    alt: "Obra antes de la intervención, con barniz oxidado y suciedad superficial",
    filterClass: "stateSoiled",
  },
  {
    id: "02",
    phase: "Limpieza",
    title: "Retirar sin restar",
    description:
      "La limpieza se hace por catas, ajustando el disolvente a cada zona y deteniéndose donde el original empieza. Se retira lo añadido; nunca la materia de la obra.",
    image: "/mural-cyr-2.webp",
    alt: "Obra durante el proceso de limpieza del barniz oxidado",
    filterClass: "stateCleaned",
  },
  {
    id: "03",
    phase: "Diagnóstico de faltantes",
    title: "Las lagunas a la vista",
    description:
      "Sin el barniz, las pérdidas de capa pictórica quedan expuestas. Se consolidan los levantamientos y se nivelan los faltantes con estuco, dejando la superficie lista para la reintegración.",
    image: "/ceramica-cyr.webp",
    alt: "Obra con las lagunas y faltantes de capa pictórica visibles",
    filterClass: "stateLosses",
  },
  {
    id: "04",
    phase: "Reintegración cromática",
    title: "Devolver la lectura",
    description:
      "El color se reintegra solo sobre la laguna, con técnica reconocible de cerca y reversible siempre. No se imita al artista: se restituye la continuidad visual de la obra.",
    image: "/amazonia-cyr.webp",
    alt: "Obra durante la reintegración cromática de las lagunas",
    filterClass: "stateReintegrated",
  },
  {
    id: "05",
    phase: "Protección final",
    title: "Barniz y entrega",
    description:
      "Una capa de barniz estable protege la superficie y unifica el brillo. La obra vuelve con su informe de intervención y las recomendaciones de conservación preventiva.",
    image: "/amazonia2-cyr.webp",
    alt: "Obra restaurada tras la aplicación del barniz de protección",
    filterClass: "stateFinished",
  },
];

export default function Intervention() {
  return (
    <section className={styles.section} id="intervencion">
      <div className={styles.intro}>
        <h2 className={styles.title}>Una intervención, paso a paso</h2>
        <p className={styles.lead}>
          Restaurar no es un acto, es una secuencia. Cada fase depende de la
          anterior y todas son reversibles.
        </p>
      </div>

      {/* The scroll timeline is declared on this element; stages animate
          against its progress. */}
      <div className={styles.track}>
        <div className={styles.viewer}>
          <div className={styles.frame}>
            {STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className={`${styles.layer} ${styles[stage.filterClass]}`}
                style={{ "--i": i } as React.CSSProperties}
                /* Only the first layer is announced; the rest are the same
                   object at other moments and would just repeat themselves. */
                aria-hidden={i > 0}
              >
                <Image
                  src={stage.image}
                  alt={i === 0 ? stage.alt : ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <ol className={styles.stages}>
          {STAGES.map((stage, i) => (
            <li
              key={stage.id}
              className={styles.stage}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className={styles.stageInner}>
                <span className={styles.phase}>
                  <span className={styles.phaseIndex}>{stage.id}</span>
                  {stage.phase}
                </span>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageDesc}>{stage.description}</p>

                {/* Fallback-only image: hidden once the pinned viewer takes
                    over, so the list still works with no timeline support. */}
                <div className={styles.fallbackImage}>
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="100vw"
                    className={`${styles.image} ${styles[stage.filterClass]}`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className={styles.disclaimer}>
        Secuencia ilustrativa del método de intervención.
      </p>
    </section>
  );
}
