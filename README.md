# Rational Cyphy — Website

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed

### Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages auto-reload as you edit.

### Project Structure

```
src/
  app/          # Pages (research, technology, team, careers, contact)
  components/   # Reusable UI components
  lib/          # Shared data and utilities
public/
  assets/       # Images and static files
```

### Editing Content

Most site content lives in `src/lib/data.ts` — team bios, technologies, company info, etc. Page-specific text is in each page's `page.tsx` file under `src/app/`.
