"use client";

// The app's own controls, rebuilt for the website from the design mock-up
// (directive-app/project-docs/design-artifact/directive-horology-mission-control.html), which copies the app exactly:
// the PaceSlider (rail, fill, 21 ticks, knurled gold thumb), the DialGauge (machined bezel, brushed face, 50 ticks,
// six numerals, gold hand) and the pill switch. Styles for the slider live in globals.css (.app-slider and friends).

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const TICKS = Array.from({ length: 21 }, (_, i) => i);

export function AppSlider({
  value,
  min,
  max,
  step,
  disabled,
  onChange,
  label,
  valueText,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  onChange: (v: number) => void;
  label: string;
  valueText?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const t = max > min ? Math.max(0, Math.min(1, (value - min) / (max - min))) : 0;
  const snap = (v: number) => Math.min(max, Math.max(min, Math.round((v - min) / step) * step + min));

  const fromX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 34) return;
    const f = Math.min(1, Math.max(0, (clientX - rect.left - 17) / (rect.width - 34)));
    onChange(snap(min + f * (max - min)));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* not supported */
    }
    fromX(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !dragging.current) return;
    fromX(e.clientX);
  };
  const up = () => {
    dragging.current = false;
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = value + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = value - step;
    else if (e.key === "PageUp") next = value + step * 5;
    else if (e.key === "PageDown") next = value - step * 5;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    if (next == null) return;
    e.preventDefault();
    onChange(snap(next));
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      aria-disabled={disabled ? true : undefined}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={key}
      className={`app-slider ${disabled ? "locked" : "unlocked"}`}
    >
      <div className="app-rail">
        <div className="app-fill" style={{ width: `${t * 100}%` }} />
      </div>
      <div className="app-ticks" aria-hidden>
        {TICKS.map((i) => (
          <i key={i} className={i % 5 === 0 ? "m" : ""} style={{ left: `${(i / 20) * 100}%` }} />
        ))}
      </div>
      <div className="app-thumb" style={{ left: `calc(${t.toFixed(4)} * (100% - 34px))` }} aria-hidden />
    </div>
  );
}

// ── DialGauge (components/DialGauge.tsx, as drawn by the mock-up's dial()) ──
const rad = (a: number) => (a * Math.PI) / 180;
const CX = 60;
const CY = 60;
const R = 51;

// The brushed face: 220 hairlines from the centre, brighter towards the upper left.
const BRUSH = Array.from({ length: 220 }, (_, i) => {
  const a = (i / 220) * 360;
  const hi = Math.pow(Math.max(0, Math.cos(rad(a - 300))), 3);
  return {
    x: +(CX + R * Math.sin(rad(a))).toFixed(2),
    y: +(CY - R * Math.cos(rad(a))).toFixed(2),
    stroke: i % 3 === 0 ? "#0a1230" : "#c9d8f5",
    op: i % 3 === 0 ? 0.35 : +(0.02 + 0.13 * hi + (i % 2 ? 0.02 : 0)).toFixed(3),
  };
});

