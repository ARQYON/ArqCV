# ArqCV — Free CV Builder by ARQYON

> Build a professional CV in minutes. No signup. No watermark. No payment. Instant PDF download.

![ArqCV](https://img.shields.io/badge/ARQYON-ArqCV-4361ff?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Features

- **3 Templates** — Minimal, Modern (sidebar), Classic (two-column header)
- **Live Preview** — See your CV update as you type
- **PDF Export** — High-quality, A4-sized, no watermark
- **Accent Color** — 6 presets + custom color picker; updates the entire CV live
- **Auto-save** — Your data is saved in the browser automatically
- **JSON Export/Import** — Back up your CV as a file and restore it on any device
- **No account required** — Nothing is stored on any server

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ARQYON/ArqCV.git
cd ArqCV

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## Tech Stack

| Layer       | Tech                        |
|-------------|----------------------------|
| Frontend    | React 18 + Vite             |
| Styling     | Tailwind CSS                |
| PDF Export  | html2canvas + jsPDF         |
| Icons       | lucide-react                |
| State       | React Context + localStorage|

---

## Project Structure

```
src/
├── components/
│   ├── form/          # Input forms (Personal, Experience, Education, Skills, Projects)
│   ├── layout/        # Header, FormPanel, IOToolbar
│   └── preview/       # Templates + PreviewPanel + TemplateSelector
├── context/           # CVContext — global state + localStorage
├── data/              # defaultCV schema
└── utils/             # cvIO.js — JSON export/import
```

---

## Roadmap

- [x] 3 CV templates
- [x] Live preview
- [x] PDF download
- [x] Accent color picker
- [x] Auto-save to localStorage
- [x] JSON export / import
- [ ] Section drag-and-drop reordering
- [ ] More templates
- [ ] Share CV as a public link

---

## License

MIT © [ARQYON](https://github.com/ARQYON)

---

<p align="center">Built with ❤️ by <a href="https://github.com/ARQYON">ARQYON</a></p>
