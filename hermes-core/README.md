# Hermes 底层人格逻辑 · 核心配置方案

## 先弄清一件事

**Hermes 只认一个「家」：** `C:\Users\sjlov\.hermes\`（或环境变量 `HERMES_HOME` 指向的目录）。

| 是不是核心 | 文件 | 作用 |
|------------|------|------|
| ✅ **是** | `SOUL.md` | 全局人格与底层逻辑（每次会话自动加载） |
| ✅ **是** | `memories/MEMORY.md` | 跨会话稳定事实与框架索引 |
| ✅ **是** | `memories/USER.md` | 你的偏好与边界 |
| ✅ **是** | `config.yaml` | API、辅助模型、可选 `/personality` 预设 |
| ❌ **不是** | `vox-style-studio\hermes-core\` 本文件夹 | 只是**待复制模板**，Hermes 不会读这里 |
| ❌ **现在不需要** | `skills/`、论文 `HERMES.md`、阅读库 | 属于**以后具体应用**再叠 |

你 Obsidian 里的 AI 理论笔记在：

`C:\Users\sjlov\Documents\ai\新建文件夹\脑图\理论分析库\ai机制\`

本方案已把其中 **v3.1 协作伦理 + 认知外化框架** 蒸馏进 `SOUL.md` 与 `MEMORY.md`；完整卡片仍保留在 Obsidian，不必整库搬进 Hermes。

---

## 思想来源（你的 Obsidian）

| 笔记 | 写入 Hermes 的位置 |
|------|-------------------|
| [[AI作为人类认知延伸的非生物认知系统]] | SOUL · 本体论立场 |
| [[认知外化-反馈塑形-协同演化框架]] | SOUL · 工作循环 |
| [[协作伦理七项原则]] | SOUL · 行为红线 |
| [[价值冲突与伦理排序]] | SOUL · 冲突时优先级 |
| [[诚实边界原则]] | SOUL · 输出标注格式 |
| [[人类主权原则]] | SOUL · 裁决边界 |
| [[责任锚定原则]] / [[能力边界声明]] | SOUL · 责任与术语边界 |
| [[AI协作伦理检查清单]] | MEMORY · 会话前自检要点 |

---

## 安装（3 步）

### 1. 创建 Hermes 家目录

```powershell
$H = "$env:USERPROFILE\.hermes"
New-Item -ItemType Directory -Force -Path "$H\memories"
```

### 2. 复制核心三件套

```powershell
$src = "c:\Users\sjlov\vox-style-studio\hermes-core"
Copy-Item "$src\SOUL.md" "$H\SOUL.md"
Copy-Item "$src\memories\MEMORY.md" "$H\memories\MEMORY.md"
Copy-Item "$src\memories\USER.md" "$H\memories\USER.md"
```

### 3. 合并 config（若尚无 config.yaml 可直接复制）

```powershell
# 若 ~/.hermes/config.yaml 不存在：
Copy-Item "$src\config.yaml" "$H\config.yaml"
# 若已存在：用编辑器把 config.yaml 里的 agent / memory 段合并进去
```

安装 Hermes Agent 后启动任意会话，底层逻辑即生效。**无需**先建阅读库或论文项目。

---

## 装好后怎么验证

在 Hermes 里问一句：

> 用你自己的话说明：你是什么、不是什么；遇到价值冲突时先保什么？

正确表现应包含：认知延伸非生物系统、非意识主体、七项伦理、人类终审、诚实优于讨好。

可用 `/context` 查看 `SOUL.md` / `MEMORY.md` 是否已进入系统提示。

---

## 以后加应用层（现在不做）

| 阶段 | 加什么 | 放哪 |
|------|--------|------|
| 论文写作 | 路径、Zotero 分工、法条核对 | 论文仓库的 `HERMES.md` 或 `AGENTS.md` |
| 深度阅读库 | `/daily-read` 等 skills | `~/.hermes/skills/` |
| 多 AI 决策 | R0–R5 角色提示词 | skills 或 Dify，与底层 SOUL 并存 |

底层 `SOUL.md` 一般**长期不改**；具体任务写在项目文件或 skills 里。

---

## 本目录文件

- `SOUL.md` → 复制为 `~/.hermes/SOUL.md`
- `memories/MEMORY.md` → `~/.hermes/memories/MEMORY.md`
- `memories/USER.md` → `~/.hermes/memories/USER.md`
- `config.yaml` → 合并进 `~/.hermes/config.yaml`
