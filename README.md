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

## RSVP — zapisywanie odpowiedzi w Google Sheets

Arkusz: https://docs.google.com/spreadsheets/d/1ljd06eiPPp0FgPYk8ttuylleC5uidW0j7fcHzF-Hucw/edit

Kod webhooka jest gotowy w [`google-apps-script/rsvp-webhook.gs`](google-apps-script/rsvp-webhook.gs). Trzeba go tylko wdrożyć — to jednorazowa czynność w interfejsie Google (Claude nie ma dostępu do Twojego konta Google, więc ten krok robisz Ty):

1. Otwórz arkusz → **Rozszerzenia → Apps Script**.
2. Usuń domyślną zawartość `Code.gs` i wklej w to miejsce całą treść pliku `google-apps-script/rsvp-webhook.gs` z tego repo.
3. Zapisz (ikona dyskietki albo ⌘S).
4. **Wdróż → Nowe wdrożenie**:
   - Typ: **Aplikacja internetowa** (Web app)
   - Wykonaj jako: **Ja**
   - Kto ma dostęp: **Każdy** (Anyone) — inaczej strona zaproszenia nie będzie mogła wysłać danych
5. Kliknij **Wdróż**, zaakceptuj uprawnienia (to Twój własny skrypt, więc Google poprosi o potwierdzenie).
6. Skopiuj URL kończący się na `/exec`.
7. Wklej go jako wartość `rsvpEndpoint` w `src/config/site.ts` (zastępując obecny placeholder), zapisz, zrób nowy build/deploy.

Każda odpowiedź RSVP wyląduje jako nowy wiersz w zakładce „RSVP” tego arkusza (data, imię, obecność, liczba dorosłych/dzieci, uwagi).

Jeśli kiedyś zmienisz treść skryptu w Apps Script, trzeba zrobić **Wdróż → Zarządzaj wdrożeniami → ✏️ → Nowa wersja**, żeby zmiany poszły na już opublikowany URL.

## Dodaj do kalendarza

- **Apple / inne** — generuje i otwiera plik `.ics` (`src/lib/calendar.ts`).
- **Android / Google** — link do Kalendarza Google z gotowym wydarzeniem.

Czas wydarzenia w `site.ts` jest zapisany w UTC (`startUTC`/`endUTC`) — w połowie października Polska jest wciąż w czasie letnim (UTC+2), więc 13:00 lokalnie = 11:00 UTC.

## Muzyka

Własny odtwarzacz mp3 zamiast osadzonego Spotify — nie każdy gość musi mieć konto/appkę Spotify. Plik: `public/audio/the-commodores-easy.mp3`, ładowany leniwie (dopiero po kliknięciu Play). Podmień plik i dane w `src/config/site.ts` (`music`), jeśli zmienisz utwór.

## Zdjęcie podglądu linku (Open Graph)

`public/og-image.jpg` — obrazek, który pokaże się przy wklejeniu linku np. na WhatsAppie. Można podmienić na inny kadr.
