# Kurse und Coaching: Preis, Form, Verkaufsweg

Stand: 12. Oktober 2026. Die drei Kurse gehen über den bestehenden Stripe-Shop der Website. Kein natives TikTok-Shop-Listing.

## Was die bestehende Leiter kostet

In `config.js` enden die Blätter und Bundles bei 7 € bis 29 €. Das teuerste Paket dort ist das Komplett-Bundle, 29 €, ein ZIP aus acht kurzen Geld-Produkten. Ein langer Kurs liegt darüber. Er wiederholt dieses ZIP nicht.

## Was Selbstlern-Kurse und Coaching 2026 kosten

Belegte Spannen, keine Conversion-Rate:

- Selbstlern ohne Live-Coaching, Gesundheit und Gewohnheiten: 50 bis 200 US-Dollar. Quelle: Ruzuku, „How to Price Your Health Coaching Course“ (2026), eigene Plattformzählung von 445 Kursen mit Einmalpreis in dieser Nische. Der Median dieser 445 liegt bei 147 US-Dollar, die mittlere Hälfte bei 49 bis 397 US-Dollar. Dieselbe Seite setzt Gruppen-Coaching über 6 bis 12 Wochen bei 200 bis 800 US-Dollar an, weil dort wöchentliche Live-Calls und Feedback dazukommen. https://www.ruzuku.com/for/health-coaching/pricing-strategies
- Über alle Nischen auf derselben Plattform: Median 150 US-Dollar bei 11.691 Kursen mit Einmalpreis, mittlere Hälfte 49 bis 357 US-Dollar. Coaching-Programme auf derselben Zählung: Median 1.898 US-Dollar, mittlere Hälfte 399 bis 4.999 US-Dollar. Quelle: Ruzuku, „How Much to Charge for an Online Course: 2026 Data & Formulas“. https://www.ruzuku.com/learn/articles/how-much-to-charge-for-online-course
- Creator-eigene Flagship-Kurse ohne Marktplatz-Dumping werden in Übersichten oft bei 197 bis 497 US-Dollar eingeordnet, Mini-Kurse bei 27 bis 97 US-Dollar. Quelle: SchoolMaker, Pricing Calculator, und die Stufentabelle bei Ruzuku, „How to Price an Online Course (2026)“. https://schoolmaker.com/tools/online-course-pricing-calculator · https://www.ruzuku.com/learn/course-pricing-guide

Das sind Plattform-eigene Auswertungen, keine unabhängige Marktstudie. Sie reichen, um die Richtung zu setzen: Der Sprung von einem Blatt zu einem Coaching-Call ist ein anderer Preis als der Sprung von einem Blatt zu einem langen Selbstlern-Kurs.

## Was diese drei Kurse deshalb kosten

Die Kurse haben Module, Wochenplan, Arbeitsblätter und ein Abschlussprotokoll. Sie haben keinen Call, keine Gruppe, kein Feedback. Deshalb gilt die Selbstlern-Spanne 50 bis 200 US-Dollar, nicht der Coaching-Median von 1.898 US-Dollar.

79 €, 99 € und 149 € liegen in dieser Spanne, solange ein Euro zwischen etwa 0,85 und 1,15 US-Dollar kostet. Sie liegen klar über dem 29-€-ZIP. Sie liegen unter einem Flagship mit Community oder einem Call.

| Kurs | Preis | Warum |
| --- | --- | --- |
| Sechs-Wochen-Kommando | 79 € | Sechs Wochen, drei Tagesbefehle, Arbeitsblatt pro Woche. Unteres Drittel der Selbstlern-Spanne, mehr als doppelt so teuer wie das 29-€-ZIP, weil es ein durchzählbares System ist und kein einzelnes Blatt. |
| Habit × Money, sechs Wochen | 99 € | Zweites System: eine Zahl, eine Linie, ein 24-Stunden-Stopp, eine Geldaktion pro Woche. Liegt über dem Kommando, weil zwei Zählwerke in einem Ablauf stehen. |
| Zwölf-Wochen-Protokoll | 149 € | Beide Systeme, 84 Tage, kein Neustart in Woche sieben, Abschluss mit vier Zahlen. Oberes Ende der belegten Selbstlern-Spanne ohne Call. Ein Coaching-Preis wäre hier eine andere Ware. |

Keine dieser Zahlen ist eine gemessene Conversion dieses Shops. Gemessen ist nur, wo vergleichbare Selbstlern-Kurse 2026 stehen und wo die eigene Leiter aufhört.

## Was ein Käufer bei diesem Preis bekommt

Die Quellen trennen Mini-Kurs (ein Ergebnis, kurz) von Selbstlern-Flagship (eine Methode, Vorlagen, allein üben). Bei 79 bis 149 € ist das zweite fällig:

- Module mit der Regel im Klartext, nicht als Themenliste.
- Ein Wochenplan mit einem Befehl pro Tag.
- Ein Arbeitsblatt pro Woche, Felder zum Ausfüllen.
- Ein Abschluss, der zählt, statt zu motivieren.

Stimme: Befehl oder Fakt. Keine Coach-Floskel.

## Verkaufsweg

Checkout bleibt Stripe Payment Link auf der bestehenden Produktseite, sobald der Link existiert. Bis dahin ist `paymentLink` leer. `shop.html` und `product.html` zeigen dann „Coming soon“ und keinen Kauf-Link. Der Warenkorb-Hinweis sagt, dass der Checkout erst mit dem Link aktiv wird.

Kein oranger TikTok-Shop-Warenkorb. Die EU-Policy stuft digitale Downloads und virtuelle Produkte als nicht unterstützt ein (Media Products 3.20, Virtual Products 3.34, Stand der früher gelesenen Fassung vom 6. August 2026). Ein Coaching-Call fiele zusätzlich unter nicht unterstützte Dienste. Die Kurse sind PDF-Selbstlernen über den eigenen Shop.

## Claims und Widerruf

Bildungsinhalt. Keine Finanz-, Steuer-, Rechts- oder Gesundheitsberatung. Keine Zusage eines Spar-, Einkommens- oder Körpereffekts. Beträge auf den Blättern sind Einträge des Käufers. Bewegung heißt zwanzig Minuten am Stück, ohne Trainingsplan und ohne Belastungsvorgabe.

Der Widerruf bleibt die bestehende [Widerrufsbelehrung](https://dennisabt1-netizen.github.io/blazeridge-shop/widerrufsbelehrung.html). Bei Sofort-Downloads erlischt er nur unter den dort genannten Voraussetzungen (§ 356 Abs. 6 Nr. 2 BGB), über die Pflicht-Checkbox vor der Zahlung. Daran ändert ein leerer Payment Link nichts. Datenschutz und AGB bleiben, weil kein neuer Anbieter dazukommt.

## TikTok, ohne Shop-Tag

Öffentliche Videos tragen keinen TikTok-Shop-Produkt-Tag. Die Produkt-URL wird gesprochen oder als Kommentar angepinnt: `https://dennisabt1-netizen.github.io/blazeridge-shop/product.html?id=<sku>`. Ein klickbarer Profil-Link nur, wenn der Account ihn schon hat, also ab 1.000 Followern oder als verifiziertes Business-Konto. Solange der Payment Link fehlt, sagt das Video „Coming soon“ und schickt nicht auf einen toten Kauf-Button.
