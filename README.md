# 🛍️ FreshMart — Shopping Basket App

A React + Redux Toolkit application that lets users select grocery products, apply special offers automatically, and view a calculated bill with savings.

🔗 **Live Demo:** [fresshmart-grocery.netlify.app](https://fresshmart-grocery.netlify.app/)

---

## 📋 Features

- Browse a product catalogue (Bread, Milk, Cheese, Soup, Butter)
- Add/remove items and adjust quantities in the basket
- Special offers applied automatically:
  - 🧀 Buy a Cheese, get a second Cheese free
  - 🍲 Buy a Soup, get a half price Bread
  - 🧈 Get a third off Butter
- Per-item savings displayed inline
- Bill breakdown: Subtotal → Applied Offers → Total Savings → Final Total
- Basket persisted to **Firebase Firestore** (survives page refresh)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| State Management | Redux Toolkit |
| UI Components | Material UI (MUI) v5 |
| Styling | MUI `sx` prop + Tailwind CSS v4 |
| Database | Firebase Firestore |
| Build Tool | Vite |
| Testing | Vitest + React Testing Library |
| Deployment | Netlify |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/prachii-yadav/freshmart.git
cd freshmart

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Run tests

```bash
npm test
```

### Production build

```bash
npm run build
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ProductList.tsx     # Products panel with Add buttons
│   ├── Basket.tsx          # Basket panel with totals
│   └── BasketItem.tsx      # Individual basket row
├── store/
│   ├── basketSlice.ts      # Redux slice (add, increment, decrement, clear)
│   ├── selectors.ts        # Memoised basket summary selector
│   ├── hooks.ts            # Typed useAppDispatch / useAppSelector
│   └── index.ts            # Redux store
├── services/
│   └── firestoreService.ts # Firebase save/load basket
├── utils/
│   └── offers.ts           # Special offers calculation logic
├── data/
│   └── products.ts         # Product catalogue
├── types/
│   └── index.ts            # TypeScript interfaces
├── test/
│   ├── offers.test.ts      # Unit tests for offers logic
│   ├── basketSlice.test.ts # Unit tests for Redux slice
│   └── selectors.test.ts   # Unit tests for selectors
└── firebase.ts             # Firebase initialisation
```

---

## 🏷️ Special Offers Logic

| Offer | Rule |
|---|---|
| Cheese BOGOF | Every 2 cheeses → 1 free |
| Soup + Bread | Each soup gives 1 half-price bread |
| Butter discount | Every butter is 1/3 off |

---

## ✅ Tests

22 unit tests covering:
- All 3 offer rules and edge cases
- Redux reducer actions
- Basket summary selector (including the full screenshot scenario)

```bash
npm test
```

---

## 📦 Deployment

Deployed on **Netlify** with automatic deploys on push to `main`.

Environment variables are configured in Netlify's dashboard (not committed to the repo).
