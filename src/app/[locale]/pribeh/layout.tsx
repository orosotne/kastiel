import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "story" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: ["história kaštieľa Bošany", "rekonštrukcia kaštieľa", "Kaštieľ Bošany príbeh", "Bošany dejiny", "renesančný kaštieľ história"],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    alternates: buildAlternates(locale, "pribeh"),
  };
}

export default function PribehLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
