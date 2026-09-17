# Porphyra

A React + Vite web app with Firebase authentication, protected routing, and a scroll-driven cinematic image-sequence experience on the Discover page.

**Live:** [porphyra.netlify.app](https://porphyra.netlify.app/)

## Features

- 🔐 **Firebase Authentication** — sign in/out flow with protected and redirect-aware routing
- 🧭 **Route Guarding** — `PrivateRoute` and `RedirectRoute` keep authenticated and public pages properly separated
- 🖼️ **Scroll-Scrubbed Image Sequence** — the Discover page renders an 84-frame sequence as a fixed background, advancing frame-by-frame as the user scrolls
- 📊 **Dashboard & Profile** — authenticated user views for account and content management
- 🎨 **Tailwind CSS + DaisyUI** — utility-first styling with a consistent component design system
- 🧩 **Lucide Icons** — lightweight, consistent iconography throughout the UI

## Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------- |
| Framework        | React (Vite)                    |
| Routing          | React Router                    |
| Auth & Backend   | Firebase                        |
| Styling          | Tailwind CSS, DaisyUI           |
| Icons            | Lucide                          |
| Linting          | Oxlint                          |

## Project Structure

```
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── assets
│   ├── cas-img-seq/          # 84-frame image sequence for the Discover page
│   ├── components
│   │   ├── Navbar/
│   │   └── ui/
│   ├── Context
│   │   └── AuthContext/      # Firebase auth state provider
│   ├── Firebase
│   │   └── firebase.innit.js
│   ├── pages
│   │   ├── Dashboard/
│   │   ├── Discover/
│   │   ├── ErrorPage/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Profile/
│   ├── PrivateRoute/         # Guards authenticated-only routes
│   ├── RedirectRoute/        # Redirects authenticated users away from public routes
│   ├── Root/
│   ├── Router/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A Firebase project with Authentication enabled

### Installation

```bash
git clone https://github.com/mahib-bit/porphyra.git
cd porphyra
npm install
```

### Environment Setup

Configure your Firebase credentials in `src/Firebase/firebase.innit.js` (or via environment variables, depending on your setup).

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Pages

| Route        | Description                                      | Access     |
| ------------ | ------------------------------------------------- | ---------- |
| `/`          | Landing/home page                                  | Public     |
| `/login`     | Firebase authentication                            | Public     |
| `/discover`  | Scroll-driven image sequence experience            | —          |
| `/dashboard` | Authenticated user dashboard                       | Private    |
| `/profile`   | User profile management                            | Private    |
| `*`          | 404 error page                                     | —          |

## License

This project currently has no license specified.
