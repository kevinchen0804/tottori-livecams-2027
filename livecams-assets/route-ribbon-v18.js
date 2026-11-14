/* v18 當日開車路線帶。
   只讀內嵌行程資料並操作既有的 #itineraryPoint 選單，不改主程式狀態。 */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  let itinerary;
  try { itinerary = JSON.parse($('#itinerary-data').textContent); } catch { return; }
  const ribbon = $('#routeRibbon');
  const select = $('#itineraryPoint');
  const days = $('#days');
  if (!ribbon || !select || !days || !itinerary) return;

  const visits = new Map(itinerary.visits.map(v => [v.id, v]));
  const DRIVE = new Set(['開車', '巴士']);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const count = n => n + ' 鏡頭';

  function currentDay() {
    const active = days.querySelector('[aria-current="date"]');
    return active && active.dataset.day !== 'all' ? Number(active.dataset.day) : null;
  }

  function sequence(day) {
    const inDay = itinerary.visits
      .filter(v => v.day === day && v.scope === 'tottori-shimane')
      .sort((a, b) => a.sourceOrder - b.sourceOrder);
    const order = new Map(inDay.map((v, i) => [v.id, i]));
    const legs = (itinerary.legs || [])
      .filter(l => l.day === day && DRIVE.has(l.mode) && l.cameraIds.length && order.has(l.fromVisitId) && order.has(l.toVisitId))
      .sort((a, b) => order.get(a.fromVisitId) - order.get(b.fromVisitId));
    const items = [];
    let previous = null;
    for (const leg of legs) {
      if (!previous || previous.toVisitId !== leg.fromVisitId) {
        if (previous) {
          const from = order.get(previous.toVisitId), to = order.get(leg.fromVisitId);
          items.push({ type: 'gap', between: to - from - 1, ids: inDay.slice(from + 1, to).map(v => v.id) });
        }
        items.push({ type: 'stop', visit: visits.get(leg.fromVisitId) });
      }
      items.push({ type: 'leg', leg });
      items.push({ type: 'stop', visit: visits.get(leg.toVisitId) });
      previous = leg;
    }
    return items;
  }

  function choose(value) {
    select.value = select.value === value ? 'all' : value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function render() {
    const day = currentDay();
    const items = day ? sequence(day) : [];
    if (!items.length) { ribbon.hidden = true; ribbon.replaceChildren(); return; }
    const selected = select.value;
    const focused = ribbon.contains(document.activeElement) ? document.activeElement.dataset.value : null;
    const title = el('span', 'route-ribbon-title', 'D' + day + ' 開車路段：點路段看沿線鏡頭，點地點看周邊鏡頭');
    const track = el('div', 'route-track');
    let activeNode = null;
    for (const item of items) {
      let node;
      if (item.type === 'stop') {
        const v = item.visit;
        node = el('button', 'route-stop');
        node.type = 'button';
        node.dataset.value = v.id;
        node.append(el('span', 'route-time', v.start || ''), el('span', 'route-dot'), el('span', 'route-name', v.title));
        const n = (v.cameraIds || []).length;
        if (n) node.append(el('span', 'route-count', count(n)));
        node.setAttribute('aria-label', (v.start || '') + ' ' + v.title + '，' + count(n));
        node.setAttribute('aria-pressed', String(selected === v.id));
        node.addEventListener('click', () => choose(v.id));
        if (selected === v.id) activeNode = node;
      } else if (item.type === 'leg') {
        const l = item.leg;
        const value = 'leg:' + l.id;
        node = el('button', 'route-leg');
        node.type = 'button';
        node.dataset.value = value;
        node.append(el('span', 'route-mode', l.mode), el('span', 'route-badge', count(l.cameraIds.length)), el('span', 'route-duration', l.duration || (l.start + '–' + l.end)));
        node.setAttribute('aria-label', l.start + '–' + l.end + ' ' + l.title + '，' + l.mode + (l.duration ? ' ' + l.duration : '') + '，' + count(l.cameraIds.length));
        node.setAttribute('aria-pressed', String(selected === value));
        node.addEventListener('click', () => choose(value));
        if (selected === value) activeNode = node;
      } else {
        node = el('div', 'route-gap');
        const holds = item.ids.includes(selected);
        if (holds) { node.classList.add('is-current'); activeNode = node; }
        if (item.between > 0) node.append(el('span', '', '+' + item.between + ' 處' + (holds ? '，含已選地點' : '')));
        if (!holds) node.setAttribute('aria-hidden', 'true');
      }
      track.append(node);
    }
    ribbon.replaceChildren(title, track);
    ribbon.hidden = false;
    if (focused) [...track.querySelectorAll('button')].find(b => b.dataset.value === focused)?.focus({ preventScroll: true });
    if (activeNode) {
      setTimeout(() => {
        const r = activeNode.getBoundingClientRect(), box = ribbon.getBoundingClientRect();
        if (r.left < box.left + 16 || r.right > box.right - 16) ribbon.scrollLeft += (r.left + r.width / 2) - (box.left + box.width / 2);
      }, 0);
    }
  }

  let pending = false;
  const schedule = () => { if (pending) return; pending = true; queueMicrotask(() => { pending = false; render(); }); };
  new MutationObserver(schedule).observe(select, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(days, { attributes: true, subtree: true, attributeFilter: ['aria-current'] });
  select.addEventListener('change', schedule);
  schedule();
})();
