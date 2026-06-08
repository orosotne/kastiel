import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "weddings",
    path: "svadby",
    keywords: [
      "svadby Bošany",
      "svadba Partizánske",
      "Kaštieľ Bošany svadby",
      "svadobný priestor Partizánske",
      "svadby okolo Partizánske",
      "svadobná hostina Bošany",
    ],
  });
}

export default function SvadbyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
