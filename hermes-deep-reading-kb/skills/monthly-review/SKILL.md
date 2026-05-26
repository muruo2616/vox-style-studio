---
name: monthly-review
description: 月度复盘：回顾导图库与笔记，更新认知、提炼经验。用户说月复盘、第五步、知识进化时使用。
user-locked: true
---

# /monthly-review — 月度复盘（Step 5）

## 前置

- 列出 `maps/` 所有版本或 `00-知识导航-总图.md` 的 git 历史（若有）
- 统计 `notes/YYYY-MM/` 文件数、涉及领域、使用的模型（从 frontmatter `model_hint`）
- 读取 `reviews/weekly-*.md`（如有）

## 复盘四问

1. **导航图**：哪些分支长了？哪些该删或降级？
2. **阅读**：本月真正精读了什么？与计划偏差在哪？
3. **模型**：哪 3 个模型最有用？哪 3 个几乎没用？
4. **认知升级**：写 1–3 条「以前认为 … 现在认为 …」

## 输出

写入 `reviews/monthly-YYYY-MM.md`：

```markdown
---
title: 月复盘 YYYY-MM
date:
tags: [复盘, 月度]
---

## 数据概览
## 导航图变更建议
## 认知升级
## 下月阅读计划（3 条以内）
## MEMORY 更新草案
```

## 更新 MEMORY.md

生成 **MEMORY 更新草案** 块，供用户复制到 `~/.hermes/memories/MEMORY.md`（因 auto_write 可能关闭）。

## 人格

使用 `/personality review-facilitator` 或 config 中的 `review-facilitator` 预设。

## 反馈闭环

提醒用户：可选将「认知升级」一条发社群，换取外部反馈以坚持输出。
