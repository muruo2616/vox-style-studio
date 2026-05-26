# 项目：思维导图深度阅读知识库

本仓库是 Hermes 的**工作目录**。会话请在此启动：`cd ~/deep-reading-kb`。

## 目录约定

| 路径 | 用途 |
|------|------|
| `maps/` | 知识导航思维导图（Step 1） |
| `reading-plan/` | 阅读成长计划，含 `current-week.md` |
| `notes/YYYY-MM/` | 每日精读笔记（Step 2 输出） |
| `models/` | 108 思维模型分卷（Step 3） |
| `reviews/` | 周/月复盘（Step 5） |
| `templates/` | 笔记与复盘模板 |
| `inbox/` | Webhook/RSS 待读队列（可选） |

## 文件命名

- 导航图：`maps/00-知识导航-总图.md`
- 每日笔记：`notes/2026-05/2026-05-26-《书名》-ch3.md`
- 周复盘：`reviews/weekly-2026-W21.md`
- 月复盘：`reviews/monthly-2026-05.md`

## 输出规范（所有技能遵守）

1. 每个 Markdown 文件顶部必须有 YAML frontmatter：`title`, `date`, `tags`, `source`, `domain`
2. 思维导图用 Markdown 层级或 ` ```mermaid mindmap `（用户偏好写在 USER.md）
3. 引用书中原句须标注章节；无原文则标 `待核对`
4. 写入前确认路径；批量整理可用 `/yolo`，单条精读默认需确认

## 与全局 SOUL 的关系

- 人格与方法论：`~/.hermes/SOUL.md`
- 跨项目事实索引：`~/.hermes/memories/MEMORY.md`
- **本文件**：仅约束本知识库的路径、命名与输出格式

## 推荐斜杠命令

- `/map-domain` — 新建或更新导航图
- `/daily-read` — 今日精读
- `/apply-model` — 用思维模型串联
- `/note-pack` — 整理笔记/生成社群摘要
- `/monthly-review` — 月度复盘

## 中程控制

- 尝试新分类法时用 `/branch`，不满意可切回主会话
- 导图或笔记误改时用 `/rollback`
- 精读中途改输出格式：`/steer 只要 5 个分支的导图，不要长文`
