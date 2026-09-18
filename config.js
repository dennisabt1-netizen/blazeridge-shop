/**
 * BlazeRidge Shop — public config (safe to commit).
 * Fill placeholders for optional OAuth later. Never put secret keys here.
 * Checkout uses Stripe Payment Links on each product (static GitHub Pages).
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

  /**
   * Products — add new SKUs here; pages read from this list.
   * paymentLink: Stripe Payment Link (primary & only checkout path on Pages).
   */
  products: [
    {
      id: "money-rules",
      slug: "money-rules",
      name: "27 Money Rules That Stick",
      tag: "PDF · 11 pages",
      price: 12,
      description:
        "If-then rules that stop impulse leaks — install in a day. Short, usable downloads for people who watch finance Shorts — not sit through courses.",
      longDescription:
        "A pocket system of 27 if-then money rules you can install in an afternoon. Built for faceless finance viewers who want stickiness over theory: impulse leaks, spending defaults, and weekly resets. Instant PDF download after purchase.",
      featured: false,
      paymentLink: "https://buy.stripe.com/6oU9AUcV5gcTeoWb3x5J600"
    },
    {
      id: "bias-checklist",
      slug: "bias-checklist",
      name: "Buyer’s Bias Checklist",
      tag: "Checklist · 1 page",
      price: 9,
      description:
        "Catch cart biases before you spend — psych × money in one printable page.",
      longDescription:
        "A one-page checklist that surfaces common purchase biases (scarcity, sunk cost, social proof, anchoring) right before you hit buy. Print it, keep it by your desk, or open it on your phone at checkout.",
      featured: false,
      paymentLink: "https://buy.stripe.com/5kQ9AUg7h6Cj2Ge6Nh5J601"
    },
    {
      id: "habit-tracker",
      slug: "habit-tracker",
      name: "Habit × Money Tracker",
      tag: "Bundle · Excel + Notion",
      price: 19,
      description:
        "Weekly habits + spending caps — reusable system pack for Excel and Notion.",
      longDescription:
        "A dual-format pack (Excel + Notion) that links weekly habits to spending caps. Track what you do and what you spend in the same rhythm — reusable templates, not another abandoned spreadsheet.",
      featured: true,
      paymentLink: "https://buy.stripe.com/eVqaEYcV57Gn80y1sX5J602"
    },
    {
      id: "subscription-audit",
      slug: "subscription-audit",
      name: "Subscription Audit",
      tag: "Worksheet · 1 page",
      price: 9,
      description:
        "Annualize charges, score usage, keep / trim / cancel — one worksheet.",
      longDescription:
        "List every recurring charge, annualize it, score real usage, then decide keep / trim / cancel. Designed to finish in one sitting and reclaim silent monthly leaks.",
      featured: false,
      paymentLink: "https://buy.stripe.com/8x214og7hd0H94C9Zt5J604"
    },
    {
      id: "payday-automation",
      slug: "payday-automation",
      name: "Payday Automation",
      tag: "Worksheet · 1 page",
      price: 9,
      description:
        "Route every paycheck on autopilot — bills, buffers, and goals before discretionary spend.",
      longDescription:
        "A one-page payday playbook: split your deposit into bills, buffers, and goals before discretionary money hits your main account. Less willpower, more automatic follow-through.",
      featured: false,
      paymentLink: "https://buy.stripe.com/cNidRaf3d8KreoW8Vp5J606"
    },
    {
      id: "debt-snowball",
      slug: "debt-snowball",
      name: "Debt Snowball",
      tag: "Tracker · printable",
      price: 9,
      description:
        "List debts, pick the snowball order, and track every payment until zero.",
      longDescription:
        "A printable debt snowball tracker: list balances, set minimums, attack the smallest first, and roll freed payments forward. Simple momentum math — no spreadsheets required.",
      featured: false,
      paymentLink: "https://buy.stripe.com/eVq9AU2gr2m30y6b3x5J605"
    }
  ]
};
