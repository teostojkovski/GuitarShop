# Online Guitar Shop

A 3-page React app using Apollo Client and a public GraphQL API to browse guitar brands, explore models with search/filters, and view detailed specification and musicians.

**API:** https://graphql-api-brown.vercel.app/api/graphql

---

## Features

- **Page 1 – Guitar Brands**
  - Fetch & list all brands from the GraphQL API
  - Selecting a brand navigates to models

- **Page 2 – Guitar Models**
  - Lists models for the selected brand
  - **Search** by model name
  - **Filter** by guitar type (e.g., Electric, Acoustic, Bass)
  - Click a model to open details

- **Page 3 – Guitar Details (Bonus)**
  - **Tabs:** Specs | Musicians
  - **Specs:** show all available fields
  - **Musicians:** show 2 at a time
  
- **UX:** Loading and friendly error states across all pages.

---

## Tech Stack

- **React**
- **Apollo Client**
- **React Router**
- **CSS**

---

## Getting Started

### Prerequisites
- **Node.js ≥ 18** and **npm** (or **pnpm**/**yarn**)

### 1) Clone & Install
```bash
git clone <your-repo-url>
cd online-guitar-shop
npm install
npm run dev
