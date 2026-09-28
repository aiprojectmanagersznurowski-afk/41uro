import { event, venue } from "../config/site"

const summary = `${event.age}. urodziny ${event.hostName} 🎉`
const description =
  `Rodzinny obiad z okazji ${event.age}. urodzin ${event.hostFirstName}. ` +
  `Restauracja ${venue.shortName}, start ${event.timeLabel}.`
const location = `${venue.name}`

function toICSDate(iso: string) {
  // 2026-10-18T11:00:00Z -> 20261018T110000Z
  return iso.replace(/[-:]/g, "")
}

function escapeICS(text: string) {
  return text.replace(/([,;])/g, "\\$1")
}

function buildICS() {
  const uid = `41-urodziny-michala-${event.dateISO}@rsvp.local`
  const dtstamp = toICSDate(new Date().toISOString().split(".")[0] + "Z")

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//41 urodziny Michala//RSVP//PL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${toICSDate(event.startUTC)}`,
    `DTEND:${toICSDate(event.endUTC)}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    `URL:${venue.website}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return lines.join("\r\n")
}

/**
 * Otwiera plik .ics w bieżącej karcie. Na iOS/Safari system rozpoznaje typ
 * MIME i proponuje bezpośrednio dodanie wydarzenia do Kalendarza Apple.
 * Na Androidzie/desktopie plik zostaje pobrany i można go otworzyć dowolną
 * aplikacją kalendarza (Kalendarz Google odczyta go bez problemu).
 */
export function openAppleCalendar() {
  const ics = buildICS()
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "41-urodziny-michala.ics"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

/**
 * Link do Kalendarza Google z gotowym wydarzeniem — najpewniejsza ścieżka
 * na Androidzie (i działa tak samo dobrze na komputerze).
 */
export function googleCalendarUrl() {
  const dates = `${toICSDate(event.startUTC)}/${toICSDate(event.endUTC)}`
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: summary,
    dates,
    details: description,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
