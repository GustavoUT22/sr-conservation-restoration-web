"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { NAV_LINKS } from "@/lib/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/sr-isotipo.svg"
            alt="S.R — Conservación y Restauración"
            width={80}
            height={60}
          />
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-label="Menú móvil"
      >
        <ul className={styles.drawerList}>
          {NAV_LINKS.map(({ label, href }, i) => (
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
