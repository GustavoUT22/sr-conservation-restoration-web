"use client";

import { motion } from "motion/react";
import { CREDENTIALS } from "@/lib/constants";
import styles from "./Credentials.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Credentials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.span
            className={styles.eyebrow}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Formación
          </motion.span>
          <motion.h2
            className={styles.title}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Educación y credenciales
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {CREDENTIALS.map((group) => (
            <motion.div
              key={group.type}
              className={styles.group}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className={styles.groupTitle}>{group.type}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
