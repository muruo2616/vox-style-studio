# 行政复议调解论文 · Obsidian 模板包

复制整个文件夹到你的 Obsidian 库根目录（或合并到现有库）。

## 安装前提

1. **Zotero** + [Better BibTeX](https://github.com/retorquere/zotero-better-bibtex)
2. **Obsidian 社区插件**：Templater、Dataview、Zotero Integration（可选但推荐）
3. Templater 设置 → Template folder location → 指向本库的 `templates` 文件夹

## 文件夹结构（复制后）

```text
你的Obsidian库/
├── templates/           ← 本包 templates 文件夹
├── 文献笔记/
├── 案例矩阵/
├── 章节草稿/
├── 政策规范/
├── 00-MOC-总目录.md
└── 查询面板-论文工作区.md   ← 本包根目录文件，可放库根
```

## 使用方法

| 操作 | 做法 |
|------|------|
| 新建文献笔记 | `Ctrl+P` → Templater: Create new note from template → 文献笔记 |
| 新建案例条目 | 同上 → 案例条目 |
| 查看案例表 | 打开 `查询面板-论文工作区.md` |
| Zotero 导入 | Zotero Integration 可另设模板；本「文献笔记」用于手写补充 |

## 与 Hermes 同步

Hermes 输出目录建议：`/root/thesis/案例矩阵/`、`/root/thesis/政策规范/`  
用 scp 或 Syncthing 拉到本库对应文件夹即可被 Dataview 读取。
