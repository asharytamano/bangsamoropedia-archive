BANGSAMOROPEDIA HOMEPAGE INTRO UPDATE

Files included:
- index.html: adds an introductory welcome panel and instructions.
- app.js: keeps the welcome panel visible on initial load; article results appear only after a search, letter selection, or Show all click.
- style.css: styles the welcome panel to match the existing emerald-and-gold archive design.

Installation:
1. Back up the current index.html and app.js in D:\GitHub\bangsamoropedia-archive.
2. Copy these two files into the repository root, replacing the existing index.html and app.js.
3. Do NOT replace data/articles.json or pdf/. Replace style.css with the included version to apply the intro styling.
4. GitHub Desktop: review changes, commit, and push.
5. Test the live site: initial load should show the introduction without listing A articles. Searching, selecting a letter, and Show all should reveal results.

The update reuses the current app.js behavior and the existing CSS. The welcome panel uses plain semantic HTML and should inherit the page typography, though it will appear unboxed unless you add optional styling.
