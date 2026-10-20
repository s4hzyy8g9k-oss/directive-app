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
    "Three measurement errors can quietly undo months of good work. Directive separates water weight from your real trend, counts only the calories a workout burns beyond your resting metabolic rate, and lets you log a meal in seconds.",
  primaryCta: "Apply for Charter access",
  secondaryCta: "See the app",
  sampleNote: "Illustration with sample data.",
};

// Captions for the hero animation, in order. Each plays as one step.
export const demoSteps = [
  {
    title: "Sixteen weeks of weigh-ins",
    body: "Every morning reading, exactly as your scale reported it, noise and all.",
  },
  {
    title: "Tuesday: up 2.8 lb overnight",
    body: "A normal app calls this a setback. Most people cut calories in a panic.",
  },
  {
    title: "Directive flags it as likely water",
    body: "Salt, a hard leg day or your cycle. Our smoothing algorithm reads the jump as water, not fat.",
  },
  {
    title: "Your real trend is intact",
    body: "Smoothed and predicted from every weigh-in: 183.1 lb, within 0.8 lb of plan. Nothing to fix.",
  },
  {
    title: "Projected touchdown",
    body: "At this pace, touchdown at 170.0 lb is projected for November 15.",
  },
];

export const traps = {
  heading: "Three measurement errors. Every one of them fixable.",
  intro: "None of these are willpower failures. They're bad inputs, and they compound.",
  items: [
    {
      kind: "calories" as const,
      title: "Your watch can overestimate your burn",
      body: "An example: a watch logs a 60-minute medium lift as 420 kcal. About 80 kcal of that you would have burned at rest anyway, and the watch also counts the rest between sets as hard work, so the workout itself burned about 205 kcal beyond your resting metabolic rate. Eat back the full 420 and your deficit shrinks.",
    },
    {
      kind: "water" as const,
      title: "That overnight spike isn't fat",
      body: "Salt, heavy training, or hormonal shifts can move the scale by several pounds overnight, and it is hard to distinguish water weight from fat by eye. Directive's trend filter separates likely water swings from your underlying trend, so you can see a spike for what it is before you cut calories to fix it.",
    },
    {
      kind: "scale" as const,
      title: "Weighing almonds is not a plan",
      body: "Measuring 14 grams at a time works for a few weeks, then the cognitive drag sets in and people quit. Precision doesn't require being locked in a digital prison. Log a meal by hand: a palm of protein, a fist of carbohydrate, a thumb of fat, in seconds. Flag a restaurant meal with one switch.\n\nOr try Precision tracking: save a meal you eat often and add it with one tap. Take a snapshot of a recipe, tweak it if you like, and Directive works out the macros for a serving, so you can eat it all week without complicated logging. Or just say what you ate.",
    },
  ],
};

export const pillars = {
  heading: "Built around how bodies actually behave",
  intro: "Not a calorie ledger. A dynamic model of your body under training, stress, and restriction.",
  items: [
    {
      title: "The Event Allowance",
      body: "Real life happens. Instead of blowing your diet on a Saturday night and staring at a red failure notice, schedule an Event Allowance. Directive takes a small amount off the days before and adds it to your event day, so the week still adds up. Your calorie floors always come first.",
    },
    {
      title: "The Rebound Shield",
      body: "Hitting your goal weight is only half the flight. Landing without bouncing is the hard part. When you reach your target, Directive walks your calories back up over six weeks to find your maintenance level, a transition designed to help you avoid the rapid regain that follows most strict diets.",
    },
    {
      title: "Protein comes first",
      body: "In a deep deficit, or while using a GLP-1 medication, holding on to muscle gets harder. Directive sets a protein floor for every day and raises it when you cut aggressively or use a GLP-1 medication. Protein and fat floors come first; carbohydrates fill what is left.",
    },
    {
      title: "Built for adults, not for streaks",
      // Reworded 2026-10-12 (owner): the app has no late-evening badge and no standby mode. It sends no reminders at all.
      body: "No guilt, no streaks, no mid-day nags asking if you drank water. Directive sends no reminders at all. Miss a day, or take a week off, and nothing scolds you. Log in again with your updated weight and it picks up from where you left off.",
    },
    {
      title: "Bring your numbers to your appointment",
      body: "Instead of a 40-page diary, Directive puts your weight trend, estimated body composition, resting heart rate, sleep and energy intake into a clean PDF for your doctor. A trainer's version covers training volume and steps, and a nutritionist's covers intake, macros and your protein floor. Each is a summary of what you logged, not a medical record.",
    },
    {
      title: "The Afterburner Protocol",
      body: "For deadline-driven targets, like a wedding, a beach vacation or another immovable date, when you need to be more aggressive to hit that target. A temporary, aggressive deficit for a short push, capped at 14 days. Directive tells you what you are trading for the speed, then leaves the decision to you.",
    },
  ],
};

