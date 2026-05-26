#!/usr/bin/env node
/**
 * Regenerate clone-robotics-report.md from HTML-aligned data files (v0.3.5).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const readText = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const components = readJson('data/components.json');
const supplyChains = readJson('data/component-supply-chain.json');
const companyLinks = readJson('data/company-supply-links.json');
const milestones = readJson('data/milestones.json');
const companiesCsv = readText('data/companies.csv').trim().split('\n').slice(1);

const lines = [];

const push = (...xs) => lines.push(...xs);
const blank = () => lines.push('');

push(
  '# 人形机器人产业链知识图谱与路线对比',
  '',
  '> **来源：** `clone-robotics-report.html`（交互网页版 v0.3.5）',
  '> **导出日期：** 2026-05-26',
  '> **版本：** v0.3.5',
  '> **性质：** 产业研究 · 事实优先 · 非投资建议',
  '',
  '---',
  '',
  '## 报告概览',
  '',
  '| 指标 | 数值 |',
  '| --- | --- |',
  '| Clone Alpha 限量台数 | 279 |',
  '| 立讯 2025 人形出货（调研预期） | ~3000 台 · 待财报 |',
  '| IDC 2025 全球人形出货 | ~1.8 万台 |',
  '| IDC 2025 全球销售额（窄） | ~$4.4 亿 |',
  '| A 股产业链标的池 | 18 家 |',
  '',
  '### 5分钟看懂（主线结论）',
  '',
  '**主线：** 电驱人形已进入万台级商业验证；支线：Clone/Myofiber 仿生液压仍处交付验证前夜。',
  '',
  '**方法论锚点：** 用里程碑决定研究权重，而不是用叙事热度决定判断。',
  '',
  '- **电驱人形：** Figure · Tesla · 智元 · 宇树 — IDC ~1.8 万台，BOM 与中国零部件高度重叠',
  '- **仿生液压：** Clone Alpha 279 台预购 — Myofiber + 微型液压，映射柔性传感与 3D 打印骨骼',
  '- **四足/服务：** 宇树 · 云深处 — 商业化快于双足，伺服/电池/SLAM 已规模出货',
  '',
  '## Tab 信息架构（网页主导航）',
  '',
  '交互版按六 Tab 组织；本 Markdown 按阅读顺序展开同等内容（无 JS 控件）。',
  '',
  '| Tab | 锚点 | 核心模块 |',
  '| --- | --- | --- |',
  '| **5分钟看懂** | `#tab-quick` | 结论卡片、关键数字、五步阅读路径 |',
  '| **技术路线** | `#tab-routes` | §1 摘要 · §2 Clone · §3 五路线 · §3b 开源 · §5 中国承接 |',
  '| **零部件地图** | `#tab-components` | §4 圆环 · §4b BOM · §4c 执行器纵深 · 零部件卡片 |',
  '| **公司图谱** | `#tab-companies` | §0 结构图 · §0b 骨干 · §0c 竞争力池 · §6 档案 |',
  '| **证据与更新** | `#tab-evidence` | §0.1 口径 · §0.2 证据分级 · 交付定义 · 更新日志 · §0c′ 释明区 |',
  '| **风险与研究模型** | `#tab-risk` | §6b 估值占位 · §7–9 决策 · §10 Kill/反证 · §10b BP · §11 来源 |',
  '',
  '**技术路线 Tab 落地页要点：** 先读 §3 五路线对比（推荐起点）→ §1→§2→§5；中美软件竞争见 §5a Physical AI。',
  '',
  '## 推荐阅读路径',
  '',
  '1. **§0 结构图谱** — 从热点入口选节点，看供应链归属与详情',
  '2. **§0.2 证据分级 + §0b/§0c** — Tier1–4 与核验标签；主池见 §0c（网络传言仅 §0c′ Tier 4）',
  '3. **§1–6 研究正文** — 路线对比、供应链；§4c 执行器纵深；§5a/§5b 竞争框架',
  '4. **§0 交付状态定义** — 区分下线/部署/商业交付/财务确认',
  '5. **§0d 投资联动** — 五层透镜、四步工作流（完整版）',
  '6. **§7–10 决策模块** — KPI 情景 · 组合 · 里程碑 · BP（非买卖指令）',
  '',
  '**产业研究读者：** ①→②→③；**投资研究读者：** ③ 后回到 ①，按 §0d 串联透镜与决策模块。',
  '',
);

// §0.1 - §0.3 from template (keep content)
push(
  '## §0.1 数据时效与口径',
  '',
  '最后更新 **2026-05-26**（Markdown 导出）。2025 实际出货以 IDC tracker 为准（~1.8 万台）；销售额窄口径 ~$4.4 亿。RnM/FMI $1.9–7.8B 与 IDC 可能存在统计边界差异，**不可横比**；宜拆分为硬件本体销售额 / 广义产业链规模 / TAM 预测三类分别呈现。2026 年 IDC 预计全球出货超 5 万台（机构预测，待跟踪）。',
  '',
  '**开源复现：** 评分权重与 BOM 结构见 `data/scoring-config.json`、`data/bom-supply-chain.json`（与 §9 组合得分、§4 供应链环节同源）。',
  '',
  '## §0.2 证据分级体系',
  '',
  '| 层级 | 来源 | 可用于投资决策 |',
  '| --- | --- | --- |',
  '| Tier 1 | 官方公告/年报/监管 | 是 |',
  '| Tier 2 | 权威媒体/产业调研 | 是（交叉验证） |',
  '| Tier 3 | 单一媒体/券商/访谈 | 谨慎 |',
  '| Tier 4 | 社媒/传闻 | 否（仅观察，不参与主池评分；见 §0c′） |',
  '',
  '核验标签：**verified** · **reported**（已披露预期/待财务验证）· **inferred** · **pending**',
  '',
  '## §0.2b 交付状态定义',
  '',
  '| 状态 | 定义 | 投资含义 |',
  '| --- | --- | --- |',
  '| 下线 | 工厂完成生产或装配 | 验证制造能力，≠ 销售 |',
  '| 内部部署 | 公司自用或测试场景运行 | 验证稳定性，≠ 客户订单 |',
  '| 客户试点 | 客户现场测试或小规模部署 | 验证商业兴趣，仍待转采购 |',
  '| 商业交付 | 向付费客户交付产品 | 验证销售，仍需收入确认 |',
  '| 财务确认 | 进入财报收入或分部披露 | 可标里程碑 verifyTier=financial |',
  '',
  '## §0.3 更新日志',
  '',
  '- **2026-05-26 v0.3.5** — Markdown 导出同步：§4c 执行器/国产化分层、§5 场景成熟度与 Physical AI、预期差、§5b 环节透镜、§10 关键跟踪指标、反证与 Kill 联动（订单能见度）；双层产业链方法论（`component-supply-chain.json` + `company-supply-links.json`）',
  '- **2026-05-25 v0.3.5** — 融合外部产业版图笔记（网页）：IDC 为主锚，Omdia 等异源数据脚注',
  '- **2026-05-25/26 v0.3.4** — 六 Tab IA；§6 公司抽屉双层供应链；`index.html` JSON MVP；Clone 读法→观察',
  '- **2026-05-25 v0.3.3** — 零部件产业链纵深 `component-supply-chain.json`',
  '- **2026-05-25 v0.3.2** — §0c 竞争力标的池；社媒 Top5 移至 §0c′',
  '- **2026-05-25 v0.3** — 交付状态定义；图谱节点同步；Kill 工程化',
  '- **2026-05-24** — 首版交互报告与 Markdown 导出',
  '',
);

// Read rest from existing file for sections 0.4 through 4b - we'll append key sections programmatically
// For sections already stable, read from existing md file between markers
const existingPath = path.join(root, 'clone-robotics-report.md');
let existing = '';
try {
  existing = fs.readFileSync(existingPath, 'utf8');
} catch {
  existing = '';
}

function extractSection(startMarker, endMarker) {
  const s = existing.indexOf(startMarker);
  if (s < 0) return '';
  const e = endMarker ? existing.indexOf(endMarker, s + startMarker.length) : existing.length;
  if (e < 0) return existing.slice(s);
  return existing.slice(s, e);
}

// Pull §0.4 through §4b from existing if present
const block04 = extractSection('## §0.4 产业链结构图谱', '## §0d 阅读指引');
const block0d = extractSection('## §0d 阅读指引', '## §1 执行摘要');
const block1 = extractSection('## §1 执行摘要', '## §2 Clone');
const block2 = extractSection('## §2 Clone', '## §3 技术路线');
const block3 = extractSection('## §3 技术路线', '## §3.1 TRL');
const block31 = extractSection('## §3.1 TRL', '## §3b 开源');
const block3b = extractSection('## §3b 开源', '## §4 供应链');
const block4 = extractSection('## §4 供应链', '## §4b BOM');
const block4b = extractSection('## §4b BOM', '## §5 中国承接');

if (block04) push(block04.trimEnd(), '');
if (block0d) push(block0d.trimEnd(), '');
if (block1) push(block1.trimEnd(), '');
if (block2) {
  push(block2.trimEnd().replace('截至 2026-05-25', '截至 2026-05-26'), '');
} else {
  push('## §2 Clone Robotics 公司画像', '', '（见网页 §2）', '');
}
if (block3) push(block3.trimEnd(), '');
if (block31) push(block31.trimEnd(), '');
if (block3b) push(block3b.trimEnd(), '');
if (block4) push(block4.trimEnd(), '');
if (block4b) push(block4b.trimEnd(), '');

// §4c
push(
  '## §4c 上游执行器纵深 · 国产化分层',
  '',
  '与 §4 圆环、`data/component-supply-chain.json`、零部件地图同源。约束三点：',
  '',
  '1. 执行器子系统常占电驱人形 BOM 的 **40%–60%**（机构拆解区间，非本报告实测）',
  '2. 「整机国产化率 90%+」**≠** 高端丝杠/空心杯已替代',
  '3. 关节**总成**（三花/拓普等）与**零件**（谐波/丝杠等）投资逻辑不同',
  '',
  '| 子系统 | 核心部件 | 国产化（研报区间） | A 股映射 | 证据 |',
  '| --- | --- | --- | --- | --- |',
  '| 旋转执行器 | 谐波/RV/行星减速器 | 谐波 reported ~85%；RV ~75% | 绿的谐波、双环传动、中大力德 | reported |',
  '| 线性执行器 | 行星滚柱丝杠、滚珠丝杠 | 丝杠 reported ~40%（高端更低） | 五洲新春、北特科技、恒立液压、贝斯特 | reported |',
  '| 电机 | 无框力矩电机、空心杯 | 力矩 ~50%；空心杯 ~35% | 鸣志电器、汇川技术、禾川科技 | reported |',
  '| 灵巧手 | 微型驱动模组、腱驱动 | reported ~30% | 兆威机电、鸣志、鼎智 | inferred |',
  '',
  '**研究判断：** 价值弹性最大往往在「国产化率仍低 + 单机用量高」交叉点（丝杠、空心杯）；能见度最高往往在已进特斯拉/头部整机 BOM 的关节总成与谐波环节。详见 §5b。',
  '',
  '### 关节模组 / 执行器总成（中游集成）',
  '',
  '汽车底盘与热管理能力「降维」切入人形链路的典型映射；订单能见度高于纯主题零部件。',
  '',
  '| 企业 | 角色 | 与 §6 关系 |',
  '| --- | --- | --- |',
  '| 三花智控 | 旋转关节总成、热管理；特斯拉链 reported | 档案池 · 热管理/执行器 |',
  '| 拓普集团 | 线性/旋转执行器一级供；底盘技术迁移 | 档案池 · 特斯拉链 |',
  '| 立讯精密 | 整机代工 + 结构件；非单一关节厂 | 档案池 · 量产承接 |',
  '',
);

// §4 零部件地图
push(
  '## §4·零部件地图 · 按环节浏览',
  '',
  '结构化数据：`data/components.json`；产业链纵深：`data/component-supply-chain.json`。',
  '',
);

const catOrder = [...components.categories].sort((a, b) => a.order - b.order);
for (const cat of catOrder) {
  push(`### ${cat.name}`, '');
  const items = components.components.filter((c) => c.category === cat.id);
  for (const c of items) {
    push(`#### ${c.name} (\`${c.id}\`)`, '');
    push(`- **通俗解释：** ${c.plainExplanation}`);
    push(`- **为何重要：** ${c.whyItMatters}`);
    push(`- **适用路线：** ${c.routes.join(' · ')}`);
    push(`- **典型位置：** ${c.typicalUsage}`);
    push(`- **价值置信度：** ${c.valueConfidence} · **证据：** ${c.evidenceStatus}`);
    if (c.relatedCompanies?.length) {
      push(`- **A 股映射（图谱 ID）：** ${c.relatedCompanies.join(', ')}`);
    }
    push(`- **风险：** ${c.plainRisks}`);
    const chain = supplyChains.chains[c.id];
    if (chain?.layers) {
      push('- **产业链纵深：**');
      for (const layer of chain.layers) {
        push(`  - **${layer.label}：** ${layer.items.join('；')}`);
      }
      if (chain.importDependency) push(`  - **进口依赖：** ${chain.importDependency}`);
      if (chain.cnStrength) push(`  - **中国优势：** ${chain.cnStrength}`);
      if (chain.bottleneck) push(`  - **瓶颈：** ${chain.bottleneck}`);
    }
    blank();
  }
}

// §5 expanded
push(
  '## §5 中国承接机会',
  '',
  '- **2025 实际出货（IDC，2026-01）：** 全球约 **1.8 万台**（+508% YoY），销售额约 **$4.4 亿**；中国厂商占主导，智元、宇树各约 **5000+ 台**量级（口径待拆）。立讯 ~3000 台为**代工环节调研预期**，与整机厂合计出货不可直接相加。',
  '- **量产承接（高置信）：** 立讯精密机构调研 ~3000 台 + 约 50 亿元机器人基地；智元 5100+、2026-03 第 1 万台下线；宇树 reported 5500+（须核验人形/四足/合计）；优必选工业全尺寸 **1079 台**。',
  '- **仿生支线（低置信、高弹性）：** Clone 2025 实际交付按 **0** 处理（279 预购）；首批家庭交付待核实。',
  '- **市场规模口径（勿横比）：** IDC 窄口径 ~$4.4 亿；信通院白皮书 ~170 亿元（广义产业链）；RnM/FMI 与 IDC **统计边界不同**。',
  '',
  '### 预期差 · 叙事热度 vs 订单能见度',
  '',
  '万台级**实际出货**（IDC）已验证「从 0 到 1」，但**供应链大额定点/订单**的公开确认仍稀疏——部分机构调研提示：核心供应商对「大规模量产订单」态度谨慎。这与资本市场「万亿 TAM / 明年放量」叙事存在张力。',
  '',
  '**研究用法：** 把「出货 tracker 上修」与「Tier1 订单/财报收入」分开跟踪；前者支撑主题情绪，后者才支撑零部件兑现。联动 §10 里程碑、§10 反证清单。',
  '',
  '### 下游场景 · 成熟度阶梯',
  '',
  '与 §3 五路线「能见度」互补：同一路线在不同场景的兑现节奏不同；投资映射应优先**已付费场景**，而非远期家庭通用。',
  '',
  '```',
  'T+0（已落地）  工业制造 — 汽车产线巡检/搬运/装配；科研教育平台',
  'T+1（1–2年）   物流仓储分拣搬运；商业服务导览/前台（小规模）',
  'T+2（2–5年）   电力巡检、矿山/救援等特种；养老助行（试点）',
  'T+3（5年+）    家庭全功能家政；任意任务通用操作（仍处叙事期）',
  '```',
  '',
  '### 国际仿生/人形供应链格局（文字摘要）',
  '',
  '网页版为 Mermaid 流程图；要点：**美国**偏基础研究、AI 算法与资本（Figure/Tesla）；**欧洲**精密机械与流体（Festo、Clone 波兰总部）；**日本**微型阀与精密传感（SMC/CKD）；**中国**制造规模化、结构件/电池/3D 打印与成本优势，AI 算法追赶。整链尚无单一冠军，存在「第三极供应链」窗口期。',
  '',
  '## §5a Physical AI · 中美分水岭（研究框架）',
  '',
  '「Physical AI」= 模型（VLA/世界模型）+ 数据闭环 + 端侧算力 + 场景部署的**一体能力**。与 §3b 开源栈、§0 图谱 Tesla/Figure 节点呼应。',
  '',
  '| 维度 | 美国（reported） | 中国（reported） |',
  '| --- | --- | --- |',
  '| AI 大脑/模型 | FSD→Optimus、Figure Helix、1X 1XWM | 智元/百度/讯飞等追赶；差距仍大 |',
  '| 端侧算力 | AI5、Jetson Thor、英伟达生态 | 昇腾/地平线/国产 SOC；导入节奏不一 |',
  '| 数据闭环 | 工厂+道路+家庭（头部） | 工业/教育数据多；家庭闭环仍弱 |',
  '| 制造与成本 | 产能爬坡中 | 全球 ~90% 产量在中国（机构口径） |',
  '| BOM/供应链 | 成本仍高 | 国产化与规模化优势明显 |',
  '',
  '**对华含义：** 短期 A 股主线仍是**零部件定点与量产节拍**（§4c）；若竞争升维到 Physical AI，需额外跟踪「是否有自有 VLA + 真实场景数据」——否则存在**硬件强、软件弱**的结构性折价风险（见 §5b）。',
  '',
  '### 全球整机参考 · 与 §3 路线对照',
  '',
  '| 派系 | 代表 | 路线 | 2025–26 能见度（reported） |',
  '| --- | --- | --- | --- |',
  '| 🇺🇸 | Tesla Optimus | 电驱 | Gen3 试产；BotQ 另线 reported 350+ 台 |',
  '| 🇺🇸 | Figure AI | 电驱 | 工厂部署；远期 10 万台目标（待核实） |',
  '| 🇺🇸 | 1X NEO | 电驱/家庭 | 千台级叙事；OpenAI 投资背景 |',
  '| 🇺🇸 | Agility Digit | 物流专用 | 亚马逊试点；场景窄于通用人形 |',
  '| 🇨🇳 | 智元 / 宇树 | 电驱+四足 | reported 5000+ 台量级（口径待拆） |',
  '| 🇵🇱 | Clone Robotics | 仿生液压 | 279 预购；实际交付按 0 至核实 |',
  '',
  '## §5b 产业链研究透镜 · 环节弹性（非仓位建议）',
  '',
  '二维透镜：**能见度**（12–24 个月能否看见订单/收入）× **弹性**（机器人收入占比与 BOM 扩张空间）。权重模拟见 §9、§10b。',
  '',
  '| 环节 | 能见度 | 弹性 | 研究属性（示意） |',
  '| --- | --- | --- | --- |',
  '| 关节总成/执行器 | 高 | 高 | 绑定头部客户；单机价值量大 |',
  '| 谐波减速器 | 高 | 中 | 国产龙头确立；ASP 压力 |',
  '| 行星滚柱丝杠 | 中 | 高 | 替代空间大；验证周期长 |',
  '| 空心杯电机 | 中 | 高 | 灵巧手刚需；高端仍进口 |',
  '| 六维力/3D 视觉 | 高 | 中 | 从选配→标配；渗透率逻辑 |',
  '| 触觉/电子皮肤 | 低 | 高 | 方案未定型；Clone/灵巧手期权 |',
  '| 整机厂 | 中 | 高 | 赢家未定；估值波动大 |',
  '| PEEK/加工设备 | 高 | 低 | 卖铲人；受益但弹性有限 |',
  '',
  '以上为研究分类，**不含具体仓位百分比**。',
  '',
  '### Clone 路线六层供应链（A1–A6）',
  '',
  '| 层级 | 环节 | 要点 |',
  '| --- | --- | --- |',
  '| A1 · 瓶颈 | 人工肌肉/流体执行器 | Myofiber 弹性体、编织纤维、一致性测试 |',
  '| A2 · 最稀缺 | 流体动力系统 | 微型泵、比例阀、密封件、管路 |',
  '| A3 · 低难度 | 仿生骨骼 | 3D 打印聚合物骨骼、关节副 |',
  '| A4 · 中难度 | 高密度传感 | 320 路压力、4 深度相机、IMU |',
  '| A5 · 低难度 | 控制与算力 | Jetson Thor、边缘 AI |',
  '| A6 · 极低难度 | 整机装配 | 装配、密封测试、品控 |',
  '',
);

// §0b from existing
const block0b = extractSection('## §0b 骨干公司事实档案', '## §0c');
if (block0b) push(block0b.trimEnd(), '');

// §0c updated
push(
  '## §0c 竞争力标的池 · 已验证生态映射',
  '',
  '聚焦**产业链已确认**的 A 股标的：与 §0b、§6、零部件地图同源；按投资分组与证据分级呈现。主图谱与研究透镜**不以网络 Top5 对照**为输入。',
  '',
  '**六类分组：** 整机厂 / 核心零部件 / 代工与结构件 / 软件·平台 / 观察池 / 弱叙事',
  '',
);

// companies table from csv
push('| 公司 | 代码 | 分类 | 路线 | 环节 | 证据 | 总分 |', '| --- | --- | --- | --- | --- | --- | --- |');
for (const row of companiesCsv) {
  const cols = row.split(',');
  if (cols.length < 14) continue;
  const [id, name, code, category, route, segment, ev, , , , , , total] = cols;
  push(`| ${name} | ${code} | ${category} | ${route} | ${segment} | ${ev} | ${total} |`);
}
blank();

push(
  '## §0c′ 网络待核实 · 释明区（Tier 4）',
  '',
  '收录**尚未进入主池**的网络传言、整机×概念股对照与叙事热点。用途：**释明误读、对照核实**，不得单独用于上调研究模拟权重或判定里程碑「已兑现」。',
  '',
  '**分级：** 待核实（逻辑通但缺 Tier1–2 订单）· 不建议纳入（弱关联/误配）· 叙事热点（生态级话题 ≠ 供应商清单）',
  '',
  '数据：`data/rumour-clues-pending.json`（完整表见交互网页检索）。下列为 v0.3 主清单摘要：',
  '',
);

const block0cOld = extractSection('## §0c 社媒线索池', '## §0 四层结构');
if (block0cOld) {
  const tablePart = block0cOld.split('\n').slice(3).join('\n'); // skip old header
  push(tablePart.trimEnd(), '');
}

// §0 graph nodes - pull from existing
const block0layout = extractSection('## §0 四层结构布局', '## §0 图谱全部节点');
if (block0layout) push(block0layout.trimEnd(), '');
const blockNodes = extractSection('## §0 图谱全部节点', '## 投资透镜');
if (blockNodes) push(blockNodes.trimEnd(), '');
const blockInvest = extractSection('## 投资透镜（INVEST_META）', '## §9 组合构建');
if (blockInvest) push(blockInvest.trimEnd(), '');
const block9 = extractSection('## §9 组合构建', '## §6 公司档案池');
if (block9) push(block9.trimEnd(), '');

// §6 with dual supply chain
push(
  '## §6 公司图谱 · 档案池',
  '',
  '列表 5 字段；详情含零部件映射与**双层产业链**。',
  '',
  '### 双层产业链（勿混读）',
  '',
  companyLinks.methodology,
  '',
  companyLinks.coverageNote,
  '',
  '**① 零部件产业链（品类模板）：** 按 `componentIds` 展开 `data/component-supply-chain.json` 的上游原材料 · 中游工序 · 下游在机位置。',
  '',
  '**② 公司供应链位置（个案购销）：** `data/company-supply-links.json` — **具名方**（可核对 + 证据标签）与 **品类/外协**（未披露具名时的占位）。',
  '',
);

for (const [id, co] of Object.entries(companyLinks.companies)) {
  const csvRow = companiesCsv.find((r) => r.startsWith(id + ','));
  const name = csvRow ? csvRow.split(',')[1] : id;
  push(`#### ${name} (\`${id}\`)`, '');
  push(`- **证据状态：** ${co.evidenceStatus} · **披露粒度：** ${co.disclosureLevel || '—'}`);
  if (co.note) push(`- **备注：** ${co.note}`);
  push('- **上游：**');
  if (co.upstream?.named?.length) {
    for (const n of co.upstream.named) {
      push(`  - [${n.evidence}] ${n.name} — ${n.note || n.source || ''}`);
    }
  }
  for (const c of co.upstream?.categories || []) push(`  - （品类）${c}`);
  push('- **核心能力：** ' + (co.core || []).join('；'));
  push('- **下游：**');
  if (co.downstream?.named?.length) {
    for (const n of co.downstream.named) {
      push(`  - [${n.evidence}] ${n.name} — ${n.note || n.source || ''}`);
    }
  }
  for (const c of co.downstream?.categories || []) push(`  - （品类）${c}`);
  blank();
}

const block6 = extractSection('## §6 公司档案池（18 家）', '## §6b');
if (block6) push(block6.trimEnd(), '');

const tail = extractSection('## §6b 估值模块', '## 附录');
if (tail) {
  let t = tail;
  // Patch §10 sections
  t = t.replace('## §10.1 反证清单', '## §10 反证清单 · 可证伪假设');
  if (!t.includes('关键跟踪指标')) {
    const insert = `
### 关键跟踪指标 · 与 §5 / §0 联动

| 指标 | 当前锚点 | 正向信号 |
| --- | --- | --- |
| 全球季度出货 | IDC ~1.8 万（2025 全年） | 单季 >1 万台且 IDC/同业不下修 |
| 特斯拉量产节点 | Gen3 试产 reported | 产线爬坡 + 供应链 Tier1 订单披露 |
| 大额定点/订单 | 公开确认仍少 | 亿元级合同或财报分部收入佐证 |
| 丝杠/空心杯国产化 | reported ~40% / ~35% | 头部整机厂国产导入 + 毛利率改善 |
| 中国 VLA/世界模型 | 追赶中 | 可复现工业场景 demo + 数据闭环披露 |
| BOM 成本 | 机构目标 ~2 万美元级 | 财报/拆解验证持续降本路径 |

`;
    t = t.replace('## §10 里程碑追踪', '## §10 里程碑追踪\n' + insert);
  }
  if (!t.includes('订单能见度落空')) {
    t = t.replace(
      '| 国产替代慢 | 核心部件仍进口 | 下调渗透率 |',
      '| 国产替代慢 | 核心部件仍进口 | 下调渗透率 |\n| 订单能见度落空 | 叙事热度高但 Tier1 大额订单/财报收入长期缺席 | 收缩主题模拟权重；复核 §5 预期差 |\n| Physical AI 差距拉大 | 中国整机缺乏可验证 VLA + 场景数据闭环 | 降权纯代工映射 |'
    );
  }
  const killExtra =
    '| 供应链大额订单公开确认 | 连续两个季度无 Tier1 订单/收入佐证 | 见 §5 预期差 | 下调零部件能见度假设；里程碑维持 reported |';
  if (!t.includes('供应链大额订单')) {
    t = t.replace(
      '| 单客户链（如 Tesla/果链） | 超过 30% | — | 收缩敞口 |',
      '| 单客户链（如 Tesla/果链） | 超过 30% | — | 收缩敞口 |\n' + killExtra
    );
  }
  push(t.trimEnd(), '');
}

push(
  '## 附录：网页交互功能（静态导出不含）',
  '',
  '- 六 Tab 切换（`#tab=quick|routes|components|companies|evidence|risk`）与 `?view=full` 线性阅读',
  '- §0 结构图筛选、节点投资透镜（L1–L5 + Kill）',
  '- §6/零部件地图：右侧抽屉与双向跳转',
  '- §7 KPI ↔ 透镜 L4；§9 组合勾选 ↔ §0 高亮；§10 里程碑 ↔ BP 动态',
  '- §8 投资决策向导（5 题问卷）；§11 投资风格测验',
  '- Mermaid 国际供应链图、路线雷达图、市场图表',
  '',
  '**开放数据：** `data/nodes.json` · `data/companies.csv` · `data/milestones.json` · `data/sources.yaml` · `data/scoring-config.json` · `data/bom-supply-chain.json` · `data/components.json` · `data/component-supply-chain.json` · `data/company-supply-links.json` · `data/rumour-clues-pending.json`',
  '',
);

const out = path.join(root, 'clone-robotics-report.md');
fs.writeFileSync(out, lines.join('\n') + '\n', 'utf8');
const count = lines.length;
console.log(`Wrote ${out} (${count} lines)`);
