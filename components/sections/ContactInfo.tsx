"use client";

import { motion } from "motion/react";
import { SOCIAL_LINKS } from "@/lib/constants";
import styles from "./ContactInfo.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactInfo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.formCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.h2
            className={styles.formTitle}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Envíame un mensaje
          </motion.h2>

          {/* TODO: Replace with react-hook-form implementation */}
          <motion.form
            className={styles.form}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="Tu nombre completo"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="tu@email.com"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="subject" className={styles.label}>
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={styles.input}
                placeholder="Consulta sobre restauración"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message" className={styles.label}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={styles.textarea}
                placeholder="Describe tu proyecto o consulta..."
              />
            </div>

            <button type="submit" className={styles.submit}>
              Enviar mensaje
            </button>
          </motion.form>
        </motion.div>

        <motion.div
          className={styles.infoCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <motion.div
            className={styles.infoBlock}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className={styles.infoLabel}>Email</h3>
            {/* TODO: Replace with real email */}
            <a href="mailto:contacto@restauracion.pe" className={styles.infoValue}>
              contacto@restauracion.pe
            </a>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className={styles.infoLabel}>Teléfono</h3>
            {/* TODO: Replace with real phone number */}
            <a href="tel:+51987654321" className={styles.infoValue}>
              +51 987 654 321
            </a>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className={styles.infoLabel}>Ubicación</h3>
            <p className={styles.infoValue}>Lima, Perú</p>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className={styles.infoLabel}>Redes</h3>
            <div className={styles.socialList}>
              {SOCIAL_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
