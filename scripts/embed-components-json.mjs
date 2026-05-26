import fs from 'fs';

const htmlPath = 'c:/Users/sjlov/vox-style-studio/clone-robotics-report.html';
const jsonPath = 'c:/Users/sjlov/vox-style-studio/data/components.json';
const json = fs.readFileSync(jsonPath, 'utf8').trim();
let html = fs.readFileSync(htmlPath, 'utf8');
const tag = `<script type="application/json" id="components-json-embed">${json}</script>`;
html = html.replace(/<script type="application\/json" id="components-json-embed">[\s\S]*?<\/script>/, tag);
fs.writeFileSync(htmlPath, html);
console.log('OK embedded', json.length, 'chars');
