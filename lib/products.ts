/**
 * Instruments whose photographs are in public/images.
 * Named files use the catalogue pattern shown in the photograph.
 * Studio images are named only when the pattern is confidently identified
 * against standard surgical/orthodontic catalogues.
 * Uncertain studio images use the customer-facing label "Surgical Instrument"
 * with identificationStatus "pending" (internal only; not shown as the product name).
 * Verified names use identificationStatus "verified" (default).
 * Exact duplicate photographs listed under two names are shown once.
 */

import { catalogueCategories, catalogueGroups } from "@/lib/catalogue";

export type ProductCategoryId = "dental" | "orthopedic" | "orthodontic";

export type ProductIdentificationStatus = "verified" | "pending";

export type ProductImage = {
  src: string;
  alt: string;
  kind: "factory";
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  categoryId: ProductCategoryId;
  groupId: string;
  image: ProductImage;
  images: ProductImage[];
  /** AZ Instruments catalogue / model code when confirmed by the factory. */
  catalogueCode?: string;
  /** Optional catalogue figure reference when confirmed. */
  figure?: string;
  /** Professional overview written for buyers; empty until content is completed. */
  overview: string;
  /** Typical clinical or laboratory uses of this instrument pattern. */
  applications: string[];
  /** Design features visible on the product photograph or otherwise verified. */
  features: string[];
  /** Verified specifications only (omit unverified material grades, sizes, etc.). */
  specs: ProductSpec[];
  /** Short SEO description; falls back to overview when omitted. */
  seoDescription?: string;
  /** Internal catalogue status; never use as a customer-facing product name. */
  identificationStatus: ProductIdentificationStatus;
};

function photo(file: string, alt: string): ProductImage {
  return {
    src: `/images/${encodeURIComponent(file)}`,
    alt,
    kind: "factory",
  };
}

type Draft = {
  slug: string;
  name: string;
  categoryId: ProductCategoryId;
  groupId: string;
  images: ProductImage[];
  overview?: string;
  applications?: string[];
  features?: string[];
  specs?: ProductSpec[];
  catalogueCode?: string;
  figure?: string;
  seoDescription?: string;
  identificationStatus?: ProductIdentificationStatus;
};

function item(draft: Draft): Product {
  return {
    slug: draft.slug,
    name: draft.name,
    categoryId: draft.categoryId,
    groupId: draft.groupId,
    image: draft.images[0],
    images: draft.images,
    catalogueCode: draft.catalogueCode,
    figure: draft.figure,
    overview: draft.overview ?? "",
    applications: draft.applications ?? [],
    features: draft.features ?? [],
    specs: draft.specs ?? [],
    seoDescription: draft.seoDescription,
    identificationStatus: draft.identificationStatus ?? "verified",
  };
}

