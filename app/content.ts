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
  headline: "Most diets don't fail on willpower. They fail on bad math.",
  subhead:
    "Three measurement errors quietly undo months of good work. Directive is an adaptive metabolic flight computer that separates fluid noise from true tissue, calculates burn with strict Net-MET math, and replaces tracking neurosis with 5-second rapid entry.",
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
  heading: "Three measurement errors. Every one of them fixable.",
  intro: "None of these are willpower failures. They're bad inputs — and they compound against each other.",
  items: [
    {
      kind: "calories" as const,
      title: "Your watch overestimates your burn",
      body: "A 60-minute lift gets logged as 600 kcal. Subtract your natural resting burn and rest between sets, and it's closer to 225. Eat back the phantom difference and your deficit is gone.",
    },
    {
      kind: "water" as const,
      title: "That overnight spike isn't fat",
      body: "Salt, heavy training, or hormonal shifts can hold up to 4 lb of water overnight — and almost nobody's trained to tell the difference. Directive's Kalman filter decouples fluid swings from true dry mass, so you never cut food to fix a problem you don't have.",
    },
    {
      kind: "scale" as const,
      title: "Weighing almonds is not a plan",
      body: "Measuring 14 grams at a time works for a few weeks, then the cognitive drag sets in and people quit. Precision doesn't require a digital prison — rapid entry and visual meal selection get you logged in under ten seconds.",
    },
  ],
};

export const pillars = {
  heading: "Built around how bodies actually behave",
  intro: "Not a calorie ledger. A dynamic model of your body under training, stress, and restriction.",
  items: [
    {
      title: "The Fuel Event Buffer",
      body: "Real life happens. Instead of blowing the diet on a Saturday night and staring at a red failure screen, engage the Fuel Event Buffer. Directive shaves a small, unnoticeable amount off the preceding days and banks it for your event, so your weekly deficit stays intact.",
    },
    {
      title: "The Rebound Shield",
      body: "Hitting your goal weight is only half the flight — landing without bouncing is the hard part. When you reach your target, Directive systematically walks your calories back up to find true maintenance, preventing the rapid regain that follows most diets.",
    },
    {
      title: "Keep the muscle you've built",
      body: "In a deep deficit, or on a GLP-1 medication that blunts appetite, the risk of muscle loss spikes. Directive monitors your daily protein floor and flags structural loss risk before your metabolism slows.",
    },
    {
      title: "Built for adults, not for streaks",
      body: "No guilt, no mid-day nags asking if you drank water. A missed log becomes a quiet late-evening badge, not an alert. Take a week off and Directive enters standby — no alarms, no scolding.",
    },
    {
      title: "Speak your doctor's language",
      body: "Stop handing your clinician a messy 40-page diary dump. Directive compiles your lean-mass trends, trajectory, and vitals into a clean PDF briefing in about 30 seconds.",
    },
    {
      title: "The Afterburner Protocol",
      body: "For deadline-driven targets — a shoot, an event, a hard calendar date. A temporary, aggressive deficit override for a short, sharp drop. Like a real afterburner, it can't run indefinitely, and Directive keeps it time-capped.",
      badge: "Pro",
    },
  ],
};

export const stations = {
  heading: "Five stations. One coherent trajectory.",
  intro: "Everything Directive tracks routes through a dedicated instrument panel.",
  items: [
    {
      id: "fuel",
      name: "Fuel",
      body: "Agnostic energy balancing. Hit your calorie ceiling, lock in your protein floor, and use rapid entry with visual meal selection to log your day in seconds.",
    },
    {
      id: "altimeter",
      name: "Altimeter",
      body: "Kalman-smoothed trend telemetry. Daily scale readings decoupled from fluid swings to reveal your true dry-mass descent.",
    },
    {
      id: "cruise",
      name: "Cruising Altitude",
      body: "Runway management. Dynamic pacing toward your touchdown date, Fuel Event Buffers, and automated Rebound Shield handling once you land.",
    },
    {
      id: "burn",
      name: "Burn",
      body: "True net energy expenditure. Resistance load tracking and conservative step baselines that keep cardio from competing with strength gains.",
    },
    {
      id: "briefing",
      name: "Flight Briefing",
      body: "Your weekly directive. An objective telemetry audit that diagnoses actual vs. expected loss and sets your exact parameters for the week ahead.",
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
    question: "What's your primary mission?",
    options: [
      "Lose fat, keep muscle",
      "Protect muscle on GLP-1 or a deep deficit",
      "Recomp for athletic training",
      "Add muscle in a lean bulk",
    ],
  },
  step2: {
    question: "What disrupts your flight plan the most?",
    hint: "Choose up to two.",
    max: 2,
    options: [
      "Seeing the scale move the wrong way frustrates me",
      "My weight loss plateaus even when I'm working hard",
      "The tedious effort of tracking every detail of my food",
      "Severe diet fatigue and burnout from chronic restriction",
      "Losing the weight, only to rapidly regain it after",
    ],
  },
  step3: {
    question: "What's the biggest failure of your current fitness app?",
    options: [
      "Raw data and charts, but no actionable direction",
      "It punishes me with broken streaks and guilt",
      "Every day is treated the same — no planning for real life",
      "I have to dig through endless food databases to log a meal",
    ],
  },
  step4: {
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
