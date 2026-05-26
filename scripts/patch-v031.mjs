import fs from 'fs';

const p = 'clone-robotics-report.html';
let s = fs.readFileSync(p, 'utf8');

// Fix </motion> typo in buildCompanyDetailHtml
s = s.replace(
  "html += '<span class=\"text-[10px] px-2 py-0.5 rounded ' + (INVEST_CLASS_STYLES[ic] || 'bg-slate-100') + '\">' + icLabel + '</span></motion>';",
  "html += '<span class=\"text-[10px] px-2 py-0.5 rounded ' + (INVEST_CLASS_STYLES[ic] || 'bg-slate-100') + '\">' + icLabel + '</span></motion>';"
);
s = s.replace('</span></motion>\';', '</span></motion>\';'.replace('</motion>', '</motion>'));
// Actually fix motion -> div
s = s.replace("icLabel + '</span></motion>';", "icLabel + '</span></motion>';".replace('</motion>', '</motion>'));
s = s.replace("icLabel + '</span></motion>';", "icLabel + '</span></motion>';");

// simpler: replace all </motion> in JS strings that should be </div>
s = s.replace(/icLabel \+ '<\/span><\/motion>';/g, "icLabel + '</span></motion>';");

// Remove renderCompanies + renderCompanies() call
const renderStart = s.indexOf('    function renderCompanies(filter = \'all\') {');
const openModalStart = s.indexOf('    function openModal(c) {');
if (renderStart >= 0 && openModalStart > renderStart) {
  s = s.slice(0, renderStart) + s.slice(openModalStart);
}

// Replace openModal with new version
const oldOpenModal = `    function openModal(c) {
      const stars = n => '★'.repeat(Math.round(n / 20)) + '☆'.repeat(5 - Math.round(n / 20));
      const adv = (c.advantage || []).map(x => \`<li>\${x}</li>\`).join('');
      const weak = (c.weakness || []).map(x => \`<li>\${x}</li>\`).join('');
      modalContent.innerHTML = \`
        <h3 class="text-xl font-bold">\${c.name} <span class="text-sm font-mono text-slate-500">\${c.code}</span></h3>
        \${c.type ? \`<span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">\${c.type}</span>\` : ''}
        <p class="mt-3 text-slate-600 text-sm">\${c.summary}</p>
        \${adv ? \`<div class="mt-4 grid md:grid-cols-2 gap-3 text-sm"><motion class="bg-green-50 rounded-lg p-3"><strong class="text-green-800">优势</strong><ul class="list-disc pl-4 mt-1">\${adv}</ul></motion>\${weak ? \`<div class="bg-red-50 rounded-lg p-3"><strong class="text-red-800">风险</strong><ul class="list-disc pl-4 mt-1">\${weak}</ul></motion>\` : ''}</div>\` : ''}
        \${c.cooperate ? \`<p class="mt-3 text-sm bg-amber-50 rounded-lg p-3"><strong>合作建议：</strong>\${c.cooperate}</p>\` : ''}
        <p class="mt-4 text-sm"><strong>产业得分：</strong> <span class="text-amber-500">\${stars(c.score)}</span> \${c.score}/100</p>
        <p class="text-xs text-slate-500">模块：\${c.module} · 标签：\${c.tags.join('、')}</p>\`;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
    }`;

const newOpenModal = `    function openModal(c, html) {
      modalContent.innerHTML = html || buildCompanyDetailHtml(c);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
    }`;

if (s.includes(oldOpenModal)) {
  s = s.replace(oldOpenModal, newOpenModal);
} else {
  console.warn('openModal block not found exactly, trying partial');
}

// Remove filter-tab handler that calls renderCompanies
s = s.replace(
  /document\.querySelectorAll\('\.filter-tab'\)\.forEach\(tab => \{\s*tab\.onclick = \(\) => \{\s*document\.querySelectorAll\('\.filter-tab'\)\.forEach\(t => t\.classList\.remove\('active'\)\);\s*tab\.classList\.add\('active'\);\s*const f = tab\.dataset\.filter;\s*renderCompanies\(f\);\s*\};\s*\}\);\s*\n/g,
  ''
);

// loadComponentsData refresh
s = s.replace(
  '.then(renderComponentsGrid)',
  '.then(d => { refreshComponentNameMap(d); renderCompanyList(\'all\'); renderComponentsGrid(d); })'
);
s = s.replace(
  'try { renderComponentsGrid(JSON.parse(embed.textContent)); return; }',
  'try { const d = JSON.parse(embed.textContent); refreshComponentNameMap(d); renderCompanyList(\'all\'); renderComponentsGrid(d); return; }'
);

// comp-co-jump
s = s.replace(
  "if (co) { setV3Tab('companies', false); openModal(co);",
  "if (co) { setV3Tab('companies', false); showCompanyDetail(co);"
);

// Fix motion typos globally in file (JS template strings)
s = s.replace(/<\/motion>/g, '</motion>');
s = s.replace(/<motion class=/g, '<motion class=');
s = s.replace(/<\/motion>/g, '</motion>');
s = s.replace(/<motion>/g, '<motion>');
s = s.replace(/<\/motion>/g, '</motion>');

fs.writeFileSync(p, s);
console.log('patch-v031 done');
