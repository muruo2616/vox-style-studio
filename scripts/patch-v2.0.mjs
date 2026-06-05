/**
 * Apply 具身智能人形机器人产业链版图_知识图谱_v2.0_2026-06-05 to clone-robotics-report.html
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const htmlPath = path.join(ROOT, 'clone-robotics-report.html');
let s = fs.readFileSync(htmlPath, 'utf8');

function replaceOnce(oldStr, newStr, label) {
  if (!s.includes(oldStr)) {
    console.warn(`SKIP (not found): ${label}`);
    return;
  }
  s = s.replace(oldStr, newStr);
  console.log(`OK: ${label}`);
}

// —— Version strings ——
replaceOnce('v0.3.6', 'v2.0', 'version v0.3.6 → v2.0');
replaceOnce(
  '数据更新：2026-05-25 · 季度复核',
  '知识图谱 v2.0 · 数据更新：2026-06-05',
  'hero date badge'
);

// —— Changelog ——
replaceOnce(
  `<ul class="text-sm text-slate-600 space-y-3">
          <li><span class="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">2026-05-26 v0.3.6</span>`,
  `<ul class="text-sm text-slate-600 space-y-3">
          <li><span class="font-mono text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">2026-06-05 v2.0</span> — 融合桌面知识图谱 v2.0：整机产品版图（Figure 03、1X NEO、Walker S2、Unitree G1/R1/H2、Apollo、Digit、XPENG IRON、EngineAI、Fourier GR-3、Kuavo 等）；开源生态（GR00T、LeRobot、AgiBot World、OpenVLA）；本体硬件与 Physical AI 软件栈分层；商业化验证阶梯；中美竞争对照；2026–2028 全球出货情景；§10 关键指标与风险红线更新。</li>
          <li><span class="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">2026-05-26 v0.3.6</span>`,
  'changelog v2.0 entry'
);

// —— Quick tab: v2.0 update summary ——
replaceOnce(
  `<p class="text-lg font-semibold text-slate-800 mb-2">主线：电驱人形已进入万台级商业验证；支线：Clone/Myofiber 仿生液压仍处交付验证前夜。</p>`,
  `<p class="text-lg font-semibold text-slate-800 mb-2">主线：电驱人形已进入万台级商业验证；支线：Clone/Myofiber 仿生液压仍处交付验证前夜。</p>
        <div class="text-sm text-slate-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-4">
          <p class="font-semibold text-emerald-900 mb-2">v2.0 更新摘要（2026-06-05）</p>
          <ul class="list-disc pl-5 space-y-1 text-xs">
            <li><strong>整机产品：</strong>Figure 03、1X NEO、UBTECH Walker S2、Unitree G1/R1/H2、Apptronik Apollo、Agility Digit、XPENG IRON、EngineAI T800/SE01、Fourier GR-3、智元、乐聚 Kuavo 等</li>
            <li><strong>开源生态：</strong>NVIDIA Isaac GR00T、Hugging Face LeRobot、AgiBot World、OpenVLA、Open X-Embodiment、Unitree SDK、Kuavo/OpenLoong</li>
            <li><strong>结构拆分：</strong>本体硬件供应链 vs Physical AI 软件栈/数据栈，避免只看执行器低估模型与部署工具</li>
            <li><strong>商业化分层：</strong>发布演示 → 可订购 → 企业试点 → 批量交付 → 规模运营 → 单位经济性</li>
          </ul>
        </div>`,
  'quick tab v2.0 summary'
);

// —— §3b opensource table ——
const opensourceOld = `<tbody class="text-slate-700">
            <tr class="border-t"><td class="p-2 font-medium">Middleware</td><td class="p-2"><a href="https://www.ros.org/" class="text-indigo-600 underline" target="_blank" rel="noopener">ROS 2</a></td><td class="p-2">降低整机软件集成成本；生态成熟利好中小整机厂与多机型并行开发</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Simulation</td><td class="p-2"><a href="https://mujoco.org/" class="text-indigo-600 underline" target="_blank" rel="noopener">MuJoCo</a> · <a href="https://developer.nvidia.com/isaac-sim" class="text-indigo-600 underline" target="_blank" rel="noopener">Isaac Sim/Lab</a></td><td class="p-2">强化学习/控制迭代与 sim-to-real；合成数据缩短感知-操作闭环</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Dynamics</td><td class="p-2"><a href="https://drake.mit.edu/" class="text-indigo-600 underline" target="_blank" rel="noopener">Drake</a> · <a href="https://stack-of-tasks.github.io/pinocchio/" class="text-indigo-600 underline" target="_blank" rel="noopener">Pinocchio</a></td><td class="p-2">多体/运动学建模与规划验证；偏研发与高端控制，非量产环节</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Manipulation</td><td class="p-2"><a href="https://maniskill.readthedocs.io/" class="text-indigo-600 underline" target="_blank" rel="noopener">ManiSkill</a> · <a href="https://github.com/ARISE-Initiative/robomimic" class="text-indigo-600 underline" target="_blank" rel="noopener">robomimic</a></td><td class="p-2">操作技能 benchmark 与模仿学习框架；推动策略可比性与部署加速</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Dataset</td><td class="p-2"><a href="https://robotics-transformer.github.io/" class="text-indigo-600 underline" target="_blank" rel="noopener">Open X-Embodiment</a></td><td class="p-2">跨本体数据共享；可能削弱单厂数据壁垒，利好通用基座模型</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Embodied AI / VLA</td><td class="p-2"><a href="https://github.com/AlphaBrainGroup/AlphaBrain" class="text-indigo-600 underline" target="_blank" rel="noopener">AlphaBrain</a> · <a href="https://www.alphabrain-platform.com/" class="text-indigo-600 underline" target="_blank" rel="noopener">Platform</a>（智平方 AI² Robotics，<span class="text-slate-500">reported</span>）</td><td class="p-2">VLA / 世界模型 / RL 一体开源工具链（NeuroVLA、LIBERO 等仿真评测）；影响研发与人才供给，<strong>非</strong> A 股量产订单指标</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Industrial</td><td class="p-2">EtherCAT · CAN · DDS</td><td class="p-2">产线实时通信与多关节同步；决定量产节拍、安全联锁与 OTA 可维护性</td></tr>
          </tbody>`;

const opensourceNew = `<tbody class="text-slate-700">
            <tr class="border-t bg-cyan-50/40"><td class="p-2 font-medium">VLA / 基础模型</td><td class="p-2"><a href="https://developer.nvidia.com/isaac/gr00t" class="text-indigo-600 underline" target="_blank" rel="noopener">NVIDIA Isaac GR00T</a></td><td class="p-2">预训练权重、微调、推理、TensorRT 部署；偏研究与开发者早期使用</td></tr>
            <tr class="border-t bg-cyan-50/40"><td class="p-2 font-medium">机器人学习库</td><td class="p-2"><a href="https://github.com/huggingface/lerobot" class="text-indigo-600 underline" target="_blank" rel="noopener">Hugging Face LeRobot</a></td><td class="p-2">标准化真实机器人数据、策略训练、硬件接口；已支持 Unitree G1 等</td></tr>
            <tr class="border-t bg-cyan-50/40"><td class="p-2 font-medium">数据集 + 模型</td><td class="p-2">AgiBot World · GO-1</td><td class="p-2">百万级轨迹、百台机器人、双臂操作；补齐中国具身数据生态</td></tr>
            <tr class="border-t bg-cyan-50/40"><td class="p-2 font-medium">开源 VLA</td><td class="p-2"><a href="https://openvla.github.io/" class="text-indigo-600 underline" target="_blank" rel="noopener">OpenVLA</a></td><td class="p-2">学术/开发者可复现的视觉语言动作模型路线</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Middleware</td><td class="p-2"><a href="https://www.ros.org/" class="text-indigo-600 underline" target="_blank" rel="noopener">ROS 2</a></td><td class="p-2">降低整机软件集成成本；生态成熟利好中小整机厂与多机型并行开发</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Simulation</td><td class="p-2"><a href="https://mujoco.org/" class="text-indigo-600 underline" target="_blank" rel="noopener">MuJoCo</a> · <a href="https://developer.nvidia.com/isaac-sim" class="text-indigo-600 underline" target="_blank" rel="noopener">Isaac Sim/Lab</a></td><td class="p-2">强化学习/控制迭代与 sim-to-real；合成数据缩短感知-操作闭环</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Dataset</td><td class="p-2"><a href="https://robotics-transformer.github.io/" class="text-indigo-600 underline" target="_blank" rel="noopener">Open X-Embodiment</a> · RT-X</td><td class="p-2">跨本体数据融合；早期证明跨机器人数据标准路线</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">开源本体/SDK</td><td class="p-2">Unitree SDK · <a href="https://github.com/LejuRobotics/kuavo-ros-control" class="text-indigo-600 underline" target="_blank" rel="noopener">Kuavo</a> · OpenLoong · 青龙</td><td class="p-2">低成本硬件 + 社区扩散；适合教育、科研、生态孵化</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Embodied AI / VLA</td><td class="p-2"><a href="https://github.com/AlphaBrainGroup/AlphaBrain" class="text-indigo-600 underline" target="_blank" rel="noopener">AlphaBrain</a>（智平方，<span class="text-slate-500">reported</span>）</td><td class="p-2">VLA + 世界模型 + RL 工具链；影响研发与人才供给，<strong>非</strong> A 股量产订单指标</td></tr>
            <tr class="border-t"><td class="p-2 font-medium">Industrial</td><td class="p-2">EtherCAT · CAN · DDS</td><td class="p-2">产线实时通信与多关节同步；决定量产节拍、安全联锁与 OTA 可维护性</td></tr>
          </tbody>`;
replaceOnce(opensourceOld, opensourceNew, '§3b opensource table');

// —— §5 Physical AI pre block ——
const physicalAiOld = `<pre class="text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto leading-relaxed mb-4">维度              美国（reported）              中国（reported）
────────────────────────────────────────────────────────────
AI 大脑/模型       FSD→Optimus、Figure Helix、1X 1XWM   智元/百度/讯飞等追赶；开源栈见 §3b（如 AlphaBrain Platform，2026-04 reported）；仿真有进展，量产数据闭环仍弱
端侧算力           AI5、Jetson Thor、英伟达生态          昇腾/地平线/国产 SOC；导入节奏不一
数据闭环           工厂+道路+家庭（头部）               工业/教育为主；消费四足家庭数据有 reported 样本（蔚蓝 2.5万+ 台自述），通用人形家庭闭环仍弱
制造与成本         产能爬坡中                           全球 ~90% 产量在中国（机构口径）
BOM/供应链         成本仍高                             国产化与规模化优势明显</pre>`;

const physicalAiNew = `<pre class="text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto leading-relaxed mb-4">维度              美国（reported）                        中国（reported）
──────────────────────────────────────────────────────────────────────
AI 模型            Figure Helix、Tesla FSD 迁移、GR00T、1X Redwood   XPENG VLA、AgiBot GO-1、各家闭源模型
芯片/算力          NVIDIA Jetson/Thor、Tesla 自研          昇腾、地平线、国产替代推进
硬件供应链         高端研发强，制造外包多                   成本、供应链响应、试制速度强
场景               仓储、汽车工厂、家庭                     工业、商业服务、教育、物流、口岸
开源生态           LeRobot、GR00T、OpenVLA                  AgiBot World、Kuavo/OpenLoong、Unitree SDK
核心判断           2026 竞争从「走得稳」转向「任务成功率过商业阈值」——可复用数据与模型成为分水岭</pre>`;
replaceOnce(physicalAiOld, physicalAiNew, '§5 Physical AI table');

// —— §5 global OEM table ——
const oemTableOld = `<tbody class="text-slate-700">
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Tesla Optimus</td><td class="p-2">电驱</td><td class="p-2">Gen3 试产；BotQ 另线 reported 350+ 台</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Figure AI</td><td class="p-2">电驱</td><td class="p-2">工厂部署；远期 10 万台目标（待核实）</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">1X NEO</td><td class="p-2">电驱/家庭</td><td class="p-2">千台级叙事；OpenAI 投资背景</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Agility Digit</td><td class="p-2">物流专用</td><td class="p-2">亚马逊试点；场景窄于通用人形</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">智元 / 宇树</td><td class="p-2">电驱+四足</td><td class="p-2">reported 5000+ 台量级（口径待拆）</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">蔚蓝科技 BabyAlpha</td><td class="p-2">消费四足 · C 端</td><td class="p-2">reported 2.5万+ 台（家庭 ~90%）；A3 Q3 上市待验证</td></tr>
            <tr class="border-t"><td class="p-2">🇵🇱</td><td class="p-2">Clone Robotics</td><td class="p-2">仿生液压</td><td class="p-2">279 预购；实际交付按 0 处理至核实</td></tr>
          </tbody>`;

const oemTableNew = `<tbody class="text-slate-700">
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Tesla Optimus</td><td class="p-2">工厂优先 · 电驱</td><td class="p-2">Gen3 试产；量产节拍与 FSD/自研芯片迁移待验证</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Figure 03 + Helix</td><td class="p-2">家庭/通用 · 电驱</td><td class="p-2">产品叙事领先；非结构化家庭成功率、遥操作占比待跟踪</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">1X NEO</td><td class="p-2">家庭 · 电驱</td><td class="p-2">预订/早期交付；Redwood AI、Expert Mode、隐私边界</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Agility Digit + Arc</td><td class="p-2">仓储/物流</td><td class="p-2">商业部署证据较强；GXO/Amazon/Schaeffler 场景单位经济性</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Apptronik Apollo</td><td class="p-2">仓储/制造</td><td class="p-2">企业试点；4h 热插拔电池、模块化部署</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">UBTECH Walker S2</td><td class="p-2">工业 · 电驱</td><td class="p-2">量产交付叙事强；自主换电 3 分钟、汽车/工厂/口岸场景</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">Unitree G1/R1/H2</td><td class="p-2">开发者/教育</td><td class="p-2">G1 低价普及、R1 入门、H2 高端；SDK 与社区扩散</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">智元 AgiBot</td><td class="p-2">工业/服务/数据</td><td class="p-2">AgiBot World 数据规模；GO-1/GO-2 基座大模型</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">XPENG IRON</td><td class="p-2">车企 Physical AI</td><td class="p-2">计划 2026 量产；车端 VLA/芯片/供应链复用降本</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">EngineAI T800/SE01</td><td class="p-2">高动态/商业交付</td><td class="p-2">2026 T800 交付信号增强；首批交付后任务能力与安全边界</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">Fourier GR-3</td><td class="p-2">康养/服务</td><td class="p-2">护理与多模态交互；医疗康养合规闭环</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇳</td><td class="p-2">乐聚 Kuavo</td><td class="p-2">开源平台</td><td class="p-2">开源/教育/科研；ROS/国产生态适配</td></tr>
            <tr class="border-t"><td class="p-2">🇺🇸</td><td class="p-2">Boston Dynamics Atlas</td><td class="p-2">高动态标杆</td><td class="p-2">电动 Atlas 操作能力；商业化路径谨慎</td></tr>
            <tr class="border-t"><td class="p-2">🇨🇦</td><td class="p-2">Sanctuary Phoenix</td><td class="p-2">通用工人</td><td class="p-2">遥操作学习；远程人类监督比例、任务库泛化</td></tr>
            <tr class="border-t"><td class="p-2">🇵🇱</td><td class="p-2">Clone Robotics</td><td class="p-2">仿生液压</td><td class="p-2">279 预购；实际交付按 0 处理至核实</td></tr>
          </tbody>`;
replaceOnce(oemTableOld, oemTableNew, '§5 global OEM table');

// —— Insert commercialization + Physical AI stack sections before §5-invest-lens ——
const investLensAnchor = `      <section id="s5-invest-lens" class="scroll-mt-24">`;
const newSections = `      <section id="s5-physical-ai-stack" class="scroll-mt-24 mb-8">
        <h3 class="text-lg font-bold mb-3">Physical AI 软件栈 · 分层（v2.0）</h3>
        <p class="text-xs text-slate-600 mb-3">与 §3b 开源栈、§4 本体硬件并列——2026 竞争焦点正从硬件 BOM 转向可复用模型与数据闭环。</p>
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white mb-4">
          <table class="w-full text-xs text-left">
            <thead class="bg-indigo-50 text-slate-600"><tr><th class="p-2">层级</th><th class="p-2">模块</th><th class="p-2 text-left">关键问题</th><th class="p-2 text-left">代表项目</th></tr></thead>
            <tbody class="text-slate-700">
              <tr class="border-t"><td class="p-2 font-mono">L0</td><td class="p-2">硬实时控制</td><td class="p-2">平衡、避障、力控、跌倒保护</td><td class="p-2">Unitree、Boston Dynamics、Tesla、Agility</td></tr>
              <tr class="border-t"><td class="p-2 font-mono">L1</td><td class="p-2">技能策略</td><td class="p-2">抓取、搬运、整理、开门、上下料</td><td class="p-2">LeRobot、GR00T、OpenVLA、各家闭源策略</td></tr>
              <tr class="border-t"><td class="p-2 font-mono">L2</td><td class="p-2">VLA/基础模型</td><td class="p-2">语言、视觉、动作联合建模</td><td class="p-2">Figure Helix、NVIDIA GR00T、OpenVLA、XPENG VLA、AgiBot GO-1</td></tr>
              <tr class="border-t"><td class="p-2 font-mono">L3</td><td class="p-2">数据闭环</td><td class="p-2">示教、遥操作、仿真、合成数据、失败样本回流</td><td class="p-2">AgiBot World、Open X-Embodiment、LeRobotDataset、1X Expert Mode</td></tr>
              <tr class="border-t"><td class="p-2 font-mono">L4</td><td class="p-2">场景编排</td><td class="p-2">多机器人调度、WMS/MES 集成、权限与安全</td><td class="p-2">Agility Arc、UBTECH BrainNet 2.0/Co-Agent</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="s5-commercialization" class="scroll-mt-24 mb-8">
        <h3 class="text-lg font-bold mb-3">商业化验证阶梯（v2.0）</h3>
        <p class="text-xs text-slate-600 mb-3">把「发布演示」与「可交付订单/量产交付/真实场景运营」分层，降低被发布会叙事牵引的风险。</p>
        <pre class="mermaid text-sm mb-4">flowchart LR
  A[发布会/视频演示] --> B[可订购/开发者购买]
  B --> C[企业试点]
  C --> D[批量交付]
  D --> E[规模运营]
  E --> F[单位经济性成立]</pre>
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table class="w-full text-xs text-left">
            <thead class="bg-amber-50 text-slate-600"><tr><th class="p-2">层级</th><th class="p-2 text-left">判定标准</th><th class="p-2 text-left">当前接近者（reported）</th></tr></thead>
            <tbody class="text-slate-700">
              <tr class="border-t"><td class="p-2 font-medium">发布演示</td><td class="p-2">视频/展会展示能力</td><td class="p-2">大多数整机厂</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">可订购</td><td class="p-2">明确售价、订金或开发者版本</td><td class="p-2">Unitree G1/R1、1X NEO</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">企业试点</td><td class="p-2">进入工厂/仓库/物流试用</td><td class="p-2">Figure、Apptronik、Agility、UBTECH、智元、Fourier</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">批量交付</td><td class="p-2">数百台级交付或明确生产线</td><td class="p-2">UBTECH Walker S2、EngineAI T800（持续验证）</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">规模运营</td><td class="p-2">多客户、多站点、持续稳定运行</td><td class="p-2">Agility Digit 相对领先</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">单位经济性</td><td class="p-2">机器人小时成本低于人工（含维护）</td><td class="p-2">全行业仍待验证</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="s5-invest-lens" class="scroll-mt-24">`;
replaceOnce(investLensAnchor, newSections, '§5 commercialization + PA stack sections');

// —— §4c: add S/A/B tier table before existing table ——
const s4cAnchor = `<p class="text-sm text-slate-600 mb-3">与 §4 圆环、<a href="#tab-components-map" class="text-indigo-600 underline">零部件地图</a>、<code class="bg-slate-100 px-1 rounded text-xs">data/component-supply-chain.json</code> 同源。本节约束三点：`;
const s4cWithTier = `<p class="text-sm text-slate-600 mb-3">与 §4 圆环、<a href="#tab-components-map" class="text-indigo-600 underline">零部件地图</a>、<code class="bg-slate-100 px-1 rounded text-xs">data/component-supply-chain.json</code> 同源。v2.0 高价值环节排序：</p>
      <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white mb-4">
        <table class="w-full text-xs text-left">
          <thead class="bg-violet-50 text-slate-600"><tr><th class="p-2">层级</th><th class="p-2">环节</th><th class="p-2 text-left">价值来源</th><th class="p-2 text-left">代表参与者</th></tr></thead>
          <tbody class="text-slate-700">
            <tr class="border-t"><td class="p-2 font-bold text-red-700">S</td><td class="p-2">关节执行器总成</td><td class="p-2">单机用量大、BOM 占比高、可靠性决定寿命</td><td class="p-2">三花、拓普、鸣志、汇川、Unitree 自研</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-red-700">S</td><td class="p-2">灵巧手与触觉</td><td class="p-2">决定从「会走」到「会干活」</td><td class="p-2">灵心巧手、因时、帕西尼、汉威、Unitree Dex</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-amber-700">A</td><td class="p-2">丝杠/减速器/轴承</td><td class="p-2">精密传动国产化与成本下降</td><td class="p-2">绿的谐波、双环、五洲新春、恒立、贝斯特</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-amber-700">A</td><td class="p-2">感知模组</td><td class="p-2">低成本 3D 感知与近场操作</td><td class="p-2">奥比中光、舜宇、海康、UBTECH 双目</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-amber-700">A</td><td class="p-2">边缘计算</td><td class="p-2">VLA/控制/感知融合算力底座</td><td class="p-2">Jetson Orin/Thor、Tesla 自研、地平线、昇腾</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-slate-600">B</td><td class="p-2">电池/充换电</td><td class="p-2">续航、换电、工厂 24/7 运营</td><td class="p-2">Walker S2 换电、1X NEO 自充电</td></tr>
            <tr class="border-t"><td class="p-2 font-bold text-slate-600">B</td><td class="p-2">线束/连接器/散热</td><td class="p-2">可靠性基础设施</td><td class="p-2">消费电子与汽车供应链复用</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm text-slate-600 mb-3">本节约束三点：`;
replaceOnce(s4cAnchor, s4cWithTier, '§4c S/A/B tier table');

// —— §10 key tracking metrics ——
const metricsOld = `<tbody class="text-slate-700">
              <tr class="border-t"><td class="p-2 font-medium">全球季度出货</td><td class="p-2">IDC ~1.8 万（2025 全年）</td><td class="p-2">单季 &gt;1 万台且 IDC/同业不下修</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">特斯拉量产节点</td><td class="p-2">Gen3 试产 reported</td><td class="p-2">产线爬坡 + 供应链 Tier1 订单披露</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">大额定点/订单</td><td class="p-2">公开确认仍少</td><td class="p-2">亿元级合同或财报分部收入佐证</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">丝杠/空心杯国产化</td><td class="p-2">reported ~40% / ~35%</td><td class="p-2">头部整机厂国产导入 + 毛利率改善</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">中国 VLA/世界模型</td><td class="p-2">追赶中</td><td class="p-2">可复现工业场景 demo + 数据闭环披露</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">BOM 成本</td><td class="p-2">机构目标 ~2 万美元级</td><td class="p-2">财报/拆解验证持续降本路径</td></tr>
            </tbody>`;

const metricsNew = `<tbody class="text-slate-700">
              <tr class="border-t"><td class="p-2 font-medium">整机季度交付量</td><td class="p-2">IDC ~1.8 万（2025 全年）</td><td class="p-2">单厂商 &gt;1000 台/季 → 从试点进入放量验证</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">真实任务成功率</td><td class="p-2">多数未披露</td><td class="p-2">连续任务 &gt;95% 且含异常恢复 → 商业替代接近可行</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">机器人小时成本</td><td class="p-2">全行业待验证</td><td class="p-2">含折旧、维护、遥操作后低于人工</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">遥操作/监督占比</td><td class="p-2">头部仍较高</td><td class="p-2">持续下降 → 模型泛化真实进步</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">维护间隔 MTBF</td><td class="p-2">演示机水平</td><td class="p-2">关节/手部寿命提升 → 从演示到生产工具</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">开源数据增长</td><td class="p-2">AgiBot World、LeRobot 等</td><td class="p-2">高质量真实轨迹持续增加 → 模型迭代速度</td></tr>
              <tr class="border-t"><td class="p-2 font-medium">大客户复购</td><td class="p-2">试点为主</td><td class="p-2">试点客户追加订单 → 商业价值强证据</td></tr>
            </tbody>`;
replaceOnce(metricsOld, metricsNew, '§10 key tracking metrics');

// —— §10 antithesis: add risk redlines ——
const antithesisEnd = `<tr class="border-t"><td class="p-2 font-medium">Physical AI 差距拉大</td><td class="p-2">中国整机缺乏可验证 VLA + 场景数据闭环</td><td class="p-2">降权纯代工映射；提高软件/数据标的权重上限</td></tr>
            </tbody>`;
const antithesisWithRedlines = `<tr class="border-t"><td class="p-2 font-medium">Physical AI 差距拉大</td><td class="p-2">中国整机缺乏可验证 VLA + 场景数据闭环</td><td class="p-2">降权纯代工映射；提高软件/数据标的权重上限</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <h3 class="font-semibold text-red-900 text-sm mb-2">v2.0 风险红线</h3>
          <ul class="text-xs text-red-800 space-y-1 list-disc pl-4">
            <li>只发布视频、不披露真实任务指标</li>
            <li>订单金额大但交付节奏、验收标准和回款不清晰</li>
            <li>过度依赖遥操作，却包装成完全自主</li>
            <li>灵巧手、关节、线束、散热等可靠性没有长期数据</li>
            <li>估值已定价百万台级市场，但现实仍停留在百台/千台试点</li>
          </ul>`;
replaceOnce(antithesisEnd, antithesisWithRedlines, '§10 risk redlines');

// —— §7: add global scenario table ——
const s7AfterKpi = `<p class="text-xs text-slate-500 mt-4">注：情景为作者假设推演，非券商一致预期。全球市场规模请引用第 11 节双口径。</p>`;
const s7WithGlobal = `<p class="text-xs text-slate-500 mt-4">注：情景为作者假设推演，非券商一致预期。全球市场规模请引用第 11 节双口径。</p>
      <div class="section-card p-4 mt-4 text-xs">
        <h3 class="font-semibold text-slate-800 mb-2">2026–2028 全球出货情景（v2.0 · 研究假设）</h3>
        <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-slate-600"><tr><th class="p-2">情景</th><th class="p-2">概率</th><th class="p-2">2027 全球出货</th><th class="p-2 text-left">核心条件</th></tr></thead>
            <tbody class="text-slate-700">
              <tr class="border-t"><td class="p-2 font-medium text-emerald-700">乐观</td><td class="p-2">25%</td><td class="p-2">5–10 万台</td><td class="p-2">工业场景出现可复用任务模板；中美头部均进入千台级交付</td></tr>
              <tr class="border-t"><td class="p-2 font-medium text-blue-700">基准</td><td class="p-2">50%</td><td class="p-2">2–5 万台</td><td class="p-2">物流/制造/教育先放量，家庭仍早期；可靠性拖慢扩张</td></tr>
              <tr class="border-t"><td class="p-2 font-medium text-red-700">悲观</td><td class="p-2">25%</td><td class="p-2">&lt;1 万台</td><td class="p-2">AI 泛化与可靠性不达标，订单转化慢，资本退潮</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;
replaceOnce(s7AfterKpi, s7WithGlobal, '§7 global scenario table');

// —— KPI scenarios JS ——
replaceOnce(
  `      base: { units: 1.8, tam: 120, pen: 38, bionic: 2 },
      bull: { units: 5, tam: 280, pen: 52, bionic: 5 },
      bear: { units: 1.2, tam: 85, pen: 28, bionic: 0.5 }`,
  `      base: { units: 3.5, tam: 150, pen: 42, bionic: 2 },
      bull: { units: 8, tam: 320, pen: 55, bionic: 5 },
      bear: { units: 0.8, tam: 75, pen: 25, bionic: 0.5 }`,
  'KPI scenario numbers'
);

replaceOnce(
  `      base: { label: '基准', units: 1.8, tam: 120, pen: 38, global: '全球出货 1.8 万（IDC 2025 实际）· 中国零部件 TAM 120 亿 · 谐波渗透 38%', cls: 'text-slate-600' },
      bull: { label: '乐观', units: 5, tam: 280, pen: 52, global: '全球出货 5 万+（IDC 2026E）· TAM 280 亿 · 谐波渗透 52%', cls: 'text-emerald-700' },
      bear: { label: '保守', units: 1.2, tam: 85, pen: 28, global: '全球出货 1.2 万 · TAM 85 亿 · 谐波渗透 28%', cls: 'text-red-700' }`,
  `      base: { label: '基准', units: 3.5, tam: 150, pen: 42, global: '2027 全球 2–5 万台（v2.0 基准）· 中国零部件 TAM 150 亿 · 谐波渗透 42%', cls: 'text-slate-600' },
      bull: { label: '乐观', units: 8, tam: 320, pen: 55, global: '2027 全球 5–10 万台（v2.0 乐观）· TAM 320 亿 · 谐波渗透 55%', cls: 'text-emerald-700' },
      bear: { label: '保守', units: 0.8, tam: 75, pen: 25, global: '2027 全球 &lt;1 万台（v2.0 悲观）· TAM 75 亿 · 谐波渗透 25%', cls: 'text-red-700' }`,
  'KPI_SCENARIO_L4 numbers'
);

// —— Nav links for new sections ——
replaceOnce(
  `<a href="#s5-physical-ai" class="nav-link block px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px]">5a. Physical AI</a>`,
  `<a href="#s5-physical-ai" class="nav-link block px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px]">5a. Physical AI</a>
    <a href="#s5-physical-ai-stack" class="nav-link block px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px]">5a′. 软件栈</a>
    <a href="#s5-commercialization" class="nav-link block px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-[11px]">5c. 商业化阶梯</a>`,
  'nav links for new sections'
);

fs.writeFileSync(htmlPath, s, 'utf8');
console.log('\nWrote', htmlPath);

// —— Update other files ——
const feedbackPath = path.join(ROOT, 'assets/feedback.js');
let fb = fs.readFileSync(feedbackPath, 'utf8');
fb = fb.replace('v0.3.6', 'v2.0');
fs.writeFileSync(feedbackPath, fb);
console.log('Updated feedback.js');

const indexPath = path.join(ROOT, 'index.html');
let idx = fs.readFileSync(indexPath, 'utf8');
idx = idx.replace('v0.3.6', 'v2.0');
fs.writeFileSync(indexPath, idx);
console.log('Updated index.html');

// nodes.json
const nodesPath = path.join(ROOT, 'data/nodes.json');
const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
nodes.version = '2.0';
nodes.updated = '2026-06-05';
const newNodes = [
  { id: 'apptronik', label: 'Apptronik Apollo', kind: 'anchor2', tier: 2, route: ['electric'], evidenceLevel: 'reported', summary: '仓储/制造/物流企业试点；4h 热插拔电池、模块化部署。', section: '#s5' },
  { id: 'engineai', label: 'EngineAI T800', kind: 'anchor2', tier: 2, route: ['electric'], evidenceLevel: 'reported', summary: '2026 T800 交付信号增强；首批交付后任务能力与安全边界待验证。', section: '#s5' },
  { id: 'xpeng-iron', label: 'XPENG IRON', kind: 'anchor2', tier: 2, route: ['electric'], evidenceLevel: 'reported', summary: '车企 Physical AI 延伸；计划 2026 量产，车端 VLA/芯片/供应链复用降本。', section: '#s5' },
  { id: 'fourier', label: 'Fourier GR-3', kind: 'anchor2', tier: 2, route: ['electric', 'service'], evidenceLevel: 'reported', summary: '康养/陪伴/服务；GR-3 强调护理与多模态交互。', section: '#s5' },
  { id: 'kuavo', label: '乐聚 Kuavo', kind: 'anchor2', tier: 2, route: ['electric'], evidenceLevel: 'reported', summary: '开源人形平台；教育/科研/ROS 国产生态适配。', section: '#s5' },
];
for (const n of newNodes) {
  if (!nodes.nodes.find(x => x.id === n.id)) nodes.nodes.push(n);
}
// Update figure summary
const figure = nodes.nodes.find(x => x.id === 'figure');
if (figure) figure.summary = 'Figure 03 + Helix；产品叙事领先，非结构化家庭环境成功率、遥操作占比、成本待跟踪。';
fs.writeFileSync(nodesPath, JSON.stringify(nodes, null, 2) + '\n');
console.log('Updated nodes.json');

// Copy source markdown
const srcMd = path.join(process.env.USERPROFILE || '', 'Desktop', '知识图谱_files', '具身智能人形机器人产业链版图_知识图谱_v2.0_2026-06-05.md');
const destMd = path.join(ROOT, 'docs', 'humanoid-knowledge-graph-v2.0-2026-06-05.md');
if (fs.existsSync(srcMd)) {
  let md = fs.readFileSync(srcMd, 'utf8');
  md = md.replace('../sources/humanoid-robot-sources-2026-06-05.md', 'humanoid-robot-sources-2026-06-05.md');
  fs.writeFileSync(destMd, md);
  console.log('Copied source markdown to docs/');
} else {
  console.warn('Source markdown not found at', srcMd);
}

// HERMES.md
const hermesPath = path.join(ROOT, 'HERMES.md');
if (fs.existsSync(hermesPath)) {
  let h = fs.readFileSync(hermesPath, 'utf8');
  h = h.replace(/v0\.3\.6/g, 'v2.0');
  fs.writeFileSync(hermesPath, h);
  console.log('Updated HERMES.md');
}

// README.md
const readmePath = path.join(ROOT, 'README.md');
if (fs.existsSync(readmePath)) {
  let r = fs.readFileSync(readmePath, 'utf8');
  r = r.replace(/v0\.3\.6/g, 'v2.0');
  fs.writeFileSync(readmePath, r);
  console.log('Updated README.md');
}

console.log('\nDone. Run export script if needed: node scripts/export-clone-robotics-md.mjs');
