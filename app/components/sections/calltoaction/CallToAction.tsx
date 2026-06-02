'use client';

import Link from 'next/link';
import styles from './CallToAction.module.css';

export default function CallToAction() {
  return (
    <section className={styles.section} id="cta">

      {/* Video background */}
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-cyr-solange.webp"
      >
        <source src="/cta-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Consulta profesional
        </span>

        <h2 className={styles.title}>
          Su obra merece
          <em className={styles.titleEm}> otra vida.</em>
        </h2>

        <p className={styles.description}>
          Cuénteme su pieza. Agendamos una evaluación sin compromiso.
        </p>

        <Link href="#contacto" className={styles.cta}>
          Solicitar consulta
        </Link>
      </div>

    </section>
  );
}