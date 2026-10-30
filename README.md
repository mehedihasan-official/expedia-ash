# Expedia-Ash

An Expedia-style travel site built with **Next.js 15 (App Router)**, **TypeScript** and
**Tailwind CSS v4** — same project structure and conventions as the Koala project.
Client and server both run on Next.js. Authentication (Step 2) uses **Firebase Auth**.

## Project plan (5 steps)

| Step | Scope | Status |
| ---- | ----- | ------ |
| 1 | Home page (desktop / tablet / mobile) + header menus | ✅ done |
| 2 | Login + registration (Firebase Authentication, Expedia-style UI) | ✅ done |
| 3 | Post-login dashboard (same structure and resort data as Koala's) | ✅ done |
| History page | built next | ⏳ |
| 4 | _to be defined_ | ⏳ |
| 5 | _to be defined_ | ⏳ |

## What Step 3 adds (dashboard)

`/pages/dashboard` is a port of Koala's owner dashboard, behind the same sign-in guard:

- **Your resorts** — "All Listings (N)", a **year switcher** (kept in the URL: `?year=2025`) and
  the **total payouts** for that year, then one payout card per booking (photo, status pill,
  Ref ID, resort, unit, location, dates, payout).
- **Member story + resort search** (search sends you to the home page search box prefilled via
  `/?q=…`), **"Choose your listing plan"** comparison (Do-It-Yourself vs Full-Service, desktop
  table / phone cards, Michelle C. card), the 90-day guarantee panel, "What guests say", footer.
- The header is the shared Expedia header — its account menu has Dashboard, History, Sign out.
- Restyled with the Expedia palette/fonts; the layout, copy and behaviour follow Koala.

**Resort data** is copied unchanged from Koala into `src/lib/dashboardContent.ts` (5 resorts,
2025 + 2026 bookings, plus the Disney's Animal Kingdom Villas entry). There is no database, same
as Koala: add a resort or a booking to that file and the cards, counter, totals and year list
update by themselves (instructions are at the top of the file). Resort photos live in
`public/images/` (`rsort-img*.webp`, `disney-animal-kingdom.jpg`).

- The company name used in the dashboard copy is one constant: `BRAND_NAME` in
  `src/lib/dashboardContent.ts` (currently "Koala").
- The Disney entry still has Koala's placeholder booking ID `KLXXXXXX`; replace it with the real one.
- `/pages/history` is still a placeholder.

## What Step 2 adds (authentication)

- **`/pages/login`** and **`/pages/register`** — Expedia-style tabbed page: email + password,
  show/hide password, field validation, **Continue with Google**, and **Forgot password?**
  (sends a Firebase reset email). Registration collects first/last name, saves it as the
  display name and sends a verification email.
- After signing in/up you return to the page you came from (`?callbackUrl=`, same-site paths
  only) or the home page. Signed-in users who open the login page are sent straight on.
- **Menus when signed in** (desktop dropdown and the mobile user-icon menu): greeting with your
  email, **Dashboard**, **History**, Inbox, and **Sign out**. The header shows your first name.
- `/pages/dashboard` and `/pages/history` are guarded: signed-out visitors are sent to login and
  brought back afterwards. `/pages/dashboard` is built in Step 3; `/pages/history` is still a placeholder.

### Firebase setup (one time)

1. Firebase console → your project → **Authentication → Get started → Sign-in method**, enable
   **Email/Password** and **Google**.
2. **Authentication → Settings → Authorized domains**: `localhost` is there by default; add your
   deployed domain (e.g. your Vercel domain) before going live.
3. **Project settings → General → Your apps → Web app → Config**: copy the six values into
   `.env.local` (template: `.env.example`, no quotes, no spaces), then restart `npm run dev`.

## What Step 1 includes

- **Header** — logo, *Shop travel* dropdown, currency/language dialog (`USD • 🇺🇸`), List your
  property, Support, Trips, Messages, *Sign in* dropdown.
  On phones the header shows the logo and a **user icon on the right**; tapping it opens the
  account menu (Sign in, Learn more about One Key, Inbox, Shop travel, Support,
  `English · USD · US`, List your property, Trips, Feedback).
- **Hero + search card** — Stays / Flights / Cars / Packages / Things to do / Cruises tabs,
  *Where to?* input, working **date** and **travelers/rooms** pickers, bundle checkbox.
- Packages banner · Last-minute weekend deals (photo arrows + save-heart) · Featured/Promotion
  cards · Bundle & Save panel · Vacation rentals · Stays for every travel style (tabs) · One Key
  banner · Seattle ad (phones only) · "Explore a world of travel" link tabs · Footer · Help button.
- Auth scaffolding already in place for Step 2: `AuthProvider`, `useAuth()`, `RequireAuth`,
  `src/lib/firebase.ts`. The site works without any Firebase config (treated as signed-out).

### Responsive behaviour

| Viewport | Layout |
| -------- | ------ |
| `< 768px` (phone) | Logo + user icon header, stacked search fields, swipeable card rows, 4 service tabs |
| `768 – 1199px` (tablet) | Full header, hero, search fields in one row, 3-up card rows |
| `≥ 1200px` (desktop) | Search "pill", 4-up card rows (custom `desk:` breakpoint in `globals.css`) |

## Run it locally (VS Code)

**Install once**

1. [Node.js](https://nodejs.org) **20 LTS or newer** (includes `npm`) — check with `node -v`.
2. [VS Code](https://code.visualstudio.com) (optional extensions: *ESLint*, *Tailwind CSS IntelliSense*).
3. [Git](https://git-scm.com) — needed for GitHub.

**Start the project**

```bash
cd Expedia-Ash
npm install
npm run dev
```

Open <http://localhost:3000>. (In VS Code: *File → Open Folder…* → `Expedia-Ash`, then
*Terminal → New Terminal* and run the commands above.)

Other scripts: `npm run build` (production build) · `npm run start` · `npm run lint`.

**Firebase (needed from Step 2)** — copy `.env.example` to `.env.local` and fill in your
Firebase web-app config. `.env.local` is git-ignored.

## Upload to GitHub

```bash
cd Expedia-Ash
git init
git add .
git commit -m "Step 1: Expedia home page and menus"
git branch -M main
git remote add origin https://github.com/<your-username>/Expedia-Ash.git
git push -u origin main
```

Create the empty `Expedia-Ash` repository on github.com first (no README / .gitignore).

## Updating content

- Home page copy, prices and image paths → `src/lib/homeContent.ts`
- Images → `public/images/`
- Colors → tokens at the top of `src/app/globals.css` (`bg-xp-blue`, `text-xp-navy`, …)
- Fonts → `Figtree` (body) and `Source Serif 4` (headings), self-hosted via `@fontsource`
  (no network needed at build time) — imported in `src/app/layout.tsx`

> **Placeholder images:** the hotel, destination, rental and banner photos in
> `public/images/` were taken from the reference screenshots so the layout can be
> checked 1:1. Replace them with licensed images (same file names) before going live —
> especially `stay-alicante.jpg`, `stay-wichit.jpg` and `seattle-*.jpg`, which came from
> small mobile/tablet screenshots and are low resolution.

## Project structure

```
src/
  app/
    layout.tsx · page.tsx · globals.css
    pages/
      home/        Hero, SearchCard, PackagesBanner, LastMinuteDeals, HotelCard, PromoCards,
                   BundleSave, VacationRentals, StaysByStyle, OneKeyBanner, SeattleAd,
                   ExploreWorld, SiteFooter
      login/ register/   Step 2 (thin wrappers around components/auth/AuthPage)
      dashboard/   Step 3 (RequireAuth + Koala's dashboard sections)
      history/     placeholder (guarded by RequireAuth)
  components/      SiteHeader, AccountPanel, PreferencesDialog, Logo, UsFlag, HelpButton,
                   AuthProvider, RequireAuth, auth/ (AuthPage, TextField, GoogleIcon),
                   DashboardClient, ResortStub, PricingHero, PricingTable, GuaranteeSection, Testimonials
  lib/             homeContent.ts, dashboardContent.ts (resort data), types.ts, firebase.ts,
                   authErrors.ts, useClickOutside.ts
public/            images/, favicon.svg
```
