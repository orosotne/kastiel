import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: ["kontakt kaštieľ Bošany", "rezervácia Bošany", "Kaštieľ Bošany rezervácia", "kontakt Partizánske"],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    alternates: buildAlternates(locale, "kontakt"),
  };
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
