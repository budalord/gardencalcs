# Fertilizer Calculator & Seed Spacing Tools

A Next.js gardening calculator site focused on fertilizer calculations and seed spacing tools.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/fertilizer-calculator-and-seed-spaci)

---

## Local Development

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Steps

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

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL of your deployed site | `https://fertilizer-calc.com` |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SITE_NAME` | No | Override default site name | `Fertilizer Calculator` |

### `.env.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_NAME=Fertilizer Calculator & Seed Spacing Tools
```

---

## Deploy to Vercel

Click the button above or follow these steps:

1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables in the Vercel dashboard
5. Click **Deploy**

---

## Build

```bash
npm run build
npm start
```