# BangsamoroPedia Digital Archive (5-PDF prototype)

This is a starter prototype for a public GitHub Pages archive.

## Contents
- `index.html`, `style.css`, `app.js`: static archive website and browser-side full-text search
- `data/articles.json`: extracted text index for the sample PDFs
- `pdf/`: original sample PDF files

## Test locally
Open `index.html` through a local web server (for example, VS Code Live Server). Some browsers block `fetch()` from `file://` URLs.

## Publish with GitHub Pages
1. Create a **new public repository** named `bangsamoropedia-archive`.
2. Upload the contents of this folder to the repository root, keeping the folder structure.
3. In Settings → Pages, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
4. Wait for the Pages deployment to finish, then open the published URL shown in Settings → Pages.

## Important notes
- The PDFs are the preserved originals. The search index is a separate discovery aid.
- OCR can introduce mistakes; verify wording against the original PDF.
- Before making the repository public, confirm that you have the right to redistribute each document.
- This prototype indexes only the five sample PDFs. Add new entries to `data/articles.json` as the archive grows.
