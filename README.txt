BangsamoroPedia homepage interaction fix

Replace these three files in your local repository root:
- index.html
- app.js
- style.css

Fixes:
- Clicking an active A-Z letter clears any search term, selects that letter, displays the result list, and scrolls to it.
- Show all displays the full alphabetical list and scrolls to the results.
- A Back to Top link appears below results and pagination; its target is the Browse by first letter heading.
- index.html references app.js?v=3 to reduce stale browser caching.

Do not replace data/articles.json or the pdf folder. Test locally if possible, then commit and push these three changed files.
