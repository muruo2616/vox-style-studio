import fs from 'fs';
import vm from 'vm';

const htmlPath = 'c:/Users/sjlov/vox-style-studio/clone-robotics-report.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptMatch = html.match(/<script>\s*mermaid\.initialize[\s\S]*?<\/script>/);
if (!scriptMatch) throw new Error('Script block not found');
const js = scriptMatch[0].replace(/<\/?script>/g, '');

function extractConst(name) {
  const re = new RegExp(`const ${name}\\s*=\\s*`);
  const start = js.search(re);
  if (start < 0) return null;
  let i = js.indexOf('=', start) + 1;
  while (js[i] === ' ') i++;
  const open = js[i];
  if (open !== '{' && open !== '[') {
    const semi = js.indexOf(';', i);
    return js.slice(i, semi).trim();
  }
  const close = open === '{' ? '}' : ']';
  let depth = 0, inStr = false, strCh = '', esc = false;
  for (let j = i; j < js.length; j++) {
    const c = js[j];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return js.slice(i, j + 1);
    }
  }
  return null;
}

const sandbox = {};
vm.createContext(sandbox);

const names = [
  'BACKBONE_FACTS', 'industryGraphMeta', 'INVEST_META', 'STRUCT_LAYERS', 'SOCIAL_CLUE_POOL',
  'routeCatalog', 'routeLeaders', 'routeLeadersExtra', 'milestoneData', 'wizardSteps',
  'COMPANY_FACTORS', 'PF_WEIGHTS', 'PF_LABELS', 'KILL_THRESHOLDS', 'INVEST_CLASS_LABELS'
];

for (const name of names) {
  const body = extractConst(name);
  if (!body) { console.warn('missing', name); continue; }
  try {
    vm.runInContext(`globalThis.${name} = ${body};`, sandbox);
  } catch (e) {
    console.warn('eval fail', name, e.message);
  }
}

// companies needs computeStockScore - inline simplified
const companiesBody = extractConst('companies');
if (companiesBody) {
  vm.runInContext(`globalThis.companies = ${companiesBody};`, sandbox);
  const cf = sandbox.COMPANY_FACTORS || {};
  const W = { relevance: 0.35, visibility: 0.30, elasticity: 0.20, quality: 0.15 };
  sandbox.companies.forEach(c => {
    const f = cf[c.id] || { relevance: c.score, visibility: c.score, elasticity: c.score, quality: c.score };
    c.factors = f;
    c.score = Math.round(W.relevance * f.relevance + W.visibility * f.visibility + W.elasticity * f.elasticity + W.quality * f.quality);
  });
}

function mdTable(headers, rows) {
  const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ').replace(/<[^>]+>/g, '');
  let out = '| ' + headers.map(esc).join(' | ') + ' |\n| ' + headers.map(() => '---').join(' | ') + ' |\n';
  for (const row of rows) out += '| ' + row.map(esc).join(' | ') + ' |\n';
  return out;
}

const L = [];
const push = (s = '') => L.push(s);

push('# 人形机器人产业链知识图谱与路线对比');
push('');
push('> **来源：** `clone-robotics-report.html`（交互网页版）');
push('> **导出日期：** 2026-05-25');
push('> **性质：** 产业研究 · 事实优先 · 非投资建议');
push('');

push('## 报告概览');
push('');
push('| 指标 | 数值 |');
push('| --- | --- |');
push('| Clone Alpha 限量台数 | 279 |');
push('| 立讯 2025 人形出货（调研预期） | ~3000 台 · 待财报 |');
push('| IDC 2025 全球人形出货 | ~1.8 万台 |');
push('| IDC 2025 全球销售额（窄） | ~$4.4 亿 |');
push('| A 股产业链标的池 | 18 家 |');
push('');

