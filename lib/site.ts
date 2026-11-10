/**
 * Company and range facts are taken from AZ Instruments Catalogue v4:
 * cover, manufacturer introduction, contents, and contact pages.
 *
 * The PDF is not in this workspace. Place it at:
 * source/catalogue/AZ_Instruments_Catalogue_v4.pdf
 */

export const site = {
  name: "AZ Instruments",
  tagline: "Dental & Surgical Instruments",
  description:
    "AZ Instruments is based in Sialkot, Pakistan, and supplies dental and surgical instruments to international buyers.",
  address: {
    line1: "Street no. 1, Kacha Shahab Road",
    line2: "Sialkot 51310, Pakistan",
  },
  phones: [
    { display: "+92 3092140037", href: "tel:+923092140037" },
    { display: "+92 3066105530", href: "tel:+923066105530" },
  ],
  whatsapp: {
    display: "+92 3092140037",
    href: "https://wa.me/923092140037",
  },
  email: {
    display: "azinstruments.official@gmail.com",
    href: "mailto:azinstruments.official@gmail.com",
  },
  /**
   * Company timeline — update when the factory confirms the exact founding year.
   * experienceYears is used on the About page until establishedYear is set.
   */
  company: {
    experienceYears: 15,
    /** Set when confirmed, e.g. 2011. Leave undefined until verified. */
    establishedYear: undefined as number | undefined,
    locationLabel: "Sialkot, Pakistan",
  },
  selectedRange:
    "This catalogue presents a selected range of extraction forceps, elevators, Gold / DC surgical scissors and needle holders, bone files, probes, periodontal knives, orthopedic wire cutters, and orthodontic pliers and cutters.",
  quotationNote:
    "Please use the product name shown on each page when requesting a quotation. Measurements are listed only where they were supplied with the instrument.",
  customDesign:
    "Custom designs are also available. If you need an instrument made to your own drawing, sample or specification, we can produce it according to your requirement.",
  inquiryNote:
    "For quotations, please include the product name shown on the relevant page. Custom designs can also be produced from your drawing, sample or specification.",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/quality", label: "Quality & Certificates" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/oem", label: "OEM & Private Label" },
  { href: "/downloads", label: "Downloads" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroHighlights = [
  {
    title: "Sialkot, Pakistan",
    text: "Our Manufacturing Hub",
  },
  {
    title: "Worldwide Supply",
    text: "Global Distribution",
  },
  {
    title: "Custom Designs",
    text: "OEM & Private Label",
  },
  {
    title: "Instrument Catalogue",
    text: "Three Categories",
  },
] as const;

export const trustPoints = [
  {
    title: "Quality Assured",
    text: "Reliable & consistent quality",
  },
  {
    title: "Professional Support",
    text: "Dedicated customer service",
  },
  {
    title: "On-Time Delivery",
    text: "Worldwide shipping",
  },
  {
    title: "Long-Term Partnership",
    text: "Your trusted supplier",
  },
] as const;

export const divisions = [
  {
    index: "01",
    title: "Dental",
    summary:
      "Extraction forceps, elevators, probes, bone files, periodontal knives, scissors and needle holders.",
  },
  {
    index: "02",
    title: "Orthopedic",
    summary: "Pin and wire cutters and wire cutting scissors.",
  },
  {
    index: "03",
    title: "Orthodontic",
    summary:
      "Wire cutters, bending pliers, flat nose pliers, end and side cutters, and related pliers.",
  },
] as const;
