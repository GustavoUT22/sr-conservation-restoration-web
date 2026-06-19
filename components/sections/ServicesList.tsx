"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SERVICES } from "@/lib/constants";
import styles from "./ServicesList.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesList() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {SERVICES.map((service, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <motion.article
              key={service.id}
              className={`${styles.row} ${isReversed ? styles.rowReversed : ""}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.div
                className={styles.imageCol}
                variants={{ hidden: { opacity: 0, x: isReversed ? 30 : -30 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* TODO: Replace with real service-specific photography */}
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </motion.div>

              <motion.div
                className={styles.textCol}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className={styles.serviceNumber}>{service.id}</span>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p className={styles.serviceDesc}>{service.description}</p>

                <ul className={styles.detailList}>
                  {service.details.map((detail) => (
                    <li key={detail} className={styles.detailItem}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
