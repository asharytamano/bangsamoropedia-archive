(() => {
  const params = new URLSearchParams(window.location.search);
  const filename = params.get('file');
  const titleEl = document.getElementById('article-title');
  const content = document.getElementById('viewer-content');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const encodePath = value => String(value).split('/').map(encodeURIComponent).join('/');

  if (!filename) {
    titleEl.textContent = 'Article not specified';
    content.innerHTML = '<div class="viewer-error">No PDF article was selected. Return to the archive and choose an article.</div>';
    return;
  }

  fetch('data/articles.json').then(response => {
    if (!response.ok) throw new Error('Search index could not be loaded.');
    return response.json();
  }).then(articles => {
    const article = (Array.isArray(articles) ? articles : []).find(item => item.filename === filename);
    if (!article) throw new Error('This article is not listed in the current archive index.');
    const title = article.title || article.filename || 'Untitled article';
    const pdfUrl = 'pdf/' + encodePath(article.filename);
    document.title = title + ' | BangsamoroPedia';
    titleEl.textContent = title;
    content.innerHTML = '<iframe class="pdf-frame" title="PDF article: ' + escapeHtml(title) + '" src="' + pdfUrl + '"></iframe>' +
      '<p class="viewer-note">If the PDF does not display in your browser, <a href="' + pdfUrl + '" target="_blank" rel="noopener">open the original PDF in a new tab</a>.</p>';
  }).catch(error => {
    titleEl.textContent = 'Article unavailable';
    content.innerHTML = '<div class="viewer-error">' + escapeHtml(error.message) + ' Please return to the archive and try another article.</div>';
  });
})();