push('## 推荐阅读路径');
push('');
push('1. **§0 结构图谱** — 从热点入口选节点，看供应链归属与详情');
push('2. **§0.2 证据分级 + §0b/§0c** — Tier1–4 与核验标签（社媒仅 Tier 4）');
push('3. **§1–6 研究正文** — 路线对比、供应链与中国承接');
push('4. **§0 交付状态定义** — 区分下线/部署/商业交付/财务确认');
push('5. **§0d 投资联动** — 五层透镜、四步工作流（完整版）');
push('6. **§7–10 决策模块** — KPI 情景 · 组合 · 里程碑 · BP（非买卖指令）');
push('');
push('**产业研究读者：** ①→②→③；**投资研究读者：** ③ 后回到 ①，按 §0d 串联透镜与决策模块。');
push('');

push('## §0.1 数据时效与口径');
push('');
push('2025 实际出货以 IDC tracker 为准（~1.8 万台）；销售额窄口径 ~$4.4 亿。RnM/FMI $1.9–7.8B 与 IDC 可能存在统计边界差异，**不可横比**；宜拆分为硬件本体销售额 / 广义产业链规模 / TAM 预测三类分别呈现。');
push('');
push('## §0.2 证据分级体系');
push('');
push(mdTable(['层级', '来源', '可用于投资决策'], [
  ['Tier 1', '官方公告/年报/监管', '是'],
  ['Tier 2', '权威媒体/产业调研', '是（交叉验证）'],
  ['Tier 3', '单一媒体/券商/访谈', '谨慎'],
  ['Tier 4', '社媒/传闻', '否']
]));
push('');
push('核验标签：**verified** · **reported**（已披露预期/待财务验证）· **inferred** · **pending**');
push('');
push('## §0.2b 交付状态定义');
push('');
push(mdTable(['状态', '定义', '投资含义'], [
  ['下线', '工厂完成生产或装配', '验证制造能力，≠ 销售'],
  ['内部部署', '公司自用或测试场景运行', '验证稳定性，≠ 客户订单'],
  ['客户试点', '客户现场测试或小规模部署', '验证商业兴趣，仍待转采购'],
  ['商业交付', '向付费客户交付产品', '验证销售，仍需收入确认'],
  ['财务确认', '进入财报收入或分部披露', '可标里程碑 verifyTier=financial']
]));
push('');
push('## §0.3 更新日志');
push('');
push('- **2026-05-25 v0.3** — 第三轮评审：交付状态定义；图谱节点全局同步；宇树口径拆分；Kill 悬挂工程化；研究模拟权重措辞；§6b v0.2 占位；§10c 结论重写；`data/nodes.json` 等基础数据文件');
push('- **2026-05-25 v0.2** — 第二轮评审：证据表、对华承接公式、TRL/开源、BOM/估值骨架、风控与反证；立讯里程碑默认待财务验证');
push('- **2026-05-24** — 首版交互报告与 Markdown 导出');
push('');

// Static section content
push('## §0.4 产业链结构图谱');
push('');
push('自上而下四层结构：**热点入口 → 技术路线与整机 → 供应链环节 → 跨路线关联**。主图为分层框图；底部「跨路线关联」列出多生态共用供应商等网状互联。');
push('');
push('**筛选器：** 全部 · 热点入口 · 骨干公司 · 供应链环节 · 技术赛道 · 观察池 · 弱叙事 · 投资分层 · §9组合池');
push('');

push('## §0d 阅读指引 · 投资联动（完整版）');
push('');
push('把 **InvestmentMap v1.0**（五层投资模型）与 §0 结构图谱、§0b 事实档案、§7–10 决策模块对齐。');
push('用法：**结构图选节点 → 右侧看投资透镜 → 里程碑验证假设 → KPI/组合复核研究权重**。非买卖指令。');
push('');
push('### 四步工作流');
push('');
push('1. **事实层 · §0 / §0b** — 点击节点，先看证据分级与供应链归属；社媒线索仅 Tier 4');
push('2. **五层透镜 · 右侧栏** — L1 价值→L5 风控；研究暴露分层与 Kill 条件');
push('3. **可证伪 · §10 里程碑** — 勾选催化是否兑现，更新主题置信度');
push('4. **情景模拟 · §7–9 / BP** — KPI 三情景同步透镜 L4；§9 勾选组合 → §0 绿色高亮');
push('');
push('### 产业五层 ↔ 网页模块');
push('');
push('| 投资层 | 本报告模块 |');
push('| --- | --- |');
push('| L1 路线价值 | §0 第二层路线 · §3 路线对比 |');
push('| L2 客观约束 | §0b 事实档案 · §4 供应链 · §0c 线索池 |');
push('| L3 市场预期 | §1 摘要 · 跨路线关联 |');
push('| L4 概率赔率 | §7 KPI · §8 向导 · §9 组合 |');
push('| L5 风险控制 | §10 里程碑 Kill · §10b BP 规模上限 |');
push('');