export const products: Product[] = [
  item({
    slug: "bainbridge-artery-forceps-straight",
    name: "Bainbridge Artery Forceps (Straight)",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Bainbridge Artery Forceps (Straight) 0172.jpg", "Bainbridge artery forceps, straight")],
    overview:
      "Straight Bainbridge artery forceps are a ring-handled haemostatic clamp used to grasp and temporarily occlude vessels or soft tissue during open surgical procedures. The pattern is also listed by instrument suppliers as artery and intestinal forceps, reflecting its use where a secure, controlled hold is required along a straight working line. This AZ Instruments listing shows the straight-jaw pattern photographed for the catalogue; length, steel grade and exact jaw serration specification should be confirmed against the factory quotation.",
    applications: [
      "Temporary clamping of vessels for haemostasis in open surgery",
      "Grasping and holding soft tissue or tubular structures where a straight approach is preferred",
      "General surgical trays that include Bainbridge-pattern artery forceps",
    ],
    features: [
      "Straight jaws with a full serrated gripping surface (as shown in the product photograph)",
      "Box-lock joint for stable jaw alignment",
      "Ratchet lock between the finger rings for controlled clamping pressure",
      "Symmetrical ring handles for two-handed or single-hand control",
    ],
    specs: [
      { label: "Jaw", value: "Straight" },
      { label: "Pattern", value: "Bainbridge artery forceps" },
    ],
    seoDescription:
      "Straight Bainbridge artery forceps from AZ Instruments. Ring-handled haemostatic clamp with serrated jaws for vessel and tissue control. Request a quotation with the product name.",
  }),
  item({
    slug: "band-pusher-double-ended",
    name: "Band Pusher (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [photo("Band Pusher (Double Ended) 0186.jpg", "Band pusher, double ended")],
    overview:
      "A double-ended orthodontic band pusher is a hand instrument used to seat and adapt orthodontic bands on teeth with controlled finger pressure. Each working end is angled to help reach different quadrants without changing instruments. This AZ Instruments photograph shows a double-ended pattern with a knurled central handle; tip size, serration style and overall length are not marked on the image and should be confirmed with the factory for ordering.",
    applications: [
      "Seating orthodontic bands during try-in and cementation",
      "Applying incremental pressure around the occlusal edge of a band",
      "Adapting band margins after initial seating",
    ],
    features: [
      "Double-ended design with opposing working tips",
      "Angled shanks for access in different areas of the arch",
      "Knurled grip sections on the central handle for secure handling",
      "Balanced shaft suited to chairside band placement",
    ],
    specs: [
      { label: "Ends", value: "Double ended" },
      { label: "Pattern", value: "Orthodontic band pusher" },
    ],
    seoDescription:
      "Double-ended orthodontic band pusher from AZ Instruments for seating and adapting bands. Request a quotation with the product name.",
  }),
  item({
    slug: "band-remover-double-ended",
    name: "Band Remover (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [photo("Band Remover (Double Ended) 0187.jpg", "Band remover, double ended")],
    overview:
      "A double-ended orthodontic band remover is a hand instrument used to lift, reposition or free orthodontic bands during fitting and removal appointments. Unlike posterior band-removing pliers, this pattern is a slender double-ended hand tool for lighter pick-and-lift work around the band margin. The AZ Instruments photograph shows two differently formed tips on a knurled handle; exact tip geometry and length should be confirmed before bulk ordering.",
    applications: [
      "Lifting or adjusting a band during try-in",
      "Engaging the band margin to assist removal after cementation checks",
      "Complementing band-removing pliers on orthodontic banding trays",
    ],
    features: [
      "Double-ended hand instrument with two working tips",
      "Offset shanks for intraoral access",
      "Knurled central handle for grip during seating and removal tasks",
      "Compact form for chairside orthodontic procedures",
    ],
    specs: [
      { label: "Ends", value: "Double ended" },
      { label: "Pattern", value: "Orthodontic band remover (hand instrument)" },
    ],
    seoDescription:
      "Double-ended orthodontic band remover from AZ Instruments for band adjustment and removal support. Request a quotation with the product name.",
  }),
  item({
    slug: "band-seater-and-ligature-tucker",
    name: "Band Seater and Ligature Tucker",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [photo("Band Seater and Ligature Tucker 0188.jpg", "Band seater and ligature tucker")],
    overview:
      "The band seater and ligature tucker combines two common orthodontic hand functions on one double-ended instrument: seating or adapting a band, and tucking ligature ends neatly against the archwire or bracket. Combination patterns of this type are widely used to reduce tray count during banding and ligation. Tip profiles on this AZ Instruments photograph should be matched to your preferred seating and tucking geometry when requesting a quotation; overall length and steel grade are not stated on the listing.",
    applications: [
      "Seating or adapting orthodontic bands with hand pressure",
      "Tucking metal or elastic ligature ends away from soft tissue",
      "Chairside banding and ligation sequences where a combined instrument is preferred",
    ],
    features: [
      "Double-ended combination of band-seating and ligature-tucking tips",
      "Angled shanks for posterior and anterior access",
      "Knurled handle sections for controlled finger pressure",
      "Single instrument covering two frequent orthodontic steps",
    ],
    specs: [
      { label: "Ends", value: "Double ended (band seater / ligature tucker)" },
      { label: "Pattern", value: "Orthodontic combination hand instrument" },
    ],
    seoDescription:
      "Band seater and ligature tucker from AZ Instruments — double-ended orthodontic hand instrument. Request a quotation with the product name.",
  }),
  item({
    slug: "bengolea-artery-forceps-curved",
    name: "Bengolea Artery Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Bengolea Artery Forceps (Curved) 0173.jpg", "Bengolea artery forceps, curved")],
    overview:
      "Curved Bengolea artery forceps are a long haemostatic clamp used to control vessels and hold tissue in deeper surgical fields where a curved jaw improves access around structures. The pattern is commonly supplied straight or curved and in more than one length by international instrument catalogues. This AZ Instruments listing presents the curved-jaw pattern shown in the catalogue photograph; overall length, tooth configuration (if any) and material grade require factory confirmation for exact supply.",
    applications: [
      "Haemostasis and vessel clamping in deeper operative fields",
      "Grasping tissue or suture materials where curved jaws improve reach",
      "General, abdominal and related surgical sets that include Bengolea-pattern forceps",
    ],
    features: [
      "Curved, tapered jaws with a full serrated gripping surface (as shown)",
      "Box-lock joint for aligned closure",
      "Multi-step ratchet lock above the finger rings",
      "Ring handles suited to controlled, locked clamping",
    ],
    specs: [
      { label: "Jaw", value: "Curved" },
      { label: "Pattern", value: "Bengolea artery forceps" },
    ],
    seoDescription:
      "Curved Bengolea artery forceps from AZ Instruments. Long haemostatic clamp for deeper surgical access. Request a quotation with the product name.",
  }),
  item({
    slug: "beyer-bone-rongeur",
    name: "Beyer Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [photo("Beyer Bone Rongeur 0189.jpg", "Beyer bone rongeur")],
  }),
  item({
    slug: "bracket-remover",
    name: "Bracket Remover",
    categoryId: "orthodontic",
    groupId: "orthodontic-bracket",
    images: [photo("Bracket Remover 0192.jpg", "Bracket remover")],
  }),
  item({
    slug: "bracket-remover-double-ended",
    name: "Bracket Remover (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-bracket",
    images: [photo("Bracket Remover (Double Ended) 0190.jpg", "Bracket remover, double ended")],
    specs: [
      { label: "Ends", value: "Double ended" },
    ],
  }),
  item({
    slug: "college-tweezers",
    name: "College Tweezers",
    categoryId: "dental",
    groupId: "dental-tweezers",
    images: [photo("College Tweezers 0191.jpg", "College tweezers")],
  }),
  item({
    slug: "crile-forceps-curved",
    name: "Crile Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Crile Forceps (Curved) 0174.jpg", "Crile forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "dandy-artery-forceps-curved",
    name: "Dandy Artery Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Dandy Atery Forceps (Curved) 0175.jpg", "Dandy artery forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "direct-bond-bracket-remover-angled",
    name: "Direct Bond Bracket Remover (Angled)",
    categoryId: "orthodontic",
    groupId: "orthodontic-bracket",
    images: [photo("Direct Bond Bracket Remover (Angled) 0193.jpg", "Direct bond bracket remover, angled")],
    specs: [
      { label: "Tip", value: "Angled" },
    ],
  }),
  item({
    slug: "dixon-lovelace-artery-forceps",
    name: "Dixon-Lovelace Artery Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Dixon-Lovelace Artery Forceps 0176.jpg", "Dixon-Lovelace artery forceps")],
  }),
  item({
    slug: "ferris-smith-kerrison-rongeur",
    name: "Ferris-Smith-Kerrison Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-kerrison",
    images: [photo("Ferris-Smith-Kerrison Rongeur 20cm – 2mm, 40° Up 0120.jpg", "Ferris-Smith-Kerrison rongeur")],
    specs: [
      { label: "Length", value: "20 cm" },
      { label: "Bite", value: "2 mm" },
      { label: "Angle", value: "40° up" },
    ],
  }),
  item({
    slug: "friedman-bone-rongeur",
    name: "Friedman Bone Rongeur",
    categoryId: "dental",
    groupId: "dental-bone-rongeurs",
    images: [photo("Friedman Bone Rongeur 0194.jpg", "Friedman bone rongeur")],
  }),
  item({
    slug: "halsted-mosquito-forceps-curved",
    name: "Halsted Mosquito Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Halsted Mosquito Forceps (Curved) 0177.jpg", "Halsted mosquito forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "heiss-artery-forceps",
    name: "Heiss Artery Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Heiss Artery Forceps 0178.jpg", "Heiss artery forceps")],
  }),
  item({
    slug: "hemingway-bone-curette",
    name: "Hemingway Bone Curette",
    categoryId: "dental",
    groupId: "dental-bone-curettes",
    images: [photo("Hemingway Bone Curette 0195.jpg", "Hemingway bone curette")],
  }),
  item({
    slug: "hemostat-probe",
    name: "Hemostat Probe",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Hemostat Probe 0196.jpg", "Hemostat probe")],
  }),
  item({
    slug: "how-utility-pliers",
    name: "How Utility Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("How Utility Pliers 0210.jpg", "How utility pliers")],
  }),
  item({
    slug: "jansen-bone-rongeur",
    name: "Jansen Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [photo("Jansen Bone Ronguer 0197.jpg", "Jansen bone rongeur")],
  }),
  item({
    slug: "ligature-director-angled",
    name: "Ligature Director (Angled)",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [photo("Ligature Director (Angled) 0198.jpg", "Ligature director, angled")],
    specs: [
      { label: "Tip", value: "Angled" },
    ],
  }),
  item({
    slug: "ligature-director-double-ended",
    name: "Ligature Director (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [
      photo("Ligature Director (Double Ended) 0199.jpg", "Ligature director, double ended"),
      photo("Ligature Director (Double Ended) 0200.jpg", "Ligature director, double ended, additional view"),
    ],
    specs: [
      { label: "Ends", value: "Double ended" },
    ],
  }),
  item({
    slug: "ligature-director-and-scaler",
    name: "Ligature Director and Scaler",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [photo("Ligature Director and Scaler 0202.jpg", "Ligature director and scaler")],
  }),
  item({
    slug: "ligature-director-and-scaler-double-ended",
    name: "Ligature Director and Scaler (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [photo("Ligature Director and Scaler (Double Ended) 0201.jpg", "Ligature director and scaler, double ended")],
    specs: [
      { label: "Ends", value: "Double ended" },
    ],
  }),
  item({
    slug: "ligature-director-and-tucker",
    name: "Ligature Director and Tucker",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [photo("Ligature Director and Tucker 0203.jpg", "Ligature director and tucker")],
  }),
  item({
    slug: "liston-bone-cutting-forceps",
    name: "Liston Bone Cutting Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Liston Bone Cutting Forceps 0204.jpg", "Liston bone cutting forceps")],
  }),
  item({
    slug: "lucas-bone-curette",
    name: "Lucas Bone Curette",
    categoryId: "dental",
    groupId: "dental-bone-curettes",
    images: [photo("Lucas Bone Curette 0205.jpg", "Lucas bone curette")],
  }),
  item({
    slug: "mathieu-ligature-plier",
    name: "Mathieu Ligature Plier",
    categoryId: "orthodontic",
    groupId: "orthodontic-ligature",
    images: [photo("Mathieu Ligature Plier 0179.jpg", "Mathieu ligature plier")],
  }),
  item({
    slug: "miller-bone-curette",
    name: "Miller Bone Curette",
    categoryId: "dental",
    groupId: "dental-bone-curettes",
    images: [photo("Miller Bone Curette 0206.jpg", "Miller bone curette")],
  }),
  item({
    slug: "orthodontic-band-pusher-double-ended",
    name: "Orthodontic Band Pusher (Double Ended)",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [photo("Orthodontic Band Pusher (Double Ended) 0207.jpg", "Orthodontic band pusher, double ended")],
    specs: [
      { label: "Ends", value: "Double ended" },
    ],
  }),
  item({
    slug: "pean-hemostatic-forceps-curved",
    name: "Pean Hemostatic Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Pean Hemostatic Forceps (Curved) 0180.jpg", "Pean hemostatic forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "pean-hemostatic-forceps-straight",
    name: "Pean Hemostatic Forceps (Straight)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Pean Hemostatic Forceps (Straight) 0181.jpg", "Pean hemostatic forceps, straight")],
    specs: [
      { label: "Jaw", value: "Straight" },
    ],
  }),
  item({
    slug: "posterior-bracket-remover",
    name: "Posterior Bracket Remover",
    categoryId: "orthodontic",
    groupId: "orthodontic-bracket",
    images: [photo("Posterior Bracket Remover 0208.jpg", "Posterior bracket remover")],
  }),
  item({
    slug: "rochester-carmalt-forceps-curved",
    name: "Rochester Carmalt Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Rochester Carmalt Forceps (Curved) 0182.jpg", "Rochester Carmalt forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "rochester-ochsner-forceps-curved",
    name: "Rochester Ochsner Forceps (Curved)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Rochester Ochsner Forcep (Curved) 0183.jpg", "Rochester Ochsner forceps, curved")],
    specs: [
      { label: "Jaw", value: "Curved" },
    ],
  }),
  item({
    slug: "rochester-ochsner-forceps-straight",
    name: "Rochester Ochsner Forceps (Straight)",
    categoryId: "orthopedic",
    groupId: "orthopedic-hemostats",
    images: [photo("Rochester Ochsner Forcep (Straight) 0184.jpg", "Rochester Ochsner forceps, straight")],
    specs: [
      { label: "Jaw", value: "Straight" },
    ],
  }),
  item({
    slug: "schmieden-taylor-artery-forceps",
    name: "Schmieden Taylor Artery Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-artery",
    images: [photo("Schmieden Taylor Artery Forceps 0185.jpg", "Schmieden Taylor artery forceps")],
  }),
  item({
    slug: "semb-bone-holding-forceps",
    name: "Semb Bone Holding Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-holding",
    images: [photo("Semb Bone Holding Forceps 0222.jpg", "Semb bone holding forceps")],
  }),
  item({
    slug: "universal-pliers",
    name: "Universal Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [
      photo("Universal Pliers 0211.jpg", "Universal pliers"),
      photo("Universal Pliers 0212.jpg", "Universal pliers, additional view"),
    ],
  }),
  item({
    slug: "wolff-plaster-cast-breaker",
    name: "Wolff Plaster Cast Breaker",
    categoryId: "orthopedic",
    groupId: "orthopedic-plaster",
    images: [photo("Wolff Plaster Cast Breaker 0123.jpg", "Wolff plaster cast breaker")],
  }),
  item({
    slug: "zaufal-jansen-bone-rongeur",
    name: "Zaufal-Jansen Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [photo("Zaufal-Jansan Bone Rongeur 45degree 0209.jpg", "Zaufal-Jansen bone rongeur")],
    specs: [
      { label: "Angle", value: "45°" },
    ],
  }),
  item({
    slug: "weitlaner-retractor",
    name: "Weitlaner Retractor",
    categoryId: "orthopedic",
    groupId: "orthopedic-retractors",
    images: [photo("Gemini_Generated_Image_414h9l414h9l414h.jpeg", "Weitlaner retractor")],
  }),
  item({
    slug: "gelpi-retractor",
    name: "Gelpi Retractor",
    categoryId: "orthopedic",
    groupId: "orthopedic-retractors",
    images: [photo("Gemini_Generated_Image_y9op7iy9op7iy9op.jpeg", "Gelpi retractor")],
  }),
  item({
    slug: "molt-mouth-gag",
    name: "Molt Mouth Gag",
    categoryId: "dental",
    groupId: "dental-mouth",
    images: [photo("Gemini_Generated_Image_9sdnp89sdnp89sdn.jpeg", "Molt mouth gag")],
  }),
  item({
    slug: "bird-beak-pliers",
    name: "Bird Beak Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [
      photo("Gemini_Generated_Image_bjg7d3bjg7d3bjg7.jpeg", "Bird beak pliers"),
      photo("Gemini_Generated_Image_qzxevzqzxevzqzxe.jpeg", "Bird beak pliers, additional view"),
      photo("Gemini_Generated_Image_sf7c1bsf7c1bsf7c.jpeg", "Bird beak pliers, additional view"),
      photo("Gemini_Generated_Image_kk03o8kk03o8kk03.jpeg", "Bird beak pliers, additional view"),
    ],
  }),
  item({
    slug: "posterior-band-removing-pliers",
    name: "Posterior Band Removing Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [
      photo("Gemini_Generated_Image_74rfwg74rfwg74rf.jpeg", "Posterior band removing pliers"),
      photo("Gemini_Generated_Image_qlxmghqlxmghqlxm.jpeg", "Posterior band removing pliers, additional view"),
    ],
  }),
  item({
    slug: "distal-end-cutter",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_b1l8aib1l8aib1l8.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "distal-end-cutter-angled",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_ssgi93ssgi93ssgi.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "distal-end-cutter-compact",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_wi1o42wi1o42wi1o.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "castroviejo-needle-holder",
    name: "Castroviejo Needle Holder",
    categoryId: "orthopedic",
    groupId: "orthopedic-needle-holders",
    images: [photo("Gemini_Generated_Image_l1nfo2l1nfo2l1nf.jpeg", "Castroviejo needle holder")],
  }),
  item({
    slug: "mayo-hegar-needle-holder",
    name: "Mayo-Hegar Needle Holder",
    categoryId: "orthopedic",
    groupId: "orthopedic-needle-holders",
    images: [photo("Gemini_Generated_Image_gnuywygnuywygnuy.jpeg", "Mayo-Hegar needle holder")],
  }),
  item({
    slug: "verbrugge-bone-holding-forceps",
    name: "Verbrugge Bone Holding Forceps",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-holding",
    images: [photo("Gemini_Generated_Image_90e5zk90e5zk90e5.jpeg", "Verbrugge bone holding forceps")],
  }),
  item({
    slug: "weingart-pliers",
    name: "Weingart Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_tzop1wtzop1wtzop.jpeg", "Weingart pliers")],
  }),
  item({
    slug: "elastic-separating-pliers",
    name: "Elastic Separating Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-band",
    images: [photo("Gemini_Generated_Image_fa1vd2fa1vd2fa1v.jpeg", "Elastic separating pliers")],
  }),
  item({
    slug: "bone-rongeur-double-action",
    name: "Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [
      photo("Gemini_Generated_Image_f927lrf927lrf927.jpeg", "Bone rongeur"),
      photo("Gemini_Generated_Image_ymme4yymme4yymme.jpeg", "Bone rongeur, additional view"),
    ],
  }),
  item({
    slug: "bone-rongeur-curved",
    name: "Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [photo("Gemini_Generated_Image_2gyyh2gyyh2gyyh2.jpeg", "Bone rongeur")],
  }),
  item({
    slug: "double-action-wire-cutter-tc",
    name: "Double Action Wire Cutter",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Gemini_Generated_Image_p2pmeup2pmeup2pm.jpeg", "Double action wire cutter")],
  }),
  item({
    slug: "surgical-instrument-225ti",
    name: "Surgical Instrument",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    identificationStatus: "pending",
    images: [photo("Gemini_Generated_Image_225ti225ti225ti2.jpeg", "Surgical instrument")],
  }),
  item({
    slug: "pin-and-ligature-cutter",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_38muou38muou38mu.jpeg", "Pin and ligature cutter")],
  }),
  item({
    slug: "distal-end-cutter-safety-hold",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_5qwwjj5qwwjj5qww.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "surgical-instrument-6yz7mt",
    name: "Surgical Instrument",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    identificationStatus: "pending",
    images: [photo("Gemini_Generated_Image_6yz7mt6yz7mt6yz7.jpeg", "Surgical instrument")],
  }),
  item({
    slug: "double-action-wire-cutter-front",
    name: "Double Action Wire Cutter",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Gemini_Generated_Image_72ekyh72ekyh72ek.jpeg", "Double action wire cutter")],
  }),
  item({
    slug: "distal-end-cutter-flush",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_9ihzmh9ihzmh9ihz.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "pin-and-ligature-cutter-mini",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_abqx26abqx26abqx.jpeg", "Pin and ligature cutter")],
  }),
  item({
    slug: "double-action-wire-cutter-end",
    name: "Double Action Wire Cutter",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Gemini_Generated_Image_c6jyfpc6jyfpc6jy.jpeg", "Double action wire cutter")],
  }),
  item({
    slug: "double-action-wire-cutter-side",
    name: "Double Action Wire Cutter",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Gemini_Generated_Image_dfxztrdfxztrdfxz.jpeg", "Double action wire cutter")],
  }),
  item({
    slug: "cinch-back-pliers",
    name: "Cinch Back Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_ema0jnema0jnema0.jpeg", "Cinch back pliers")],
  }),
  item({
    slug: "double-action-wire-cutter-heavy",
    name: "Double Action Wire Cutter",
    categoryId: "orthopedic",
    groupId: "orthopedic-bone-cutters",
    images: [photo("Gemini_Generated_Image_h2nsbzh2nsbzh2ns.jpeg", "Double action wire cutter")],
  }),
  item({
    slug: "weingart-pliers-angled",
    name: "Weingart Pliers",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_ixsmikixsmikixsm.jpeg", "Weingart pliers")],
  }),
  item({
    slug: "pin-and-ligature-cutter-fine",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_lboycrlboycrlboy.jpeg", "Pin and ligature cutter")],
  }),
  item({
    slug: "mayo-hegar-needle-holder-serrated",
    name: "Mayo-Hegar Needle Holder",
    categoryId: "orthopedic",
    groupId: "orthopedic-needle-holders",
    images: [photo("Gemini_Generated_Image_lz253xlz253xlz25.jpeg", "Mayo-Hegar needle holder")],
  }),
  item({
    slug: "distal-end-cutter-gold",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_mfznivmfznivmfzn.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "pin-and-ligature-cutter-tapered",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_nuygtpnuygtpnuyg.jpeg", "Pin and ligature cutter")],
  }),
  item({
    slug: "distal-end-cutter-capacity",
    name: "Distal End Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_r8gf1jr8gf1jr8gf.jpeg", "Distal end cutter")],
  }),
  item({
    slug: "bone-rongeur-beyer",
    name: "Bone Rongeur",
    categoryId: "orthopedic",
    groupId: "orthopedic-rongeurs",
    images: [photo("Gemini_Generated_Image_ugzzmvugzzmvugzz.jpeg", "Bone rongeur")],
  }),
  item({
    slug: "collier-needle-holder",
    name: "Collier Needle Holder",
    categoryId: "orthopedic",
    groupId: "orthopedic-needle-holders",
    images: [photo("Gemini_Generated_Image_xm5et0xm5et0xm5e.jpeg", "Collier needle holder")],
  }),
  item({
    slug: "pin-and-ligature-cutter-pointed",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_xwck0jxwck0jxwck.jpeg", "Pin and ligature cutter")],
  }),
  item({
    slug: "pin-and-ligature-cutter-beveled",
    name: "Pin and Ligature Cutter",
    categoryId: "orthodontic",
    groupId: "orthodontic-pliers",
    images: [photo("Gemini_Generated_Image_z1s8v3z1s8v3z1s8.jpeg", "Pin and ligature cutter")],
  }),
];

