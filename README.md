# BangsamoroPedia Digital Heritage Archive

A static GitHub Pages archive prototype with browser-side full-text search, A–Z title navigation, and paginated results.

## Contents
- `index.html`, `style.css`, `app.js`: archive website and interactive search/navigation
- `data/articles.json`: extracted/OCR text index and metadata for the sample PDFs
- `pdf/`: original sample PDF files

## Features
- Search article titles and indexed PDF text
- Browse by first letter; letters with no matching titles are disabled
- Show 20 results per page
- Sort article titles A–Z or Z–A
- Open original PDFs in a new tab
- Responsive layout for desktop and mobile

## Test locally
Serve this folder through a local web server (for example, VS Code Live Server). Some browsers block `fetch()` from `file://` URLs.

## Publish or update with GitHub Pages
1. Copy the contents of this folder into the root of your `bangsamoropedia-archive` repository, replacing the existing `index.html`, `style.css`, `app.js`, and `README.md`.
2. Keep `data/articles.json` and the `pdf/` folder in place. Do not delete existing indexed entries or PDFs when adding to the archive.
3. Commit and push the changes. GitHub Pages will redeploy automatically.

## Add more PDFs
Each PDF must be placed in `pdf/` and have a matching entry in `data/articles.json`. Entries should include `title`, `filename`, `pages`, `size_bytes`, and `text`; `ocr_used` may be set to `true` if OCR was used. Extract searchable text from digital PDFs and OCR scanned PDFs before adding them. Regenerate the index when the collection changes.

## Important notes
- The text index is a discovery aid. OCR/extraction can contain errors; consult the original PDF for authoritative wording.
- Before making the repository public, confirm that you have the right to redistribute each document.
- This prototype currently indexes only the five sample PDFs.
