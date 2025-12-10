import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <h1 className="font-serif text-6xl md:text-8xl text-gold mb-4">404</h1>
      <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
        Stránka nenájdená
      </h2>
      <p className="text-charcoal/60 mb-8 text-center max-w-md">
        Ospravedlňujeme sa, ale požadovaná stránka neexistuje alebo bola presunutá.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
      >
        Späť na úvod
      </Link>
    </div>
  );
}







