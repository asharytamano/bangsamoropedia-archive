let articles=[];
const q=document.getElementById('q'), results=document.getElementById('results'), summary=document.getElementById('summary');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const term=q.value.trim().toLocaleLowerCase();
 const found=articles.map(a=>{const title=a.title.toLocaleLowerCase(), text=(a.text||'').toLocaleLowerCase();let score=0;if(!term)score=1;else{if(title.includes(term))score+=10;if(text.includes(term))score+=1;}return {...a,score};}).filter(a=>a.score>0).sort((a,b)=>b.score-a.score);
 summary.textContent=term?`${found.length} matching document${found.length===1?'':'s'} of ${articles.length}`:`${articles.length} documents in this sample archive`;
 if(!found.length){results.innerHTML='<div class="empty">No matches found. Try another spelling or a broader search term.</div>';return;}
 results.innerHTML=found.map(a=>{
  const raw=a.text||'', idx=term?raw.toLocaleLowerCase().indexOf(term):-1, start=idx>=0?Math.max(0,idx-180):0, excerpt=raw.slice(start,start+460).replace(/\s+/g,' ').trim();
  let snippet=esc(excerpt)+(excerpt.length<raw.length?'…':'');
  if(term && idx>=0){const safeTerm=esc(term);const escaped=esc(excerpt);const re=new RegExp(safeTerm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig');snippet=escaped.replace(re,m=>'<mark>'+m+'</mark>')+(excerpt.length<raw.length?'…':'');}
  const mb=(a.size_bytes/1048576).toFixed(2);
  return `<article class="result"><h2>${esc(a.title)}</h2><div class="meta">${a.pages} pages · ${mb} MB${a.ocr_used?' · OCR text included':''}</div><div class="snippet">${snippet||'No extracted text available.'}</div><div class="actions"><a href="pdf/${encodeURIComponent(a.filename).replace(/%2F/gi,'/')}" target="_blank" rel="noopener">Open original PDF ↗</a></div></article>`;
 }).join('');
}
fetch('data/articles.json').then(r=>{if(!r.ok)throw Error('Could not load index');return r.json()}).then(data=>{articles=data;render()}).catch(()=>{summary.textContent='Could not load the search index. Check that data/articles.json is present.';});
q.addEventListener('input',render);document.getElementById('clear').addEventListener('click',()=>{q.value='';render();q.focus();});
