# Cron 自然语言示例（在 Hermes 会话中直接说）

复制下面任一句发给 Hermes，由其解析为定时任务。时间请按你的作息修改。

## 每日精读（Step 2）

```text
每天早上 7:30，提醒我做 10 分钟深度阅读：读取 reading-plan/current-week.md，
问我今天读哪一段，然后等我粘贴原文或章节名，再按 daily-read 技能输出导图。
```

```text
每天晚上 21:00，若今天还没有 notes/ 下的新文件，发 Slack 提醒我补一篇迷你笔记。
```

## 每周整理（Step 4）

```text
每周日 20:00，扫描 ~/deep-reading-kb/notes/ 本周文件，
用 note-pack 技能生成「本周三点收获」并保存到 reviews/weekly-YYYY-Www.md
```

## 每月复盘（Step 5）

```text
每月最后一天 19:00，运行 monthly-review：对比 maps/ 与本月 notes/，
更新 MEMORY.md 里的「本季度焦点」和「认知升级」，把摘要发到我的 Slack。
```

## 阅读输入（Webhook 可选）

外部 RSS / 阅读 App 推送文章标题与链接到 Hermes DM（零 token 接收），
你在晨间 cron 里从队列挑选进入 `/daily-read`。
