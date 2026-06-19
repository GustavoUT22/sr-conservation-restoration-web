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
