function isIOS() {
  if (typeof navigator === "undefined") return false
  return /iP(hone|od|ad)/.test(navigator.userAgent)
}

/**
 * Zwraca deep link do nawigacji pod dany punkt. Na iOS kieruje do Apple Maps
 * (uniwersalny link https, obsługiwany też jako otwarcie aplikacji), na
 * pozostałych platformach do Google Maps z gotową trasą.
 */
export function directionsUrl(lat: number, lng: number) {
  if (isIOS()) {
    return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
}
