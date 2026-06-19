import Image from "next/image";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <Image
          src="/hero-cyr-solange.webp"
          alt="Solange Rodríguez en su taller de restauración"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowText}>Sobre mí</span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingFirst}>Solange</span>
          <em className={styles.headingLast}>Rodríguez</em>
        </h1>

        <p className={styles.tagline}>
          Conservadora y restauradora de bienes culturales, dedicada a preservar
          la memoria material del patrimonio peruano.
        </p>
      </div>
    </section>
  );
}
