'use client';

import Link from 'next/link';
import { FaLinkedinIn, FaInstagram, FaTiktok } from 'react-icons/fa';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Obra',      href: '#obra' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre mí',  href: '#sobre-mi' },
  { label: 'Contacto',  href: '#contacto' },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com',  label: 'LinkedIn'  },
  { icon: FaInstagram,  href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaTiktok,     href: 'https://tiktok.com',    label: 'TikTok'    },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* ── Brand ── */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>S.R</Link>
          <p className={styles.tagline}>
            Conservación y restauración de patrimonio cultural.
          </p>
          <p className={styles.location}>Lima, Perú</p>

          <div className={styles.social}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialLink}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Nav ── */}
        <div className={styles.group}>
          <span className={styles.groupLabel}>Navegación</span>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contacto ── */}
        <div className={styles.group}>
          <span className={styles.groupLabel}>Contacto</span>
          <div className={styles.contactBlock}>
            <span className={styles.contactMeta}>Email</span>
            <a href="mailto:contacto@restauracion.pe" className={styles.contactValue}>
              contacto@restauracion.pe
            </a>
          </div>
          <div className={styles.contactBlock}>
            <span className={styles.contactMeta}>Teléfono</span>
            <a href="tel:+51987654321" className={styles.contactValue}>
              +51 987 654 321
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <p className={styles.copy}>
          © 2026 Solange Rodríguez. Todos los derechos reservados.
        </p>
        <div className={styles.legal}>
          <Link href="/privacidad" className={styles.legalLink}>Privacidad</Link>
          <Link href="/terminos"   className={styles.legalLink}>Términos</Link>
        </div>
      </div>
    </footer>
  );
}