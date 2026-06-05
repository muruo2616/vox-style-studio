(function () {
  const REPORT_VERSION = "v2.0";
  const DEFAULT_CONFIG = {
    enabled: true,
    provider: "github-issues",
    githubRepo: "",
    labels: ["feedback", "vox-style-report"],
    fallbackUrl: "docs/feedback-setup.md",
    feedbackTypes: ["事实错误", "数据过期", "交互问题", "来源补充", "投资口径", "其他"],
  };

  function currentContext() {
    const visibleTab =
      document.querySelector(".v3-tab-btn.active")?.getAttribute("data-tab") ||
      location.hash.replace(/^#/, "") ||
      "index";
    return {
      title: document.title || "人形机器人产业链报告",
      url: location.href,
      hash: location.hash || "",
      tab: visibleTab,
      version: REPORT_VERSION,
      userAgent: navigator.userAgent,
      time: new Date().toISOString(),
    };
  }

  function issueUrl(config, payload) {
    const repo = (config.githubRepo || "").trim();
    if (!repo) return config.fallbackUrl || "docs/feedback-setup.md";
    const title = `[反馈] ${payload.type} · ${payload.context.tab} · ${payload.context.version}`;
    const body = [
      "## 反馈类型",
      payload.type,
      "",
      "## 反馈内容",
      payload.message || "（请补充）",
      "",
      "## 页面上下文",
      `- 页面：${payload.context.url}`,
      `- Tab/Hash：${payload.context.tab} / ${payload.context.hash || "无"}`,
      `- 版本：${payload.context.version}`,
      `- 时间：${payload.context.time}`,
      "",
      "## 可选联系方式",
      payload.contact || "（未填写）",
      "",
      "## 浏览器",
      payload.context.userAgent,
    ].join("\n");
    const labels = (config.labels || []).join(",");
    return `https://github.com/${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent(labels)}`;
  }

  function openDialog(config) {
    const types = config.feedbackTypes || DEFAULT_CONFIG.feedbackTypes;
    const existing = document.getElementById("feedback-dialog");
    if (existing) existing.remove();
    const backdrop = document.createElement("div");
    backdrop.id = "feedback-dialog";
    backdrop.className = "feedback-backdrop";
    backdrop.innerHTML = `
      <div class="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <div class="feedback-head">
          <div>
            <p class="feedback-kicker">v0.3.6</p>
            <h2 id="feedback-title">提交反馈</h2>
          </div>
          <button type="button" class="feedback-close" aria-label="关闭">×</button>
        </div>
        <label>
          <span>反馈类型</span>
          <select id="feedback-type">${types.map(t => `<option>${t}</option>`).join("")}</select>
        </label>
        <label>
          <span>具体说明 <em class="feedback-required">（必填，至少 10 字）</em></span>
          <textarea id="feedback-message" rows="5" required minlength="10" placeholder="例如：哪一段事实需要核验？哪个数据过期？哪个交互不顺？"></textarea>
          <p id="feedback-error" class="feedback-error" role="alert" hidden>请填写至少 10 个字的说明后再提交。</p>
        </label>
        <label>
          <span>联系方式（可选）</span>
          <input id="feedback-contact" type="text" placeholder="邮箱 / 微信 / GitHub ID" />
        </label>
        <p class="feedback-hint">提交会打开 GitHub Issue 草稿，并自动带上当前页面、Tab、版本和时间。</p>
        <div class="feedback-actions">
          <button type="button" class="feedback-secondary">取消</button>
          <button type="button" class="feedback-primary">打开反馈单</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    const close = () => backdrop.remove();
    backdrop.querySelector(".feedback-close").addEventListener("click", close);
    backdrop.querySelector(".feedback-secondary").addEventListener("click", close);
    backdrop.addEventListener("click", event => {
      if (event.target === backdrop) close();
    });
    const messageEl = backdrop.querySelector("#feedback-message");
    const errorEl = backdrop.querySelector("#feedback-error");
    backdrop.querySelector(".feedback-primary").addEventListener("click", () => {
      const message = messageEl.value.trim();
      if (message.length < 10) {
        errorEl.hidden = false;
        messageEl.setAttribute("aria-invalid", "true");
        messageEl.focus();
        return;
      }
      errorEl.hidden = true;
      messageEl.removeAttribute("aria-invalid");
      const payload = {
        type: backdrop.querySelector("#feedback-type").value,
        message,
        contact: backdrop.querySelector("#feedback-contact").value.trim(),
        context: currentContext(),
      };
      window.open(issueUrl(config, payload), "_blank", "noopener");
      close();
    });
    messageEl.addEventListener("input", () => {
      if (messageEl.value.trim().length >= 10) {
        errorEl.hidden = true;
        messageEl.removeAttribute("aria-invalid");
      }
    });
    backdrop.querySelector("#feedback-message").focus();
  }

  function mountButton(config) {
    if (!config.enabled || document.getElementById("feedback-fab")) return;
    const button = document.createElement("button");
    button.id = "feedback-fab";
    button.type = "button";
    button.textContent = "反馈";
    button.setAttribute("aria-label", "提交反馈");
    button.addEventListener("click", () => openDialog(config));
    document.body.appendChild(button);
  }

  async function init() {
    let config = DEFAULT_CONFIG;
    try {
      const res = await fetch("data/feedback-config.json", { cache: "no-store" });
      if (res.ok) config = Object.assign({}, DEFAULT_CONFIG, await res.json());
    } catch (error) {
      config = DEFAULT_CONFIG;
    }
    mountButton(config);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
