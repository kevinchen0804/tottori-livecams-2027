# 影片來源實際播放驗證

驗證日期：2026-10-25（Asia/Taipei）。此紀錄為最小來源測試頁的結果；完整 Dashboard 功能與排版 QA 另記。

## 方法

使用本機 Chrome headless + Playwright，以 `127.0.0.1` 的 HTTP 測試頁載入官方公開媒體。3 路 HLS 與 2 路 YouTube 同時播放，另獨立測試目前大山 YouTube。每 8 秒採樣，4 個採樣點，並擷取實際顯示畫面。成功必須同時有播放時間前進、可解碼影片尺寸、實際影片畫格；未使用 HTTP 狀態碼或 iframe onload 判定播放。

## 結果

| 攝影機 | 媒體 | 實際播放證據 | 結論 |
|---|---|---|---|
| 皆生 OU LAND | `https://webcast.chukai.ne.jp/live/20-camera01.m3u8` | 640×480；time 156.419→180.496；frames 446→1169；paused=false | LIVE VIDEO 已實播 |
| 米子駅前ロータリー | `https://webcast.chukai.ne.jp/live/03-yonagostation.m3u8` | 768×432；time 6.968→31.043；frames 74→315；paused=false | LIVE VIDEO 已實播 |
| ホテルわこう（米子東福原） | `https://webcast.chukai.ne.jp/live/01-wakou.m3u8` | 768×432；time 7.013→31.089；frames 74→315；paused=false | LIVE VIDEO 已實播 |
| 鳥取砂丘 | YouTube `u7Zib_9HbUU` | YouTube state=1；API time +24.076秒；iframe video 854×480／883 frames／paused=false；截圖可見砂丘現景與當日時間 | LIVE VIDEO 已實播 |
| 松江・宍道湖大橋 | YouTube `mspMbWuEbxk` | state=1；API time +23.664秒；iframe video 854×480／868 frames／paused=false；截圖可見橋樑道路及湖面 | LIVE VIDEO 已實播 |
| 大山町觀光案內所望大山 | YouTube `UwsjgwYyjTc` | state=1；API time 64503.555→64527.612；iframe video 854×480／912 frames／paused=false；畫面自帶「撮影場所:大山町観光案内所」 | LIVE VIDEO 已實播；不可標成奧宮石階現場 |
| 大山北壁・國家公園中心（自然公園財團） | YouTube `g2ks-Q4IEj0` | state=-1、time=0、frames=0；播放器 error150 並顯示「影片擁有者已禁止在其他網站上播放這部影片」 | 官網 watch 可播，但此頁無法嵌入；與大山觀光局 `UwsjgwYyjTc` 為不同來源，並非被其取代 |

以上「已實播」指測試當時。YouTube 直播重新開始可能換 ID，應保留官方頻道或原始頁入口。影片內容屬各自來源；此專案未建立代理、下載錄影或繞過限制。

## HLS 實作發現

- 本機 Chrome 的 `canPlayType('application/vnd.apple.mpegurl')` 回傳可支援，但直接 native HLS 測試為0畫格，片段出現 `ERR_BLOCKED_BY_ORB`。
- 改用官方 HLS.js v1.7.3 light 的 MSE 播放路徑後，3 路都成功解碼並持續播放。應優先 `Hls.isSupported()`，不支援 MSE 時再以原生 HLS 作 Safari 等瀏覽器替代。
- 皆生 OU 曾有一次 `bufferStalledError`（fatal=false）啟播緩衝，隨後自動恢復持續播放；不是永久離線。
- HLS library 位於 `output/livecams-assets/hls.light-1.7.3.min.js`，附固定版號、SHA256及 LICENSE。詳見該資料夾 README。
- iPhone viewport 測試不等於實機 Safari 影片驗證；原生 Safari HLS 尚未在 iPhone 實機驗證。

## 證據與測試環境

- `tmp/livecams/video-probe.json/png`：native HLS 與大山北壁・國家公園中心來源。這張初期工具頁的 HLS／YouTube 地名標頭誤寫，來源 URL 與播放事件不受影響；正式結論以本表 URL 對應為準。
- `tmp/livecams/video-probe-mse.json/png`：MSE 單路成功證據。
- `tmp/livecams/video-probe-all.json/png`：3 路 HLS、砂丘與松江同時實播。
- `tmp/livecams/video-probe-daisen.json/png`：目前大山影片實播。
- 所有測試頁只綁 `127.0.0.1`，使用8766或8767。每次工具程序在 finally 關閉 Chrome／HTTP server，已得到 `serverClosed=true`，程序 exit 0；追加 TCP 檢查8766／8767皆無 listener。
- 一般沙箱初次 localhost 存取被 `ERR_NETWORK_ACCESS_DENIED` 阻擋，提升公開網路測試權限後完成；此為環境限制。
- 影片來源皆沒有瀏覽器 console error。最小工具頁的「全部啟動」曾在 YouTube API 尚未 ready 前呼叫 `p.mute`，產生 `TypeError: p.mute is not a function`；這是測試工具本身的已知事件，並非 Dashboard 或影像來源故障。它不影響後續影片畫格採樣；工具已加入方法存在性檢查供後續使用。完整產品仍須獨立 console QA。
- YouTube 統計追蹤請求 `ERR_ABORTED` 未阻止影片播放，不列影像故障。

本次原始影像實際為10月現景，沒有使用生成圖、YouTube縮圖或預錄雪景填補來源。
