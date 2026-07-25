"use client";

import { motion } from "motion/react";
import { CREDENTIALS } from "@/lib/constants";
import { useMotionVariants } from "@/lib/motion";
import styles from "./Credentials.module.css";

export default function Credentials() {
  const v = useMotionVariants();

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
          {/* Eyebrow dropped: the heading names the section already. */}
          <motion.h2
            className={styles.title}
            variants={v.stratum}
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
              variants={v.stratum}
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
