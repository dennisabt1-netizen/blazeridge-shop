# Drei Kurse im Stripe-Shop

Verkaufsweg: Produktseite und Stripe Payment Link, sobald der Link existiert. Bis dahin Coming soon, kein Kauf-Button. Kein TikTok-Shop-Listing. Preise aus `00-recherche-coaching-kurse.md`.

| Kurs | SKU | Preis | Seite | Stärkster Hook |
| --- | --- | --- | --- | --- |
| Sechs-Wochen-Kommando | `kurs-disziplin-6w` | 79 € | `product.html?id=kurs-disziplin-6w` | „Drei von drei, oder der Tag ist ausgefallen.“ |
| Habit × Money, sechs Wochen | `kurs-habit-geld-6w` | 99 € | `product.html?id=kurs-habit-geld-6w` | „Preis aufschreiben. Tab zu. Vierundzwanzig Stunden.“ |
| Zwölf-Wochen-Protokoll | `kurs-protokoll-12w` | 149 € | `product.html?id=kurs-protokoll-12w` | „Tag 43 ist kein Neubeginn.“ |

`paymentLink` ist bei allen drei leer. Ein echter Stripe Payment Link wird in `config.js` eingetragen, wenn er existiert. Keine erfundene URL.

Öffentliche TikTok-Videos ohne Shop-Tag. Die URL wird gesprochen oder angepinnt. Profil-Link nur, wenn der Account ihn schon hat.

Das 29-€-Komplett-Bundle bleibt das ZIP der kurzen Blätter. Das Zwölf-Wochen-Protokoll ist ein anderes Produkt.
