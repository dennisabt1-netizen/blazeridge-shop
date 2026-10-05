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
      id: "money-faceoffs",
      slug: "money-faceoffs",
      image: "images/money-faceoffs.png",
      name: "Which Costs More? 25 Everyday Money Face-Offs",
      tag: "PDF · workbook · English",
      price: 9,
      description:
        "25 everyday money face-offs — Lease vs Buy, coffee habit vs investing, rent vs mortgage — each with 10-year cost math, a verdict, and a line for your own number.",
      longDescription:
        "A printable English workbook of 25 everyday money face-offs in a VS format. Each page sets two options against each other (for example Lease vs Buy, coffee habit vs an index fund, rent vs mortgage, subscription vs one-time), walks through soft 10-year cost math, gives a plain verdict, and leaves a fill-in line for your numbers.\n\nMade for Shorts watchers who want a decision aid, not a course. Educational content only — not personalized financial, tax, or investment advice. Returns and outcomes are never guaranteed; plug in your own figures.\n\nCOMING SOON: the PDF is not ready yet. Checkout stays closed until the file and download blob are in place — no buy button until delivery works.",
      featured: false,
      comingSoon: true,
      // Stripe Payment Link ready (do NOT activate until PDF + blob exist):
      // https://buy.stripe.com/fZubJ2dZ9gcT1CaefJ5J60D
      // Redirect target (from delivery/keys.json money-faceoffs.url): get.html?p=<fid>&k=<key>&session_id={CHECKOUT_SESSION_ID}
      paymentLink: ""
    },
    {
      id: "bias-checklist",
      slug: "bias-checklist",
      image: "images/bias-checklist.png",
      name: "Buyer’s Bias Checklist",
      tag: "Checklist · 4 pages · 12 biases",
      price: 9,
      description:
        "A 4-page gut-check before you hit buy. 12 cognitive traps that empty wallets, each with a quick check and a fix.",
      longDescription:
        "Four pages covering 12 cognitive traps — including anchoring, scarcity panic, sunk cost, and social proof — each with a trap description, a check question, and a fix to apply right before you buy. Print it, stick it by your desk, or open it on your phone at checkout.",
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
      id: "mealprep-kit",
      slug: "mealprep-kit",
      image: "images/mealprep-kit.png",
      name: "Wochenplan & Einkaufs-Kit: Meal-Prep sparsam",
      tag: "PDF · 21 Seiten · Deutsch",
      price: 7.9,
      description:
        "Vorlagen zum Planen, Einkaufen und Vorkochen: 4-Wochen-Speiseplan zum Ausfüllen, Einkaufslisten nach Supermarkt-Abteilung, Vorrats-Inventar, Resteverwertungs-Matrix, Wochenbudget-Tracker und 20 einfache Basisrezepte.",
      longDescription:
        "21-seitiges PDF (Deutsch) mit Formularfeldern zum Ausfüllen am Bildschirm oder zum Ausdrucken: vier Wochenplan-Vorlagen, Stammliste und leere Einkaufsliste nach Abteilung, Vorrats-Inventar für Schrank, Kühlschrank und Gefrierfach, Resteverwertungs-Matrix, Wochenbudget-Tracker mit Monatsübersicht, Meal-Prep-Anleitung mit allgemeinen Hinweisen zur Lagerung (Herstellerangaben beachten) und 20 Basisrezepte ohne Nährwertangaben. Allgemeine Organisationshilfe, keine Ernährungs-, Diät-, Gesundheits- oder Finanzberatung; keine Garantie für bestimmte Ausgaben oder Ergebnisse. Sofort-Download nach der Zahlung.",
      featured: false,
      paymentLink: "https://buy.stripe.com/dRm5kE5sDd0Hft0dbF5J60p"
    },
    {
      id: "bewerbungs-kit",
      slug: "bewerbungs-kit",
      image: "images/bewerbungs-kit.png",
      name: "Bewerbungs-Kit Kompakt: Lebenslauf, Anschreiben, Gespräch & Gehalt",
      tag: "PDF · 23 Seiten · Deutsch",
      price: 9.9,
      description:
        "Texte, Muster und Checklisten für deine Bewerbung: Lebenslauf (auch ATS-freundlich), drei Anschreiben-Muster mit Baukasten, 10 Interviewfragen mit STAR-Methode und Satzbausteine für die Gehaltsverhandlung.",
      longDescription:
        "23-seitiges PDF (Deutsch), reiner Text zum Selbstausfüllen in Word, LibreOffice oder Google Docs: Lebenslauf-Aufbau mit Muster und Formulierungsbausteinen, drei Muster-Anschreiben plus Baukasten, Checkliste vor dem Absenden, Mini-Leitfaden Vorstellungsgespräch (10 Fragen, STAR-Methode), Satzbausteine für die Gehaltsverhandlung ohne Zahlenversprechen sowie allgemeine Hinweise zu Kündigung und Arbeitszeugnis. Alle Muster mit frei erfundenen Daten. Allgemeine Orientierungshilfe, keine Rechts-, Steuer- oder Karriereberatung; keine Garantie für Einladungen, Zusagen oder ein bestimmtes Gehalt. Sofort-Download nach der Zahlung.",
      featured: false,
      paymentLink: "https://buy.stripe.com/cNifZi2grbWD94C7Rl5J60n"
    },
    {
      id: "umzugs-kit",
      slug: "umzugs-kit",
      image: "images/umzugs-kit.png",
      name: "Umzugs-Kit Kompakt: Zeitplan, Checklisten, Vorlagen & Planer",
      tag: "PDF · 22 Seiten · Deutsch",
      price: 9.9,
      description:
        "Dein Umzug in 8 Wochen: Zeitplan zum Abhaken, Checkliste für Ummeldungen und Adressänderungen, Schreiben-Vorlagen, Kosten- und Kartonplaner und Übergabeprotokoll für die Wohnung.",
      longDescription:
        "22-seitiges PDF (Deutsch) zum Ausfüllen am Bildschirm oder zum Ausdrucken: Umzugs-Zeitplan von acht Wochen vorher bis nach Tag X, Checklisten für Behörden, Versicherungen, Strom, Internet, Bank und Arbeitgeber, neutrale Vorlagen (Kündigung, Sonderkündigung, Nachsendeauftrag, Adressänderung, Zählerstand), Kosten- und Kartonplaner mit Eingabefeldern und eine Übergabeprotokoll-Checkliste. Allgemeine Orientierungshilfe, keine Rechts-, Steuer- oder Versicherungsberatung; Fristen und Regelungen prüfst du selbst. Vorlagen sind neutrale Muster mit Platzhaltern. Sofort-Download nach der Zahlung.",
      featured: false,
      paymentLink: "https://buy.stripe.com/28E4gA08j0dVft0c7B5J60o"
    },
    {
      id: "haushaltsbuch-kit",
      slug: "haushaltsbuch-kit",
      image: "images/haushaltsbuch-kit.png",
      name: "Haushaltsbuch-Kit Kompakt: Monatsplan, Fixkosten, Jahresübersicht & Journal",
      tag: "PDF · 19 Seiten · Deutsch",
      price: 8.9,
      description:
        "Dein Haushaltsbuch zum Ausfüllen: Fixkosten-Übersicht, Monatsplan mit Geplant und Tatsächlich, Ausgaben-Journal, Jahresübersicht, Zielplaner und Checklisten. Jahresunabhängig, am Bildschirm oder zum Ausdrucken.",
      longDescription:
        "19-seitiges PDF (Deutsch) mit Eingabefeldern zum Ausfüllen am Bildschirm oder zum Ausdrucken: Startübersicht für Einnahmen, Konten und Fixkosten, Umrechnung von Jahres- und Quartalskosten auf den Monat, drei Monatspläne (Geplant, Tatsächlich, Differenz), Ausgaben-Journal mit Wochenstand, Jahresübersicht und Jahreskalender, Zielplaner, Zahlungskalender, Unterlagen-Übersicht sowie Monats-, Quartals- und Jahres-Check. Jahresunabhängig: Du startest, wann du willst. Organisations-Werkzeug, keine Finanz-, Steuer-, Rechts- oder Schuldnerberatung; keine Spar- oder Anlageempfehlung, keine Garantie für ein bestimmtes Ergebnis. Musterzahlen sind frei erfunden. Sofort-Download nach der Zahlung, nur für den persönlichen Gebrauch; Vervielfältigung und Weitergabe über die private Nutzung hinaus sind nicht gestattet.",
      featured: false,
      paymentLink: "https://buy.stripe.com/eVqcN6aMX5yf6Wu0oT5J60B"
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
      id: "komplett-bundle",
      slug: "komplett-bundle",
      image: "images/komplett-bundle.png",
      name: "BlazeRidge Komplett-Bundle: alle 8 Geld-Produkte als ZIP",
      tag: "ZIP · 7 PDFs + Excel/Notion · Deutsch & Englisch",
      price: 29,
      description:
        "Alle 8 BlazeRidge-Geld-Produkte in einem Download. Summe der Einzelpreise: 83 € – im Bundle 29 €.",
      longDescription:
        "Ein ZIP mit allen 8 digitalen BlazeRidge-Geld-Produkten: Geld-Entscheidungs-Kit (Deutsch), 27 Money Rules That Stick, Buyer’s Bias Checklist, Subscription Audit, Payday Automation Checklist, Debt Snowball One-Pager, 52-Week Savings Challenge und der Habit × Money Tracker (Excel, CSV, Notion, Anleitung). Sieben der acht Produkte sind englischsprachig, das Geld-Entscheidungs-Kit ist deutsch. Summe der aktuellen Einzelpreise: 83 € – im Bundle 29 €. Bildungsinhalt, keine Anlage-, Finanz-, Steuer- oder Rechtsberatung. Sofort-Download nach der Zahlung, nur für den persönlichen Gebrauch.",
      featured: false,
      paymentLink: "https://buy.stripe.com/7sYeVe9IT9Ov4Om0oT5J60m"
    },
    {
      id: "pet-planer-bundle",
      slug: "pet-planer-bundle",
      image: "images/pet-planer-bundle.png",
      name: "Pet-Planer-Bundle: 5 Blätter für Hundebesitzer (A4, DE)",
      tag: "PDF · 5 Seiten · A4",
      price: 7.9,
      description:
        "Fünf druckbare Planer-Blätter für Hund & Katze: Training, Impf-Log, Sitter-Infoblatt, Futter- & Gewichtslog, Monatsbudget. Sofort-Download als PDF.",
      longDescription:
        "Alles Wichtige für dein Tier auf 5 übersichtlichen A4-Seiten – zum Ausdrucken, Abheften und Mitnehmen.\n\nENTHALTEN\n1) Hunde-Training – Wochenplan (Übungen abhaken, Tages-Check)\n2) Impf- & Gesundheitslog (Impfungen, Entwurmung, Floh/Zecke, Tierarztbesuche)\n3) Sitter-Infoblatt (Kontakte, Tagesablauf, Regeln, Notfall)\n4) Futter- & Gewichtslog\n5) Tier-Budget (Monat)\nAls Gesamt-PDF und als Einzelblätter (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %, nicht \"an Seite anpassen\").\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Dokumentationsvorlage für deine eigenen Einträge; ersetzt weder Impfpass noch tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI.",
      featured: false,
      paymentLink: "https://buy.stripe.com/8x24gAbR17Gn4Om8Vp5J60q"
    },
    {
      id: "pet-planer-impflog",
      slug: "pet-planer-impflog",
      image: "images/pet-planer-impflog.png",
      name: "Impf- & Gesundheitslog (Einzelblatt, A4, DE)",
      tag: "PDF · 1 Seite · A4",
      price: 3.9,
      description:
        "Ein druckbares A4-Blatt für Impfungen, Entwurmung, Floh/Zecke und Tierarztbesuche deines Tieres. Sofort-Download als PDF.",
      longDescription:
        "Der Impf- & Gesundheitslog als einzelnes A4-Blatt – zum Ausdrucken, Abheften und Mitnehmen zum Tierarzt.\n\nENTHALTEN\nImpf- & Gesundheitslog (Impfungen, Entwurmung, Floh/Zecke, Tierarztbesuche)\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %, nicht \"an Seite anpassen\").\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Dokumentationsvorlage für deine eigenen Einträge; ersetzt weder Impfpass noch tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI.",
      featured: false,
      paymentLink: "https://buy.stripe.com/9B6fZig7h3q72Ge5Jd5J60r"
    },
    {
      id: "infoblatt-notfallplan",
      slug: "infoblatt-notfallplan",
      image: "images/infoblatt-notfallplan.png",
      name: "Haustier-Infoblatt & Notfallplan (6 Seiten, A4, DE)",
      tag: "PDF · 6 Seiten · A4",
      price: 6.9,
      description:
        "Steckbrief, Notfall-Kontakte, Notfall-Checkliste, Sitter-Infoblatt, Evakuierungsplan und Impf-/Medikamentenübersicht für Hund & Katze. Zum Ausdrucken und Ausfüllen. Sofort-Download als PDF.",
      longDescription:
        "Alles Wichtige für Notfall, Urlaub und Sitter auf 6 übersichtlichen A4-Seiten – zum Ausdrucken, Ausfüllen und Abheften.\n\nENTHALTEN\n1) Haustier-Steckbrief (Stammdaten, Chip, Besonderheiten)\n2) Notfall-Kontakte (Tierarzt, Notdienst, Giftnotruf-Feld, Vertrauensperson)\n3) Notfall-Checkliste (Hitze, Vergiftungsverdacht, Verletzung – allgemeine Hinweise)\n4) Sitter-Infoblatt (Tagesablauf, Regeln, Notfall-Vorgehen)\n5) Evakuierungs- & Notfalltaschen-Plan\n6) Impf- & Medikamentenübersicht (zum Eintragen)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %, nicht „an Seite anpassen“).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Telefonnummern sind bewusst nicht vorgedruckt (regional verschieden) – du trägst sie selbst ein.\n• Allgemeine Hinweise und Dokumentationsvorlage. Ersetzt keine tierärztliche Beratung, keinen Impfpass und keinen Notruf. Im Notfall sofort Tierarzt bzw. tierärztlichen Notdienst kontaktieren.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI.",
      featured: false,
      paymentLink: "https://buy.stripe.com/dRm3cw2grbWD6WuefJ5J60s"
    },
    {
      id: "welpen-starter",
      slug: "welpen-starter",
      image: "images/welpen-starter.png",
      name: "Welpen-Starter-Paket: Checklisten & Planer (6 Seiten, A4, DE)",
      tag: "PDF · 6 Seiten · A4",
      price: 4.9,
      description:
        "Erstausstattung-Checkliste, Tagesplan & Stubenreinheits-Log, Impf-/Entwurmungsplan, Sozialisierungs-Checkliste, Kosten-Übersicht und 8-Wochen-Trainingsplan für den Start mit Welpe. Sofort-Download als PDF.",
      longDescription:
        "Der Start mit Welpe, übersichtlich auf 6 A4-Seiten – zum Ausdrucken und Abhaken.\n\nENTHALTEN\n1) Erstausstattung-Checkliste\n2) Tagesplan & Stubenreinheits-Log (Woche)\n3) Impf- & Entwurmungsplan zum Eintragen\n4) Sozialisierungs-Checkliste\n5) Kosten-Übersicht (einmalig & monatlich)\n6) Wochen-Trainingsplan (8 Wochen, Anregungen zum Anpassen)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Allgemeine Orientierung und Dokumentationsvorlage. Impf-/Entwurmungszeitpunkte legt deine Tierarztpraxis fest. Ersetzt keine tierärztliche Beratung und keine Hundetrainer:in; keine Erfolgsgarantie.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI.",
      featured: false,
      paymentLink: "https://buy.stripe.com/6oU9AU3kvaSz3Ki7Rl5J60t"
    },
    {
      id: "welpen-trainingsplan",
      slug: "welpen-trainingsplan",
      image: "images/welpen-trainingsplan.png",
      name: "Welpen-Trainingsplan 8 Wochen (7 Seiten, A4, DE)",
      tag: "PDF · 7 Seiten · A4",
      price: 6.9,
      description:
        "8-Wochen-Plan mit Wochenseiten zum Abhaken, Übungs-Log und Fortschritts-Rückblick. Zum Ausdrucken. Sofort-Download als PDF.",
      longDescription:
        "Welpen-Training in kleinen Schritten – 7 A4-Seiten zum Ausdrucken und Ausfüllen.\n\nENTHALTEN\n1) Übersicht mit Zielen und 8-Wochen-Überblick\n2) Wochenseiten 1–2, 3–4, 5–6, 7–8 (Anregungen zum Abhaken, Tages-Check Mo–So, Schreibfelder)\n3) Übungs-Log (15 Zeilen)\n4) Rückblick & Fortschritt (Selbsteinschätzung Woche 2/4/6/8)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %, nicht „an Seite anpassen“).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Allgemeine Anregungen und Dokumentationsvorlage, keine Erfolgsgarantie. Ersetzt weder Hundetrainer:in noch tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI, ohne Fremdbilder.",
      crossSell: "welpen-starter",
      featured: false,
      paymentLink: "https://buy.stripe.com/4gM8wQ08jd0Hft09Zt5J60C"
    },
    {
      id: "urlaub-packliste",
      slug: "urlaub-packliste",
      image: "images/urlaub-packliste.png",
      name: "Urlaub mit Hund: Packliste & Reise-Checkpunkte (2 Seiten, A4, DE)",
      tag: "PDF · 2 Seiten · A4",
      price: 3.9,
      description:
        "Packliste für den Urlaub mit Hund plus allgemeine Reise-Checkpunkte (vor Abreise, unterwegs). Zum Ausdrucken und Abhaken. Sofort-Download als PDF.",
      longDescription:
        "Nichts vergessen beim Urlaub mit Hund – 2 A4-Seiten zum Ausdrucken und Abhaken.\n\nENTHALTEN\n1) Packliste (Dokumente, Futter, Sicherheit, Komfort, Pflege/Reiseapotheke)\n2) Reise-Checkpunkte (Planung, kurz vor Abreise, unterwegs, Notizfelder)\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Nur allgemeine Punkte, ohne Gewähr. Einreise- und Impfbestimmungen sind je Land verschieden und ändern sich: Bitte aktuelle Bestimmungen bei offiziellen Stellen und der Tierarztpraxis prüfen.\n• Ersetzt keine tierärztliche Beratung. Nur für den persönlichen Gebrauch.\n• Gestaltung/Layout selbst erstellt, ohne generative KI.",
      featured: false,
      paymentLink: "https://buy.stripe.com/9B6bJ24oz6Cj6Wu6Nh5J60u"
    },
    {
      id: "katzen-umzug",
      slug: "katzen-umzug",
      image: "images/katzen-umzug.png",
      name: "Katzen-Umzug: Checkliste & Eingewöhnung (4 Seiten, A4, DE)",
      tag: "PDF · 4 Seiten · A4",
      price: 3.9,
      description:
        "Zeitplan für den Umzug mit Katze, Umzugstag & Rückzugsraum, 14-Tage-Eingewöhnungs-Log sowie Ummelde- und Sicherheitscheck. Zum Ausdrucken und Abhaken. Sofort-Download als PDF.",
      longDescription:
        "Umzug mit Katze – ruhig planen und gut ankommen. 4 A4-Seiten zum Ausdrucken und Abhaken.\n\nENTHALTEN\n1) Umzugs-Zeitplan (4 Wochen bis Umzugstag)\n2) Umzugstag & Rückzugsraum (Transport, Basislager in der neuen Wohnung)\n3) Eingewöhnungs-Log für 14 Tage (frisst, Streu, erkundet, spielt, Notizen)\n4) Ummelden & Sicherheitscheck neue Wohnung (Register, Praxis, Versicherung, Fenster/Balkon)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %, nicht „an Seite anpassen“).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Telefonnummern sind nicht vorgedruckt – du trägst sie selbst ein.\n• Allgemeine Checkliste und Beobachtungsvorlage, keine Diagnose. Ersetzt keine tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI, ohne Fremdbilder.",
      featured: false,
      paymentLink: "https://buy.stripe.com/3cIfZi08j0dVa8G8Vp5J60v"
    },
    {
      id: "hunde-gesundheitsmappe",
      slug: "hunde-gesundheitsmappe",
      image: "images/hunde-gesundheitsmappe.png",
      name: "Hunde-Gesundheitsmappe: Tracker & Logs (6 Seiten, A4, DE)",
      tag: "PDF · 6 Seiten · A4",
      price: 6.9,
      description:
        "Jahresübersicht, Tierarztbesuch-Log, Medikamenten-Übersicht, Gewichtsverlauf mit Diagramm, Beobachtungs-Log und Futterwechsel-Log für Hundehalter. Zum Ausdrucken und Ausfüllen. Sofort-Download als PDF.",
      longDescription:
        "Alle Gesundheitsthemen deines Hundes in einer Mappe – 6 A4-Seiten zum Ausdrucken und Ausfüllen.\n\nENTHALTEN\n1) Jahresübersicht (Termine je Monat, abhaken)\n2) Tierarztbesuch-Log (Anlass, Besprochenes, Kosten)\n3) Medikamente & Mittel (Eintragen laut Tierarztpraxis)\n4) Gewichtsverlauf (Tabelle + Diagramm zum Einzeichnen)\n5) Beobachtungs-Log (Notizen fürs nächste Tierarztgespräch)\n6) Futterwechsel-Log (Verträglichkeit festhalten)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Dokumentationsvorlage ohne Dosierempfehlung und ohne Diagnose. Ersetzt keine tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI, ohne Fremdbilder.",
      featured: false,
      paymentLink: "https://buy.stripe.com/3cI6oIg7h0dVft0efJ5J60w"
    },
    {
      id: "senior-pflegeplaner",
      slug: "senior-pflegeplaner",
      image: "images/senior-pflegeplaner.png",
      name: "Senior-Hund-Pflegeplaner: Routine & Beobachtung (5 Seiten, A4, DE)",
      tag: "PDF · 5 Seiten · A4",
      price: 6.9,
      description:
        "Steckbrief & Alltag, Wochenplan Routine, 14-Tage-Alltags-Beobachtungen, Komfort-Checkliste und Vorbereitung fürs Tierarztgespräch für Halter älterer Hunde. Zum Ausdrucken. Sofort-Download als PDF.",
      longDescription:
        "Für Halter älterer Hunde: Routinen planen, Veränderungen bemerken, gut vorbereitet zur Tierarztpraxis. 5 A4-Seiten zum Ausdrucken.\n\nENTHALTEN\n1) Steckbrief & Alltag (Ausgangslage, Routinen)\n2) Wochenplan Routine (Morgen/Mittag/Abend, Ruhe & Pflege)\n3) Alltags-Beobachtungen für 14 Tage (Appetit, Trinken, Bewegung, Schlaf, Notizen)\n4) Komfort zu Hause (allgemeine Anregungen zum Abhaken)\n5) Tierarztgespräch vorbereiten (Fragen, Beobachtungen, nächster Termin)\nAls Gesamt-PDF und als Einzelseiten (ZIP).\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → PDF drucken (A4, Skalierung 100 %).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Beobachtungs- und Dokumentationsvorlage, keine Diagnose, keine Behandlungs- oder Heilversprechen. Ersetzt keine tierärztliche Beratung.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI, ohne Fremdbilder.",
      featured: false,
      paymentLink: "https://buy.stripe.com/4gM6oIaMXgcT80yb3x5J60x"
    },
    {
      id: "pet-komplett",
      slug: "pet-komplett",
      image: "images/pet-komplett.png",
      name: "Pet-Komplett: 7 Hunde- & Katzen-Pakete (34 Seiten, A4, DE)",
      tag: "ZIP · 7 Pakete · 34 Seiten",
      price: 24.9,
      description:
        "Alle 7 Pet-Pakete in einem Download: Pet-Planer, Infoblatt & Notfallplan, Welpen-Starter, Urlaub mit Hund, Katzen-Umzug, Hunde-Gesundheitsmappe und Senior-Hund-Pflegeplaner – 34 Seiten A4 zum Ausdrucken. Sofort-Download als ZIP.",
      longDescription:
        "Das Komplettpaket für Hunde- und Katzenhalter – 7 Pakete mit 34 A4-Seiten zum Ausdrucken, Ausfüllen und Abhaken. Gegenüber dem Einzelkauf sparst du rund 40 %.\n\nENTHALTEN (je Ordner Gesamt-PDF + Einzelseiten)\n01 Pet-Planer-Bundle (5 Blätter)\n02 Haustier-Infoblatt & Notfallplan (6 Seiten)\n03 Welpen-Starter-Paket (6 Seiten)\n04 Urlaub mit Hund: Packliste & Reise-Checkpunkte (2 Seiten)\n05 Katzen-Umzug: Checkliste & Eingewöhnung (4 Seiten)\n06 Hunde-Gesundheitsmappe: Tracker & Logs (6 Seiten)\n07 Senior-Hund-Pflegeplaner (5 Seiten)\nDazu LIESMICH.txt mit Inhaltsverzeichnis.\n\nSO FUNKTIONIERT'S\nBezahlen → Download-Seite öffnen → ZIP entpacken → PDF drucken (A4, Skalierung 100 %).\n\nWICHTIG\n• Digitales Produkt – es wird nichts versendet.\n• Allgemeine Hinweise und Dokumentationsvorlagen, keine Diagnosen, keine Dosierempfehlungen. Ersetzen keine tierärztliche Beratung, keinen Impfpass und keinen Notruf. Telefonnummern sind bewusst nicht vorgedruckt.\n• Nur für den persönlichen Gebrauch, kein Weiterverkauf oder Weitergabe.\n• Farben können je nach Drucker abweichen.\n• Gestaltung/Layout selbst erstellt, ohne generative KI, ohne Fremdbilder.",
      // Vergleichspreis = reale Summe dieser Einzelprodukte (siehe js/crosssell.js, wird aus config berechnet)
      includes: ["pet-planer-bundle", "infoblatt-notfallplan", "welpen-starter", "urlaub-packliste", "katzen-umzug", "hunde-gesundheitsmappe", "senior-pflegeplaner"],
      alsoIn: ["pet-planer-impflog"], // Impf-Log ist Teil des Pet-Planer-Bundles, nicht extra gezählt
      featured: false,
      paymentLink: "https://buy.stripe.com/9B6bJ29IT6Cj2Ge0oT5J60y"
    },
    {
      id: "neuer-job",
      slug: "neuer-job",
      image: "images/neuer-job.png",
      name: "Neuer Job, neues Budget: Bewerbungs-Kit + Budget-Rechenblatt + Habit × Money Tracker",
      tag: "ZIP · PDF + Excel · Deutsch & Englisch",
      price: 19.9,
      description:
        "Von der Bewerbung bis zum Budget für den neuen Job: Bewerbungs-Kit Kompakt (23 Seiten), Budget-Rechenblatt zum Ausfüllen und der Habit × Money Tracker (Excel, CSV, Notion). Summe der Einzelpreise: 28,90 € – im Paket 19,90 €.",
      longDescription:
        "Ein ZIP-Download für Jobwechsler: Das Bewerbungs-Kit Kompakt (23 Seiten, Deutsch) mit Lebenslauf, drei Anschreiben-Mustern, Checkliste vor dem Absenden, 10 Interviewfragen mit STAR-Methode und Satzbausteinen für die Gehaltsverhandlung. Dazu eine Start-Seite mit Reihenfolge und ein Budget-Rechenblatt (A4, Deutsch) zum Ausfüllen vor dem ersten Gehalt sowie der Habit × Money Tracker (Excel, CSV, Notion-Vorlage und Kurzanleitung, englischsprachig).\n\nENTHALTEN\nNeuer-Job_Bundle_A4_DE.pdf (Start-Seite, Rechenblatt + Bewerbungs-Kit, 25 Seiten) · BlazeRidge_Bewerbungs-Kit_Kompakt.pdf (23 Seiten) · Habit_x_Money_Tracker/ (xlsx, csv, md, Anleitung-PDF) · LIESMICH.txt\n\nSumme der aktuellen Einzelpreise: Bewerbungs-Kit 9,90 € + Habit × Money Tracker 19 € = 28,90 € – im Paket 19,90 €. Der Habit × Money Tracker ist englischsprachig, das Bewerbungs-Kit deutsch. Allgemeine Orientierungs- und Organisationshilfe, keine Finanz-, Steuer-, Rechts- oder Karriereberatung; keine Garantie für Einladungen, Zusagen, ein bestimmtes Gehalt oder Einsparungen. Digitaler Download, es wird nichts versendet. Sofort-Download nach der Zahlung, nur für den persönlichen Gebrauch.",
      // Vergleichspreis = Summe dieser Einzelprodukte (Stand config.js)
      includes: ["bewerbungs-kit", "habit-tracker"],
      featured: false,
      paymentLink: "https://buy.stripe.com/00waEYdZ9d0Ha8G7Rl5J60z"
    },
    {
      id: "geld-reset",
      slug: "geld-reset",
      image: "images/geld-reset.png",
      name: "Geld-Reset: Geld-Entscheidungs-Kit + Subscription Audit + Habit × Money Tracker",
      tag: "ZIP · PDF + Excel · Deutsch & Englisch",
      price: 24.9,
      description:
        "Dein Geld-Reset in drei Schritten: 3 Regeln gegen teure Denkfehler, Abos prüfen und Monatslimits mit Wochen-Check. Geld-Entscheidungs-Kit, Subscription Audit und Habit × Money Tracker plus 4-Wochen-Plan. Summe der Einzelpreise: 37 € – im Paket 24,90 €.",
      longDescription:
        "Ein ZIP-Download für alle, die ihre Finanzgewohnheiten neu aufsetzen wollen: Das Geld-Entscheidungs-Kit (12 Seiten, Deutsch) mit 5 Denkfehlern, den 3 Regeln „Warten. Drei Fakten. Ein Budget.“, Arbeitsblättern und 30-Tage-Tracker, der Subscription Audit 1-Pager (Abos aufs Jahr rechnen und je Abo entscheiden) und der Habit × Money Tracker (Excel, CSV, Notion-Vorlage und Kurzanleitung). Dazu eine Start-Seite mit Reihenfolge, 4-Wochen-Plan und Abo-Rechenblatt (A4, Deutsch).\n\nENTHALTEN\nGeld-Reset_Bundle_A4_DE.pdf (Start-Seite, Plan + Geld-Entscheidungs-Kit + Subscription Audit, 15 Seiten) · BlazeRidge_Geld-Entscheidungs-Kit.pdf (12 Seiten) · BlazeRidge_Subscription_Audit_1-Pager.pdf (1 Seite) · Habit_x_Money_Tracker/ (xlsx, csv, md, Anleitung-PDF) · LIESMICH.txt\n\nSumme der aktuellen Einzelpreise: Geld-Entscheidungs-Kit 9 € + Subscription Audit 9 € + Habit × Money Tracker 19 € = 37 € – im Paket 24,90 €. Subscription Audit und Habit × Money Tracker sind englischsprachig, das Geld-Entscheidungs-Kit deutsch. Bildungsinhalt, keine Anlage-, Finanz-, Steuer- oder Rechtsberatung und keine Empfehlung für Finanzprodukte; es werden keine Einsparungen, Gewinne oder Renditen zugesagt. Digitaler Download, es wird nichts versendet. Sofort-Download nach der Zahlung, nur für den persönlichen Gebrauch.",
      // Vergleichspreis = Summe dieser Einzelprodukte (Stand config.js)
      includes: ["geld-entscheidungs-kit", "subscription-audit", "habit-tracker"],
      featured: false,
      paymentLink: "https://buy.stripe.com/aFadRag7h5yf1CadbF5J60A"
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
      // Derzeit nicht buchbar (Stripe-Link inaktiv, 02.10.2026 Rechts-Check). Link erst nach Reaktivierung + § 312k-Kündigungsbutton eintragen.
      paymentLink: ""
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
      // Derzeit nicht buchbar (Stripe-Link inaktiv, 02.10.2026 Rechts-Check). Link erst nach Reaktivierung + § 312k-Kündigungsbutton eintragen.
      paymentLink: ""
    }
  ]
};
