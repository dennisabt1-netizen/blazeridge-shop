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

## Login

Google Sign-In uses **Google Identity Services**. The public client ID lives in `auth-config.js` (and `auth-config.json`). Authorized JS origin: `https://dennisabt1-netizen.github.io`.

Apple Sign-In is **not** enabled (button hidden / stub only).

Purchases work without logging in. **Do not** put Stripe secret keys (`sk_…`) in this repo. Payment Links already encode the product/price on Stripe’s side.

## Local preview

```bash
cd /path/to/site
python3 -m http.server 8080
```

Open http://localhost:8080/ — note: `<base href="/blazeridge-shop/">` is set for Pages. Locally, either serve under that path or temporarily change the base href to `/` for testing.

## Deploy

Push `main` to `dennisabt1-netizen/blazeridge-shop`. GitHub Pages is enabled from `main` `/` (site root = this folder).
