let articles=[];
const PAGE_SIZE=20;
let selectedLetter='';
let currentPage=1;
const q=document.getElementById('q');
const results=document.getElementById('results');
const summary=document.getElementById('summary');
const alphabet=document.getElementById('alphabet');
const pagination=document.getElementById('pagination');
const sort=document.getElementById('sort');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const firstLetter=a=>((a.title||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').charAt(0).toLocaleUpperCase().match(/[A-Z]/)||['#'])[0];
function renderAlphabet(){
 const counts={}; articles.forEach(a=>{const l=firstLetter(a);counts[l]=(counts[l]||0)+1;});
 alphabet.innerHTML='';
 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter=>{
  const b=document.createElement('button'); b.type='button'; b.className='letter'+(selectedLetter===letter?' active':'');
  b.textContent=letter; b.title=counts[letter]?`${counts[letter]} article${counts[letter]===1?'':'s'} beginning with ${letter}`:`No titles beginning with ${letter}`;
  b.disabled=!counts[letter]; b.setAttribute('aria-pressed',String(selectedLetter===letter));
  b.addEventListener('click',()=>{selectedLetter=selectedLetter===letter?'':letter;currentPage=1;renderAlphabet();render();}); alphabet.appendChild(b);
 });
 if(counts['#']){const b=document.createElement('button');b.type='button';b.className='letter'+(selectedLetter==='#'?' active':'');b.textContent='#';b.title=`${counts['#']} titles with a non-letter first character`;b.setAttribute('aria-pressed',String(selectedLetter==='#'));b.addEventListener('click',()=>{selectedLetter=selectedLetter==='#'?'':'#';currentPage=1;renderAlphabet();render();});alphabet.appendChild(b);}
}
function makeExcerpt(a,term){
 const raw=(a.text||'').replace(/\s+/g,' ').trim();
 if(!raw)return 'No extracted text available. Open the original PDF to read it.';
 const lower=raw.toLocaleLowerCase(); const idx=term?lower.indexOf(term):-1;
 const start=idx>=0?Math.max(0,idx-150):0; const excerpt=raw.slice(start,start+360);
 if(!term||idx<0)return esc(excerpt)+(start+360<raw.length?'…':'');
 const escaped=esc(excerpt); const safe=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 return escaped.replace(new RegExp(safe,'ig'),m=>'<mark>'+m+'</mark>')+(start+360<raw.length?'…':'');
}
function render(){
 const term=q.value.trim().toLocaleLowerCase();
 let found=articles.filter(a=>{
  if(selectedLetter&&firstLetter(a)!==selectedLetter)return false;
  if(!term)return true;
  return (a.title||'').toLocaleLowerCase().includes(term)||(a.text||'').toLocaleLowerCase().includes(term);
 });
 found.sort((a,b)=>{const cmp=(a.title||'').localeCompare(b.title||'',undefined,{sensitivity:'base'});return sort.value==='title-desc'?-cmp:cmp;});
 const total=found.length; const pages=Math.max(1,Math.ceil(total/PAGE_SIZE)); currentPage=Math.min(currentPage,pages);
 const start=(currentPage-1)*PAGE_SIZE; const visible=found.slice(start,start+PAGE_SIZE);
 let descriptor=term?'matching document':selectedLetter?`title beginning with ${selectedLetter}`:'document';
 summary.textContent=`${total} ${descriptor}${total===1?'':'s'}${term||selectedLetter?'':' in the archive'}${total?` · Showing ${start+1}–${Math.min(start+PAGE_SIZE,total)}`:''}`;
 results.innerHTML='';
 if(!visible.length){results.innerHTML='<div class="empty">No matches found. Try another spelling, clear the search, or choose a different letter.</div>';pagination.innerHTML='';return;}
 visible.forEach(a=>{
  const card=document.createElement('article');card.className='result';
  const h=document.createElement('h2');h.textContent=a.title||a.filename||'Untitled document';card.appendChild(h);
  const meta=document.createElement('div');meta.className='meta';const size=(Number(a.size_bytes||0)/1048576).toFixed(2);meta.textContent=`${a.pages||'?'} pages · ${size} MB${a.ocr_used?' · OCR text included':''}`;card.appendChild(meta);
  const snippet=document.createElement('div');snippet.className='snippet';snippet.innerHTML=makeExcerpt(a,term);card.appendChild(snippet);
  const actions=document.createElement('div');actions.className='actions';const link=document.createElement('a');link.href='pdf/'+String(a.filename||'').split('/').map(encodeURIComponent).join('/');link.target='_blank';link.rel='noopener';link.textContent='Open original PDF ↗';actions.appendChild(link);card.appendChild(actions);results.appendChild(card);
 });
 renderPagination(pages);
}
function renderPagination(pages){
 pagination.innerHTML=''; if(pages<=1)return;
 const addButton=(label,page,disabled=false,active=false)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;b.className=active?'page-button active':'page-button';if(active)b.setAttribute('aria-current','page');b.addEventListener('click',()=>{currentPage=page;render();document.getElementById('browse-title').scrollIntoView({behavior:'smooth',block:'start'});});pagination.appendChild(b);};
 addButton('← Previous',Math.max(1,currentPage-1),currentPage===1);
 const windowStart=Math.max(1,Math.min(currentPage-2,pages-4));const windowEnd=Math.min(pages,windowStart+4);
 for(let p=windowStart;p<=windowEnd;p++)addButton(String(p),p,false,p===currentPage);
 addButton('Next →',Math.min(pages,currentPage+1),currentPage===pages);
}
fetch('data/articles.json').then(r=>{if(!r.ok)throw Error('Could not load index');return r.json();}).then(data=>{articles=Array.isArray(data)?data:[];renderAlphabet();render();}).catch(()=>{summary.textContent='Could not load the search index. Check that data/articles.json is present.';});
q.addEventListener('input',()=>{currentPage=1;render();});
sort.addEventListener('change',()=>{currentPage=1;render();});
document.getElementById('clear').addEventListener('click',()=>{q.value='';currentPage=1;render();q.focus();});
document.getElementById('all').addEventListener('click',()=>{selectedLetter='';currentPage=1;renderAlphabet();render();});
