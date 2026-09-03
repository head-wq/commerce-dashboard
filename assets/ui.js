/* 공용 렌더링 헬퍼 — 라이브러리 없이 순수 SVG/CSS로 그립니다. */

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = n => Number(n).toLocaleString("ko-KR");
const PAL = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)"];

/* 샘플 데이터 표시 — 실측값이 아닌 항목에 붙습니다 */
const smp = on => on ? '<span class="smp">샘플</span>' : "";

/* ---------- KPI 카드 ---------- */
function kpi(o) {
  return '<div class="kpi' + (o.hi ? " hi" : "") + '">' +
    '<div class="k">' + esc(o.k) + smp(o.sample) + '</div>' +
    '<div class="v">' + esc(o.v) + (o.unit ? '<small>' + esc(o.unit) + '</small>' : "") + '</div>' +
    (o.n ? '<div class="n ' + (o.dir || "") + '">' + esc(o.n) + '</div>' : "") +
  '</div>';
}
const kpis = arr => arr.map(kpi).join("");

/* ---------- 세로 막대 ----------
   dim: true 를 주면 목표 미달 막대를 회색으로 흐립니다.
   추이 그래프에서는 끄는 게 좋습니다 — 전부 회색이 되면 흐름이 안 보입니다. */
function bars(o) {
  const d = o.data, h = o.height || 170;
  const peak = Math.max(...d.map(x => x.v), o.goal || 0) * 1.14 || 1;
  const body = d.map((x, i) => {
    const met = o.goal ? x.v >= o.goal : true;
    const dim = o.dim && o.goal && !met;
    const col = x.color || (dim ? "var(--ink-3)" : (o.color || PAL[i % 6]));
    return '<div class="bar">' +
      '<div class="val">' + esc(o.vfmt ? o.vfmt(x.v) : fmt(x.v)) + '</div>' +
      '<div class="fill" style="height:' + (x.v / peak * 100).toFixed(1) + '%;background:' + col +
        ';opacity:' + (dim ? .45 : 1) + '"></div>' +
      '<div class="lab">' + esc(x.label) + '</div>' +
    '</div>';
  }).join("");
  let gl = "";
  if (o.goal) {
    const r = (1 - o.goal / peak).toFixed(4);
    gl = '<div class="goalline" style="top:calc(20px + (100% - 40px) * ' + r + ')"><span>목표 ' + fmt(o.goal) + '</span></div>';
  }
  return '<div class="chart" style="height:' + h + 'px">' + gl + body + '</div>';
}

/* ---------- 꺾은선 (일별 추이) ---------- */
function line(o) {
  const d = o.data, W = 700, H = o.height || 150, P = 6;
  const peak = Math.max(...d.map(x => x.v)) * 1.15 || 1;
  const X = i => P + i * ((W - P * 2) / Math.max(d.length - 1, 1));
  const Y = v => H - P - (v / peak) * (H - P * 2);
  const pts = d.map((x, i) => X(i) + "," + Y(x.v));
  const col = o.color || "var(--c1)";
  const avg = d.reduce((s, x) => s + x.v, 0) / d.length;
  const peakI = d.reduce((b, x, i) => x.v > d[b].v ? i : b, 0);
  return '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="' + esc(o.aria || "추이 그래프") + '">' +
    '<defs><linearGradient id="' + o.id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + col + '" stop-opacity=".26"/>' +
      '<stop offset="100%" stop-color="' + col + '" stop-opacity="0"/>' +
    '</linearGradient></defs>' +
    '<line x1="' + P + '" y1="' + Y(avg) + '" x2="' + (W - P) + '" y2="' + Y(avg) + '" stroke="var(--ink-4)" stroke-width="1" stroke-dasharray="4 4"/>' +
    '<polygon points="' + P + ',' + (H - P) + ' ' + pts.join(" ") + ' ' + (W - P) + ',' + (H - P) + '" fill="url(#' + o.id + ')"/>' +
    '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
    '<circle cx="' + X(peakI) + '" cy="' + Y(d[peakI].v) + '" r="3.5" fill="' + col + '"/>' +
  '</svg>';
}

/* ---------- 가로 막대 ---------- */
function hbars(o) {
  const peak = Math.max(...o.data.map(x => x.v)) || 1;
  return o.data.map((x, i) =>
    '<div class="hrow">' +
      '<div class="nm" title="' + esc(x.label) + '">' + esc(x.label) + '</div>' +
      '<div class="tr"><i style="width:' + (x.v / peak * 100).toFixed(1) + '%;background:' + (x.color || PAL[i % 6]) + '"></i></div>' +
      '<div class="vv">' + esc(o.vfmt ? o.vfmt(x.v) : fmt(x.v)) + '</div>' +
    '</div>'
  ).join("");
}

