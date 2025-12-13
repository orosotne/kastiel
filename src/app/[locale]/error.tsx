"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
        Nastala chyba
      </h1>
      <p className="text-charcoal/60 mb-8 text-center max-w-md">
        Ospravedlňujeme sa, niečo sa pokazilo. Skúste to prosím znova.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
      >
        Skúsiť znova
      </button>
    </div>
  );
}









