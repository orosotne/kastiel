# Fotky obnovy kaštieľa

## Štruktúra

Obrázky sú v `public/images/phoenix/restoration/` a rozdelené do troch kategórií v `restoration-photos.json`:

1. **KPO** – Kaštieľ pred obnovou
2. **KP** – Kaštieľ počas obnovy
3. **ZPO** – Záhrada počas obnovy

## Pomenovanie súborov

Do galérie sa zobrazujú **iba** súbory pomenované podľa kategórie: `KPO (1).webp`, `KP (2).webp`, `ZPO (3).webp` atď. Ostatné súbory sa ignorujú.

## Ako pridať fotky

1. Premenuj obrázky na `KPO (n).webp`, `KP (n).webp` alebo `ZPO (n).webp` (n = číslo)
2. Ulož ich do `public/images/phoenix/restoration/`
3. Oprav orientáciu v editore obrázkov (alebo spusti `npm run fix-restoration-orientation`)
4. Pridaj názvy súborov do príslušných polí v `restoration-photos.json`:

```json
{
  "categories": {
    "KPO": ["súbor1.webp", "súbor2.webp"],
    "KP": ["súbor3.webp", "súbor4.webp"],
    "ZPO": ["súbor5.webp", "súbor6.webp"]
  }
}
```

Poradie v poli určuje poradie zobrazenia v galérii.
