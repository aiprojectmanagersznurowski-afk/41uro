/**
 * Webhook zapisujący odpowiedzi RSVP do arkusza Google Sheets.
 *
 * Instrukcja wdrożenia — patrz README.md w tym repo, sekcja "RSVP".
 * Skrót:
 *  1. Otwórz arkusz -> Rozszerzenia -> Apps Script.
 *  2. Wklej ten plik (zastąp domyślną zawartość Code.gs).
 *  3. Wdróż -> Nowe wdrożenie -> typ "Aplikacja internetowa".
 *     - Wykonaj jako: Ja
 *     - Kto ma dostęp: Każdy
 *  4. Skopiuj URL wdrożenia (kończy się na /exec) do src/config/site.ts
 *     (stała rsvpEndpoint).
 */

const SHEET_NAME = "RSVP"

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(["Data zgłoszenia", "Imię i nazwisko", "Obecność", "Dorośli", "Dzieci", "Uwagi"])
    sheet.setFrozenRows(1)
  }

  const data = JSON.parse(e.postData.contents)

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.attending === "yes" ? "Będzie" : "Nie da rady",
    data.adults ?? "",
    data.kids ?? "",
    data.note || "",
  ])

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  )
}

// Ułatwia szybki test wdrożenia z przeglądarki (otwarcie URL /exec w GET).
function doGet() {
  return ContentService.createTextOutput("RSVP webhook działa. Wysyłaj żądania POST.")
}
