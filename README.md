# In Integrum – Kaštieľ Bošany

Webová prezentácia renesančného kaštieľa Bošany.

## Motto
> "Kde sa história nekonzervuje, ale vracia do života."

## Technológie

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animácie**: Framer Motion
- **Internacionalizácia**: next-intl (SK/EN/DE)
- **Fonty**: Playfair Display + Montserrat

## Inštalácia

```bash
npm install
npm run dev
```

Otvorte [http://localhost:3000](http://localhost:3000) v prehliadači.

## Štruktúra projektu

```
src/
├── app/
│   ├── [locale]/           # Jazykové mutácie
│   │   ├── page.tsx        # Homepage
│   │   ├── pribeh/         # História a obnova
│   │   ├── svadby/         # Svadby & Oslavy
│   │   ├── galeria/        # Galéria & Konferencie
│   │   └── kontakt/        # Kontakt & Rezervácie
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, Phoenix, Chronicle...
│   ├── ui/                 # Buttons, Cards
│   └── interactive/        # BeforeAfter, Parallax
├── i18n/                   # Preklady
└── lib/                    # Utility funkcie
```

## Obrázky

Do `public/images/` pridajte:

### Hlavné obrázky
- `hero-poster.jpg` - Poster pre hero video
- `castle-before.jpg` - Kaštieľ pred obnovou (čiernobiela)
- `castle-after.jpg` - Kaštieľ po obnove
- `chronicle-detail.jpg` - Detail kaštieľa (maľba/výzdoba)
- `story-hero.jpg` - Hero pre stránku Príbeh
- `wedding-hero.jpg` - Hero pre stránku Svadby
- `gallery-hero.jpg` - Hero pre stránku Galéria
- `contact-hero.jpg` - Hero pre stránku Kontakt

### Sekcie
- `conference-hall.jpg` - Konferenčná sála
- `wedding-park.jpg` - Svadba v parku
- `park-alpacas.jpg` - Alpaky v parku
- `wine-cellar.jpg` - Vínna pivnica
- `wedding-venue.jpg` - Svadobný priestor
- `alpacas.jpg` - Alpaky Boška a Rišo
- `thick-walls.jpg` - Hrubé múry kaštieľa
- `conference-room.jpg` - Konferenčná miestnosť

### Galérie
- `gallery/analysis-1.jpg` až `analysis-6.jpg` - Analytická sonda
- `gallery/interior-1.jpg` až `interior-8.jpg` - Interiér
- `weddings/wedding-1.jpg` až `wedding-8.jpg` - Svadobné fotky

### Video
- `public/videos/castle-hero.mp4` - Atmosférické video z dronu

## Farebná schéma

| Farba | HEX | Použitie |
|-------|-----|----------|
| Krémová | `#FAF8F5` | Pozadie |
| Bridlicová | `#3D4852` | Sekundárne pozadie |
| Zlatá | `#C9A962` | Akcenty, tlačidlá |
| Zelená | `#4A6741` | Renesančné prvky |
| Tmavá | `#1A1A1A` | Text |

## Funkcie

- ✅ Responzívny dizajn
- ✅ Viacjazyčnosť (SK/EN/DE)
- ✅ Before/After slider pre porovnanie
- ✅ Parallax efekty
- ✅ Animácie pri scrollovaní
- ✅ Sticky header s hamburger menu
- ✅ Kontaktné formuláre
- ✅ Newsletter prihlásenie

## Licencia

© 2025 In Integrum. Všetky práva vyhradené.



