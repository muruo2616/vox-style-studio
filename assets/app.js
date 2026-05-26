/**
 * v0.4 JSON MVP shell — loads open data; full IA remains in docs/old-report.html
 */
const DATA_FILES = [
  { key: 'components', path: 'data/components.json', label: '零部件 components.json' },
  { key: 'supplyChain', path: 'data/component-supply-chain.json', label: '产业链 component-supply-chain.json' },
  { key: 'nodes', path: 'data/nodes.json', label: '图谱节点 nodes.json' },
  { key: 'scoring', path: 'data/scoring-config.json', label: '评分 scoring-config.json' },
  { key: 'bom', path: 'data/bom-supply-chain.json', label: 'BOM bom-supply-chain.json' },
  { key: 'milestones', path: 'data/milestones.json', label: '里程碑 milestones.json' },
];

const ROUTES_INSIGHTS = [
  {
    tone: 'emerald',
    label: '主线判断',
    headline: '电驱人形看交付，零部件看定点。',
    body: 'Figure/Tesla/优必选与国产整机的出货节奏，是 2026 供应链兑现的第一变量。',
  },
  {
    tone: 'purple',
    label: 'Clone 观察',
    headline: '279 台预购是观察样本，不是出货样本。',
    body: '需等首批家庭交付、悬挂依赖、维护成本与故障率披露后再上调确定性。',
  },
  {
    tone: 'amber',
    label: '承接顺序',
    headline: '交付口径 → BOM 定点 → 产能爬坡 → ASP/毛利。',
    body: '先区分订单、预购、样机、实际交付，再看 A 股映射能否转收入。',
  },
];

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} HTTP ${res.status}`);
  return res.json();
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    });
  }
  (children || []).forEach(c => {
    if (typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  });
  return node;
}

function renderDataStatus(container, results) {
  container.innerHTML = '';
  const ul = el('ul', { className: 'data-list' });
  results.forEach(({ label, ok, detail }) => {
    ul.appendChild(
      el('li', null, [
        el('span', { text: label }),
        el('span', { className: ok ? 'ok' : 'err', text: ok ? detail : detail }),
      ])
    );
  });
  container.appendChild(ul);
}

function renderRoutesPreview(root, nodes) {
  const grid = el('div', { className: 'insight-grid' });
  ROUTES_INSIGHTS.forEach(item => {
    grid.appendChild(
      el('div', { className: `insight ${item.tone}` }, [
        el('p', { className: 'label', text: item.label }),
        el('p', { className: 'headline', text: item.headline }),
        el('p', { text: item.body }),
      ])
    );
  });
  root.appendChild(grid);

  if (nodes?.nodes?.length) {
    root.appendChild(el('h3', { text: '锚点节点（nodes.json 预览）' }));
    const list = el('div', { className: 'node-list' });
    nodes.nodes
      .filter(n => n.kind === 'anchor1')
      .slice(0, 8)
      .forEach(n => {
        list.appendChild(
          el('div', { className: 'node-chip' }, [
            el('strong', { text: n.label }),
            el('span', {
              className: 'status-pill',
              text: (n.evidenceLevel || '—') + (n.route?.length ? ' · ' + n.route.join('/') : ''),
            }),
            el('p', { text: (n.summary || '').slice(0, 120) + ((n.summary || '').length > 120 ? '…' : '') }),
          ])
        );
      });
    root.appendChild(list);
  }
}

async function main() {
  const statusEl = document.getElementById('data-status');
  const routesEl = document.getElementById('routes-preview');
  const compCountEl = document.getElementById('components-count');

  const loaded = {};
  const statusRows = [];

  await Promise.all(
    DATA_FILES.map(async ({ key, path, label }) => {
      try {
        const data = await loadJson(path);
        loaded[key] = data;
        let detail = 'OK';
        if (key === 'components' && data.components) detail = `${data.components.length} 项`;
        else if (key === 'nodes' && data.nodes) detail = `${data.nodes.length} 节点`;
        else if (key === 'milestones' && data.milestones) detail = `${data.milestones.length} 条`;
        statusRows.push({ label, ok: true, detail });
      } catch (e) {
        statusRows.push({ label, ok: false, detail: String(e.message || e) });
      }
    })
  );

  if (statusEl) renderDataStatus(statusEl, statusRows);
  if (compCountEl && loaded.components?.components) {
    compCountEl.textContent = String(loaded.components.components.length);
  }
  if (routesEl) renderRoutesPreview(routesEl, loaded.nodes);
}

main().catch(err => {
  const statusEl = document.getElementById('data-status');
  if (statusEl) {
    statusEl.textContent = '加载失败：' + err.message;
    statusEl.style.color = '#dc2626';
  }
});
