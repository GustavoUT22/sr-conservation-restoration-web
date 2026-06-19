'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const stats = [
  { value: '8+',  label: 'Años' },
  { value: '60+', label: 'Obras' },
  { value: '12',  label: 'Instituciones' },
];

const marqueeWords = [
  'Documentos Históricos',
  'Conservación',
  'Restauración',
  'Patrimonio Cultural',
  'Pintura Colonial',
  'Escultura',
  'Documentos Históricos',
  'Conservación',
  'Restauración',
  'Patrimonio Cultural',
  'Pintura Colonial',
  'Escultura',
];

const Hero = () => {
  return (
    <section className={styles.hero}>

      {/* Imagen de fondo */}
      <div className={styles.bgImage}>
        <Image
          src={"/hero-cyr-solange.webp"}
          alt="Solange Rodríguez restaurando una pieza"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* Gradiente oscuro hacia la izquierda */}
      <div className={styles.gradient} aria-hidden="true" />

      {/* Contenido principal */}
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowText}>Lima, Perú · Conservación &amp; Restauración</span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingFirst}>Solange</span>
          <em className={styles.headingLast}>Rodríguez</em>
        </h1>

        <p className={styles.tagline}>
          Devuelvo la vida a las obras que el tiempo ha tocado.
        </p>

        <div className={styles.ctas}>
          <Link href="#obra" className={styles.ctaPrimary}>
            Ver mi obra
          </Link>
          <Link href="#contacto" className={styles.ctaSecondary}>
            Contacto
          </Link>
        </div>
      </div>

      {/* Estadísticas — esquina inferior derecha */}
      <div className={styles.stats}>
        {stats.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className={styles.marqueeItem}>
              {word}
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Hero;