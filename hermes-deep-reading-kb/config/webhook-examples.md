# Webhook 订阅示例（Step 2 输入自动化）

Hermes 支持外部服务把 payload 推到 agent DM，**接收阶段不消耗 LLM token**。

## 适用场景

| 来源 | 用途 |
|------|------|
| RSS（Inoreader、Follow 等） | 待读文章队列 |
| 微信读书 / 邮件转发 | 划线与摘录（需中间服务转 JSON） |
| Readwise | 每日 highlight 汇总 |

## 配置思路

1. 在 Hermes 中执行 `/webhook-subscriptions` 查看当前订阅格式
2. 为「深度阅读」建一条订阅，payload 写入 `~/deep-reading-kb/inbox/YYYY-MM-DD.jsonl`
3. 晨间 cron 或你手动 `/daily-read` 时，从 inbox 取一条处理

## Payload 建议字段

```json
{
  "title": "文章标题",
  "url": "https://...",
  "source": "rss|wechat|readwise",
  "snippet": "摘要或划线",
  "suggested_domain": "投资与商业"
}
```

处理时 Hermes 应：匹配 `maps/` 中的领域节点 → 进入精读流程 → 归档到 `notes/`。
