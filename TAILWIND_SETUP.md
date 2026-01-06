Tailwind setup

I converted the UI to use Tailwind utility classes in components and pages.

To finish setup locally, run:

1. Install dev deps:

```bash
npm install -D tailwindcss postcss autoprefixer
```

2. Initialize Tailwind (optional if you want to regenerate config):

```bash
npx tailwindcss init -p
```

3. Start dev server:

```bash
npm run dev
```

Notes:

- `tailwind.config.cjs` and `postcss.config.cjs` were added and `src/index.css` includes Tailwind directives.
- If something looks off, run the install step above and restart the dev server.
