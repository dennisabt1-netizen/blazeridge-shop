# BlazeRidge Shop (static)

Dark + ember digital tools storefront. Hosted on **GitHub Pages** (free, static only).

**Live URL:** https://dennisabt1-netizen.github.io/blazeridge-shop/

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Shop | `shop.html` |
| Product | `product.html?id=<sku>` |
| Cart | `cart.html` |
| Checkout | `checkout.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Login | `login.html` |

Cart uses `localStorage`. Checkout uses **Stripe Payment Links** (one link per product). No serverless backend.

## Products / SKUs

Edit `config.js` → `products[]` to add SKUs. Each product needs: `id`, `slug`, `name`, `tag`, `price`, `description`, `longDescription`, `featured`, `paymentLink`.

Current Payment Links (live):

| SKU | Price | Payment Link |
|-----|-------|----------------|
| 27 Money Rules That Stick | €12 | https://buy.stripe.com/6oU9AUcV5gcTeoWb3x5J600 |
| Buyer’s Bias Checklist | €9 | https://buy.stripe.com/5kQ9AUg7h6Cj2Ge6Nh5J601 |
| Habit × Money Tracker | €19 | https://buy.stripe.com/eVqaEYcV57Gn80y1sX5J602 |
| Subscription Audit | €9 | https://buy.stripe.com/8x214og7hd0H94C9Zt5J604 |
| Payday Automation | €9 | https://buy.stripe.com/cNidRaf3d8KreoW8Vp5J606 |
| Debt Snowball | €9 | https://buy.stripe.com/eVq9AU2gr2m30y6b3x5J605 |

## Keys Dennis must provide (optional — for real login)

Purchases work today without these. Fill **public** values only into `config.js` (never commit secrets):

| Key | Where to get it | Purpose |
|-----|-----------------|---------|
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client ID (Web). Authorized JS origin: `https://dennisabt1-netizen.github.io` | Google Sign-In button |
| `APPLE_CLIENT_ID` | [Apple Developer](https://developer.apple.com/) → Certificates, Identifiers & Profiles → Identifiers → Services ID (Sign in with Apple). Return URL / domain for Pages | Apple Sign-In button |
| `FIREBASE_API_KEY` | Firebase Console → Project settings → Web app | Optional free Firebase Auth |
| `FIREBASE_AUTH_DOMAIN` | same | Optional Firebase Auth |
| `FIREBASE_PROJECT_ID` | same | Optional Firebase Auth |

**Do not** put Stripe secret keys (`sk_…`) in this repo. Payment Links already encode the product/price on Stripe’s side.

Stripe Payment Links are already wired. No Stripe publishable key is required for the current Payment Link flow.

## Local preview

```bash
cd /path/to/site
python3 -m http.server 8080
```

Open http://localhost:8080/ — note: `<base href="/blazeridge-shop/">` is set for Pages. Locally, either serve under that path or temporarily change the base href to `/` for testing.

## Deploy

Push `main` to `dennisabt1-netizen/blazeridge-shop`. GitHub Pages is enabled from `main` `/` (site root = this folder).
