> 目前正式候選版本為v14，已完成339項QA；本文較早版本的「不QA、不部署」為當時製作紀錄，最新狀態請見tottori-livecams-readme.md及tottori-livecams-qa.md。

# v11 保留功能與 GitHub 參考

# TOTTORI LIVE CAM 2027：閱讀簡化版 v11

版本：20261026-reader-v11。本次只修改本機檔案，依要求不 QA、不部署；公開網址仍是 v10。

## 主畫面

- 只保留日期、地區、行程點三組選項。
- 日期列固定在上方；地區與行程點隨頁面捲動。
- 選定日期後，行程下拉選單只列當日行程；「全部行程點」保留目前日期。
- 右上可選淺色／深色，預設淺色，會記住你的選擇。
- 已移除「我的最愛」、每張卡片星號和「附近天氣」快捷列。
- 卡片標題／說明放大；來源與停車資訊、排序、隱藏及監控配置操作放入卡片的展開區。

## 其他操作

右上的「工具」收納搜尋、影片載入方式、更新、播放設定、監控牆、地圖、配置與來源管理。所有 84 筆來源與行程資料保留。既有來源是否能播放仍取決於外部來源，未因這次外觀改版而重新查證。

本機人工觀看可使用原本的 start-tottori-livecams.cmd。必須保留 livecams-assets 整個資料夾；不要直接以 file:// 開啟 HTML。

本次沒有啟動 server／瀏覽器，也沒有執行靜態或互動 QA。製作紀錄見 tottori-livecams-redesign-v11.md。兩版 HTML 內容相同，本監控頁沒有行程分鏡。


原四個範例的地圖、監控牆、配置、直播 ID 維護功能保留在工具內。這次參考 [japan-livecam-map](https://github.com/kametaro7/japan-livecam-map) 將次要控制放入面板的做法，並參考 [GoogleChromeLabs/dark-mode-toggle](https://github.com/GoogleChromeLabs/dark-mode-toggle) 的手動外觀選擇、持久化與頁面繪製前套用外觀原則。以既有原生 HTML／CSS／JavaScript 實作，沒有匯入這兩個專案的程式碼，也沒有新增框架依賴。


## v12 日期關係

GitHub候選不再依10公里半徑或同一城市套用日期。84來源全部保留；對應原行程的來源另列明確行程點／A～B與用途，無對應者不自動進入日期篩選。現行說明見 tottori-livecams-trip-context-v12.md。未做瀏覽器QA、未部署。
