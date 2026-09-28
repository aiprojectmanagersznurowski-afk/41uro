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

Repo: https://github.com/aiprojectmanagersznurowski-afk/41uro

1. Zaloguj się na [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → Deploy with GitHub**.
2. Wybierz repo `aiprojectmanagersznurowski-afk/41uro`.
3. Ustawienia builda są już w `netlify.toml` (`npm run build`, katalog `dist`) — Netlify wykryje je automatycznie, nic nie trzeba zmieniać.
4. Kliknij **Deploy** — po chwili dostaniesz link `*.netlify.app`. Możesz go zmienić na czytelniejszy w **Site settings → Change site name**.
5. Strona ma nagłówek `noindex`, więc nie trafi do wyszukiwarek — link działa tylko dla osób, które go dostaną.
6. Każdy kolejny `git push` na `main` automatycznie przebuduje i wdroży stronę.

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

Utwór gra w tle strony bez widocznego playera (`src/components/BackgroundAudio.tsx`). Plik: `public/audio/the-commodores-easy.mp3`. Odtwarzanie zaczyna się od 7. sekundy (stała `START_OFFSET`) — utwór ma dłuższe, ciche intro, więc gramy od momentu, gdzie faktycznie "wchodzi" — i wraca do tego miejsca przy każdym zapętleniu, nie do 0:00.

Przeglądarki blokują autoplay dźwięku, dopóki użytkownik nie wejdzie w interakcję ze stroną — logika próbuje puścić muzykę od razu, a jeśli to zablokowane, startuje przy pierwszym dotknięciu/scrollu/kliknięciu. Jedyny widoczny element to mały przycisk wyciszenia w prawym dolnym rogu (bez niego gość nie miałby jak zatrzymać dźwięku). Podmień plik i dane w `src/config/site.ts` (`music`), jeśli zmienisz utwór.

## Efekt scrollowania w hero (`IntroPoster.tsx`)

Ekran powitalny używa GSAP + ScrollTrigger: podczas przewijania tekst rozmywa się i znika, a zdjęcie portretowe rośnie ze swojego małego, blendowanego kształtu do pełnego ekranu, gdzie na końcu pojawia się podpis "Urodziny Michała" + data. Sekcja jest przez ten czas "podpięta" (pin) — to ten sam mechanizm co w referencyjnym `cinematic-landing-hero`, tylko w naszej palecie (terakota/biel) zamiast granatu, i bez telefonu-makiety.

Zdjęcie renderuje się jako **rodzeństwo**, nie dziecko animowanej warstwy tekstu — to celowe: `transform`/`filter` na przodku sprawiłby, że `position: fixed` przestałoby liczyć się względem viewportu (CSS containing-block gotcha), więc zdjęcie nie urosłoby na cały ekran. Przy `prefers-reduced-motion` cały ten mechanizm jest pomijany — zdjęcie zostaje w małym, statycznym kształcie.

## Zdjęcia w tle przy scrollowaniu (`MomentsSection.tsx`)

Dwa dodatkowe kadry (`src/assets/moment-street.jpg`, `moment-cafe.jpg`) wybrane z `/photo` jako najlepiej pasujące do ciepłej palety — odsłaniają się przy wejściu w viewport (IntersectionObserver + lekki ken-burns), bez ciągłego parallaxu, żeby nie obciążać telefonów. Podmień pliki i podpisy w komponencie, jeśli chcesz użyć innych zdjęć z folderu.

## Zdjęcie podglądu linku (Open Graph)

`public/og-image.jpg` — obrazek, który pokaże się przy wklejeniu linku np. na WhatsAppie. Można podmienić na inny kadr.
