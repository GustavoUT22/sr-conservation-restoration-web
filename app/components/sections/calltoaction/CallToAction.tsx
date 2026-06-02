'use client';

import Link from 'next/link';
import styles from './CallToAction.module.css';

export default function CallToAction() {
  return (
    <section className={styles.section} id="contacto">
      <div className={styles.inner}>

        {/* Decorative line */}
        <span className={styles.topLine} aria-hidden="true" />

        <h2 className={styles.title}>
          ¿Tienes una obra que requiere
          <br />
          intervención profesional?
        </h2>

        <p className={styles.description}>
          Evaluamos cada pieza con rigor técnico y sensibilidad histórica. El primer paso es
          siempre una conversación — contáctame para agendar una consulta inicial sin
          compromiso.
        </p>

        <Link href="mailto:contacto@solangerodriguez.pe" className={styles.cta}>
          Solicitar consulta
        </Link>

      </div>
    </section>
  );
}