export function AppDial({
  id,
  label,
  caption,
  delta,
  value,
  min = 0,
  target,
  display,
}: {
  id: string;
  label: string;
  caption: string;
  delta: string;
  value: number;
  min?: number;
  target: number;
  display: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const max = target > min ? target : min + 1;
  const span = max - min;
  const t = Math.max(0, Math.min(1, (value - min) / span));
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduce) {
      setP(t);
      return;
    }
    if (!inView) return;
    const c = animate(0, t, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: setP });
    return () => c.stop();
  }, [inView, reduce, t]);

  const numerals = useMemo(
    () =>
      Array.from({ length: 6 }, (_, m) => {
        const ang = -135 + (m / 5) * 270;
        const raw = min + (m / 5) * span;
        const r1 = Math.round(raw * 10) / 10;
        const txt = span >= 10 || r1 === Math.round(r1) ? String(Math.round(raw)) : raw.toFixed(1);
        return { x: +(CX + 32.5 * Math.sin(rad(ang))).toFixed(2), y: +(CY - 32.5 * Math.cos(rad(ang)) + 2.4).toFixed(2), txt };
      }),
    [min, span],
  );

  const big = display.replace(".", "").length >= 4 || /^[-+−]/.test(display);
  const clip = `appdial-${id}`;

  return (
    <div ref={ref} className="text-center">
      <svg viewBox="0 0 120 120" role="img" aria-label={`${caption}: ${display}`} className="block h-auto w-full" style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.45))" }}>
        <defs>
          <radialGradient id={`${clip}-face`} cx="0.5" cy="0.42" r="0.6">
            <stop offset="0" stopColor="#070d24" />
            <stop offset="0.55" stopColor="#030612" />
            <stop offset="1" stopColor="#010209" />
          </radialGradient>
          <linearGradient id={`${clip}-rim`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E8D5A3" />
            <stop offset="0.5" stopColor="#C5A059" />
            <stop offset="1" stopColor="#8C6D32" />
          </linearGradient>
          <linearGradient id={`${clip}-hub`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d878" />
            <stop offset="0.35" stopColor="#a3812e" />
            <stop offset="0.65" stopColor="#f0d878" />
            <stop offset="1" stopColor="#6b5419" />
          </linearGradient>
          <linearGradient id={`${clip}-hand`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6b5419" />
            <stop offset="0.5" stopColor="#fbeab8" />
            <stop offset="1" stopColor="#a3812e" />
          </linearGradient>
          <clipPath id={`${clip}-clip`}>
            <circle cx="60" cy="60" r={R} />
          </clipPath>
        </defs>
        <circle cx="60" cy="60" r="58" fill="#02040d" />
        <circle cx="60" cy="60" r="56.5" fill="none" stroke={`url(#${clip}-rim)`} strokeWidth="1.5" />
        <circle cx="60" cy="60" r="54.6" fill="none" stroke="#1E2C4A" strokeWidth="0.75" />
        <circle cx="60" cy="60" r={R} fill={`url(#${clip}-face)`} />
        <g clipPath={`url(#${clip}-clip)`}>
          {BRUSH.map((b, i) => (
            <line key={i} x1="60" y1="60" x2={b.x} y2={b.y} stroke={b.stroke} strokeOpacity={b.op} strokeWidth="0.5" />
          ))}
        </g>
        {Array.from({ length: 51 }, (_, k) => {
          const ang = -135 + (k / 50) * 270;
          const major = k % 10 === 0;
          const on = k / 50 <= p + 0.0001 && p > 0;
          const r2 = major ? 39.5 : 42.5;
          return (
            <line
              key={k}
              x1={(CX + 46.5 * Math.sin(rad(ang))).toFixed(2)}
              y1={(CY - 46.5 * Math.cos(rad(ang))).toFixed(2)}
              x2={(CX + r2 * Math.sin(rad(ang))).toFixed(2)}
              y2={(CY - r2 * Math.cos(rad(ang))).toFixed(2)}
              stroke={on ? "#f0d878" : major ? "#CBD5E1" : "#6B7C8E"}
              strokeOpacity={on ? 1 : major ? 0.9 : 0.6}
              strokeWidth={major ? 1.5 : 1}
              strokeLinecap="round"
            />
          );
        })}
        {numerals.map((n, i) => (
          <text key={i} x={n.x} y={n.y} textAnchor="middle" fontWeight="600" fontSize="9" fill="#A0B0C0" style={{ fontFamily: "var(--font-app-mono), monospace" }}>
            {n.txt}
          </text>
        ))}
        <text x="60" y="76" textAnchor="middle" fontSize="6" letterSpacing="1" fill="#9fb0cc" style={{ fontFamily: "var(--font-app-sans), sans-serif" }}>
          {label}
        </text>
        <text x="60" y="103" textAnchor="middle" fontWeight="700" fontSize={big ? 17 : 20} fill="#f0d878" style={{ fontFamily: "var(--font-app-num), sans-serif" }}>
          {display}
        </text>
        <g transform={`rotate(${(-135 + p * 270).toFixed(2)} 60 60)`}>
          <polygon points="60,15 62.3,60 60,66 57.7,60" fill={`url(#${clip}-hand)`} stroke="#5d4519" strokeWidth="0.3" />
          <polygon points="60,15 60,66 57.7,60" fill="#fff6d8" fillOpacity="0.35" />
          <rect x="58.8" y="60" width="2.4" height="9" fill={`url(#${clip}-hand)`} />
        </g>
        <circle cx="60" cy="60" r="4.2" fill={`url(#${clip}-hub)`} stroke="#5d4519" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="1.5" fill="#02040d" />
        <path d="M14 40 A50 50 0 0 1 60 10" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="mt-1.5 font-app text-[12px] leading-tight tracking-[0.05em] text-[#aab5c6] sm:text-[12.5px]">{caption}</p>
      <span className="mt-1 inline-block whitespace-nowrap rounded-full border border-[#8fe0b3]/[0.22] bg-[#8fe0b3]/[0.08] px-2 py-[2px] font-app text-[9px] tracking-[0.04em] text-[#8fe0b3]">
        {delta}
      </span>
    </div>
  );
}

// ── The app's pill switch (.switch): 40 x 22, steel knob off, gold-hi knob on ──
export function AppSwitchKnob({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative h-[22px] w-10 flex-none rounded-full border transition-colors ${on ? "border-[#f0d878] bg-[#d4af37]/25" : "border-[#d4af37]/25 bg-[#1c2030]"}`}
    >
      <span className={`absolute left-[2px] top-[2px] h-4 w-4 rounded-full transition-transform duration-200 ${on ? "translate-x-[18px] bg-[#f0d878]" : "bg-[#aab5c6]"}`} />
    </span>
  );
}

export function MicIcon({ size = 22, color = "#d4af37" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
    </svg>
  );
}

export function PlateIcon({ size = 15, color = "#C5A059" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}
