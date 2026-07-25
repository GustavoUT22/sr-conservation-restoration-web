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

  // Escape had no handler: the drawer could only be dismissed by pointer.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {/* The .svg was a 415KB PNG in an SVG wrapper, shipped on every page
              for an 80px mark. This is the same artwork at 3x, 5.3KB.
              64x60 keeps the original 415.5:387.75 ratio — the old 80x60 was
              stretching it horizontally. */}
          <Image
            src="/sr-isotipo.webp"
            alt="S.R — Conservación y Restauración"
            width={64}
            height={60}
            priority
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
          aria-controls="menu-movil"
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

      {/* inert while closed: the drawer stays mounted and only slides off
          screen, so without this its four links stayed in the tab order and
          were announced twice by screen readers. */}
      <nav
        id="menu-movil"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-label="Menú móvil"
        inert={!menuOpen}
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