push('## §1 执行摘要');
push('');
push('对华承接分 = 供应链重叠×30% + 供应商确定性×25% + 量产能见度×25% + 国产替代×10% + 订单验证×10%（研报映射，非回归模型）。');
push('');
push('2025–2026 全球人形机器人呈**多路线并行**——电驱路线在工厂部署或本土量产上推进更快，对中国供应链拉动集中在**减速器 · 电机 · 传感 · 代工**；仿生液压路线仍处**限量预售/原型**阶段，对中国映射偏**材料 · 柔性传感 · 微型液压**。');
push('');
push('**电驱路线共性：** Figure 与 Tesla 同属电驱+谐波/丝杠范式，BOM 与中国零部件高度重叠；立讯 ~3000 台主要服务此类客户。');
push('');
push('**仿生路线映射：** Clone Myofiber 在执行器、流体系统、皮肤传感上与电驱完全不同；中国优势在材料工程化、柔性传感、3D 打印骨骼。');
push('');

if (sandbox.routeLeaders) {
  push('### 主线代表（四路线锚点）');
  push('');
  push(mdTable(['公司', '路线', '阶段', '对华承接', '主要中国环节'], sandbox.routeLeaders.map(r => [
    r.name, r.route, r.stage, r.chinaScore + '/100', r.china
  ])));
  push('');
  sandbox.routeLeaders.forEach(r => {
    push(`**${r.name}：** ${r.impact.replace(/<[^>]+>/g, '')}`);
    if (r.chinaRationale) push(`- 对华分项：${r.chinaRationale}`);
    push('');
  });
}

if (sandbox.routeLeadersExtra) {
  push('### 扩展对比（宇树、Agility、1X、智元、云深处）');
  push('');
  push(mdTable(['公司', '路线', '阶段', '对华承接'], sandbox.routeLeadersExtra.map(r => [r.name, r.route, r.stage, r.chinaScore + '/100'])));
  push('');
}

push('## §2 Clone Robotics 公司画像');
push('');
push('### 已核验事实');
push('');
push('- **总部：** 波兰弗罗茨瓦夫；2021 年 11 月成立');
push('- **Myofiber：** 单纤维约 3g、<50ms 响应、>30% 空载收缩、约 1kg 拉力');
push('- **Protoclone：** 206 节骨骼、1000+ Myofiber、320 路压力传感、4 深度相机、500W 液压泵；多需悬挂支撑');
push('- **Clone Alpha：** 仅 279 台；2025 预购、约 2 万美元量级、2026 交付目标');
push('');
push('### 截至 2026-05-25 · 验证状态');
push('');
push('- **已确认：** 279 台限量、2025 预购窗口、约 2 万美元定价、16 项预装技能（多源交叉）');
push('- **待核实：** 2026-05 首批家庭交付？Alpha 是否消除悬挂依赖？故障率与维护成本？');
push('- **透镜调整：** 交付启动 → 确定性「待验证」；延期>6月或交付率<50%或悬挂>30% → §10 Kill');
push('');
push('### 产品演进');
push('');
push('| 阶段 | 里程碑 | 国产映射 |');
push('| --- | --- | --- |');
push('| 2021 Myofiber | 人工肌肉材料验证 | 弹性体、微型液压 |');
push('| 2022 Clone Hand | 灵巧手验证 | 柔性传感、肌纤维执行器 |');
push('| 2024–25 Protoclone | 全身原型 | 3D打印骨骼、泵阀、传感、视觉 |');
push('| 2025 Alpha | 279台预购 | 代工、Jetson模组 |');
push('| 2026 交付 | 量产窗口 | 立讯整机组装 |');
push('');
push('### 子系统 ↔ 国产环节');
push('');
push('| Clone 子系统 | 潜在国产环节 |');
push('| --- | --- |');
push('| 聚合物骨骼 | 铂力特/华曙 3D打印、拓普复材 |');
push('| 微型液压泵阀 | 中鼎、富创精密、亚德客 |');
push('| 压力/柔性传感 | 汉威 300007 / 苏州能斯达 |');
push('| 视觉/算力 | 奥比中光 688322、Jetson生态 |');
push('| 规模代工 | 立讯精密 002475 |');
push('');

