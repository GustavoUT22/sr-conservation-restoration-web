"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { useMotionVariants } from "@/lib/motion";
import { submitContactForm } from "@/lib/actions/contact";
import { INITIAL_CONTACT_STATE } from "@/lib/constants";
import type { ContactField } from "@/lib/types";
import styles from "./ContactForm.module.css";

interface FieldConfig {
  name: ContactField;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  autoComplete: string;
}

const FIELDS: FieldConfig[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Tu nombre completo",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "tu@email.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "subject",
    label: "Asunto",
    placeholder: "Consulta sobre restauración",
    type: "text",
    autoComplete: "off",
  },
  {
    name: "message",
    label: "Mensaje",
    placeholder: "Describe tu proyecto o consulta...",
    type: "textarea",
    autoComplete: "off",
  },
];

export default function ContactForm() {
  const v = useMotionVariants();

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    INITIAL_CONTACT_STATE,
  );

  return (
    <motion.div
      className={styles.formCol}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.h2
        className={styles.formTitle}
        variants={v.settle}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Envíame un mensaje
      </motion.h2>

      <motion.form
        className={styles.form}
        action={formAction}
        noValidate
        variants={v.settle}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {FIELDS.map(({ name, label, placeholder, type, autoComplete }) => {
          const error = state.fieldErrors[name];
          const errorId = `${name}-error`;

          return (
            <div key={name} className={styles.fieldGroup}>
              <label htmlFor={name} className={styles.label}>
                {label}
              </label>

              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  rows={5}
                  className={styles.textarea}
                  placeholder={placeholder}
                  defaultValue={state.values[name]}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  disabled={isPending}
                />
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  className={styles.input}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  defaultValue={state.values[name]}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  disabled={isPending}
                />
              )}

              {error ? (
                <p id={errorId} className={styles.fieldError}>
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        {/* Honeypot: invisible to users, tempting to bots. Never remove the label. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="company">No completar</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? "Enviando…" : "Enviar mensaje"}
        </button>

        {/* aria-live so screen readers announce the outcome without a focus jump. */}
        <p
          className={`${styles.feedback} ${
            state.status === "error" ? styles.feedbackError : ""
          } ${state.status === "success" ? styles.feedbackSuccess : ""}`}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      </motion.form>
    </motion.div>
  );
}