/* ---------- 도넛 + 범례 ---------- */
function donut(o) {
  const tot = o.data.reduce((s, x) => s + x.v, 0) || 1;
  const R = 54, C = 2 * Math.PI * R;
  let off = 0;
  const rings = o.data.map((x, i) => {
    const len = x.v / tot * C;
    const seg = '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="' + (x.color || PAL[i % 6]) +
      '" stroke-width="21" stroke-dasharray="' + len + ' ' + (C - len) + '" stroke-dashoffset="' + (-off) + '" transform="rotate(-90 70 70)"/>';
    off += len;
    return seg;
  }).join("");
  const legend = o.data.map((x, i) =>
    '<div class="r">' +
      '<span class="dot" style="background:' + (x.color || PAL[i % 6]) + '"></span>' +
      '<span class="nm">' + esc(x.label) + '</span>' +
      '<span class="vv">' + esc(o.vfmt ? o.vfmt(x.v) : fmt(x.v)) + '</span>' +
      '<span class="pc">' + (x.v / tot * 100).toFixed(1) + '%</span>' +
    '</div>'
  ).join("");
  return '<div class="dn-wrap">' +
    '<svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="' + esc(o.aria || "비중 도넛 차트") + '">' + rings +
      '<text x="70" y="66" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--ink-3)">' + esc(o.centerLabel || "합계") + '</text>' +
      '<text x="70" y="85" text-anchor="middle" font-size="17" font-weight="800" fill="var(--ink)">' + esc(o.centerValue || fmt(tot)) + '</text>' +
    '</svg>' +
    '<div class="dn-lg">' + legend + '</div>' +
  '</div>';
}

/* ---------- 표 ---------- */
function table(o) {
  const head = '<tr>' + o.cols.map(c => '<th>' + esc(c) + '</th>').join("") + '</tr>';
  const body = o.rows.map(r => '<tr>' + r.map(c => '<td>' + (c && c.html ? c.html : esc(c)) + '</td>').join("") + '</tr>').join("");
  const foot = o.foot ? '<tfoot><tr>' + o.foot.map(c => '<td>' + (c && c.html ? c.html : esc(c)) + '</td>').join("") + '</tr></tfoot>' : "";
  return '<div class="tbl-wrap"><table><thead>' + head + '</thead><tbody>' + body + '</tbody>' + foot + '</table></div>';
}

/* ---------- 진행률 ---------- */
function progress(rows) {
  return rows.map(r => {
    const pct = Math.max(0, Math.min(100, r.pct));
    const col = r.color || (pct >= 100 ? "var(--good)" : pct >= 60 ? "var(--accent)" : "var(--warn)");
    return '<div class="prow">' +
      '<div class="t"><b>' + esc(r.label) + smp(r.sample) + '</b><span>' + pct + '%</span></div>' +
      '<div class="pbar"><i style="width:' + pct + '%;background:' + col + '"></i></div>' +
      (r.note ? '<div class="d">' + esc(r.note) + '</div>' : "") +
    '</div>';
  }).join("");
}

/* ---------- 목록 (잘된 점 / 시도할 것) ---------- */
function notes(items, kind) {
  const mk = kind === "good" ? "✓" : "→";
  return '<ul class="nlist ' + esc(kind) + '">' + items.map(t =>
    '<li><span class="mk">' + mk + '</span><span>' + t + '</span></li>'
  ).join("") + '</ul>';
}

/* ---------- 카드 래퍼 / 섹션 ---------- */
const card = (title, inner, hint) =>
  '<div class="card">' + (title ? '<div class="card-t"><span>' + title + '</span>' + (hint ? '<em>' + esc(hint) + '</em>' : "") + '</div>' : "") + inner + '</div>';

const section = (title, inner, hint) =>
  '<div class="sec"><div class="sec-h"><h2>' + esc(title) + '</h2>' + (hint ? '<span class="hint">' + esc(hint) + '</span>' : "") + '</div>' + inner + '</div>';

/* ---------- 네비게이션 ---------- */
const PAGES = [
  { id: "index", nm: "전체", href: "./" },
  { id: "academy", nm: "아카데미", href: "./academy.html" },
  { id: "agency-marketing", nm: "대행 마케팅", href: "./agency-marketing.html" },
  { id: "agency-youtube", nm: "대행 유튜브", href: "./agency-youtube.html" },
  { id: "commerce", nm: "커머스", href: "./commerce.html" }
];

function nav(active) {
  return '<div class="nav"><div class="nav-in">' +
    '<a class="brand" href="./">팀별 현황판 <span>· ' + esc(DATA.meta.period) + '</span></a>' +
    '<div class="tabs">' + PAGES.map(p =>
      '<a class="tab' + (p.id === active ? " on" : "") + '" href="' + p.href + '">' + esc(p.nm) + '</a>'
    ).join("") + '</div>' +
  '</div></div>';
}

/* ---------- 샘플 데이터 안내 배너 ---------- */
function sampleBanner(realList) {
  return '<div class="banner"><span class="ic">⚠️</span><span>' +
    '<b>이 페이지에는 샘플 숫자가 섞여 있습니다.</b> ' +
    '<span class="smp">샘플</span> 표시가 붙은 항목은 실제 값이 아니라 화면 확인용 임시 숫자입니다. ' +
    (realList ? '실측값은 ' + esc(realList) + ' 입니다. ' : "") +
    '실제 수치를 주시면 <code>assets/data.js</code> 한 파일만 고쳐서 바로 교체됩니다.' +
  '</span></div>';
}

function pageFooter(note) {
  return '<footer>' + (note ? esc(note) + '<br>' : "") +
    '데이터 수정: <code>assets/data.js</code> · 수정 후 GitHub에 올리면 사이트가 자동 갱신됩니다.<br>' +
    '기준일 ' + esc(DATA.meta.updated) + '</footer>';
}
