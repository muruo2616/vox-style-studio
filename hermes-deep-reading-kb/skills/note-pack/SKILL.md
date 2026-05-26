---
name: note-pack
description: 一键整理读书笔记、课程导图、复盘日志；生成 Obsidian 友好文件与社群三点摘要。用户说整理笔记、第四步、数字化管理时使用。
user-locked: true
---

# /note-pack — 数字化整理（Step 4）

## 模式

用户可指定：

- `week` — 整理本周 `notes/`
- `file <path>` — 整理单篇
- `course <名称>` — 合并课程系列笔记

## 流程

1. 收集目标文件，去重、统一 frontmatter（`templates/note-daily.md`）
2. 生成 **结构化摘要**：
   - 核心论点 3 条
   - 跨笔记重复概念（合并）
   - 未解决问题 1–2 个
3. 可选：合并为一张 **周总导图** 写入 `maps/weekly-YYYY-Www.md`
4. 生成 **社群版**（≤120 字 + 3 bullet，无敏感信息）

## 模板

使用 `templates/note-daily.md` 与 `templates/review-weekly.md`。

## 批量模式

用户明确说「批量」「一键」时，建议先 `/yolo`，再执行本技能写盘。

## 输出路径

- 整理结果：`notes/_packed/YYYY-Www-summary.md`
- 社群摘要：`notes/_packed/YYYY-Www-social.md`

## 与 Obsidian

保持 `tags` 与 Dataview 字段一致，便于查询面板统计阅读量。
