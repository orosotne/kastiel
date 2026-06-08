import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "announcement",
    path: "oznamenie",
  });
}

export default function OznamenieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
