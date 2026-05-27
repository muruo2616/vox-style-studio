# 意见反馈机制配置

当前版本采用静态站友好的 GitHub Issues 反馈机制，不需要后端。

## 启用步骤

1. 将项目发布到 GitHub 仓库，例如 `muruo2616/vox-style-studio`。
2. 打开仓库的 Issues 功能。
3. 编辑 `data/feedback-config.json`。
4. 将 `githubRepo` 从空字符串改为你的仓库名：

```json
{
  "githubRepo": "muruo2616/vox-style-studio"
}
```

5. 提交并发布。

## 用户提交时会自动带上

- 页面地址
- 当前 Tab / hash
- 报告版本
- 反馈类型
- 用户填写内容（**至少 10 字**，否则前端拦截，避免空 Issue）
- 浏览器与时间戳

## 误触 / 空 Issue

若出现正文为「（请补充）」的 Issue，多为未填写说明即提交；可在 GitHub 关闭并标注 `invalid`，或编辑后保留。

## 推荐 Issue 标签

- `feedback`
- `data-stale`
- `fact-check`
- `ui-bug`
- `source-needed`
- `hermes-update`

## 后续接 Hermes

已提供初版集成，详见 **[hermes-integration.md](hermes-integration.md)**。

1. `data/update-feed.json` — 更新候选池（已建，初始为空）。
2. 仓库根目录 `HERMES.md` — Hermes 在本目录会话时自动加载。
3. 技能 `/issue-triage`、`/feed-review` — 见 `hermes-vox-report/skills/`，复制到 `~/.hermes/skills/`。
4. 证据分级：official / media / inferred / rumor / rejected。
5. 仅 `accepted` 后经人工改 `data/*.json` 或报告，不自动改研究结论。

