import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "gallery",
    path: "galeria",
    keywords: ["galéria kaštieľ Bošany", "fotografie priestorov", "interiér kaštieľ Bošany", "Bošany galéria", "kaštieľ Partizánske"],
  });
}

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
