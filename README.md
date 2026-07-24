# Ammar Marikkar — Digital Marketing Portfolio

A personal portfolio site built with React + Vite, showcasing digital marketing
case studies, skills, and results (SEO, paid ads, social, content, email, video).

## Tech stack
- React 18
- Vite
- Plain CSS (CSS variables / design tokens, no framework)

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com and sign in with GitHub.
   - Click "Add New Project", select this repository.
   - Vercel auto-detects Vite. Keep the defaults:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click **Deploy**. You'll get a live URL in under a minute.
   - (Optional) Add your own domain under Project → Settings → Domains.

Every push to `main` will auto-redeploy.

## Customize

- **Content**: edit the data arrays at the top of each component in `src/components/`
  (e.g. `PROJECTS` in `Work.jsx`, `TOOLS` in `Tools.jsx`, `STATS` in `About.jsx`).
- **Colors / fonts**: edit the CSS variables in `src/index.css` under `:root`.
- **Contact form**: currently opens the visitor's email client via `mailto:`.
  Replace the email in `src/components/Contact.jsx` with your own, or swap in a
  form service like Formspree / Web3Forms for a no-reload submission.
