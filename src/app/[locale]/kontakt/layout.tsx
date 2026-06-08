import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "contact",
    path: "kontakt",
    keywords: ["kontakt kaštieľ Bošany", "rezervácia Bošany", "Kaštieľ Bošany rezervácia", "kontakt Partizánske"],
  });
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
