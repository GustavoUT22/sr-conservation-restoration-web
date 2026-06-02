'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Specialties.module.css';

const specialtiesData = [
  {
    id: '01',
    category: 'Especialidad',
    title: 'Pintura colonial',
    description:
      'Óleo sobre lienzo y tabla. Limpieza, consolidación y reintegración cromática.',
    image: '/amazonia-cyr.webp',
    alt: 'Pintura colonial restaurada',
  },
  {
    id: '02',
    category: 'Especialidad',
    title: 'Escultura',
    description:
      'Madera policromada, piedra y metal. Tratamiento estructural y cromático.',
    image: '/amazonia2-cyr.webp',
    alt: 'Escultura sacra restaurada',
  },
  {
    id: '03',
    category: 'Especialidad',
    title: 'Murales',
    description:
      'Pintura mural in situ. Consolidación de soporte y capa pictórica.',
    image: '/mural-cyr.webp',
    alt: 'Mural histórico restaurado',
  },
];

const Specialties: React.FC = () => {
  return (
    <section className={styles.section} id="servicios">
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>Especialidades</span>
          <h2 className={styles.title}>
            Áreas de intervención
          </h2>
        </div>
        <p className={styles.headerDesc}>
          Las tres disciplinas principales de nuestra práctica de restauración.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className={styles.grid}>
        {specialtiesData.map((item) => (
          <article key={item.id} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>

            {/* Info below image */}
            <div className={styles.info}>
              <p className={styles.meta}>
                <span className={styles.metaId}>{item.id}</span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaCategory}>{item.category}</span>
              </p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className={styles.cta}>
        <Link href="#obra" className={styles.ctaLink}>
          Ver todas las especialidades →
        </Link>
      </div>
    </section>
  );
}

export default Specialties;