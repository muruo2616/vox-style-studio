(function () {
  "use strict";

  if (window.__SONG_REPORT_INIT__) return;
  window.__SONG_REPORT_INIT__ = true;

  var CONSTRAINTS = {
    wudai: {
      title: "五代创伤",
      brief: "最紧迫的题：别再军阀割据",
      glyph: "兵",
      detail: "唐末五代的核心病灶是武人掌兵、藩镇坐大、地方财政独立。赵匡胤集团首先要解决的是：如何让新王朝不被武人和军镇迅速吞掉？因此制度起点是反藩镇、反军阀——杯酒释兵权、削弱节度使、禁军中央化、财权上收。",
    },
    north: {
      title: "北方压力",
      brief: "缺少燕云屏障与优良马场",
      glyph: "塞",
      detail: "未完全收复燕云十六州，面对辽、西夏、金时存在结构性地缘劣势：步兵对骑兵成本劣势、边境防御线漫长、军费刚性支出高。岁币成为「用财政换时间」的工具。",
    },
    jiangnan: {
      title: "江南崛起",
      brief: "经济重心南移，财政底盘转移",
      glyph: "漕",
      detail: "江南提供高产水田、密集人口、手工业基地、内河航运与港口海贸。国家策略的现实基础：北方消耗财政，南方创造财政。",
    },
    commerce: {
      title: "商业成熟",
      brief: "市场大到无法按唐初逻辑压回",
      glyph: "市",
      detail: "坊市制瓦解、城市夜市兴盛、长途贸易与海贸增长、纸币与交引等信用机构活跃。宋朝选择顺势而为：不压死市场，而把市场纳入财政与治理。",
    },
    tech: {
      title: "技术扩散",
      brief: "生产、交易与治理成本下降",
      glyph: "工",
      detail: "雕版与活字印刷、造船与指南针、冶铁与水利、契约文书普及，扩大了市场半径，降低了信息与交易成本。",
    },
  };

  var CHAIN_STEPS = [
    { step: 1, title: "反藩镇 → 强中央", desc: "解决政治稳定；催化财政集中与货币化需求" },
    { step: 2, title: "强中央 → 高行政成本", desc: "冗官、冗兵、冗费；迫使寻找田赋之外收入" },
    { step: 3, title: "高财政需求 → 市场财政", desc: "商税、专卖、市舶上升；形成利用—保护—汲取三角" },
    { step: 4, title: "市场扩张 → 货币金融", desc: "纸币、交引、典当发展；提高交易与财政调度效率" },
    { step: 5, title: "金融财政化 → 信用风险", desc: "滥发、贬值、物价上涨；财政压力透支信用" },
    { step: 6, title: "军事压力 → 系统高负荷", desc: "外部威胁驱动整个循环长期运转于极限" },
  ];

  var OUTCOMES = [
    { name: "政治稳定", stars: 5, note: "防内乱目标完成" },
    { name: "经济繁荣", stars: 5, note: "商业古代高峰" },
    { name: "财政汲取", stars: 4, note: "多元税源韧性强" },
    { name: "军事转化", stars: 2, note: "投入高、转化率低" },
    { name: "战略安全", stars: 2, note: "岁币拖延、终局被动" },
  ];

  var LOGIC_RIGHT = [
    { title: "抓住主要矛盾", desc: "先防五代化：杯酒释兵权、财权上收、文官治国——先保统一，再谈发展。" },
    { title: "实事求是", desc: "承认市场不可逆，把江南、城市、货币交易作为现实起点，让市场力量转化为国家能力。" },
    { title: "经济根据地", desc: "稳住江南最高生产力区域——北宋靠漕运，南宋靠本土，才有长期竞争资本。" },
    { title: "统一战线", desc: "扩大科举，承认财产权，利用商人网络，形成比纯皇权—军队更宽的治理联盟。" },
    { title: "持久战思维", desc: "岁币与防御争取时间；缺口在于「拖」而未完成「拖中求变」。" },
    { title: "政策组合拳", desc: "税、专卖、纸币、交引、漕运、市舶、科举、岁币——强在制度耦合。" },
  ];

  var LOGIC_WRONG = [
    { title: "稳定 vs 战斗力", desc: "防武将干政的一端找到了，专业高效军队的另一端不足。" },
    { title: "汲取 vs 市场活力", desc: "财政紧张时倾向竭泽而渔，缺制度化约束，从「养鱼」滑向「透支」。" },
    { title: "金融 vs 信用纪律", desc: "纸币本身不是问题；缺发行规则、兑换纪律与赤字边界才是。" },
    { title: "经济强 vs 产业战略", desc: "冶铁、造船、金融优势未系统转化为军工效率与终局安全能力。" },
  ];

  var KEYWORD_MAP = {
    文官集权: "strategy",
    市场江南: "jiangnan",
    货币金融: "chain",
    妥协外交: "strategy",
  };

  function starStr(n) {
    return "\u2605".repeat(n) + "\u2606".repeat(5 - n);
  }

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

  function initScrollReveal() {
    observeReveals();
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
        var section = document.getElementById(target);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initConstraints() {
    var grid = document.getElementById("constraint-grid");
    var panel = document.getElementById("constraint-detail");
    if (!grid || !panel) return;

    Object.keys(CONSTRAINTS).forEach(function (key) {
      var data = CONSTRAINTS[key];
      var card = document.createElement("button");
      card.type = "button";
      card.className = "constraint-card reveal";
      card.setAttribute("data-key", key);
      card.setAttribute("data-glyph", data.glyph);
      card.innerHTML = "<h4>" + data.title + "</h4><p class=\"card-brief\">" + data.brief + "</p>";

      card.addEventListener("click", function () {
        grid.querySelectorAll(".constraint-card").forEach(function (c) {
          c.classList.remove("active");
        });
        card.classList.add("active");
        panel.hidden = false;
        panel.innerHTML = "<strong>" + data.title + "：</strong>" + data.detail;
        panel.classList.remove("visible");
        void panel.offsetWidth;
        panel.style.animation = "none";
        void panel.offsetWidth;
        panel.style.animation = "";
      });
      grid.appendChild(card);
    });

    var first = grid.querySelector(".constraint-card");
    if (first) first.click();
  }

  function initChain() {
    var container = document.getElementById("chain-flow");
    if (!container) return;

    CHAIN_STEPS.forEach(function (item, i) {
      if (i > 0) {
        var arrow = document.createElement("div");
        arrow.className = "chain-arrow";
        arrow.textContent = "\u2193 \u50ac\u5316";
        container.appendChild(arrow);
      }
      var step = document.createElement("div");
      step.className = "chain-step reveal";
      step.setAttribute("data-step", String(item.step));
      step.innerHTML = "<h5>" + item.title + "</h5><p>" + item.desc + "</p>";
      step.addEventListener("click", function () {
        var allSteps = container.querySelectorAll(".chain-step");
        allSteps.forEach(function (s, idx) {
          s.classList.toggle("chain-active", idx <= i);
        });
      });
      container.appendChild(step);
    });
  }

  function initOutcomes() {
    var grid = document.getElementById("outcome-grid");
    if (!grid) return;

    OUTCOMES.forEach(function (o) {
      var card = document.createElement("div");
      card.className = "outcome-card reveal";
      card.innerHTML =
        '<div class="dim-name">' + o.name + "</div>" +
        '<div class="stars" aria-label="' + o.stars + '\u661f">' + starStr(o.stars) + "</div>" +
        '<div class="dim-note">' + o.note + "</div>";
      card.addEventListener("click", function () {
        card.classList.remove("pulse");
        void card.offsetWidth;
        card.classList.add("pulse");
      });
      grid.appendChild(card);
    });
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
      });
    });

    var rightPanel = document.querySelector('.logic-panel[data-panel="right"] .logic-items');
    var wrongPanel = document.querySelector('.logic-panel[data-panel="wrong"] .logic-items');

    if (rightPanel) {
      LOGIC_RIGHT.forEach(function (item, i) {
        rightPanel.appendChild(createLogicItem(item, i + 1));
      });
    }
    if (wrongPanel) {
      LOGIC_WRONG.forEach(function (item, i) {
        wrongPanel.appendChild(createLogicItem(item, i + 1));
      });
    }
  }

  function createLogicItem(item, num) {
    var div = document.createElement("div");
    div.className = "logic-item";
    div.innerHTML =
      '<span class="num">' + num + "</span>" +
      "<div><h5>" + item.title + "</h5><p>" + item.desc + "</p></div>";
    return div;
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
        startOnLoad: true,
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
    initScrollReveal();
    initFloatingLeaves();
    initSealStamp();
    initThesisKeywords();
    initConstraints();
    initChain();
    initOutcomes();
    initLogicTabs();
    initParallax();
    initHash();
    observeReveals();
  });
})();