if (sandbox.routeCatalog) {
  push('## §3 技术路线对比（五路线）');
  push('');
  push(mdTable(['路线', '技术路径', '代表厂商', '难度', '2026能见度', '2025出货', '2026目标', '中国环节', '成熟度'], sandbox.routeCatalog.map(r => [
    r.name, r.tech, r.vendors, r.diff, r.visibility, r.ship2025 || '—', r.target2026 || '—', r.cn, r.maturity
  ])));
  push('');
  sandbox.routeCatalog.forEach(r => { push(`- **${r.name}：** ${r.detail}`); });
  push('');
}

push('## §3.1 TRL 对照');
push('');
push(mdTable(['品类', 'TRL', '说明'], [
  ['工业协作臂', '8–9', '成熟商用'],
  ['四足/轮式', '7–8', '宇树等规模出货'],
  ['电驱人形', '5–7', 'IDC ~1.8万台'],
  ['仿生液压', '3–5', 'Clone 预购/原型'],
  ['家庭通用人形', '3–5', '成本与安全未解']
]));
push('');
push('## §3b 开源与仿真栈');
push('');
push(mdTable(['层级', '代表生态', '对人形机器人的意义'], [
  ['Middleware', 'ROS 2', '降低整机软件集成成本；生态成熟利好中小整机厂与多机型并行开发'],
  ['Simulation', 'MuJoCo · Isaac Sim/Lab', '强化学习/控制迭代与 sim-to-real；合成数据缩短感知-操作闭环'],
  ['Dynamics', 'Drake · Pinocchio', '多体/运动学建模与规划验证；偏研发与高端控制，非量产环节'],
  ['Manipulation', 'ManiSkill · robomimic', '操作技能 benchmark 与模仿学习框架；推动策略可比性与部署加速'],
  ['Dataset', 'Open X-Embodiment', '跨本体数据共享；可能削弱单厂数据壁垒，利好通用基座模型'],
  ['Industrial', 'EtherCAT · CAN · DDS', '产线实时通信与多关节同步；决定量产节拍、安全联锁与 OTA 可维护性']
]));
push('');
push('## §4 供应链图谱');
push('');
push('圆环环节：减速器 · 电机 · 丝杠 · 传感 · 视觉 · 代工 · 热管理 · 控制器等，点击节点查看 A 股映射与成熟度。');
push('');
const bomPath = 'c:/Users/sjlov/vox-style-studio/data/bom-supply-chain.json';
if (fs.existsSync(bomPath)) {
  const bom = JSON.parse(fs.readFileSync(bomPath, 'utf8'));
  push('## §4b BOM 骨架（草案）');
  push('');
  push('### 电驱人形');
  push('');
  push(mdTable(['模块', '单机用量', '价值量', '置信度', 'A股映射'], bom.electricHumanoid.items.map(it => [
    it.module, it.qtyPerUnit, it.valuePerUnit, it.confidence, it.cnLeaders
  ])));
  push('');
  push('### 仿生液压');
  push('');
  push(mdTable(['模块', '单机用量', '价值量', '置信度', 'A股映射'], bom.bionicHumanoid.items.map(it => [
    it.module, it.qtyPerUnit, it.valuePerUnit, it.confidence, it.cnLeaders
  ])));
  push('');
}

