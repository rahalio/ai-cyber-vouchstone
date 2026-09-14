import { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { signIn } from "@/lib/session";

function SealBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#12263a" stopOpacity="0" />
          <stop offset="100%" stopColor="#0b1c2c" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#0b1c2c" />
      <circle cx="860" cy="340" r="250" fill="none" stroke="#d2c4a8" strokeOpacity="0.18" strokeWidth="1.2" />
      <circle cx="860" cy="340" r="188" fill="none" stroke="#c4a574" strokeOpacity="0.28" strokeWidth="1" />
      <circle cx="860" cy="340" r="120" fill="none" stroke="#9b2c2c" strokeOpacity="0.45" strokeWidth="1.4" />
      <path
        d="M740 250 C790 210 930 220 980 300 C1000 360 940 430 860 440 C780 430 730 360 740 250"
        fill="none"
        stroke="#d2c4a8"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <path
        d="M820 300 L848 360 L890 250"
        fill="none"
        stroke="#9b2c2c"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <line x1="860" y1="120" x2="860" y2="560" stroke="#8aa0b5" strokeOpacity="0.12" />
      <line x1="640" y1="340" x2="1080" y2="340" stroke="#8aa0b5" strokeOpacity="0.12" />
      <rect width="1200" height="800" fill="url(#vignette)" />
    </svg>
  );
}

export function LoginPage() {
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn();
    navigate("/");
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      <SealBackdrop />
      <div className="relative z-10 mx-auto flex min-h-full max-w-3xl flex-col justify-end px-6 pb-16 pt-20 sm:px-10 md:justify-center">
        <BrandMark className="animate-seal text-5xl sm:text-7xl" wordmarkClassName="tracking-[0.08em]" />
        <h1 className="mt-6 max-w-xl font-display text-2xl leading-snug text-[color:var(--color-parchment)] sm:text-3xl">
          Confidence only as high as the evidence
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-muted)]">
          A notarised cyber-assurance ledger. Scores sit under glass only as high as their valid vouchers, and amber
          appears when the seal is due to fail.
        </p>
        <form onSubmit={onSubmit} className="mt-10 max-w-sm space-y-4">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Operator email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              defaultValue="elena.vazquez@hidroatlantico.es"
              className="mt-1 w-full border border-[color:var(--color-rule)] bg-[color:var(--color-ink)] px-3 py-2 text-[color:var(--color-parchment)] outline-none focus:border-[color:var(--color-brand)]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Password
            </span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              defaultValue="ledger"
              className="mt-1 w-full border border-[color:var(--color-rule)] bg-[color:var(--color-ink)] px-3 py-2 text-[color:var(--color-parchment)] outline-none focus:border-[color:var(--color-brand)]"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-[color:var(--color-brand)] px-4 py-2.5 font-display text-[color:var(--color-ink)] transition-opacity duration-[var(--motion-seal)] hover:opacity-90"
          >
            Enter the ledger
          </button>
        </form>
      </div>
    </div>
  );
}
