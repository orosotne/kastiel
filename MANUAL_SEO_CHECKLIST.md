# Manuálne SEO úlohy – top 3 v 1 mesiaci

Zoznam vecí, ktoré musíš spraviť sám (nie v kóde). Odporúčaný poriadok podľa týždňov.

---

## Týždeň 1 – Základ (okamžite)

- [ ] **Google Business Profile (GBP)**
  - Overiť/registrovať profil na [business.google.com](https://business.google.com).
  - Nastaviť jednotný NAP: **Renesančný kaštieľ Bošany**, SNP 113/1, 956 18 Bošany, +421 907 726 726.
  - Kategórie: „Svadobný priestor“, „Historická pamiatka“, „Galéria“.
  - Doplniť fotky priestorov, exteriéru, svadobných momentov.
  - Pridať úvodný príspevok (napr. otvorenie, služby).

- [ ] **NAP konzistentnosť**
  - Overiť, že na webe, v štruktúrovaných údajoch a v GBP je rovnaký názov, adresa a telefón.

- [ ] **IndexNow**
  - Vygenerovať kľúč na [indexnow.org](https://www.indexnow.org/), uložiť do `public/{key}.txt`.
  - Spustiť: `INDEXNOW_KEY=tvoj_key npm run indexnow` (alebo odoslať URL cez ich webový formulár).

- [ ] **Google Search Console**
  - Overiť vlastníctvo domény rkb.sk.
  - Odoslať sitemap: `https://rkb.sk/sitemap.xml`.

---

## Týždeň 2 – Katalógy a základné backlinky

- [ ] **Registrácia v katalógoch (NAP všade rovnaký)**
  - [Firmy.sk](https://www.firmy.sk) – vytvorenie/aktualizácia profilu.
  - [slovakia.travel](https://www.slovakia.travel) – ak je možné registrovať pamiatku/lokáciu.
  - TripAdvisor – pridanie ako turistickej lokality.
  - Yelp – ak je dostupný pre Slovensko.
  - Regionálne portály – napr. regiony.sk, turizmus Partizánske/Bošany.

- [ ] **Ďalšie backlinky**
  - Lokálne médiá – napísať tlačovú správu k otvoreniu/obnove kaštieľa a poslať novinárom.
  - Wikipedia – pridať odkaz na kaštieľ v príslušnom článku (Bošany, Partizánske, renesančné kaštiele).

---

## Týždeň 3 – Recenzie, obsah, príspevky

- [ ] **Recenzie v GBP**
  - Systematicky žiadať recenzie od svadobných párov a návštevníkov (krátky link na hodnotenie).

- [ ] **Príspevky v GBP**
  - Pravidelné príspevky (napr. 1–2× týždenne): fotky, novinky, podujatia, otváracie hodiny.

- [ ] **Obsah na webe**
  - Skontrolovať dĺžku textov na Príbeh, Svadby, Galéria – ak je menej ako ~300–500 slov, doplniť relevantný text s kľúčovými slovami.

- [ ] **Ďalšie backlinky**
  - Osloviť partnerov: svadobní fotografovia, catereri, kvety – vzájomné odkazy.

---

## Týždeň 4 – Optimalizácia a sledovanie

- [ ] **Event schema**
  - Ak sú plánované podujatia (vernisáže, koncerty), doplniť ich do poľa `upcomingEvents` v `src/components/StructuredData.tsx` (názov, dátum v ISO formáte).

- [ ] **Easy SEO (voliteľne, ~3 €/mesiac)**
  - Aktivovať WebSupport Easy SEO pre sledovanie pozícií kľúčových slov a porovnanie s konkurenciou.

- [ ] **LLM/AI optimalizácia**
  - llms.txt je na webe; pri zmene obsahu aktualizovať dátum „Posledná aktualizácia“ v `public/llms.txt`.
  - Pri rozšírení textov používať formát otázka–odpoveď (podobne ako FAQ).

- [ ] **Sledovanie**
  - V Google Search Console sledovať impresie, kliky a pozície pre „svadby Bošany“, „kaštieľ Bošany“, „Partizánske svadby“.
  - V GBP sledovať zobrazenia, interakcie a objednávky.

---

## Kľúčové slová na monitorovanie

| Kľúčové slová (SK)            | Cieľová stránka |
|-------------------------------|-----------------|
| svadby Bošany                 | /svadby         |
| kaštieľ Bošany                | domov, /pribeh  |
| svadobný priestor Partizánske | /svadby         |
| renesančný kaštieľ Bošany     | domov, /pribeh  |
| galéria kaštieľ Bošany        | /galeria        |
| história kaštieľa Bošany      | /pribeh         |
| kontakt kaštieľ Bošany        | /kontakt        |

---

## Čo už je v kóde (nemusíš riešiť)

- Sitemap, Image sitemap, robots.txt, llms.txt
- Štruktúrované údaje (LocalBusiness, FAQ, Breadcrumb, Event pri zadaní podujatí)
- Meta title/description pre Galériu, Príbeh, Kontakt, Svadby
- Interné prepojenia, alt texty obrázkov
- IndexNow skript: `npm run indexnow` (po vytvorení kľúča)