const slugs = new Set<string>();

for (const product of products) {
  if (slugs.has(product.slug)) {
    throw new Error(`Duplicate product slug: ${product.slug}`);
  }
  slugs.add(product.slug);
  if (!catalogueGroups.some((group) => group.id === product.groupId)) {
    throw new Error(`Unknown product group: ${product.groupId}`);
  }
  if (product.images.length === 0) {
    throw new Error(`Product has no image: ${product.slug}`);
  }
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameGroup = products.filter(
    (item) => item.groupId === product.groupId && item.slug !== product.slug,
  );
  const sameCategory = products.filter(
    (item) =>
      item.categoryId === product.categoryId &&
      item.groupId !== product.groupId &&
      item.slug !== product.slug,
  );
  return [...sameGroup, ...sameCategory].slice(0, limit);
}

export function getCategoryTitle(categoryId: ProductCategoryId) {
  return catalogueCategories.find((category) => category.id === categoryId)?.title ?? categoryId;
}

export function getGroupName(groupId: string) {
  return catalogueGroups.find((group) => group.id === groupId)?.name ?? groupId;
}

export function countInCategory(categoryId: ProductCategoryId) {
  return products.filter((product) => product.categoryId === categoryId).length;
}

export function countInGroup(groupId: string) {
  return products.filter((product) => product.groupId === groupId).length;
}
