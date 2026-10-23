BangsamoroPedia homepage and navigation fix

Replace these three files in your local repository:
- index.html
- app.js
- style.css

Do not replace data/articles.json or the pdf folder.

Changes:
1. A-Z letter clicks display matching article results.
2. Typing into search automatically clears any selected letter filter. The page also explicitly tells visitors to click CLEAR before a new search.
3. CLEAR removes both the search term and selected letter.
4. A visible floating “Back to Browse by Letter” link is available and targets the “Browse by first letter” heading, not the very top of the page.
5. JavaScript cache version updated to app.js?v=4.

Install: copy the three files into the root of D:\GitHub\bangsamoropedia-archive, replacing existing versions. Test locally if possible, then commit and push in GitHub Desktop. After GitHub Pages redeploys, use Ctrl+F5.