// The three Shields, as the app uses them (owner and Gemini, 2026-10-05). Wording approved: S5 (Rebound), and the
// app's own glossary for Scale and Fluid. No Shield line may promise a result: "designed to help".
export const shields = {
  heading: "The three Shields",
  intro: "Each one covers a stretch where the scale is at its least trustworthy.",
  items: [
    {
      name: "Scale Shield",
      when: "The first 10 days after touchdown",
      body: "The first 10 days after touchdown, when you have reached your goal weight and water-weight swings are expected. The app reminds you to trust the trend line.",
    },
    {
      name: "Fluid Shield",
      // Owner, 2026-10-12: say plainly that this one is for women.
      when: "For women: the week before your period",
      body: "For women who track their menstrual cycle. In the week before your period is due, the app expects water retention and treats those weigh-ins as less reliable.",
    },
    {
      name: "Rebound Shield",
      when: "The six weeks after touchdown",
      body: "Engineered post-diet transitions that step your calories back up strategically, designed to help protect your hard-earned muscle and prevent the classic post-cut weight rebound.",
    },
  ],
};

export const stations = {
  heading: "Five instruments. One coherent trajectory.",
  intro: "Everything Directive tracks routes through a dedicated instrument panel.",
  items: [
    {
      id: "fuel",
      name: "Fuel",
      body: "Agnostic energy balancing. Hit your calorie target, hold your protein and fat floors, and plan an Event Allowance for the nights that matter. Log a meal in seconds by portion, pick a food, meal or recipe you've saved, or type in the numbers when you have them.",
    },
    {
      id: "mission",
      name: "Mission Control",
      body: "Your daily instrument panel. Scale readings with likely water weight separated out show your underlying trend, alongside your estimated daily burn, today's calorie target, dials for velocity, adherence and energy balance, and your distance to target.",
    },
    {
      id: "cruise",
      // Renamed 2026-10-12: "Cruising Altitude" is not a name the app shows. Cruise Control is the planned pause.
      // Owner, 2026-10-19, 00:53 UTC: renamed (it was "Runway and Landing"), and the terms defined for the reader.
      name: "Velocity, Touchdown and Beyond",
      body: "Velocity is the rate of weight loss you choose for yourself. Touchdown is the day you reach your goal weight. Rebound, regaining weight after a diet, is what every dieter wants to avoid, so after touchdown Directive runs a six-week reverse diet that steps your calories back up, designed to help limit it. For the longer term, Cruise Control holds your calories at maintenance to help you keep the weight you have reached.",
    },
    {
      id: "burn",
      name: "Burn",
      body: "Log resistance and cardio sessions by length and intensity, and see your training volume for the week.",
    },
    {
      id: "directive",
      name: "Weekly Directive",
      body: "Every Sunday, an audit reviews your week, updates your maintenance estimate and tells you plainly whether or not your calories need to change. When they do, you choose how to make the change: eat a little less, walk a little more, or a mix that you determine.",
    },
  ],
};

export const finalCta = {
  heading: "Stop steering by the scale.",
  body: "Charter members get early access and a direct line to the team shaping Directive.",
  cta: "Apply for Charter access",
};

export const modal = {
  step1: {
    question: "What's your primary mission?",
    options: [
      "Lose fat, keep muscle",
      "Keep muscle while losing weight, including on a GLP-1 medication",
      "Body Recomposition",
      "Add muscle in a lean bulk",
    ],
  },
  step2: {
    question: "What disrupts your flight plan the most?",
    hint: "Choose up to two.",
    max: 2,
    options: [
      "The scale is moving the wrong way",
      "My weight plateaus even when I'm working hard",
      "The effort of tracking every detail of my food",
      "Diet fatigue and burnout from chronic restriction",
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
    writeInLabel: "Something else? (optional)",
    writeInPlaceholder: "Tell us in your own words",
    emailLabel: "Email address",
    heading: "Where should we send your access?",
    body: "We'll reserve your place in the 2026 Charter intake.",
    placeholder: "you@email.com",
    button: "Submit application",
    adultCheck: "I am 18 or over.",
    adultError: "Directive is for adults 18 and over. Please confirm your age to apply.",
  },
  done: {
    heading: "Application received",
    body: "Your place in the 2026 Charter intake is reserved. Watch your inbox.",
  },
};

export const footer = {
  // "Apple Health integration" and "Google Health Connect ready" were removed on 2026-10-05: neither is built yet.
  badges: ["Your data stays on your device", "Your data is never sold", "For adults 18 and over"],
  // Owner, 2026-10-05: the home page carries one short line. The full approved medical disclaimer and the California
  // section 2068 notice were taken off this page; both are in the Terms of Service, section 2, word for word.
  // This short line is Claude's wording (the opening of the approved disclaimer, cut short), not yet approved.
  disclaimerShort: "Directive is an informational tool and does not provide medical advice.",
  disclaimerLink: "See the Terms of Service.",
  // The link text is fixed by Washington's My Health My Data Act: exactly this, and always its own link.
  healthPolicyLink: "Consumer Health Data Privacy Policy",
};

export const supportTopics = [
  "Using the app",
  "Charter application",
  "Privacy or data request",
  "Subscriptions",
  "Other",
] as const;
