import type {
  NavLink,
  SocialLink,
  Stat,
  Work,
  Specialty,
  TimelineMilestone,
  CredentialGroup,
  ProcessStep,
  Service,
} from "./types";

// -- Shared navigation --

export const NAV_LINKS: NavLink[] = [
  { label: "Obra", href: "#obra" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { platform: "instagram", href: "https://instagram.com", label: "Instagram" },
  { platform: "tiktok", href: "https://tiktok.com", label: "TikTok" },
];

// -- Home page --

export const HOME_STATS: Stat[] = [
  { value: "8+", label: "Años" },
  { value: "60+", label: "Obras" },
  { value: "12", label: "Instituciones" },
];

export const MARQUEE_WORDS: string[] = [
  "Documentos Históricos",
  "Conservación",
  "Restauración",
  "Patrimonio Cultural",
  "Pintura Colonial",
  "Escultura",
];

export const SPECIALTIES: Specialty[] = [
  {
    id: "01",
    category: "Especialidad",
    title: "Pintura colonial",
    description:
      "Óleo sobre lienzo y tabla. Limpieza, consolidación y reintegración cromática.",
    image: "/amazonia-cyr.webp",
    alt: "Pintura colonial restaurada",
  },
  {
    id: "02",
    category: "Especialidad",
    title: "Escultura",
    description:
      "Madera policromada, piedra y metal. Tratamiento estructural y cromático.",
    image: "/amazonia2-cyr.webp",
    alt: "Escultura sacra restaurada",
  },
  {
    id: "03",
    category: "Especialidad",
    title: "Murales",
    description:
      "Pintura mural in situ. Consolidación de soporte y capa pictórica.",
    image: "/mural-cyr.webp",
    alt: "Mural histórico restaurado",
  },
];

export const WORKS: Work[] = [
  {
    id: 1,
    category: "Pintura Colonial",
    year: "1784",
    title: "Virgen con Niño",
    size: "tall",
    image: "/amazonia-cyr.webp",
  },
  {
    id: 2,
    category: "Restauración Escultórica",
    year: "1650",
    title: "Escultura sacra",
    size: "normal",
    image: "/amazonia2-cyr.webp",
  },
  {
    id: 3,
    category: "Cerámica Histórica",
    year: "1820",
    title: "Trabajo de conservación",
    size: "normal",
    image: "/ceramica-cyr.webp",
  },
  {
    id: 4,
    category: "Restauración Escultórica",
    year: "1580",
    title: "Palacio de Gobierno",
    size: "tall",
    image: "/ceramica2-cyr.webp",
  },
  {
    id: 5,
    category: "Restauración de Mural",
    year: "1765",
    title: "Arte histórico",
    size: "normal",
    image: "/mural-cyr-2.webp",
  },
  {
    id: 6,
    category: "Mural Barroco",
    year: "1790",
    title: "Mural Representativo",
    size: "tall",
    image: "/mural-cyr.webp",
  },
  {
    id: 7,
    category: "Educación Patrimonial",
    year: "2025",
    title: "Capacitación en conservación",
    size: "normal",
    image: "/taller-uni-cyr.webp",
  },
];

// -- About page --

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "2016",
    title: "Inicio de formación",
    description:
      "Ingreso a la carrera de Conservación y Restauración en la Universidad Nacional Mayor de San Marcos.",
  },
  {
    year: "2018",
    title: "Primera intervención institucional",
    description:
      "Participación en el proyecto de conservación del acervo pictórico del Convento de Santo Domingo, Lima.",
  },
  {
    year: "2020",
    title: "Especialización en pintura colonial",
    description:
      "Formación complementaria en técnicas de reintegración cromática y consolidación de estratos pictóricos.",
  },
  {
    year: "2022",
    title: "Proyectos de patrimonio mueble",
    description:
      "Intervención en esculturas policromadas y retablos barrocos para el Ministerio de Cultura.",
  },
  {
    year: "2024",
    title: "Consultoría independiente",
    description:
      "Inicio de práctica profesional independiente, asesorando a coleccionistas privados e instituciones culturales.",
  },
];

