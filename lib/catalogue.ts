/**
 * Groups for instruments whose photographs are in public/images.
 */

export type CatalogueProduct = {
  name: string;
  catalogueNumber: string;
};

export type CatalogueGroup = {
  id: string;
  index: number;
  name: string;
  cataloguePage: number;
  products: CatalogueProduct[];
};

export type CatalogueCategory = {
  id: "dental" | "orthopedic" | "orthodontic";
  title: string;
  summary: string;
  groups: CatalogueGroup[];
};

export const catalogueCategories: CatalogueCategory[] = [
  {
    id: "dental",
    title: "Dental Instruments",
    summary: "Tweezers, bone curettes, and a bone rongeur from the approved photographs.",
    groups: [
      {
        id: "dental-tweezers",
        index: 1,
        name: "Tweezers",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "dental-bone-curettes",
        index: 2,
        name: "Bone Curettes",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "dental-bone-rongeurs",
        index: 3,
        name: "Bone Rongeurs",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "dental-mouth",
        index: 4,
        name: "Mouth Instruments",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "dental-extraction",
        index: 5,
        name: "Extraction Forceps",
        cataloguePage: 0,
        products: [],
      },
    ],
  },
  {
    id: "orthopedic",
    title: "Orthopedic Instruments",
    summary:
      "Bone holding forceps, a bone cutter, rongeurs, a plaster instrument, and artery and hemostatic forceps.",
    groups: [
      {
        id: "orthopedic-bone-holding",
        index: 6,
        name: "Bone Holding Forceps",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-bone-cutters",
        index: 7,
        name: "Bone Cutters",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-rongeurs",
        index: 8,
        name: "Bone Rongeurs",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-kerrison",
        index: 9,
        name: "Kerrison Rongeurs",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-plaster",
        index: 10,
        name: "Plaster Instruments",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-artery",
        index: 11,
        name: "Artery Forceps",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-hemostats",
        index: 12,
        name: "Hemostatic Forceps",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-retractors",
        index: 13,
        name: "Retractors",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-needle-holders",
        index: 14,
        name: "Needle Holders",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthopedic-general",
        index: 15,
        name: "Surgical Instruments",
        cataloguePage: 0,
        products: [],
      },
    ],
  },
  {
    id: "orthodontic",
    title: "Orthodontic Instruments",
    summary: "Pliers and band, bracket, and ligature instruments.",
    groups: [
      {
        id: "orthodontic-pliers",
        index: 16,
        name: "Pliers",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthodontic-band",
        index: 17,
        name: "Band Instruments",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthodontic-bracket",
        index: 18,
        name: "Bracket Instruments",
        cataloguePage: 0,
        products: [],
      },
      {
        id: "orthodontic-ligature",
        index: 19,
        name: "Ligature Instruments",
        cataloguePage: 0,
        products: [],
      },
    ],
  },
];

export const catalogueGroups: CatalogueGroup[] = catalogueCategories.flatMap(
  (category) => category.groups,
);

export const categoryIllustrations = {
  dental: {
    src: `/images/${encodeURIComponent("Friedman Bone Rongeur 0194.jpg")}`,
    alt: "Friedman bone rongeur",
  },
  orthopedic: {
    src: `/images/${encodeURIComponent("Semb Bone Holding Forceps 0222.jpg")}`,
    alt: "Semb bone holding forceps",
  },
  orthodontic: {
    src: `/images/${encodeURIComponent("Mathieu Ligature Plier 0179.jpg")}`,
    alt: "Mathieu ligature plier",
  },
} as const satisfies Record<
  CatalogueCategory["id"],
  { src: string; alt: string }
>;

/**
 * Homepage "Explore Our Instruments" cards — product slugs from the live catalogue.
 * Order matches the attached product-card references.
 */
export const featuredInstrumentSlugs = [
  "surgical-instrument-6yz7mt",
  "double-action-wire-cutter-tc",
  "double-action-wire-cutter-end",
  "bird-beak-pliers",
] as const;
