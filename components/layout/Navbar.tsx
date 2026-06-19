"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Obra", href: "#obra" },
  { label: "Servicios", href: "#ss" },
  { label: "Sobre mí", href: "/about" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú si se redimensiona a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/sr-isotipo.svg"
            alt="S.R"
            width={80}
            height={60}
          />
        </Link>

        {/* Nav desktop */}
        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <IoCloseOutline size={22} />
          ) : (
            <RxHamburgerMenu size={20} />
          )}
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer mobile */}
      <nav
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-label="Menú móvil"
      >
        <ul className={styles.drawerList}>
          {navLinks.map(({ label, href }, i) => (
            <li
              key={href}
              className={styles.drawerItem}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Link
                href={href}
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
