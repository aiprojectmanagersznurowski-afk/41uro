import { useEffect, useRef, useState } from "react"

/**
 * Zwraca ref do podpięcia pod element i flagę `visible`, która przełącza się
 * raz (na true), gdy element wjedzie w viewport. Używane do efektu
 * "wjeżdżania" sekcji/zdjęć przy scrollowaniu w dół.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible } as const
}
