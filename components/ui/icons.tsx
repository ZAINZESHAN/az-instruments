import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function LineIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </LineIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </LineIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </LineIcon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.7" />
    </LineIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.2 2.3 3.3 5 3.3 8S14.2 17.7 12 20c-2.2-2.3-3.3-5-3.3-8S9.8 6.3 12 4Z" />
    </LineIcon>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3V21M3.5 12h2.2M18.3 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
    </LineIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3.5 5.5 6.2v5.6c0 3.8 2.6 6.6 6.5 8.2 3.9-1.6 6.5-4.4 6.5-8.2V6.2L12 3.5Z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </LineIcon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="9" cy="8.5" r="2.2" />
      <circle cx="16" cy="9.2" r="1.7" />
      <path d="M4.8 18.2c.5-2.3 2.2-3.5 4.2-3.5s3.7 1.2 4.2 3.5" />
      <path d="M14.2 14.8c1.3-.2 2.6.3 3.3 1.6" />
    </LineIcon>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 7.5h10.5V16H3V7.5Z" />
      <path d="M13.5 10.5H17l3 3V16h-6.5" />
      <circle cx="7" cy="17.2" r="1.4" />
      <circle cx="17.2" cy="17.2" r="1.4" />
    </LineIcon>
  );
}

export function PenIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="m12.5 7.5 4 4" />
    </LineIcon>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M7 3.5h7l4 4V20.5H7v-17Z" />
      <path d="M14 3.5v4h4" />
      <path d="M10 12h5" />
      <path d="M10 16h5" />
    </LineIcon>
  );
}

export function InspectIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
      <path d="M8.5 11.2 10.2 13l3.4-3.8" />
    </LineIcon>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M5 16v-2a7 7 0 0 1 14 0v2" />
      <path d="M5 16h2.5v4H6a1 1 0 0 1-1-1v-3Z" />
      <path d="M16.5 16H19a1 1 0 0 1 1 1v3h-1.5v-4Z" />
    </LineIcon>
  );
}

export function ExportIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 18V6h10l6 6v6H4Z" />
      <path d="M14 6v6h6" />
    </LineIcon>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m8 13 2.5 2.5a2 2 0 0 0 2.8 0L16 13" />
      <path d="M4 12h4l2-2 2 1 2-2h6" />
      <path d="M8 16.5 6 18" />
      <path d="m16 16.5 2 1.5" />
    </LineIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 13.95c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.26.64-.38.85-.38h.61c.2 0 .46-.06.72.55.26.64.9 2.2.98 2.36.08.16.13.35.03.56-.1.22-.16.35-.31.54-.16.18-.33.41-.47.55-.16.16-.32.32-.14.63.18.32.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.5 1.53.32.16.5.13.69-.08.18-.2.8-.93 1.01-1.25.22-.32.43-.26.72-.16.3.1 1.88.88 2.2 1.04.32.16.54.24.62.38.08.14.08.78-.16 1.46Z" />
    </svg>
  );
}