push('## §5 中国承接机会');
push('');
push('- **2025 实际出货（IDC，2026-01）：** 全球约 **1.8 万台**（+508% YoY），销售额约 **$4.4 亿**；智元 5100+、宇树 reported 5500+（口径待核验）；优必选工业全尺寸 **1079 台**');
push('- **量产承接（高置信）：** 立讯 ~3000 台为**代工调研预期**（待财报），与整机厂合计不可直接相加；约 50 亿元机器人基地');
push('- **仿生支线（低置信、高弹性）：** Clone 2025 实际交付 0（279 预购）；首批家庭交付待核实');
push('- **市场规模口径（勿横比）：** IDC 窄口径 $4.4 亿；信通院白皮书 ~170 亿元（广义产业链）；旧 RnM/FMI $1.9–7.8B 预测已过时');
push('');
push('### Clone 路线六层供应链（A1–A6）');
push('');
push('| 层级 | 环节 | 要点 |');
push('| --- | --- | --- |');
push('| A1 | 人工肌肉/流体执行器 | Myofiber 弹性体、编织纤维 |');
push('| A2 | 流体动力系统 | 微型泵、比例阀、密封件 |');
push('| A3 | 仿生骨骼 | 3D打印聚合物骨骼 |');
push('| A4 | 高密度传感 | 320路压力、4深度相机 |');
push('| A5 | 控制与算力 | Jetson Thor、边缘AI |');
push('| A6 | 整机装配 | 装配、密封测试、品控 |');
push('');

if (sandbox.BACKBONE_FACTS) {
  push('## §0b 骨干公司事实档案（5 家）');
  push('');
  for (const f of Object.values(sandbox.BACKBONE_FACTS)) {
    push(`### ${f.label}${f.code ? ' (' + f.code + ')' : ''}`);
    push('');
    push(`- **路线/阶段：** ${f.route} · ${f.stage}`);
    push(`- **摘要：** ${f.summary}`);
    push(`- **壁垒：** ${f.moat}`);
    push(`- **可替代性：** ${f.replace}`);
    push(`- **对华关联：** ${f.chinaLink?.text}`);
    push('');
    push('**可核验事实：**');
    (f.facts || []).forEach(x => push(`- [${x.level}] ${x.text}`));
    push('');
    if (f.openQuestions?.length) push('**待核实：** ' + f.openQuestions.join('；') + '\n');
  }
}

if (sandbox.SOCIAL_CLUE_POOL) {
  push('## §0c 社媒线索池（41 条）');
  push('');
  push(mdTable(['公司', '代码', '映射生态', '分级', '备注'], sandbox.SOCIAL_CLUE_POOL.map(c => [
    c.name, c.code, c.ecosystems, c.tier, c.note
  ])));
  push('');
}

if (sandbox.STRUCT_LAYERS) {
  push('## §0 四层结构布局');
  push('');
  sandbox.STRUCT_LAYERS.forEach(layer => {
    push(`### ${layer.title}`);
    push('');
    if (layer.hint) push(layer.hint);
    if (layer.nodes) push('\n节点：' + layer.nodes.join(' · '));
    if (layer.routes) layer.routes.forEach(rt => push(`- **${rt.title}：** ${[rt.routeId, ...rt.nodes].join(', ')}`));
    if (layer.supply) layer.supply.forEach(box => push(`- **${box.title}：** ${[box.layerId, ...box.nodes].join(', ')}`));
    if (layer.watch?.length) push('\n观察池：' + layer.watch.join(' · '));
    if (layer.narrative?.length) push('\n弱叙事：' + layer.narrative.join(' · '));
    push('');
  });
}

