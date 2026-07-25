"use server";

import type { ContactField, ContactFormState } from "@/lib/types";
import { INITIAL_CONTACT_STATE } from "@/lib/constants";
import { escapeHtml, validateContact } from "@/lib/contact-validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function readField(formData: FormData, field: string): string {
  const raw = formData.get(field);
  return typeof raw === "string" ? raw.trim() : "";
}

function buildEmailHtml(values: Record<ContactField, string>): string {
  const rows: Array<[string, string]> = [
    ["Nombre", values.name],
    ["Correo", values.email],
    ["Asunto", values.subject],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<p style="margin:0 0 8px"><strong>${label}:</strong> ${escapeHtml(value)}</p>`,
    )
    .join("");

  // Newlines survive the trip only if converted — email clients collapse them.
  const body = escapeHtml(values.message).replace(/\n/g, "<br>");

  return `<div style="font-family:sans-serif;font-size:14px;line-height:1.6">
    <h2 style="margin:0 0 16px;font-size:16px">Nuevo mensaje desde el sitio web</h2>
    ${rowsHtml}
    <hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
    <p style="margin:0">${body}</p>
  </div>`;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: Record<ContactField, string> = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message"),
  };

  // Honeypot: hidden from humans, commonly filled by bots. Fake success so the
  // bot has no signal to adapt to.
  if (readField(formData, "company")) {
    return { status: "success", message: "Mensaje enviado.", fieldErrors: {}, values };
  }

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: RESEND_API_KEY and/or CONTACT_TO_EMAIL are missing.",
    );
    return {
      status: "error",
      message:
        "El formulario no está disponible en este momento. Escríbenos directamente por correo.",
      fieldErrors: {},
      values,
    };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Sitio web S.R. <${from}>`,
        to: [to],
        // Lets Solange hit reply and reach the visitor directly.
        reply_to: values.email,
        subject: `Consulta web: ${values.subject}`,
        html: buildEmailHtml(values),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`Resend rejected the message (${response.status}): ${detail}`);
      return {
        status: "error",
        message:
          "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.",
        fieldErrors: {},
        values,
      };
    }
  } catch (error) {
    console.error("Contact form request failed:", error);
    return {
      status: "error",
      message:
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Gracias por escribir. Te responderemos pronto.",
    fieldErrors: {},
    values: INITIAL_CONTACT_STATE.values,
  };
}
