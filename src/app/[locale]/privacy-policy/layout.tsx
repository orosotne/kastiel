import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.locale,
    namespace: "privacy",
    path: "privacy-policy",
  });
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