if (sandbox.industryGraphMeta) {
  push('## §0 图谱全部节点');
  push('');
  for (const [id, m] of Object.entries(sandbox.industryGraphMeta)) {
    push(`### ${m.label} (\`${id}\`)`);
    push('');
    push(`- 类型：${m.kind}${m.hot ? ' · 热点' : ''}${m.tier ? ' · Tier' + m.tier : ''}`);
    push(`- 摘要：${m.summary}`);
    if (m.moat) push(`- 壁垒：${m.moat}`);
    if (m.replace) push(`- 可替代性：${m.replace}`);
    if (m.evidence) push(`- 证据：${m.evidence}`);
    push('');
  }
}

if (sandbox.INVEST_META) {
  push('## 投资透镜（INVEST_META）');
  push('');
  for (const [id, inv] of Object.entries(sandbox.INVEST_META)) {
    push(`### ${id}`);
    push('');
    const weightLabels = { core: '核心研究权重', satellite: '卫星模拟暴露', event: '催化事件', watch: '观察跟踪', skip: '不参与' };
    push(`研究权重 **${weightLabels[inv.position] || inv.position}** · 确定性 ${inv.certainty} · 赔率 ${inv.odds}`);
    if (inv.layers) Object.entries(inv.layers).forEach(([k, v]) => push(`- ${k}：${v}`));
    push(`- Kill：${inv.kill}`);
    if (inv.killQuant) push(`- Kill 量化：${inv.killQuant}`);
    push('');
  }
}

push('## §9 组合构建与评分方法论');
push('');
const scorePath = 'c:/Users/sjlov/vox-style-studio/data/scoring-config.json';
if (fs.existsSync(scorePath)) {
  const sc = JSON.parse(fs.readFileSync(scorePath, 'utf8'));
  push(`**v1（现行）：** 相关 ${sc.weights.relevance * 100}% · 能见度 ${sc.weights.visibility * 100}% · 弹性 ${sc.weights.elasticity * 100}% · 质量 ${sc.weights.quality * 100}% — 见 \`data/scoring-config.json\``);
  push('');
  push('**升级版（草案）：** ' + Object.entries(sc.v2Draft.weights).map(([k, v]) => `${k} ${Math.round(v * 100)}%`).join(' · '));
  push('');
  push('**研究组合暴露控制：** 核心模拟暴露 8–10% · 卫星 3–5% · 单环节 25% · 单客户链 30% · 主题 15–25%');
  push('');
}

if (sandbox.companies) {
  push('## §6 公司档案池（18 家）');
  push('');
  push('**评分：** 0.35×产业相关度 + 0.30×量产能见度 + 0.20×估值弹性 + 0.15×质量确定性');
  push('**组合：** 等权均分 + HHI 环节分散奖励（最高 +8 分）');
  push('');
  const icLabels = sandbox.INVEST_CLASS_LABELS || { order: '订单验证型', bom: 'BOM高相关型', map: '逻辑映射型', theme: '主题传闻型' };
  push(mdTable(['公司', '代码', '分类', '模块', '得分', '标签', '摘要'], sandbox.companies.map(c => [
    c.name, c.code, icLabels[c.investClass] || c.investClass || '—', c.module, c.score, (c.tags || []).join('/'), c.summary
  ])));
  push('');
  push('## §6b 估值模块（草案 · 待财报）');
  push('');
  push('本模块尚未接入市值、PE、PS、PB、机器人收入占比、估值分位和现金流数据，因此当前 §6 评分不构成估值安全边际判断。');
  push('');
  push(mdTable(['公司', '市值', 'PE', '机器人收入占比', '订单验证', '估值分位', '安全边际'],
    sandbox.companies.map(c => [c.name, '待填', '待财报', '待财报', c.investClass === 'order' ? 'reported' : 'pending', '待填', '待评估'])
  ));
  push('');
  sandbox.companies.forEach(c => {
    const f = c.factors;
    if (!f) return;
    push(`**${c.name}（${c.code}）** — 相关${f.relevance} / 能见度${f.visibility} / 弹性${f.elasticity} / 质量${f.quality}`);
    if (c.advantage?.length) push('- 优势：' + c.advantage.join('、'));
    if (c.weakness?.length) push('- 短板：' + c.weakness.join('、'));
    if (c.cooperate) push('- 协作：' + c.cooperate);
    push('');
  });
}

