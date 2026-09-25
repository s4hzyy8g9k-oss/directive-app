// Realistic body-weight telemetry, generated deterministically so the
// server and browser render identical charts.

export const MISSION_DAYS = 167; // Jun 1 → Nov 15
export const TODAY = 112; // week 16
export const START_WEIGHT = 207.2;
export const DRY_TODAY = 183.1;
export const TARGET_END = 170.0;
export const FLUID_TODAY = 2.8;

export type Pt = { d: number; v: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Straight prescribed descent that sits 0.8 lb under today's dry mass
// and lands exactly on the target weight at mission end.
export function targetAt(d: number) {
  const atToday = DRY_TODAY - 0.8;
  const slope = (TARGET_END - atToday) / (MISSION_DAYS - TODAY);
  return atToday + slope * (d - TODAY);
}

export function buildTelemetry() {
  const rand = mulberry32(20260601);
  const gauss = () => {
    const u = Math.max(rand(), 1e-9);
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  // Salt-heavy meals, leg days, travel: one-off water events.
  const events: Record<number, number> = { 9: 2.1, 23: 2.8, 38: 1.9, 52: 3.2, 67: 2.3, 81: 2.9, 95: 2.2 };

  const dry: Pt[] = [];
  const raw: Pt[] = [];
  let fluid = 0.4;
  const plateauAt = (d: number) => 0.45 * Math.sin(d / 11);

  for (let d = 0; d <= TODAY; d++) {
    const p = d / TODAY;
    // Faster loss early, gently slowing: how real cuts behave.
    const base = START_WEIGHT - (START_WEIGHT - DRY_TODAY) * (1 - Math.pow(1 - p, 1.35));
    const plateau = plateauAt(d) - plateauAt(TODAY) * p;
    const v = base + plateau;
    dry.push({ d, v });

    const cycle = 1.3 * Math.pow(Math.max(0, Math.sin((2 * Math.PI * (d - 6)) / 28)), 2);
    fluid = fluid * 0.6 + gauss() * 0.45 + (events[d] ?? 0);
    let reading = v + fluid + cycle - 0.6 + gauss() * 0.25;

    if (d === TODAY - 1) reading = v - 0.1;
    if (d === TODAY) reading = v + FLUID_TODAY;
    const skip = d > 0 && d < TODAY - 1 && rand() < 0.13;
    if (!skip) raw.push({ d, v: Math.round(reading * 10) / 10 });
  }

  const last = raw[raw.length - 1];
  const prev = raw[raw.length - 2];
  return {
    dry,
    raw,
    scaleToday: last.v,
    overnightDelta: Math.round((last.v - prev.v) * 10) / 10,
  };
}

// Light smoothing for the fluid envelope so it reads as a band, not a zigzag.
export function smooth(points: Pt[], alpha = 0.45): Pt[] {
  const out: Pt[] = [];
  let s = points[0].v;
  for (const p of points) {
    s = alpha * p.v + (1 - alpha) * s;
    out.push({ d: p.d, v: s });
  }
  // keep the final point honest so the band meets today's spike
  out[out.length - 1] = points[points.length - 1];
  return out;
}

type XY = [number, number];

// Monotone cubic (Fritsch–Carlson) path: smooth with no overshoot.
export function monotonePath(pts: XY[], moveTo = true): string {
  const n = pts.length;
  if (n < 2) return "";
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / dx[i]);
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) {
    if (m[i - 1] * m[i] <= 0) t.push(0);
    else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      t.push((w1 + w2) / (w1 / m[i - 1] + w2 / m[i]));
    }
  }
  t.push(m[n - 2]);
  let d = moveTo ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` : `L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i];
    const c1: XY = [pts[i][0] + h / 3, pts[i][1] + (t[i] * h) / 3];
    const c2: XY = [pts[i + 1][0] - h / 3, pts[i + 1][1] - (t[i + 1] * h) / 3];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${pts[i + 1][0].toFixed(1)},${pts[i + 1][1].toFixed(1)}`;
  }
  return d;
}

// Closed area between two curves sampled at the same x positions.
export function bandPath(upper: XY[], lower: XY[]): string {
  const top = monotonePath(upper);
  const bottom = monotonePath([...lower].reverse(), false);
  return `${top} ${bottom} Z`;
}
