import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: ["galéria kaštieľ Bošany", "fotografie priestorov", "interiér kaštieľ Bošany", "Bošany galéria", "kaštieľ Partizánske"],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    alternates: buildAlternates(locale, "galeria"),
  };
}

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
