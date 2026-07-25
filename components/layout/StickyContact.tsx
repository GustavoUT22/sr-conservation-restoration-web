import Link from "next/link";
import styles from "./StickyContact.module.css";

/**
 * Persistent contact action, phones only.
 *
 * The site's whole purpose is to produce an enquiry, and on a phone the only
 * paths to it were a link buried in the navbar drawer and a CTA at the bottom
 * of the page. This keeps the action one thumb-reach away at all times.
 *
 * Points at /contacto rather than WhatsApp on purpose: the phone number in the
 * codebase is still a placeholder, so a wa.me link would send visitors to a
 * stranger. Once Solange confirms her number, a WhatsApp variant is worth
 * testing — it converts better for quick enquiries, though email reads as more
 * formal to the institutional audience this site is aimed at.
 *
 * Server Component: no state, no handlers.
 */
export default function StickyContact() {
  return (
    <div className={styles.bar}>
      <Link href="/contacto" className={styles.action}>
        Solicitar una evaluación
      </Link>
    </div>
  );
}
