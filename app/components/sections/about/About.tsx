"use client";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section className={styles.about} id="about-me">
      <div className={styles.inner}>
        <p className={styles.label}>Sobre mí</p>

        <blockquote className={styles.quote}>
          “Cada pieza merece el mismo cuidado con el que fue creada.”
        </blockquote>
        {/* “Conservar el patrimonio también es preservar la memoria que forma parte de él.” */}

        <span className={styles.divider} aria-hidden="true" />

        <p className={styles.body}>
          He participado en proyectos de conservación y restauración de bienes
          culturales, trabajando con pintura, escultura, cerámica y otras piezas
          patrimoniales. En cada proceso busco cuidar tanto la integridad
          material de la obra como la historia que conserva.
        </p>
      </div>
    </section>
  );
};

export default About;