export const CREDENTIALS: CredentialGroup[] = [
  {
    type: "Educación",
    items: [
      "Lic. en Conservación y Restauración — UNMSM, Lima",
      "Diplomado en Gestión del Patrimonio Cultural — PUCP",
      "Curso de especialización en análisis de materiales — Getty Conservation Institute",
    ],
  },
  {
    type: "Certificaciones",
    items: [
      "Conservación preventiva de colecciones — ICCROM",
      "Documentación fotográfica de bienes culturales — Ministerio de Cultura",
      "Primeros auxilios para patrimonio cultural en emergencias — Smithsonian",
    ],
  },
  {
    type: "Afiliaciones",
    items: [
      "Colegio de Conservadores-Restauradores del Perú",
      "ICOM — Consejo Internacional de Museos",
      "APOYO — Asociación Peruana de Conservación",
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Diagnóstico",
    description:
      "Evaluación integral del estado de conservación: análisis visual, fotográfico y, cuando es necesario, pruebas de laboratorio para identificar materiales, técnicas y deterioros.",
    image: "/ceramica-cyr.webp",
    alt: "Proceso de diagnóstico de una pieza cerámica histórica",
  },
  {
    id: "02",
    title: "Documentación",
    description:
      "Registro fotográfico y escrito de cada hallazgo. La documentación es la memoria del proceso y garantiza la trazabilidad de cada decisión.",
    image: "/ceramica2-cyr.webp",
    alt: "Documentación fotográfica de una obra de arte",
  },
  {
    id: "03",
    title: "Intervención",
    description:
      "Aplicación de tratamientos de conservación y restauración bajo criterios de mínima intervención, reversibilidad y respeto por la materia original.",
    image: "/amazonia-cyr.webp",
    alt: "Intervención de restauración en pintura colonial",
  },
  {
    id: "04",
    title: "Entrega",
    description:
      "Presentación del informe final con recomendaciones de conservación preventiva para garantizar la permanencia de la obra en el tiempo.",
    image: "/amazonia2-cyr.webp",
    alt: "Obra restaurada lista para entrega al cliente",
  },
];

// -- Services page --

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "Conservación preventiva",
    description:
      "Diagnóstico del estado de conservación y diseño de protocolos para prevenir deterioros futuros en colecciones y piezas individuales.",
    details: [
      "Evaluación de condiciones ambientales",
      "Planes de conservación preventiva",
      "Asesoría en almacenamiento y exhibición",
      "Monitoreo periódico de colecciones",
    ],
    image: "/ceramica-cyr.webp",
    alt: "Evaluación preventiva de piezas cerámicas históricas",
  },
  {
    id: "02",
    title: "Restauración de pintura",
    description:
      "Intervención en pintura de caballete y mural: limpieza, consolidación de estratos, reintegración cromática y protección final.",
    details: [
      "Pintura colonial sobre lienzo y tabla",
      "Pintura mural in situ",
      "Limpieza y remoción de repintes",
      "Reintegración cromática reversible",
    ],
    image: "/amazonia-cyr.webp",
    alt: "Restauración de pintura colonial sobre lienzo",
  },
  {
    id: "03",
    title: "Restauración de escultura",
    description:
      "Tratamiento de escultura en madera policromada, piedra, metal y cerámica. Consolidación estructural y recuperación cromática.",
    details: [
      "Madera policromada y dorada",
      "Escultura en piedra y metal",
      "Consolidación estructural",
      "Tratamiento de policromía",
    ],
    image: "/amazonia2-cyr.webp",
    alt: "Restauración de escultura policromada",
  },
  {
    id: "04",
    title: "Documentación patrimonial",
    description:
      "Registro fotográfico profesional, informes técnicos y fichas de inventario para instituciones culturales y coleccionistas.",
    details: [
      "Fotografía técnica y diagnóstica",
      "Informes de estado de conservación",
      "Fichas de inventario patrimonial",
      "Documentación de procesos de intervención",
    ],
    image: "/taller-uni-cyr.webp",
    alt: "Documentación y registro fotográfico de bienes culturales",
  },
];
