"use client";

import Image from "next/image";
import styles from "./Works.module.css";

const works = [
  {
    id: 1,
    category: "Pintura Colonial",
    year: "1784",
    title: "Virgen con Niño",
    size: "tall",
    image_src: "/amazonia-cyr.webp",
  },
  {
    id: 2,
    category: "Restauración Escultórica",
    year: "1650",
    title: "Escultura sacra",
    size: "normal",
    image_src: "/amazonia2-cyr.webp",
  },
  {
    id: 3,
    category: "Cerámica Histórica",
    year: "1820",
    title: "Trabajo de conservación",
    size: "normal",
    image_src: "/ceramica-cyr.webp",
  },
  {
    id: 4,
    category: "Restauración Escultórica",
    year: "1580",
    title: "Palacio de Gobierno",
    size: "tall",
    image_src: "/ceramica2-cyr.webp",
  },
  {
    id: 5,
    category: "Restauración de Mural",
    year: "1765",
    title: "Arte histórico",
    size: "normal",
    image_src: "/mural-cyr-2.webp",
  },
  {
    id: 6,
    category: "Mural Barroco",
    year: "1790",
    title: "Mural Representativo",
    size: "tall",
    image_src: "/mural-cyr.webp",
  },
  {
    id: 7,
    category: "Educación Patrimonial",
    year: "2025",
    title: "Capacitación en conservación",
    size: "normal",
    image_src: "/taller-uni-cyr.webp",
  },
];

const Works = () => {
  return (
    <section className={styles.section} id="works">
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Trabajos seleccionados</span>
        </div>

        <h2 className={styles.title}>
          Obras intervenidas y
          <br />
          patrimonio conservado
        </h2>

        <p className={styles.description}>
          Cada intervención es un testimonio del cuidado meticuloso aplicado a
          la preservación del legado cultural.
        </p>
      </div>

      <div className={styles.grid}>
        {works.map((work) => (
          <article
            key={work.id}
            className={`${styles.card} ${styles[`card--${work.size}`]}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={work.image_src}
                alt={work.title}
                fill
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default Works;
