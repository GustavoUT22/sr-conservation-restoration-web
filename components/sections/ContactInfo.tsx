"use client";

import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import ContactForm from "./ContactForm";
import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
  const v = useMotionVariants();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ContactForm />

        <motion.div
          className={styles.infoCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <motion.div
            className={styles.infoBlock}
            variants={v.settle}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className={styles.infoLabel}>Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={styles.infoValue}
            >
              {CONTACT_EMAIL}
            </a>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={v.settle}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className={styles.infoLabel}>Teléfono</p>
            {/* TODO: Replace with real phone number */}
            <a href="tel:+51987654321" className={styles.infoValue}>
              +51 987 654 321
            </a>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={v.settle}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className={styles.infoLabel}>Ubicación</p>
            <p className={styles.infoValue}>Lima, Perú</p>
          </motion.div>

          <motion.div
            className={styles.infoBlock}
            variants={v.settle}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className={styles.infoLabel}>Redes</p>
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
