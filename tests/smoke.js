// Loads index.html with the built-in sample, fixes the planted errors by leaving those rows out,
// writes tests/out/sample.xml. Run: npm i playwright && node tests/smoke.js
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.resolve(__dirname,'../index.html'));
await p.click('#bSample');
const bad=await p.$$eval('.issue.err [data-goto]',e=>[...new Set(e.map(x=>x.textContent.match(/Rad (\d+)/)[1]))]);
for(const r of bad){const bx=await p.$(`input[data-inc][aria-label$=" ${r}"]`);if(bx)await bx.uncheck()}
let g=0;while(await p.$('[data-ackgroup]')&&g++<30)await p.click('[data-ackgroup]');
await p.check('#chkConfirm');
fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'out/sample.xml'),await p.inputValue('#xmlout'));
console.log('banner:',(await p.innerText('#banner')).replace(/\n/g,' | '));await b.close()})();
