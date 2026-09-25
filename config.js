/**
 * BlazeRidge Shop — public config (safe to commit).
 * Google Sign-In client ID lives in auth-config.js (public GIS ID only). Never put secret keys here.
 * Checkout uses Stripe Payment Links on each product (static GitHub Pages).
 * Newsletter: set FORMSPREE_ENDPOINT for real signups. Email auth: set FIREBASE_* for real email.
 */
window.BLAZERIDGE_CONFIG = {
  siteName: "BlazeRidge",
  currency: "EUR",
  currencySymbol: "€",
  basePath: "/blazeridge-shop/",

  // Runtime auth-config.js supplies the public GIS client ID when configured.
  GOOGLE_CLIENT_ID: (window.BLAZERIDGE_AUTH && window.BLAZERIDGE_AUTH.googleClientId) || "",
  APPLE_CLIENT_ID: (window.BLAZERIDGE_AUTH && window.BLAZERIDGE_AUTH.appleClientId) || "",
  FIREBASE_API_KEY: "",
  FIREBASE_AUTH_DOMAIN: "",
  FIREBASE_PROJECT_ID: "",

  // Free Formspree form URL (e.g. https://formspree.io/f/xxxx). Empty = localStorage demo.
  FORMSPREE_ENDPOINT: "",

  /**
   * Products — add new SKUs here; pages read from this list.
   * paymentLink: Stripe Payment Link (primary & only checkout path on Pages).
   */
  products: [
    {
      id: "money-rules",
      slug: "money-rules",
      image: "images/money-rules.png",
      name: "27 Money Rules That Stick",
      tag: "PDF · 11 pages",
      price: 12,
      description:
        "Twenty-seven if-then rules you can actually keep. Made for Shorts watchers who want something that sticks — not another 40-page course.",
      longDescription:
        "A pocket system of 27 if-then money rules you can install in an afternoon. For people who want stickiness over theory — impulse leaks, spending defaults, weekly resets. Instant PDF after purchase.",
      featured: false,
      paymentLink: "https://buy.stripe.com/6oU9AUcV5gcTeoWb3x5J600"
    },
    {
      id: "bias-checklist",
      slug: "bias-checklist",
      image: "images/bias-checklist.png",
      name: "Buyer’s Bias Checklist",
      tag: "Checklist · 1 page",
      price: 9,
      description:
        "A one-page gut-check before you hit buy. Catch the sneaky biases that empty wallets.",
      longDescription:
        "One page that surfaces scarcity, sunk cost, social proof, and anchoring right before you buy. Print it, stick it by your desk, or open it on your phone at checkout.",
      featured: false,
      paymentLink: "https://buy.stripe.com/5kQ9AUg7h6Cj2Ge6Nh5J601"
    },
    {
      id: "habit-tracker",
      slug: "habit-tracker",
      image: "images/habit-tracker.png",
      name: "Habit × Money Tracker",
      tag: "Bundle · Excel + Notion",
      price: 19,
      description:
        "Link your weekly habits to spending caps. Excel + Notion pack you can reuse every month.",
      longDescription:
        "Excel + Notion templates that link weekly habits to spending caps. Same rhythm for what you do and what you spend — reusable, not another abandoned spreadsheet.",
      featured: true,
      paymentLink: "https://buy.stripe.com/eVqaEYcV57Gn80y1sX5J602"
    },
    {
      id: "subscription-audit",
      slug: "subscription-audit",
      image: "images/subscription-audit.png",
      name: "Subscription Audit",
      tag: "Worksheet · 1 page",
      price: 9,
      description:
        "List every recurring charge, see the real yearly cost, and decide keep / trim / cancel in one sitting.",
      longDescription:
        "List every recurring charge, annualize it, score real usage, then keep / trim / cancel. Built to finish in one sitting and reclaim silent monthly leaks.",
      featured: false,
      paymentLink: "https://buy.stripe.com/8x214og7hd0H94C9Zt5J604"
    },
    {
      id: "payday-automation",
      slug: "payday-automation",
      image: "images/payday.png",
      name: "Payday Automation",
      tag: "Worksheet · 1 page",
      price: 9,
      description:
        "A simple payday playbook: bills, buffers, and goals first — so leftover money is actually leftover.",
      longDescription:
        "One-page payday playbook: split the deposit into bills, buffers, and goals before discretionary money hits your main account. Less willpower, more autopilot.",
      featured: false,
      paymentLink: "https://buy.stripe.com/cNidRaf3d8KreoW8Vp5J606"
    },
    {
      id: "debt-snowball",
      slug: "debt-snowball",
      image: "images/debt-snowball.png",
      name: "Debt Snowball",
      tag: "Tracker · printable",
      price: 9,
      description:
        "Write down the balances, pick a snowball order, and track every payment until you hit zero.",
      longDescription:
        "Printable snowball tracker: list balances, set minimums, attack the smallest first, roll freed payments forward. Simple momentum math — no spreadsheet required.",
      featured: false,
      paymentLink: "https://buy.stripe.com/eVq9AU2gr2m30y6b3x5J605"
    },
    {
      id: "savings-challenge",
      slug: "savings-challenge",
      image: "images/savings-challenge.png",
      name: "52-Week Savings Challenge",
      tag: "Printable · 7 pages",
      price: 7,
      description:
        "Save a small amount every week and tick the box. Classic, Half-Step, and Reverse trackers plus a pick-any grid.",
      longDescription:
        "A 7-page printable savings challenge: Classic (€1 → €52, €1,378 total), Half-Step (€0.50 → €26, €689 total), and Reverse trackers with running totals, a Pick-Any grid for flexible weeks, and a goal & monthly check-in page. Totals are simple arithmetic from your own deposits — no promised returns. Instant download after payment.",
      featured: false,
      paymentLink: "https://buy.stripe.com/cNi7sM1cngcT1Ca1sX5J60j"
    },
    {
      id: "geld-entscheidungs-kit",
      slug: "geld-entscheidungs-kit",
      image: "images/geld-entscheidungs-kit.png",
      name: "Das Geld-Entscheidungs-Kit: 3 Regeln gegen teure Denkfehler",
      tag: "PDF · 12 Seiten · Deutsch",
      price: 9,
      description:
        "Fünf Denkfehler rund ums Geld verständlich erklärt, drei kurze Regeln für den Moment der Entscheidung: Warten. Drei Fakten. Ein Budget.",
      longDescription:
        "12-seitiges PDF-Kit (Deutsch): Verlustangst, Sofort-Impuls, FOMO, Spielgeld-Denken und die Informations-Falle – jeweils mit Alltagsbeispiel und 3-Minuten-Übung. Dazu die 3 Regeln auf einen Blick, ausfüllbare Arbeitsblätter (Entscheidungs-Check, Denkfehler-Logbuch) und ein 30-Tage-Tracker. Bildungsinhalt, keine Finanzberatung. Sofort-Download nach der Zahlung.",
      featured: false,
      paymentLink: "https://buy.stripe.com/8x2dRag7h4ub80ygnR5J60k"
    },
    {
      id: "pipeline-pilot",
      slug: "pipeline-pilot",
      name: "Pipeline Pilot",
      tag: "Service · one-time",
      type: "service",
      category: "service",
      price: 79,
      priceLabel: "€79",
      description:
        "One-time setup / pilot of the BlazeRidge faceless Shorts pipeline — scripts, packaging, and production handoff.",
      longDescription:
        "A focused pilot of the BlazeRidge faceless Shorts pipeline: topic → script flow, packaging defaults, and a clear production handoff so you can ship Shorts without building the system from scratch. One-time setup fee via Stripe.",
      featured: false,
      paymentLink: "https://buy.stripe.com/14AcN64ozd0H0y68Vp5J60h"
    },
    {
      id: "pipeline-seat",
      slug: "pipeline-seat",
      name: "Pipeline Seat",
      tag: "Service · monthly",
      type: "service",
      category: "service",
      price: 197,
      interval: "month",
      priceLabel: "€197/mo",
      description:
        "Monthly seat for ongoing access to the BlazeRidge Shorts pipeline — keep the system running with you.",
      longDescription:
        "Ongoing monthly seat for the BlazeRidge faceless Shorts pipeline: continued access to the pipeline flow, packaging rhythm, and production handoff as you ship. Cancel anytime via Stripe; digital shop products stay separate.",
      featured: false,
      paymentLink: "https://buy.stripe.com/6oUaEY5sD9Ov80y5Jd5J60i"
    }
  ]
};
