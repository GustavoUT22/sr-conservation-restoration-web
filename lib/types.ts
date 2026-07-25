/**
 * Minimal JSON-LD shape. Schema.org node types are open-ended by design, so the
 * index signature is intentional — the two required keys are what we can enforce.
 */
export interface JsonLdNode {
  "@type": string;
  "@id"?: string;
  [key: string]: unknown;
}

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export interface NavLink {
  label: string;
  href: string;
}

export type SocialPlatform = "linkedin" | "instagram" | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type WorkSize = "tall" | "normal";

export interface Work {
  id: number;
  category: string;
  year: string;
  title: string;
  size: WorkSize;
  image: string;
}

export interface Specialty {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export type CredentialType = "Educación" | "Certificaciones" | "Afiliaciones";

export interface CredentialGroup {
  type: CredentialType;
  items: string[];
}

export type IntroPhase = "enter" | "idle" | "exit" | "done";

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  /** User-facing message in Spanish. Empty while idle. */
  message: string;
  fieldErrors: ContactFieldErrors;
  /** Echoed back so the inputs survive a failed submit. */
  values: Record<ContactField, string>;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
}
