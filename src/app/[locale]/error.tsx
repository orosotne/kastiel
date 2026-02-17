"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
        {t("error_title")}
      </h1>
      <p className="text-charcoal/60 mb-8 text-center max-w-md">
        {t("error_desc")}
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
      >
        {t("try_again")}
      </button>
    </div>
  );
}
