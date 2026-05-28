(function () {
  "use strict";

  if (window.__SONG_REPORT_INIT__) return;
  window.__SONG_REPORT_INIT__ = true;

  var CONSTRAINTS = window.SONG_CONSTRAINTS || {};
  var EXPAND = window.SONG_EXPAND || {};
  var HUMAN = window.SONG_HUMAN || {};

  var KEYWORD_MAP = {
    文官集权: "strategy",
    市场江南: "jiangnan",
    货币金融: "chain",
    妥协外交: "strategy",
    人的因素: "human",
  };

  /* ── 通用展开渲染 ── */
  function renderExpandDetail(data) {
    var glyph = data.glyph || "·";
    var html = '<header class="detail-header">';
    html += '<span class="detail-glyph" aria-hidden="true">' + glyph + "</span>";
    html += '<div><h4 class="detail-title">' + data.title + "</h4>";
    if (data.logic) {
      html += '<p class="detail-logic"><span class="detail-label">逻辑链</span>' + data.logic + "</p>";
    }
    if (data.stars) {
      html += '<p class="detail-stars-row">' + starStr(data.stars) + "</p>";
    }
    html += "</div></header>";
    html += '<div class="detail-body">';
    (data.sections || []).forEach(function (sec, idx) {
      html += '<section class="detail-section" style="animation-delay:' + idx * 0.06 + 's">';
      html += "<h5>" + sec.heading + "</h5>";
      sec.body.forEach(function (p) {
        html += "<p>" + p + "</p>";
      });
      html += "</section>";
    });
    html += "</div>";
    if (data.sources && data.sources.length) {
      html += '<footer class="detail-sources"><h5 class="detail-sources-title">依据与来源</h5><ul>';
      data.sources.forEach(function (src) {
        html += '<li><span class="source-type">' + src.type + "</span>" + src.cite + "</li>";
      });
      html += "</ul></footer>";
    }
    return html;
  }

  function showExpandPanel(panel, data, activeEl, activeClass) {
    if (!panel || !data) return;
    if (activeClass) {
      document.querySelectorAll("." + activeClass).forEach(function (el) {
        el.classList.remove("active");
        el.setAttribute("aria-selected", "false");
      });
    }
    if (activeEl) {
      activeEl.classList.add("active");
      activeEl.setAttribute("aria-selected", "true");
    }
    panel.hidden = false;
    panel.classList.remove("is-open");
    void panel.offsetWidth;
    panel.innerHTML = renderExpandDetail(data);
    panel.classList.add("is-open");
    if (window.matchMedia("(max-width: 860px)").matches) {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function starStr(n) {
    return "\u2605".repeat(n) + "\u2606".repeat(5 - n);
  }

  function initExpandCards(containerId, panelId, dataMap, opts) {
    var grid = document.getElementById(containerId);
    var panel = document.getElementById(panelId);
    if (!grid || !panel || !dataMap) return;

    opts = opts || {};
    var cardClass = opts.cardClass || "expand-card";
    var keys = opts.order || Object.keys(dataMap);

    keys.forEach(function (key) {
      var data = dataMap[key];
      if (!data) return;
      var card = document.createElement("button");
      card.type = "button";
      card.className = cardClass + " reveal";
      card.setAttribute("data-key", key);
      if (data.glyph) card.setAttribute("data-glyph", data.glyph);
      card.setAttribute("aria-selected", "false");

      var inner = "<h4>" + data.title + "</h4>";
      inner += '<p class="card-brief">' + data.brief + "</p>";
      if (data.stars) {
        inner += '<div class="card-stars">' + starStr(data.stars) + "</div>";
      }
      inner += '<span class="card-hint">展开说明</span>';
      card.innerHTML = inner;

      card.addEventListener("click", function () {
        showExpandPanel(panel, data, card, cardClass);
        if (opts.onSelect) opts.onSelect(key, data, card);
      });
      grid.appendChild(card);
    });

    if (opts.autoFirst !== false && keys[0]) {
      var first = grid.querySelector('[data-key="' + keys[0] + '"]');
      if (first) first.click();
    }
  }

  function initExpandTableRows(tbodyId, panelId, dataMap, rowKeys) {
    var tbody = document.getElementById(tbodyId);
    var panel = document.getElementById(panelId);
    if (!tbody || !panel) return;

    function wireRow(tr, data) {
      if (!data || tr.__wired) return;
      tr.__wired = true;
      function activate() {
        tbody.querySelectorAll(".expand-row").forEach(function (r) {
          r.classList.remove("active");
        });
        tr.classList.add("active");
        showExpandPanel(panel, data, tr, "expand-row");
      }
      tr.addEventListener("click", activate);
      tr.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    }

    var preset = tbody.querySelectorAll(".expand-row[data-key]");
    if (preset.length) {
      preset.forEach(function (tr) {
        wireRow(tr, dataMap[tr.getAttribute("data-key")]);
      });
      var first = tbody.querySelector(".expand-row");
      if (first) first.click();
      return;
    }

    var rows = [
      { key: rowKeys[0], cells: ["时代条件", "面临什么硬约束？", "五代创伤、北方压力、江南崛起…", "决定无法简单复制汉唐"] },
      { key: rowKeys[1], cells: ["价值排序", "统治者优先保什么？", "内部稳定 > 军事冒险…", "稳定增强，军事效率受限"] },
      { key: rowKeys[2], cells: ["国家策略", "如何组织资源？", "强干弱枝、商税专卖…", "繁荣与财政压力并存"] },
      { key: rowKeys[3], cells: ["制度链条", "各制度如何互相催化？", "反藩镇 → 高成本 → 市场财政…", "互相催化，互相锁定"] },
      { key: rowKeys[4], cells: ["实施效果", "得失何在？", "政治经济成功；军事转化不足…", "典型富而难强"] },
      { key: rowKeys[5], cells: ["人的行为线", "谁在执行、博弈？", "皇帝焦虑、官僚变形…", "短期理性累积为长期困局"] },
      { key: rowKeys[6], cells: ["现代启示", "「富而难强」意味什么？", "财富须沉淀为能力、纪律与安全", "制度须约束人性"] },
    ];

    if (tbodyId === "strategy-tbody") {
      rows = [
        { key: rowKeys[0], cells: ["政治", "强干弱枝，防五代化", "禁军中央化、财权上收…", "地方应变弱、冗官冗兵"] },
        { key: rowKeys[1], cells: ["经济", "承认市场，变税基", "坊市、市舶、商税…", "与汲取并存"] },
        { key: rowKeys[2], cells: ["财政", "多元化、货币化", "田赋+商税+专卖…", "后期缺硬约束"] },
        { key: rowKeys[3], cells: ["金融", "信用工具调度", "交子、会子、盐引…", "信用被赤字侵蚀"] },
        { key: rowKeys[4], cells: ["外交军事", "财政换时间", "岁币、边军…", "短期理性、长期被动"] },
      ];
    }

    rows.forEach(function (row) {
      var data = dataMap[row.key];
      if (!data) return;
      var tr = document.createElement("tr");
      tr.className = "expand-row";
      tr.setAttribute("data-key", row.key);
      tr.setAttribute("tabindex", "0");
      tr.setAttribute("role", "button");
      row.cells.forEach(function (text) {
        var td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
      });
      var hint = document.createElement("td");
      hint.className = "row-hint";
      hint.textContent = "展开";
      tr.appendChild(hint);
      tbody.appendChild(tr);
      wireRow(tr, data);
    });

    var first = tbody.querySelector(".expand-row");
    if (first) first.click();
  }

  /* ── 各模块初始化 ── */
  function initConstraints() {
    initExpandCards("constraint-grid", "constraint-detail", CONSTRAINTS, {
      cardClass: "constraint-card",
      order: ["wudai", "north", "jiangnan", "commerce", "tech"],
    });
  }

  function initFrameworkIntro() {
    initExpandTableRows(
      "framework-tbody",
      "framework-detail",
      EXPAND.framework,
      ["era", "values", "strategy", "chain", "outcome", "human", "modern"]
    );
  }

  function initStrategyDims() {
    initExpandTableRows(
      "strategy-tbody",
      "strategy-detail",
      EXPAND.strategyDims,
      ["politics", "economy", "fiscal", "finance", "diplomacy"]
    );
  }

  function initChain() {
    var container = document.getElementById("chain-flow");
    var panel = document.getElementById("chain-detail");
    if (!container || !panel) return;

    var keys = ["c1", "c2", "c3", "c4", "c5", "c6"];
    keys.forEach(function (key, i) {
      var data = EXPAND.chain[key];
      if (!data) return;
      if (i > 0) {
        var arrow = document.createElement("div");
        arrow.className = "chain-arrow";
        arrow.textContent = "\u2193 \u50ac\u5316";
        container.appendChild(arrow);
      }
      var step = document.createElement("button");
      step.type = "button";
      step.className = "chain-step reveal";
      step.setAttribute("data-step", String(i + 1));
      step.setAttribute("data-key", key);
      step.innerHTML =
        "<h5>" + data.title + "</h5><p>" + data.brief + '</p><span class="card-hint">展开说明</span>';
      step.addEventListener("click", function () {
        var allSteps = container.querySelectorAll(".chain-step");
        allSteps.forEach(function (s, idx) {
          s.classList.toggle("chain-active", idx <= i);
        });
        showExpandPanel(panel, data, step, "chain-step");
      });
      container.appendChild(step);
    });

    var first = container.querySelector(".chain-step");
    if (first) first.click();
  }

  function initOutcomes() {
    initExpandCards("outcome-grid", "outcome-detail", EXPAND.outcomes, {
      cardClass: "outcome-card",
      order: ["politics", "economy", "fiscal", "military", "security"],
    });
  }

  function initLogicExpand() {
    var panel = document.getElementById("logic-detail");
    if (!panel) return;

    function fillList(containerId, dataMap, order) {
      var container = document.getElementById(containerId);
      if (!container) return;
      order.forEach(function (key, i) {
        var data = dataMap[key];
        if (!data) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "logic-item-btn";
        btn.innerHTML =
          '<span class="num">' + (i + 1) + "</span>" +
          "<div><h5>" + data.title + "</h5><p>" + data.brief + '</p><span class="card-hint">展开说明</span></div>';
        btn.addEventListener("click", function () {
          container.querySelectorAll(".logic-item-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          showExpandPanel(panel, data, btn, "logic-item-btn");
        });
        container.appendChild(btn);
      });
    }

    fillList("logic-right-list", EXPAND.logicRight, [
      "mainContradiction", "seekTruth", "baseArea", "unitedFront", "protracted", "combo",
    ]);
    fillList("logic-wrong-list", EXPAND.logicWrong, [
      "stabilityVsFight", "extractVsMarket", "financeVsDiscipline", "economyVsStrategy",
    ]);

    var first = document.querySelector("#logic-right-list .logic-item-btn");
    if (first) first.click();
  }

  function initLogicTabs() {
    var tabs = document.querySelectorAll(".logic-tab");
    var panels = document.querySelectorAll(".logic-panel");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== target;
        });
        var listId = target === "right" ? "logic-right-list" : "logic-wrong-list";
        var first = document.querySelector("#" + listId + " .logic-item-btn");
        if (first) first.click();
      });
    });
  }

  function initInsights() {
    initExpandCards("insight-grid", "insight-detail", EXPAND.insights, {
      cardClass: "insight-card",
      order: ["i1", "i2", "i3", "i4", "i5", "i6", "i7"],
    });
  }

  function initHuman() {
    initExpandCards("human-grid", "human-detail", HUMAN, {
      cardClass: "human-card",
      order: ["emperor", "scholar", "bureaucrat", "general", "merchant", "people", "psychology", "figures"],
    });
  }

  /* ── 其余交互（保持） ── */
  function initProgress() {
    var bar = document.getElementById("ink-progress-bar");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initNav() {
    var links = document.querySelectorAll(".song-nav-link");
    var sections = document.querySelectorAll(".song-section[id]");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var id = link.getAttribute("data-section");
        var el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", "#" + id);
        }
      });
    });
    if (!sections.length) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("data-section") === id);
          });
        });
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  function observeReveals() {
    var els = document.querySelectorAll(".reveal:not(.visible)");
    if (!els.length) return;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(function (el) {
      obs.observe(el);
    });
  }

  function initFloatingLeaves() {
    var container = document.getElementById("floating-leaves");
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var i = 0; i < 14; i++) {
      var leaf = document.createElement("span");
      leaf.className = "leaf";
      leaf.style.left = Math.random() * 100 + "%";
      leaf.style.animationDuration = 12 + Math.random() * 18 + "s";
      leaf.style.animationDelay = Math.random() * 15 + "s";
      leaf.style.width = 6 + Math.random() * 8 + "px";
      leaf.style.height = 10 + Math.random() * 10 + "px";
      container.appendChild(leaf);
    }
  }

  function initSealStamp() {
    document.querySelectorAll(".song-hero-seal, .seal-mini").forEach(function (el) {
      el.addEventListener("click", function () {
        el.classList.remove("stamped");
        void el.offsetWidth;
        el.classList.add("stamped");
      });
    });
  }

  function initThesisKeywords() {
    document.querySelectorAll(".thesis-keyword").forEach(function (kw) {
      kw.addEventListener("click", function () {
        var key = kw.getAttribute("data-kw");
        var target = KEYWORD_MAP[key];
        document.querySelectorAll(".thesis-keyword").forEach(function (k) {
          k.classList.toggle("active", k === kw);
        });
        if (target === "jiangnan") {
          var card = document.querySelector('.constraint-card[data-key="jiangnan"]');
          if (card) {
            card.click();
            document.getElementById("era").scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
        if (target === "human") {
          var humanSec = document.getElementById("human");
          if (humanSec) humanSec.scrollIntoView({ behavior: "smooth" });
          setTimeout(function () {
            var firstHuman = document.querySelector("#human-grid .human-card");
            if (firstHuman) firstHuman.click();
          }, 450);
          return;
        }
        var section = document.getElementById(target);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var bg = document.getElementById("qingming-bg");
    if (!bg) return;
    var target = bg.querySelector("img") || bg.querySelector("object");
    if (!target) return;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY * 0.15;
        target.style.transform = "scale(1.1) translateY(" + y * 0.05 + "px)";
      },
      { passive: true }
    );
  }

  function initMermaid() {
    var sources = [
      "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js",
      "https://unpkg.com/mermaid@10/dist/mermaid.min.js",
    ];
    function boot() {
      if (typeof mermaid === "undefined") return;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: "#fff8eb",
          primaryTextColor: "#3d3428",
          primaryBorderColor: "#b8860b",
          lineColor: "#4a7a62",
          secondaryColor: "#e8dcc8",
          tertiaryColor: "#c4ad88",
          fontFamily: "LXGW WenKai, FangSong, serif",
        },
        flowchart: { curve: "basis", padding: 16 },
      });
      mermaid.run({ querySelector: ".mermaid" }).then(function () {
        document.querySelectorAll(".mermaid-fallback").forEach(function (el) {
          el.classList.add("mermaid-rendered-hide");
        });
      }).catch(function () {
        /* keep text fallback visible */
      });
    }
    function tryLoad(i) {
      if (typeof mermaid !== "undefined") {
        boot();
        return;
      }
      if (i >= sources.length) return;
      var s = document.createElement("script");
      s.src = sources[i];
      s.onload = boot;
      s.onerror = function () {
        tryLoad(i + 1);
      };
      document.head.appendChild(s);
    }
    tryLoad(0);
  }

  function initHash() {
    var hash = location.hash.replace("#", "");
    if (hash) {
      var el = document.getElementById(hash);
      if (el) setTimeout(function () {
        el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMermaid();
    initProgress();
    initNav();
    initFloatingLeaves();
    initSealStamp();
    initThesisKeywords();
    initFrameworkIntro();
    initConstraints();
    initStrategyDims();
    initChain();
    initOutcomes();
    initHuman();
    initLogicExpand();
    initLogicTabs();
    initInsights();
    initParallax();
    initHash();
    observeReveals();
  });
})();
