/* The appearance preference is applied before rendering and reused across visits. */
(() => {
  'use strict';
  const key = 'tottori-livecams-appearance-v1';
  const root = document.documentElement;
  const valid = value => value === 'dark' ? 'dark' : 'light';
  let selected = 'light';
  try { selected = valid(localStorage.getItem(key)); } catch {}
  function apply(value, persist = false) {
    selected = valid(value);
    root.dataset.theme = selected;
    root.style.colorScheme = selected;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = selected === 'dark' ? '#101820' : '#f3f6f7';
    document.querySelectorAll('[data-appearance]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.appearance === selected));
    });
    if (persist) {
      try { localStorage.setItem(key, selected); }
      catch {
        const notice = document.querySelector('#toast');
        if (notice) { notice.textContent = '外觀已切換；此瀏覽器無法保存設定。'; setTimeout(() => notice.textContent = '', 4200); }
      }
    }
  }
  apply(selected);
  function init() {
    document.querySelectorAll('[data-appearance]').forEach(button => {
      button.addEventListener('click', () => apply(button.dataset.appearance, true));
    });
    apply(selected);
    const panel = document.querySelector('#workspaceTools');
    const toggle = document.querySelector('#toolsToggle');
    const close = document.querySelector('#toolsClose');
    function showTools(open, restoreFocus = false) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '收起工具' : '工具';
      if (restoreFocus) toggle.focus({preventScroll:true});
      window.dispatchEvent(new Event('resize'));
    }
    toggle.addEventListener('click', () => showTools(panel.hidden));
    close.addEventListener('click', () => showTools(false, true));
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !document.querySelector('dialog[open]')) {
        event.preventDefault(); showTools(false, true);
      }
    });
    const search = document.querySelector('#search');
    const hint = document.querySelector('#searchNotice');
    const refreshHint = () => {
      const value = search.value.trim();
      hint.hidden = !value;
      hint.querySelector('span').textContent = value ? '搜尋：' + value : '';
    };
    search.addEventListener('input', refreshHint);
    document.querySelector('#clearSearch').addEventListener('click', () => {
      search.value = ''; search.dispatchEvent(new Event('input', {bubbles:true}));
    });
    document.querySelector('#days').addEventListener('click', refreshHint);
    document.querySelector('#regions').addEventListener('click', refreshHint);
    document.querySelector('#itineraryPoint').addEventListener('change', refreshHint);
    document.querySelector('#clearStop').addEventListener('click', refreshHint);
    panel.addEventListener('click', refreshHint);
    panel.addEventListener('change', refreshHint);
    refreshHint();
  }
  window.addEventListener('storage', event => { if (event.key === key) apply(event.newValue); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
