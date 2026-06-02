'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

const contactInfo = [
  { label: 'Email',     value: 'contacto@restauracion.pe', href: 'mailto:contacto@restauracion.pe' },
  { label: 'Whatsapp',  value: '+51 987 654 321',           href: 'https://wa.me/51987654321' },
  { label: 'Ubicación', value: 'Lima, Perú',                href: null },
  { label: 'Horario',   value: 'Lunes a viernes, 9 – 18h', href: null },
];

const serviceOptions = [
  'Pintura colonial',
  'Escultura policromada',
  'Mural histórico',
  'Cerámica y objetos',
  'Documentos y papel',
  'Consultoría patrimonial',
  'Otro',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: connect to form handler / API
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="contacto">

      {/* ── Left panel (dark) ── */}
      <div className={styles.panel}>
        <span className={styles.eyebrow}>Contacto</span>

        <h2 className={styles.title}>
          Hablemos sobre
          <br />
          su obra
        </h2>

        <p className={styles.description}>
          Cada pieza tiene una historia. Cuénteme la suya y
          evaluaremos juntos el mejor tratamiento.
        </p>

        <span className={styles.divider} aria-hidden="true" />

        <dl className={styles.infoList}>
          {contactInfo.map(({ label, value, href }) => (
            <div key={label} className={styles.infoItem}>
              <dt className={styles.infoLabel}>{label}</dt>
              <dd className={styles.infoValue}>
                {href
                  ? <a href={href} className={styles.infoLink}>{value}</a>
                  : value
                }
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Right panel (form) ── */}
      <div className={styles.formPanel}>
        {submitted ? (
          <div className={styles.successMsg}>
            <span className={styles.successLine} aria-hidden="true" />
            <p className={styles.successText}>
              Gracias por su mensaje. Le responderé en menos de 48 horas.
            </p>
          </div>
        ) : (
          <div className={styles.form}>

            {/* Row: name + email */}
            <div className={styles.row}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Select */}
            <div className={styles.field}>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`${styles.input} ${styles.select} ${!formData.service ? styles.placeholder : ''}`}
              >
                <option value="" disabled>Selecciona una opción</option>
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className={styles.selectArrow} aria-hidden="true">⌄</span>
            </div>

            {/* Textarea */}
            <div className={styles.field}>
              <textarea
                name="message"
                placeholder="Material, estado actual, procedencia…"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.input} ${styles.textarea}`}
                rows={5}
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submit}
            >
              Enviar mensaje
            </button>

          </div>
        )}
      </div>

    </section>
  );
}