# 元素库 · Matisse / Mondrian / Memphis → 色纹形材

本文件为打样与 AI 辅助设计时的 **锁色锁形** 参考。所有对外图案须附文化来源（见各节末）。

---

## 1. Henri Matisse

### 1.1 观察源

- *Jazz* (1947) 剪纸：平面色块、无透视  
- *The Snail* / *Creole Dancer*：有机块面拼贴  
- 晚期室内：高饱和蓝墙 + 红地板对比

### 1.2 抽象提取

| 元素类型 | 设计令牌 ID | 规则 | Hex（Palette A） |
|----------|-------------|------|------------------|
| 色-平面 | `MAT-BLOCK-BLU` | 纯色填充，禁渐变 | `#1E6FD9` |
| 色-平面 | `MAT-BLOCK-RED` | 与绿相邻形成撞色 | `#E63946` |
| 色-平面 | `MAT-BLOCK-GRN` | 面积 ≤叶形剪影 | `#40916C` |
| 纹-正负 | `MAT-SILHOUETTE` | Paisley 上叠实心叶，无描边 | 同上 |
| 形-有机 | `MAT-LEAF-A` | 宽:高 ≈ 1.4:1，圆角 | 矢量路径见打样 |
| 形-有机 | `MAT-BODY-S` | 简化舞蹈肢体，**仅耳饰**可用 | 耳饰 SVG |
| 材-平涂 | `MAT-PRINT-MATTE` | 130gsm 棉府绸哑光印 | — |

### 1.3 产品映射

- **头巾**：5 处 `MAT-LEAF-A` 叠压于 Layer 1 斜带之上  
- **耳饰**：主轮廓 = 单块 `MAT-LEAF-A` 镂空滴形（详见 `sku-earrings.md`）

**文化来源**：Henri Matisse 晚期剪纸；致敬其「绘画用剪刀完成」的色面解放。

---

## 2. Piet Mondrian

### 2.1 观察源

- *Composition with Red, Blue and Yellow*：原色矩形 + 黑线  
- 不对称留白：格面积不等

### 2.2 抽象提取 →「节奏网格」Rhythm Grid

> **非** 1:1 复制经典构图，而是提取 **正交分割 + 原色块 + 黑线节奏**。

| 元素类型 | 设计令牌 ID | 规则 | Hex |
|----------|-------------|------|-----|
| 色-原色 | `MON-RED` | 面积 < 格总面积 8% | `#E10600` |
| 色-原色 | `MON-YEL` | 不与 `MON-RED` 同格相邻 | `#F7D000` |
| 色-原色 | `MON-BLU` | 可与黑线形成三角构图 | `#005BBB` |
| 纹-网格 | `MON-RHYTHM-GRID` | 线宽 1.8mm；格比 1:1.6:2.4 | `#1A1A1A` |
| 形-矩形 | `MON-CELL` | 最小单元 ≥ 8×8mm @ 65cm | — |
| 材-硬边 | `MON-SCREEN-LINE` | 浆料印，防晕染工艺 | — |

### 2.3 产品映射

- **头巾**：仅 **四边 3cm 饰边** 使用 `MON-RHYTHM-GRID`；中心留给 Paisley+Funk  
- **耳饰**：第二片嵌件 12×8mm 三色块（红/黄/蓝各一）

**文化来源**：De Stijl / Mondrian 新造型主义；纺织化「节奏网格」为再诠释。

---

## 3. Memphis (Memphis Group, 1981–)

### 3.1 观察源

- Ettore Sottsass 主导：几何 + 粉彩 + 原色冲突  
- Terrazzo 水磨石纹；Bacterio 波浪

### 3.2 抽象提取（与 Funk 几何合并，去 kitsch）

| 元素类型 | 设计令牌 ID | 规则 | Hex |
|----------|-------------|------|-----|
| 色-冲突 | `MEM-CORAL` | 与 `MAT-BLOCK-BLU` 相邻 | `#FF6B6B` |
| 色-冲突 | `MEM-ELEC` | 与 `FUNK-MAGENTA` 点状呼应 | `#4D96FF` |
| 纹-点 | `MEM-TERRAZZO` | Ø2–4mm 圆，密度 ≤12%/cm² | 上两色 |
| 纹-波 | `MEM-SQUIGGLE` | 线宽 1.2mm；**禁用**于头巾主区 | — |
| 形-几何 | `MEM-DOT-STACK` | 耳饰 2 颗 Enamel 圆点 | Ø4mm |
| 材-光点 | `MEM-ENAMEL` | 耳饰局部亮面 | — |

### 3.3 产品映射

- **头巾**：`MEM-TERRAZZO` 仅出现在 Paisley 空隙，**不覆盖** Funk 斜带  
- **耳饰**：滴形底部 `MEM-DOT-STACK`（珊瑚 + 电蓝）

**文化来源**：Memphis Group 意大利后现代设计；此处提取点阵与撞色逻辑，非复古样板间复刻。

---

## 4. Hippie × Funk 基底

| 元素类型 | 设计令牌 ID | 规则 | Hex |
|----------|-------------|------|-----|
| 纹-佩斯利 | `HIP-PAISLEY` | 连续曲线；线 `#BC6C25` | 底 `#F4F1DE` |
| 纹-切断 | `FUNK-DIAG-BAND` | 45° 3 条不等宽 | `#E9C46A` `#E056FD` `#1E6FD9` |
| 色-撞色 | `CLASH-PAIR-1` | 色相差 >120° | 蓝+红 / 绿+品红 |
| 材-透气 | `HIP-COTTON` | 130gsm 棉府绸 | — |

**Funk 文化来源**：1970s 美国 Funk 视觉与黑人音乐文化；斜带象征切分音与舞台律动。

---

## 5. 合成层级（Z-Index）

```
z5  MON-RHYTHM-GRID（四边饰边）
z4  MEM-TERRAZZO（碎点）
z3  MAT-LEAF-A（叶形块）
z2  FUNK-DIAG-BAND（斜带）
z1  HIP-PAISLEY（满版底）
z0  BASE #F4F1DE
```

---

## 6. 打样交付清单

- [ ] AI/PDF 65×65cm @ 300dpi，10 专色层命名  
- [ ] 耳饰 SVG：外轮廓 + 色块嵌件 + 点位  
- [ ] 文化来源 80 字中文（吊牌）  
- [ ] Palette A hex 色卡 1 页  

---

*Cross-ref: `sku-headscarf.md`, `sku-earrings.md`*
