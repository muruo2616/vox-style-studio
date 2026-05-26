# 个人深度阅读知识库 · Hermes 应用层（非核心）

> **若你尚未配置 Hermes 底层人格**，请先完成 [`../hermes-core/`](../hermes-core/)（SOUL / MEMORY / USER），再考虑本目录。

将「思维导图导航 → 每日精读输出 → 108 思维模型串联 → 数字化沉淀 → 定期复盘进化」五步流程，映射到 [Hermes Agent](https://hermes-agent.nousresearch.com/) 四层架构。

## 五步 ↔ Hermes 对照总览

| 你的步骤 | 目标 | Hermes 落点 | 日常入口 |
|---------|------|-------------|---------|
| ① 知识导航图 | 领域/目标/兴趣的可视化地图 | `MEMORY.md` 索引 + `maps/` 导图文件 | `/map-domain` |
| ② 跟读精读 | 每天 10 分钟输入→输出 | `cron` 晨间提醒 + `/daily-read` | `/daily-read` |
| ③ 108 思维模型 | 碎片知识串成体系 | `models/` 模型库 + `/apply-model` | `/apply-model` |
| ④ 数字化管理 | 笔记/导图/复盘一键整理 | 自定义 `skills` + Obsidian 输出目录 | `/note-pack` `/review-log` |
| ⑤ 定期复盘 | 认知升级、导图库进化 | 月末 `cron` + `/monthly-review` | `/monthly-review` |

## 目录结构（复制到 `~/.hermes/` 与知识库仓库）

```text
~/.hermes/
├── SOUL.md                    ← 本包 soul/SOUL.md
├── config.yaml                ← 本包 config/config.yaml（合并进现有配置）
├── memories/
│   ├── MEMORY.md              ← 本包 memories/MEMORY.md
│   └── USER.md                ← 本包 memories/USER.md
└── skills/
    ├── map-domain/SKILL.md
    ├── daily-read/SKILL.md
    ├── apply-model/SKILL.md
    ├── note-pack/SKILL.md
    └── monthly-review/SKILL.md

~/deep-reading-kb/             ← 你的知识库 Git 仓库（Obsidian 可同步）
├── HERMES.md                  ← 项目级指令（Hermes 自动加载）
├── maps/                      ← 领域导航思维导图（Markdown / Excalidraw）
├── reading-plan/              ← 阅读成长计划（按周/主题）
├── notes/                     ← 每日精读笔记
├── models/                    ← 108 思维模型（分卷索引）
├── reviews/                   ← 周复盘 / 月复盘
└── templates/                 ← AI 导图与复盘模板
```

## 安装步骤（约 15 分钟）

### 1. 基础人格与记忆

```powershell
# Windows 示例；macOS/Linux 将路径改为 ~/.hermes
$HERMES = "$env:USERPROFILE\.hermes"
New-Item -ItemType Directory -Force -Path "$HERMES\memories", "$HERMES\skills"

Copy-Item .\soul\SOUL.md "$HERMES\SOUL.md"
Copy-Item .\memories\MEMORY.md "$HERMES\memories\MEMORY.md"
Copy-Item .\memories\USER.md "$HERMES\memories\USER.md"

# Skills
Copy-Item -Recurse .\skills\* "$HERMES\skills\"
```

### 2. 合并 config.yaml

将 `config/config.yaml` 中的片段合并进 `~/.hermes/config.yaml`（勿整文件覆盖，保留你已有的 API Key 与 gateway 设置）。

### 3. 初始化知识库仓库

```powershell
mkdir $HOME\deep-reading-kb
Copy-Item .\project\HERMES.md $HOME\deep-reading-kb\
Copy-Item -Recurse .\project\templates $HOME\deep-reading-kb\
```

在 Hermes 中 `cd ~/deep-reading-kb` 启动会话，项目指令会自动加载。

### 4. 启用定时任务（可选）

在 Hermes 会话中用自然语言创建 cron（见 `config/cron-examples.md`），或按你部署的 gateway 文档配置。

## 运行模式建议（对应配图）

| 场景 | 命令 | 说明 |
|------|------|------|
| 每日 10 分钟精读 | `/fast` + `/daily-read` | 低延迟跟读、摘抄 |
| 用模型拆解一章 | `/reasoning high` + `/apply-model` | 深度串联 |
| 批量整理一周笔记 | `/yolo` + `/note-pack` | 免确认批量写文件 |
| 临时查一个词 | `/btw 这个词在本书里指什么` | 不污染主线程记忆 |
| 换书/换领域试错 | `/branch` | 保留主会话，探索分支 |
| 导图改坏了 | `/rollback` | 回滚 `maps/` 或 `notes/` |
| 精读中途改要求 | `/steer 用费曼技巧，输出控制在 200 字` | 下一工具调用生效 |

## 模型路由（省钱又够用）

主会话默认强模型；压缩、标题、标签用辅助模型（见 `config/config.yaml`）：

- **主脑**：`anthropic:claude-opus-4-7` 或 `openrouter:kimi-k2.6` — 月复盘、跨模型综合
- **精读摘要**：`anthropic:claude-haiku-4-5` — 每日 `/daily-read` 压缩
- **标题/标签**：本地 tiny 或最小云端模型

会话内切换：`/model anthropic:claude-haiku-4-5`

## 记忆后端（可选进阶）

评论中提到的 **Hindsight**（实体图 + 跨会话语义检索）适合第三步「模型串联」。若机器内存紧张，可先用 Hermes 默认 FTS5 + `MEMORY.md` 索引，稳定后再开 Hindsight。

```bash
hermes config set memory.backend hindsight   # 按你环境文档为准
hermes config set memory.auto_write false    # 知识库建议人工审定再写入 MEMORY
```

## 外部反馈闭环

- **输出**：`/note-pack` 生成可发朋友圈/社群的 3 点摘要 + 一张迷你导图 Markdown
- **输入**：RSS/Webhook 推送待读文章到 DM（零 token 接收，见 `config/webhook-examples.md`）

## 文件清单

| 文件 | 用途 |
|------|------|
| [soul/SOUL.md](soul/SOUL.md) | 深度阅读导师人格 |
| [memories/MEMORY.md](memories/MEMORY.md) | 导航图与模型库索引 |
| [memories/USER.md](memories/USER.md) | 你的领域、节奏、偏好 |
| [config/config.yaml](config/config.yaml) | 人格预设、辅助模型、gateway |
| [config/cron-examples.md](config/cron-examples.md) | 每日/每周/每月定时语 |
| [project/HERMES.md](project/HERMES.md) | 知识库项目指令 |
| [skills/*/SKILL.md](skills/) | 五步对应的斜杠技能 |

## 第一周上手节奏

| 天 | 动作 |
|----|------|
| Day 1 | 填 `USER.md`，运行 `/map-domain` 画第一版导航图 |
| Day 2–6 | 每天 `/daily-read`；周末 `/note-pack` |
| Day 7 | `/apply-model` 选 1 个模型串本周笔记 |
| 月末 | `/monthly-review`，更新 `maps/` 与 `MEMORY.md` |

---

参考：[Personality & SOUL.md](https://hermes-agent.nousresearch.com/docs/user-guide/features/personality) · [Context Files](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files)
