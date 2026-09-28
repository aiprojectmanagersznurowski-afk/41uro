import { useState, type FormEvent } from "react"
import { event, rsvpEndpoint } from "../config/site"
import { googleCalendarUrl, openAppleCalendar } from "../lib/calendar"

type Attending = "yes" | "no" | null

export function RsvpSection() {
  const [attending, setAttending] = useState<Attending>(null)
  const [name, setName] = useState("")
  const [adults, setAdults] = useState(2)
  const [kidsCount, setKidsCount] = useState(0)
  const [note, setNote] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  const canSubmit = attending !== null && name.trim().length > 1

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus("sending")

    const payload = {
      name: name.trim(),
      attending,
      adults: attending === "yes" ? adults : 0,
      kids: attending === "yes" ? kidsCount : 0,
      note: note.trim(),
      submittedAt: new Date().toISOString(),
    }

    try {
      if (rsvpEndpoint) {
        // text/plain unika CORS-preflightu, którego Google Apps Script web
        // app nie obsługuje — treść i tak jest poprawnym JSON-em i tak jest
        // parsowana po stronie skryptu (e.postData.contents).
        await fetch(rsvpEndpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        })
      }
      setStatus("done")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return <SuccessState name={name} attending={attending} />
  }

  return (
    <section className="flex flex-col items-center px-6 py-14">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-terracotta-deep">Potwierdź obecność</div>
      <h2 className="mt-2 text-balance text-center font-display text-[28px] font-extrabold uppercase leading-tight text-ink">
        Będziesz z nami?
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-4 rounded-[24px] border border-line bg-paper p-6">
        <div className="grid grid-cols-2 gap-3">
          <ChoiceButton active={attending === "yes"} onClick={() => setAttending("yes")} label="Będę 🎉" />
          <ChoiceButton active={attending === "no"} onClick={() => setAttending("no")} label="Nie dam rady" />
        </div>

        <Field label="Imię i nazwisko">
          <input
            id="rsvp-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="np. Ciocia Basia"
            className="w-full rounded-[12px] border border-line bg-bg px-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-terracotta"
            required
          />
        </Field>

        {attending === "yes" && (
          <div className="grid grid-cols-2 gap-3">
            <Stepper label="Dorośli" value={adults} onChange={setAdults} min={1} />
            <Stepper label="Dzieci" value={kidsCount} onChange={setKidsCount} min={0} />
          </div>
        )}

        <Field label="Uwagi (opcjonalnie)">
          <textarea
            id="rsvp-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="np. dieta, alergie"
            rows={2}
            className="w-full resize-none rounded-[12px] border border-line bg-bg px-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-terracotta"
          />
        </Field>

        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="mt-1 rounded-[14px] bg-terracotta px-5 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          {status === "sending" ? "Wysyłanie…" : "Wyślij odpowiedź"}
        </button>

        {status === "error" && (
          <p className="text-center text-[12.5px] text-terracotta-deep">
            Coś poszło nie tak. Spróbuj jeszcze raz albo napisz bezpośrednio do Michała.
          </p>
        )}
      </form>
    </section>
  )
}

function ChoiceButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[14px] border px-4 py-3 text-[14px] font-bold transition-colors ${
        active ? "border-terracotta bg-terracotta text-white" : "border-line bg-bg text-ink"
      }`}
    >
      {label}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-muted">
      {label}
      {children}
    </label>
  )
}

function Stepper({
  label,
  value,
  onChange,
  min,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
}) {
  return (
    <div className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-muted">
      {label}
      <div className="flex items-center justify-between rounded-[12px] border border-line bg-bg px-2 py-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink"
          aria-label={`Mniej: ${label}`}
        >
          −
        </button>
        <span className="text-[15px] font-bold text-ink">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink"
          aria-label={`Więcej: ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function SuccessState({ name, attending }: { name: string; attending: Attending }) {
  const firstName = name.trim().split(/\s+/)[0] || "Ty"
  const message =
    attending === "yes"
      ? `Dzięki, ${firstName}! Do zobaczenia ${event.dateLabel} 🎉`
      : `Dzięki za informację, ${firstName}. Będzie nam Ciebie brakować!`

  return (
    <section className="flex flex-col items-center gap-5 px-6 py-20 text-center">
      <SuccessBurst />
      <h2 className="max-w-xs text-balance font-display text-[26px] font-extrabold uppercase leading-tight text-ink">
        {message}
      </h2>
      {attending === "yes" && (
        <div className="flex w-full max-w-xs gap-3">
          <button
            type="button"
            onClick={openAppleCalendar}
            className="flex-1 rounded-[12px] border border-line bg-paper px-3 py-3 text-[13px] font-bold text-ink"
          >
            Apple
          </button>
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-[12px] border border-line bg-paper px-3 py-3 text-center text-[13px] font-bold text-ink"
          >
            Android / Google
          </a>
        </div>
      )}
    </section>
  )
}

function SuccessBurst() {
  const dots = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const dist = 60 + ((i * 37) % 40)
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist - 10,
      delay: (i % 5) * 0.03,
      terracotta: i % 2 === 0,
    }
  })

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-terracotta text-white" style={{ animation: "success-pop .5s cubic-bezier(.3,1.6,.5,1) both" }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: d.terracotta ? "var(--color-terracotta)" : "var(--color-khaki-deep)",
            animation: `success-burst .8s ${d.delay}s cubic-bezier(.15,.7,.3,1) both`,
            // @ts-expect-error custom props
            "--dx": `${d.dx}px`,
            "--dy": `${d.dy}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes success-pop { from { transform: scale(0) rotate(-15deg); opacity:0 } to { transform: scale(1) rotate(0); opacity:1 } }
        @keyframes success-burst { from { transform: translate(0,0) scale(1); opacity:1 } to { transform: translate(var(--dx), var(--dy)) scale(0); opacity:0 } }
        @media (prefers-reduced-motion: reduce) {
          [style*="success-pop"], [style*="success-burst"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </div>
  )
}
