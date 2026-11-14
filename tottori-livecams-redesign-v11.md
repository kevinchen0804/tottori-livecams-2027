> 目前正式候選版本為v14，已完成339項QA；本文較早版本的「不QA、不部署」為當時製作紀錄，最新狀態請見tottori-livecams-readme.md及tottori-livecams-qa.md。

# 鳥取即時影像：v11 閱讀與選項簡化

日期：2026-10-26。內容版本：20261026-reader-v11。

## 本次要求

使用 Product Design、design-taste-frontend，並透過 GitHub 參考實作方向。使用者指定「不 QA、不部署」，後續進一步指定僅保留畫面中的日期、地區、行程點三組選項，加上淺色／深色選擇，移除我的最愛與附近天氣。

## 設計依據

以使用者當次提供的兩張截圖與現有 HTML 為目標，沒有啟動瀏覽器重新截圖，也不把這次整理稱作已完成互動稽核。Product Design 的保存脈絡預檢未找到既有 user-context，採本次對話的明確需求。

原介面把日期、地區、來源類型、影片載入、最愛、目的地快捷列、行程點、地圖及監控配置並列，文字以 11–14px 為主。這次將常用篩選收斂為三組，保留大山圖示與山陰朱印，次要功能採按需展開。

design-taste-frontend 本身排除密集儀表板，因此只採其適用的品牌延續、字體、留白、配色、響應式與低動態原則；資訊架構依 Product Design 與使用者提供的畫面調整。沒有匯入新的設計系統或改用全新框架。

Design Read：旅行途中快速查看官方影像的工具，重點是容易讀、容易換日期；沿用鳥取大山識別，原生 HTML／CSS，淺色與深色共用一致版面。

DESIGN_VARIANCE = 3，MOTION_INTENSITY = 1，VISUAL_DENSITY = 5。

## 畫面變更

1. 頁首保留品牌，加入明確的「淺色」「深色」按鈕與單一工具入口。
2. 日期列獨立固定在頁頂，地區與行程點隨頁面捲動。
3. 日期選定後，行程下拉選單只列當日的行程點；全部行程點不會把已選日期清掉。
4. 移除收藏星號、我的最愛篩選、附近天氣快捷列及其篩選事件。84 筆攝影機與行程資料保留，既有資料中的歷史欄位不作為新版收藏功能。
5. 卡片標題約 19px，狀態與操作 13–14px，來源說明 14px；桌面一般為三欄，中型螢幕兩欄，手機一欄。
6. 卡片常見操作保留來源、地圖、放大與更新；較長說明、停車資訊、排序、隱藏與監控設定放在「來源說明與操作」展開區。
7. 深色影像區維持獨立的高對比文字；影像本身不套濾鏡或反色。
8. 地圖、監控牆、配置保存／分享、來源管理、影片數量限制與 ID 維護保留在工具內。
9. 預設淺色，手動選擇以獨立 localStorage key 保存；頁面繪製前套用已存外觀，兩個按鈕提供 aria-pressed 狀態。

## GitHub 參考

- [kametaro7/japan-livecam-map](https://github.com/kametaro7/japan-livecam-map)：閱讀 README 中攝影機清單面板、分割觀看與來源入口安排，保留必要入口並收納次要控制。README SHA：2f307a9645136257bf7939a6cabb7abe16af3579。
- [GoogleChromeLabs/dark-mode-toggle](https://github.com/GoogleChromeLabs/dark-mode-toggle)：參考手動覆寫外觀、保存選擇及先套用外觀以避免閃動的原則。README SHA：46bdb0c5b91ad43d34aff11ee3b75d927e30ce4c。

以上只參考操作原則，沒有複製來源程式碼或增加第三方執行依賴。既有 Leaflet、HLS.js 與圖示保留。

## 檔案與狀態

- 主檔：tottori-livecams.html。
- 配對：tottori-livecams-no-storyboard.html。本監控頁沒有行程分鏡，因此兩版內容相同。
- 新樣式：livecams-assets/reading-view-v11.css。
- 外觀與工具展開：livecams-assets/appearance-v11.js。
- 相容新版卡片與工具位置：livecams-assets/advanced-controls-v11.js。
- 使用者提供的參考截圖存於 livecams-redesign-v11/。

原本 v10 本機檔案已備份；Sites checkout、公開網站、原行程 Excel 及另外兩個鳥取網站均未修改。

## 驗證界限

本次只製作與打包，沒有啟動 localhost、瀏覽器、Playwright、執行靜態檢查、互動測試或部署。未執行 Product Design 的渲染比對與 design-qa，因使用者明確要求不 QA。不得以 v10 的歷史 101 項通過紀錄宣稱本版已驗證。
