import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "story",
    path: "pribeh",
    keywords: ["história kaštieľa Bošany", "rekonštrukcia kaštieľa", "Kaštieľ Bošany príbeh", "Bošany dejiny", "renesančný kaštieľ história"],
  });
}

export default function PribehLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
