'use client';

import styles from './About.module.css';

const education = [
  { year: '2021', desc: 'Bachillerato en Conservación y Restauración — UNMSM' },
  { year: '2022', desc: 'Taller intensivo de pintura colonial — Cusco' },
  { year: '2023', desc: 'Práctica profesional — Museo de Arte de Lima (MALI)' },
  { year: '2024', desc: 'Certificación en conservación preventiva — ICCROM' },
];

const stats = [
  { value: '3+',  label: 'Años activa' },
  { value: '20+', label: 'Obras' },
  { value: '4',   label: 'Instituciones' },
];

export default function SobreMi() {
  return (
    <section className={styles.section} id="sobre-mi">
      <div className={styles.inner}>

        {/* ── Left column ── */}
        <div className={styles.left}>
          <p className={styles.bio}>
            Tengo veintitantos años y una obsesión: entender qué le pasa a una obra
            cuando el tiempo la toca. Estudié restauración porque quería un oficio que
            exigiera paciencia, precisión y sensibilidad al mismo tiempo. Lo encontré,
            y cada pieza que llega a mis manos me recuerda por qué.
          </p>

          <blockquote className={styles.quote}>
            <p>
              "Todavía estoy aprendiendo a leer las obras.<br />
              Eso, creo, es lo mejor de este oficio."
            </p>
          </blockquote>

          <p className={styles.available}>
            Basada en Lima. Disponible para proyectos en instituciones, colecciones
            privadas y patrimonio familiar. Trabajo despacio, con cuidado, y nunca
            intervengo más de lo necesario.
          </p>

          <div className={styles.stats}>
            {stats.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className={styles.right}>
          <span className={styles.sectionLabel}>Formación</span>
          <ul className={styles.educationList}>
            {education.map(({ year, desc }) => (
              <li key={year} className={styles.educationItem}>
                <span className={styles.educationYear}>{year}</span>
                <span className={styles.educationDesc}>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}