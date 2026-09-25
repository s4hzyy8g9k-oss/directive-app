// ─────────────────────────────────────────────────────────────
// ALL SITE COPY LIVES HERE.
// Drop the marketing team's messaging into these fields; the
// layout and animation read from this file and won't need edits.
// ─────────────────────────────────────────────────────────────

export const nav = {
  status: "Charter intake open",
  links: [
    { href: "#how-it-works", label: "How it works" },
    { href: "#physiology", label: "Physiology" },
    { href: "#stations", label: "The app" },
  ],
  cta: "Apply for Charter access",
};

export const hero = {
  kicker: "2026 Charter intake",
  headline: "The scale says you gained 2.8 pounds. Your body says you didn't.",
  subhead:
    "Directive separates water from real tissue change, corrects inflated workout calories, and logs a meal in ten seconds. You stop reacting to noise and stay on course.",
  primaryCta: "Apply for Charter access",
  secondaryCta: "See the app",
};

// Captions for the hero animation, in order. Each plays as one step.
export const demoSteps = [
  {
    title: "Sixteen weeks of weigh-ins",
    body: "Every morning reading, exactly as your scale reported it.",
  },
  {
    title: "Tuesday: up 2.8 lb overnight",
    body: "A normal app calls this a setback. Most people cut calories in a panic.",
  },
  {
    title: "Directive reads it as water",
    body: "Salt, a hard leg day, or your cycle. The cyan band is fluid, not fat.",
  },
  {
    title: "Your real trend is intact",
    body: "True dry mass: 183.1 lb, within 0.8 lb of plan. Nothing to fix.",
  },
  {
    title: "Touchdown, on schedule",
    body: "Projected 170.0 lb by Nov 15. Keep flying the plan.",
  },
];

export const traps = {
  heading: "Most diets don't fail on willpower. They fail on bad math.",
  intro: "Three measurement errors quietly undo months of good work.",
  items: [
    {
      kind: "calories" as const,
      title: "Your watch over-credits your workout",
      body: "A 60-minute lift gets logged as 600 kcal. Subtract what you'd have burned sitting still and rest between sets, and it's closer to 225. Eat back the difference and your deficit is gone.",
    },
    {
      kind: "water" as const,
      title: "Water looks like failure",
      body: "Salt, heavy training, or hormonal shifts can hold up to 4 lb of water overnight. Directive shows that swing for what it is, so you never cut food to fix a problem you don't have.",
    },
    {
      kind: "scale" as const,
      title: "Weighing almonds is not a plan",
      body: "Measuring 14 grams at a time works for a few weeks, then people quit. Directive's portion grid gets you within about 5% in under ten seconds.",
    },
  ],
};

export const pillars = {
  heading: "Built around how bodies actually behave",
  intro: "Not a calorie ledger. A model of your body under training, stress, and restriction.",
  items: [
    {
      title: "Never diet against your cycle",
      body: "Progesterone can hold water through the luteal phase and distort the scale for days. Directive separates that monthly swing from real tissue loss, so your plan stays calm and objective.",
    },
    {
      title: "Keep the muscle you've built",
      body: "In a deep deficit, or on a GLP-1 medication that blunts appetite, Directive watches your protein floor and flags muscle-loss risk before your metabolism slows.",
    },
    {
      title: "Accurate without the food scale",
      body: "A 6×6 portion grid for solids and liquids replaces barcodes and gram counting. Tap what you ate and move on with your day.",
    },
    {
      title: "Workouts counted conservatively",
      body: "Every session is logged net of your resting burn, so a hard day never inflates what you think you can eat.",
    },
  ],
};

export const stations = {
  heading: "Three instruments. One flight plan.",
  intro: "Everything in Directive lives on one of three screens.",
  items: [
    {
      id: "mission",
      name: "Mission Control",
      body: "Your true trend, your target runway, and your weekly dials on one screen. Zoom from one week to the whole mission.",
    },
    {
      id: "fuel",
      name: "Fuel Station",
      body: "Tap portions on the grid and watch the estimate update live. Log a full meal in about ten seconds. Try it.",
    },
    {
      id: "burn",
      name: "Burn Station",
      body: "Log a workout at low, medium, or high effort. Resting burn is subtracted automatically. Try it.",
    },
  ],
};

export const finalCta = {
  heading: "Stop steering by the scale.",
  body: "Charter members get early access, founding pricing, and a direct line to the team shaping Directive.",
  cta: "Apply for Charter access",
};

export const modal = {
  step1: {
    question: "What's your main goal?",
    options: ["Lose fat and keep muscle", "Protect muscle on a GLP-1 or deep deficit", "Recomp and fuel for training"],
  },
  step2: {
    question: "What gets in your way most?",
    options: ["Scale swings make me panic", "My deficit stalls even when I train", "Tracking food burns me out"],
  },
  step3: {
    heading: "Where should we send your access?",
    body: "We'll reserve your place in the 2026 Charter intake.",
    placeholder: "you@email.com",
    button: "Submit application",
  },
  done: {
    heading: "Application received",
    body: "Your place in the 2026 Charter intake is reserved. Watch your inbox.",
  },
};

export const footer = {
  badges: ["Apple Health integration", "Google Health Connect ready", "Your data is never sold"],
  disclaimer:
    "Directive is an educational body-composition estimation tool. It is not a medical device and does not provide medical advice.",
};
