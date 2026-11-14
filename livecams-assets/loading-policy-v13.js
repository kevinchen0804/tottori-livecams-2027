/* Physical connection type is used when exposed. effectiveType is a speed class,
   so effectiveType="4g" is deliberately NOT interpreted as a cellular network.
   Device detection is best effort and independent of browser window width. */
(() => {
  'use strict';
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  function isHandheld() {
    const ua = navigator.userAgent || '';
    return navigator.userAgentData?.mobile === true ||
      /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function getAutomaticPolicy() {
    const handheld = isHandheld();
    const type = String(connection?.type || 'unknown').toLowerCase();
    if (!handheld) return {mode:'all',handheld,type,reason:'電腦：不省流'};
    if (type === 'wifi') return {mode:'all',handheld,type,reason:'手機／平板 Wi-Fi：不省流'};
    if (type === 'ethernet') return {mode:'all',handheld,type,reason:'手機／平板有線連線：不省流'};
    if (type === 'cellular') return {mode:'economy',handheld,type,reason:'手機／平板行動網路：省流'};
    return {mode:'economy',handheld,type,reason:'手機／平板無法辨識連線類型：先省流，可手動切換'};
  }
  function subscribe(callback) {
    const onChange = () => callback(getAutomaticPolicy());
    connection?.addEventListener?.('change', onChange);
    window.addEventListener('online', onChange);
    window.addEventListener('pageshow', onChange);
    return () => {
      connection?.removeEventListener?.('change', onChange);
      window.removeEventListener('online', onChange);
      window.removeEventListener('pageshow', onChange);
    };
  }
  window.TottoriLoadingPolicy = Object.freeze({getAutomaticPolicy,subscribe});
})();
