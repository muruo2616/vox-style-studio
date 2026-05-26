# JSON MVP 脚手架 (v0.4)

> 2026-05-25

## 文件

| 路径 | 用途 |
| --- | --- |
| `index.html` | 轻量入口：拉取 `data/*.json`，预览路线洞察与数据层状态 |
| `assets/app.js` | 并行 fetch 六类 JSON，渲染状态列表与 nodes 锚点预览 |
| `assets/style.css` | MVP 独立样式（未从 monolith 抽离 Tailwind） |
| `docs/old-report.html` | `clone-robotics-report.html` 快照备份，完整 v0.3 交互 |
| `clone-robotics-report.html` | 继续作为主开发/预览 monolith |

## 本地预览

```bash
# 任选静态服务，例如
python -m http.server 8781
# http://127.0.0.1:8781/index.html
# http://127.0.0.1:8781/clone-robotics-report.html
```

## 后续迁移（未做）

1. 从 monolith 内联脚本抽取 `companies` / `routes` / `milestones` 到 `data/report/*.json`
2. Tab IA 与 `setV3Tab` 迁入 `assets/app.js` 模块
3. 共用样式：Tailwind build 或 CSS 变量对齐 monolith
4. `index.html` 取代 monolith 为默认入口
