# v0.3.6 发布说明

发布日期：2026-05-26

## 发布内容

- 同步 `clone-robotics-report.html` 与 `clone-robotics-report.md` 的 Clone Alpha 口径。
- 明确 `279 台预购` 是观察样本，不计入实际出货。
- 将 Clone 仿生路线的制造映射改为“待验证/小批量装配验证”，避免暗示立讯已确认承接 Clone 量产。
- 补强技术路线阅读框架：交付口径 → BOM 定点 → 产能爬坡 → ASP/毛利。
- 更新入口页 `index.html`，将最新版交互报告、Markdown 版、发布说明和旧版备份分开。

## 关键口径

- 官方预购页确认：2025 预购窗口、Alpha 限量 279 台、预装家庭技能清单。
- 定价、排产和 2026 交付节奏：按第三方/条款口径汇总，仍需以官网、条款和实际用户交付记录复核。
- Clone 2025 实际交付：按 0 处理，直到有可验证首批家庭交付记录。
- 立讯精密：电驱人形代工/集成主线更强；Clone 仿生代工关系仍为待验证映射。

## 发布包文件

- `index.html`：发布入口。
- `clone-robotics-report.html`：最新版交互报告。
- `clone-robotics-report.md`：Markdown 静态版。
- `data/*.json`：结构化数据层。
- `docs/old-report.html`：旧版备份。
- `docs/release-v0.3.6.md`：本发布说明。

## 已校验

- HTML 内嵌 JS 与 JSON 可解析。
- Markdown 表格无列数错位。
- HTML 引用的 `data/*.json` 文件存在。
- `data` 目录 JSON 文件可解析。

## 仍需跟踪

- Clone Alpha 首批家庭交付是否可验证。
- Alpha 是否消除 Protoclone 的悬挂/支撑依赖。
- Myofiber 故障率、维护成本与售后责任。
- 立讯机器人出货是否进入财报或更高等级披露。
