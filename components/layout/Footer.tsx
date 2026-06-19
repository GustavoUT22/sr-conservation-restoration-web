import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import type { SocialPlatform } from "@/lib/types";
import styles from "./Footer.module.css";

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            S.R
          </Link>
          <p className={styles.tagline}>
            Conservación y restauración de patrimonio cultural.
          </p>
          <p className={styles.location}>Lima, Perú</p>

          <div className={styles.social}>
            {SOCIAL_LINKS.map(({ platform, href, label }) => {
              const Icon = SOCIAL_ICONS[platform];
              return (
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
              );
            })}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Navegación</span>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Contacto</span>
          <div className={styles.contactBlock}>
            <span className={styles.contactMeta}>Email</span>
            <a
              href="mailto:contacto@restauracion.pe"
              className={styles.contactValue}
            >
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

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © 2026 Solange Rodríguez. Todos los derechos reservados.
        </p>
        <div className={styles.legal}>
          <Link href="/privacidad" className={styles.legalLink}>
            Privacidad
          </Link>
          <Link href="/terminos" className={styles.legalLink}>
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}
