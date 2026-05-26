import fs from 'fs';
const p = new URL('../clone-robotics-report.md', import.meta.url);
let lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
let n = 0;
let start = -1;
let end = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '## §0 图谱全部节点') {
    n++;
    if (n === 2) start = i;
  }
  if (n === 2 && lines[i] === '## 投资透镜（INVEST_META）') {
    end = i;
    break;
  }
}
if (start >= 0 && end > start) lines.splice(start, end - start);

const s9 = `## §9 组合构建与评分方法论

**v1（现行）：** 相关 35% · 能见度 30% · 弹性 20% · 质量 15% — 见 \`data/scoring-config.json\`

**升级版（草案）：** industryRelevance 20% · orderVerification 20% · revenueContribution 15% · marginElasticity 15% · valuationMargin 15% · financialQuality 10% · infoCredibility 5%

**研究组合暴露控制：** 核心模拟暴露 8–10% · 卫星 3–5% · 单环节 25% · 单客户链 30% · 主题 15–25%

**网页交互（静态导出不含）：** 勾选 18 家标的、HHI 环节分散奖励、组合得分与 §0 图谱绿色高亮联动。
`.trimEnd().split('\n');

const idx = lines.findIndex((l) => l.startsWith('## §6 公司图谱'));
if (idx >= 0 && !lines.some((l) => l.startsWith('## §9 '))) {
  lines.splice(idx, 0, ...s9, '');
}

const csv = fs
  .readFileSync(new URL('../data/companies.csv', import.meta.url), 'utf8')
  .trim()
  .split('\n')
  .slice(1);
const scores = new Map(csv.map((r) => {
  const c = r.split(',');
  return [c[1], c[13]];
}));
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\| ([^|]+) \| (\d{6}) \|/);
  if (m && scores.has(m[1])) {
    const parts = lines[i].split('|').map((x) => x.trim());
    if (parts.length >= 8) {
      parts[7] = scores.get(m[1]);
      lines[i] = '| ' + parts.slice(1, parts.length - 1).join(' | ') + ' |';
    }
  }
}

const ri = lines.findIndex((l) => l.includes('下列为 v0.3 主清单摘要'));
if (ri >= 0 && !lines[ri + 1]?.includes('公司 |')) {
  lines.splice(
    ri + 1,
    0,
    '| 公司 | 代码 | 映射生态 | 分级 | 备注 |',
    '| --- | --- | --- | --- | --- |'
  );
  if (lines[ri + 2] === '| --- | --- | --- | --- | --- |') lines.splice(ri + 2, 1);
}

fs.writeFileSync(p, lines.join('\n') + '\n');
console.log('fixed', lines.length, 'lines');
