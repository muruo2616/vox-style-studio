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
- 用户填写内容
- 浏览器与时间戳

## 推荐 Issue 标签

- `feedback`
- `data-stale`
- `fact-check`
- `ui-bug`
- `source-needed`
- `hermes-update`

## 后续接 Hermes

Hermes 工作流完成后，可让 Issues 或表单记录进入：

1. `data/update-feed.json` 的候选池。
2. 人工核验队列。
3. 证据分级：official / media / inferred / rumor / rejected。
4. 确认后再进入报告正文或里程碑，不直接自动改研究结论。

