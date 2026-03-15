# Fertilizer Calculator & Seed Spacing Tools

A Next.js gardening calculator website focused on fertilizer calculations and seed spacing tools.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/fertilizer-calculator-and-seed-spaci)

---

## Local Development

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x (or pnpm / yarn)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fertilizer-calculator-and-seed-spaci.git
cd fertilizer-calculator-and-seed-spaci

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Preview

```bash
# Production build
npm run build

# Preview production build locally
npm run start
```

---

## Environment Variables

Create a `.env.local` file in the project root. All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical base URL of the site | `https://fertilizer-calc.com` |
| `NEXT_PUBLIC_GA_ID` | ❌ | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SITE_NAME` | ❌ | Display name used in metadata | `Fertilizer Calculator` |

### `.env.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_NAME=Fertilizer Calculator
```

---

## Deploy to Vercel

1. Click the **Deploy with Vercel** button above, or go to [vercel.com/new](https://vercel.com/new).
2. Import this repository.
3. Add the required environment variables in the Vercel dashboard under **Settings → Environment Variables**.
4. Click **Deploy**.

Vercel will automatically detect Next.js and apply the optimal build settings.

---

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Homepage
└── tools/
    ├── page.tsx        # All tools listing
    └── [slug]/
        └── page.tsx    # Individual tool calculator
components/
├── Header.tsx
└── Footer.tsx
config/
├── site.ts             # Site-wide configuration
└── tools.ts            # Tool definitions and metadata
public/                 # Static assets
vercel.json             # Vercel headers and rewrites config
```

---

## License

MIT