push('## §7 KPI 三情景');
push('');
push('| 情景 | 全球出货(万台) | 零部件TAM(亿元) | 谐波渗透率(%) | 仿生市占(%) |');
push('| --- | --- | --- | --- | --- |');
push('| 基准 | 1.8（IDC 2025 实际） | 120 | 38 | 2 |');
push('| 乐观 | 5+（IDC 2026E） | 280 | 52 | 5 |');
push('| 保守 | 1.2 | 85 | 28 | 0.5 |');
push('');
push('切换情景同步 §0 投资透镜 L4 行。');
push('');

if (sandbox.wizardSteps) {
  push('## §8 投资决策向导');
  push('');
  sandbox.wizardSteps.forEach((s, i) => {
    push(`### Q${i + 1}：${s.q}`);
    push('');
    (s.options || []).forEach(o => push(`- **${o.label}**${o.desc ? ' — ' + o.desc : ''}`));
    push('');
  });
  push('静态参考：保守→工业伺服+现金流；均衡→电驱零部件；激进→仿生传感期权');
  push('');
}

if (sandbox.milestoneData) {
  push('## §10 里程碑追踪');
  push('');
  push('置信度 = 各催化权重加权求和。**仅财报确认可称「已兑现」**；立讯 3000 台默认「已披露预期/待财务验证」。');
  push('');
  if (sandbox.KILL_THRESHOLDS) {
    push('### Kill 量化阈值');
    push('');
    push(mdTable(['条件', '阈值', '依据', '动作'], sandbox.KILL_THRESHOLDS.map(k => [k.condition, k.threshold, k.rationale || '—', k.action])));
    push('');
  }
  sandbox.milestoneData.forEach(m => {
    const defaultLabel = m.id === 'luxshare-ship'
      ? (m.status || '已披露预期/待财务验证')
      : (m.done ? (m.verifyTier === 'financial' ? '已兑现' : '已披露·待财报') : '待观察');
    push(`### ${m.e}`);
    push('');
    push(`- 时间：${m.t} · 赛道：${m.trackLabel} · 权重：${m.weight}% · 默认：${defaultLabel}`);
    push(`- 验证：${m.watch}`);
    if (m.killQuant) push(`- Kill 量化：${m.killQuant}`);
    push(`- 财报确认后：${m.doneImplication}`);
    if (m.reportedImplication) push(`- 已披露未确认：${m.reportedImplication.replace(/<[^>]+>/g, '')}`);
    push(`- 未兑现：${m.pendingImplication}`);
    push(`- 标的：${m.stocks}`);
    push('');
  });
}

push('## §10b 研究评审 BP 摘要');
push('');
push('### 研究权重分层（模拟暴露）');
push('');
push('- **核心 60%：** 立讯、汇川、绿的谐波、舜宇/奥比、铂力特/华曙、宁德/亿纬（能见度≥80，质量≥82）');
push('- **成长 25%：** 奥比中光、地平线、万华、禾赛、兆威机电（弹性≥75）');
push('- **颠覆 15%：** 富创精密、汉威/能斯达、蓝点触控、中鼎股份（仿生高期权）');
push('');
push('| 决议项 | 建议 |');
push('| --- | --- |');
push('| 立项 | 电驱能见度≥85 + 里程碑置信度≥20% |');
push('| 规模 | 置信度<30%→8–10%；30–60%→10–13%；>60%→12–15% |');
push('| 期限 | 3–5 年（2025–2028 产业化窗口） |');
push('| 策略 | 押路线不押单票；卖铲人打底 |');
push('');

