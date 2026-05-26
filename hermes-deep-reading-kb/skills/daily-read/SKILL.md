---
name: daily-read
description: 每日精读跟读：输入章节/划线/原文片段，输出迷你思维导图与行动问题。用户说今日精读、跟读、10分钟阅读时使用。
user-locked: true
---

# /daily-read — 每日精读（Step 2）

## 前置

- 读取 `reading-plan/current-week.md` 获取本周书目与进度
- 读取 `maps/00-知识导航-总图.md` 确定本条笔记归属领域

## 交互

1. 若用户未提供内容，询问：**今天读哪本书哪一节？** 或从 `inbox/` 推荐 1 条待读
2. 用户粘贴原文、划线或章节要点
3. 按 **输入 → 思考 → 输出** 生成（可用 `/fast` 降低延迟）

## 输出结构

### A. 今日三点（bullet）

### B. 迷你思维导图（≤2 层深度）

### C. 一个行动问题（明天可做）

### D. 建议挂接的思维模型（1 个，名称即可，详用 `/apply-model`）

## 落盘

保存到 `notes/YYYY-MM/YYYY-MM-DD-《书名简写》-章节.md`，frontmatter 含：

```yaml
title:
date:
tags: [精读, 书名]
source: 书名 + 章节
domain: # 来自导航图
reading_minutes: 10
model_hint: # 建议模型名
```

## 会话命令配合

- 临时查词：`/btw …`（不写 MEMORY）
- 改输出：`/steer …`
- 排队明天：`/queue 明天继续第 4 章并对比昨天的模型`
