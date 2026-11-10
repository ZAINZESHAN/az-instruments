import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <PlaceholderPage
      title="Downloads"
      message="This page is being prepared. Catalogue files will be added here when they are placed in the project."
    />
  );
}