push('## §10.1 反证清单');
push('');
push(mdTable(['反证场景', '观测信号', '对研究暴露含义'], [
  ['出货量不及预期', 'IDC/立讯下修', '收缩电驱模拟权重'],
  ['毛利率恶化', '人形项目低于公司平均', '弱化卖铲人逻辑'],
  ['技术路线证伪', 'Clone延期/安全事故', '下调高期权模拟权重'],
  ['估值背离', '收入占比低于1%且PE高分位', '降权'],
  ['客户集中度', '单一大客户砍单', '客户链超30%再平衡'],
  ['国产替代慢', '核心部件仍进口', '下调渗透率']
]));
push('');
push('## §10c 最终结论');
push('');
push('**主线：电驱人形已进入小批量商业验证，中国供应链从主题映射转向订单验证。**');
push('');
push('2025 年全球人形机器人出货已进入万台级（IDC ~1.8 万），电驱路线在整机出货、供应链成熟度、BOM 可映射性上显著领先。中国机会短期集中在减速器、电机、丝杠、传感、视觉、代工与结构件等「卖铲人」环节。立讯 ~3000 台为**已披露预期**，待财报验证。');
push('');
push('**支线：Clone/Myofiber 构成仿生液压第三极，但仍处交付验证前夜。**');
push('');
push('Clone Alpha 279 台预购使仿生路线具备研究价值，但在首批家庭交付、悬挂依赖、故障率、维护成本披露前，不宜按电驱路线的出货逻辑线性外推。其中国映射更偏柔性传感、材料、微型液压与 3D 打印骨骼。');
push('');
push('**策略表达：承接电驱量产，跟踪仿生突破，用里程碑而非叙事决定研究权重。**');
push('');

push('## §11 数据来源与免责');
push('');
push('**市场：** [IDC/CGTN 2025出货](https://news.cgtn.com/news/2026-01-24/IDC-report-China-leads-the-global-humanoid-robot-rise-in-2025-1KccOGZyVGM/p.html) · [IDC](https://www.idc.com/) · [FMI](https://www.futuremarketinsights.com/reports/humanoid-robot-market) · [RnM](https://www.researchandmarkets.com/reports/6177911/humanoid-robot-applications-verticals-global)');
push('');
push('**整机：** [Clone](https://clonerobotics.com/) · [Figure.ai](https://www.figure.ai/) · [Tesla AI](https://www.tesla.com/AI)');
push('');
push('**披露：** [深交所](http://www.szse.cn/) · [上交所](http://www.sse.com.cn/) · [立讯调研 Tier3](https://wx.leaderobot.com/news/6770) · [汉威](http://www.hanwei.cn/)');
push('');
push('**学术/开源：** [arXiv](https://arxiv.org/) · [ICRA](https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra) · [ROS2](https://www.ros.org/) · [robomimic](https://github.com/ARISE-Initiative/robomimic)');
push('');
push('**免责声明：** 本报告仅供产业研究与学习交流，**不构成**证券买卖、投资建议、资产配置建议或承诺收益。研究暴露示例（60/25/15）、组合得分、Kill 条件与 BP 模拟规模为研究框架示意。作者非持牌咨询机构；前瞻性陈述可能与实际重大偏离；IDC 与信通院口径不可横比；组合得分未经验证回测。读者须独立核实 Tier 分级与证据来源，自行承担全部投资决策风险。');
push('');
push('**开放数据：** `data/nodes.json` · `data/companies.csv` · `data/milestones.json` · `data/sources.yaml` · `data/scoring-config.json` · `data/bom-supply-chain.json`');
push('');

push('## 附录：网页交互功能');
push('');
push('- §0 结构图筛选与节点投资透镜（L1–L5 + Kill）');
push('- §7 KPI ↔ 透镜 L4 同步');
push('- §9 组合勾选 ↔ §0 绿色高亮');
push('- §10 里程碑勾选 ↔ BP 置信度/规模动态更新');
push('');

const out = 'c:/Users/sjlov/vox-style-studio/clone-robotics-report.md';
fs.writeFileSync(out, L.join('\n'), 'utf8');
console.log('OK', out, 'lines:', L.length);
