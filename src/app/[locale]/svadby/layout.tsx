import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "weddings" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: [
      "svadby Bošany",
      "svadba Partizánske",
      "Kaštieľ Bošany svadby",
      "svadobný priestor Partizánske",
      "svadby okolo Partizánske",
      "svadobná hostina Bošany",
    ],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    alternates: buildAlternates(locale, "svadby"),
  };
}

export default function SvadbyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
