# 41. urodziny Michała — zaproszenie

Jednostronicowa aplikacja (Vite + React + TypeScript + Tailwind CSS v4), mobile-first.

## Rozwój lokalny

```bash
npm install
npm run dev
```

## Build produkcyjny

```bash
npm run build   # -> dist/
npm run preview # podgląd builda lokalnie
```

## Wdrożenie na Netlify

1. Wypchnij repo na GitHub (lub użyj `netlify deploy` z CLI).
2. W Netlify: **Add new site → Import from Git**, wybierz repo.
3. Ustawienia builda są już w `netlify.toml` (`npm run build`, katalog `dist`) — Netlify wykryje je automatycznie.
4. Po wdrożeniu strona ma nagłówek `noindex`, więc nie trafi do wyszukiwarek — link działa tylko dla osób, które go dostaną.

## Dane wydarzenia

Wszystkie twarde dane (data, godzina, adresy, linki) są w jednym miejscu:
`src/config/site.ts`

## RSVP — zapisywanie odpowiedzi

Formularz obecnie nie wysyła danych nigdzie (`rsvpEndpoint` w `site.ts` jest pusty) — pokazuje tylko stan sukcesu.
Żeby faktycznie zbierać odpowiedzi:

1. Najprościej: **Google Sheets + Google Apps Script** jako webhook przyjmujący POST z JSON-em.
2. Wklej URL webhooka do `rsvpEndpoint` w `src/config/site.ts`.
3. Alternatywy: Formspree, Supabase, Airtable + Zapier.

## Dodaj do kalendarza

- **Apple / inne** — generuje i otwiera plik `.ics` (`src/lib/calendar.ts`).
- **Android / Google** — link do Kalendarza Google z gotowym wydarzeniem.

Czas wydarzenia w `site.ts` jest zapisany w UTC (`startUTC`/`endUTC`) — w połowie października Polska jest wciąż w czasie letnim (UTC+2), więc 13:00 lokalnie = 11:00 UTC.

## Zdjęcie podglądu linku (Open Graph)

`public/og-image.jpg` — obrazek, który pokaże się przy wklejeniu linku np. na WhatsAppie. Można podmienić na inny kadr.
