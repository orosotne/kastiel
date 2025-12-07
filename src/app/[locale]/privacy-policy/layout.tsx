import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Kaštieľ Bošany",
  description: "Zásady ochrany osobných údajov pre webovú stránku Kaštieľ Bošany. Informácie o spracovaní osobných údajov podľa GDPR.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://inintegrum.sk/sk/privacy-policy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

