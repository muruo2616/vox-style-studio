# vox-style-studio

人形机器人产业链交互报告（静态站），含 JSON 数据层与 GitHub Issues 反馈入口。

## 在线访问

发布 GitHub Pages 后：

| 报告 | 链接（分享用这个） |
|------|-------------------|
| **宋朝国家策略** | https://muruo2616.github.io/vox-style-studio/song-dynasty-report.html |
| 宋朝短链（自动跳转） | https://muruo2616.github.io/vox-style-studio/song/ |
| 发布入口（多报告） | https://muruo2616.github.io/vox-style-studio/ |
| 人形机器人报告 | https://muruo2616.github.io/vox-style-studio/clone-robotics-report.html |

> 注意：站点根目录 `/` 是**多报告入口**，不是宋朝报告正文。分享宋朝内容请用上面第一或第二条链接。

## 本地预览

```bash
# 任选一种静态服务器，在项目根目录执行
python -m http.server 8080
# 或: npx --yes serve .
```

浏览器打开 `http://localhost:8080/`。

## 反馈

右下角「反馈」按钮会打开 GitHub Issue 草稿。启用方式见 [docs/feedback-setup.md](docs/feedback-setup.md)。

## 目录

| 路径 | 说明 |
|------|------|
| `clone-robotics-report.html` | 主报告（v2.0） |
| `data/` | 结构化 JSON 数据 |
| `assets/` | 样式、入口脚本、反馈组件 |
| `docs/` | 发布说明、迁移与配置文档 |
| `scripts/` | 导出与补丁脚本 |
| `song-dynasty-report.html` | 宋朝国家策略交互报告（绢本书画美学） |
| `hermes-*` / `studio/` | 研究工作流与周边素材 |
