BangsamoroPedia Archive: Article Viewer with Backlink

Files in this package:
- index.html, app.js, style.css: updated archive page and article links
- article.html, article.js: reusable PDF viewing page with a visible backlink to the archive

Install:
1. Back up the current index.html, app.js, and style.css in D:\GitHub\bangsamoropedia-archive.
2. Copy all five .html/.js/.css files from this package into D:\GitHub\bangsamoropedia-archive, replacing index.html, app.js, and style.css and adding article.html and article.js.
3. Do NOT replace data/articles.json or the pdf folder.
4. In GitHub Desktop, review changes, commit, and Push origin.
5. After GitHub Pages deploys, hard-refresh the archive (Ctrl+F5).

Expected behavior:
- Archive article links open article.html in a new tab.
- The PDF is embedded on the article page.
- Back to Archive Search links are available above and below the PDF.
- The original archive tab remains open so visitors can continue searching without losing their list.

Note: The viewer loads article metadata from data/articles.json and the PDF from pdf/ using the filename in the query string. Do not rename a PDF without regenerating the index.
