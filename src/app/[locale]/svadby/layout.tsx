import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return { alternates: buildAlternates(locale, "svadby") };
}

export default function SvadbyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
