// Wszystkie twarde dane wydarzenia w jednym miejscu.

export const event = {
  hostFirstName: "Michała",
  hostName: "Michał",
  age: 41,
  dateLabel: "18.10.2026",
  dateISO: "2026-10-18",
  weekdayLabel: "niedziela",
  timeLabel: "13:00",
  // Europe/Warsaw w połowie października to wciąż czas letni (UTC+2).
  startUTC: "2026-10-18T11:00:00Z",
  endUTC: "2026-10-18T14:00:00Z",
  durationLabel: "ok. 13:00–16:00",
}

export const venue = {
  name: "Restauracja Orzo Wrocław",
  shortName: "Orzo Wrocław",
  address: "Orzo Blu, Wrocław",
  website: "https://orzo.pl/pages/restauracje/blu-wroclaw",
  mapsShortLink: "https://maps.app.goo.gl/4rZrPkexcrXwvhBz8",
  lat: 51.1106021,
  lng: 17.0385687,
}

export const parking = {
  name: "Parking podziemny Plac Nowy Targ",
  mapsShortLink: "https://maps.app.goo.gl/Q6kTQZPbP9uMpPS98",
  lat: 51.1108512,
  lng: 17.0383874,
}

export const kids = {
  text: "Restauracja ma kącik zabaw dla dzieci, więc najmłodsi goście na pewno się nie nudzą.",
  link: "https://orzo.pl/pages/rodziny",
}

export const music = {
  title: "Easy",
  artist: "The Commodores",
  year: "1977",
  src: "/audio/the-commodores-easy.mp3",
}

// Webhook Google Apps Script podpięty pod arkusz z odpowiedziami RSVP.
// Zobacz README.md → sekcja "RSVP" po instrukcję wdrożenia.
export const rsvpEndpoint =
  "https://script.google.com/macros/s/AKfycbxnvLAEVOlFZyTkABDCOPmsqp_0TQuoPq8Aw6WhZ3MHlDDkCz3f4oJ004zdkTv61z6TKA/exec"
