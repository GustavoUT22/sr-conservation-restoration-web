import type { ContactField, ContactFieldErrors } from "./types";

/**
 * Pure validation, deliberately kept out of the "use server" module so it can be
 * exercised directly without a running server or a network round-trip.
 */

export const CONTACT_LIMITS: Record<ContactField, { min: number; max: number }> = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
};

/**
 * Deliberately permissive: the only reliable email validation is delivery, and a
 * stricter pattern rejects valid addresses. This catches typos, not edge cases.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(
  values: Record<ContactField, string>,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (values.name.length < CONTACT_LIMITS.name.min) {
    errors.name = "Escribe tu nombre completo.";
  } else if (values.name.length > CONTACT_LIMITS.name.max) {
    errors.name = "El nombre es demasiado largo.";
  }

  if (!values.email) {
    errors.email = "Necesitamos un correo para responderte.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Revisa el formato del correo.";
  } else if (values.email.length > CONTACT_LIMITS.email.max) {
    errors.email = "El correo es demasiado largo.";
  }

  if (values.subject.length < CONTACT_LIMITS.subject.min) {
    errors.subject = "Indica brevemente el motivo de tu consulta.";
  } else if (values.subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = "El asunto es demasiado largo.";
  }

  if (values.message.length < CONTACT_LIMITS.message.min) {
    errors.message = "Cuéntanos un poco más sobre la obra o el proyecto.";
  } else if (values.message.length > CONTACT_LIMITS.message.max) {
    errors.message = "El mensaje supera el límite de 5000 caracteres.";
  }

  return errors;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
