# 路線攝影機補充（2026-11-14，本機 v17，未部署）

使用者指示：「只要在我路線上的攝影機都加上」。來源由 87 個增為 107 個，原有 87 個 ID 與內容不變。

## 判定方式

1. 座標：とっとり行きみちNavi 官方地圖（yukinavi.net/index228.html 的 mapInfos）列出 288 個縣管攝影機與 43 個國交省等標記。
2. 路線：v117 的 39 段開車／巴士路段，以 OSRM 公開路網推估開車路線。長路段另取備選路線，以及經山陰道的版本（中途點：高草、重山、青谷、泊東鄉、東伯中山）。
3. 採用：離推估路線 150 公尺內，或離行程點 700 公尺內。
4. 排除：只靠自行加中途點的山陰道版本才命中的一般縣道（160、256、074），因為中途點吸附可能繞路。河川水位鏡頭不列入。江島大橋與既有 eshima-bridge-weather 同源，不重複。
5. 只送出行程點經緯度給 OSRM，不含名稱或個人資料。推估路線不等於實際導航。

## 新增 20 個

| ID | 名稱 | 天 | 對應 |
| --- | --- | --- | --- |
| navi-261 | 鳥取港周邊・南隈道路 | D2、D8 | 砂丘→Cowy's 路段；D8 千代水購物區 631m |
| navi-023 | 三朝・波關峠道路 | D8 | 三朝萬翠樓→Lawson 松崎 |
| navi-268 | 湯梨浜・方地至野花道路 | D8 | Lawson 松崎→白兔 |
| navi-217 | 琴浦・尾張（赤碕大山線） | D7 | 大山→道之驛大栄 |
| navi-141 | 大山町中山道路 | D2 | Cowy's→米子 |
| navi-092 | 大山町所子道路 | D2 | Cowy's→米子 |
| navi-117 | 大山町羽田井（赤碕大山線） | D7 | 大山→道之驛大栄 |
| navi-071 | 大山町香取（赤碕大山線） | D7 | 大山→道之驛大栄 |
| navi-221 | 米子・彥名町道路 | D4 | 米子→なかうら大漁市場 |
| navi-144 | 境港・昭和町國道431號 | D4 | 境港水產直營中心前後兩段與該點 |
| navi-260 | 白兔・御熊白兔線道路 | D8 | 白兔神社 504m、道之驛 622m |
| navi-225 | 米子・糀町國道181號 | D2–D4 | 米子站前住宿 652m |
| navi-218 | 境港・上道町道路 | D4 | 境港市區餐廳 536m |
| sanindo-aoya-yoshikawa | 山陰道・青谷吉川 | D2、D8 | 經山陰道路線 |
| sanindo-touhaku-nakayama | 山陰道・東伯中山高架橋 | D7 | 經山陰道路線 |
| sanindo-shimoichi | 山陰道・大山町下市 | D2 | Cowy's→米子 |
| r9-hamamura | 國道9號・濱村 | D2、D8 | 沿海國道 |
| r9-funaiso | 國道9號・船磯 | D2、D8 | 沿海國道 |
| r29-tottori-base | 國道29號・鳥取雪寒基地 | D1、D8、D9 | 機場↔鳥取站、千代水 |
| sakai-suido-bridge | 境水道大橋 | D4 | 官方頁連結卡；影像在 http IP，HTTPS 無法內嵌 |

新攝影機的 Maps 連結使用官方座標（mapQuery）。

## 更新的檔案

- tottori-livecams-cameras.json：新增 20 筆，含 tripMatches、days、placeIds、coordinates、mapQuery。
- tottori-livecams-itinerary-points.json：對應 legs／visits／places 的 cameraIds，summary.sourceCount=107，新增 routeCameraAddition20261114。
- index.html：只以 scripts/sync-data.mjs 同步內嵌 JSON，程式與介面未改，標題與版本字串保留。
- livecams-assets/link-cards/sakai-suido-bridge.svg：境水道大橋連結卡。
- 未更新：tottori-livecams-trip-associations-v117-20261103.json、itinerary-camera-audit.md、sources.md 等歷史文件，保留 v16 當時內容。

## 重現

~~~sh
node scripts/add-route-cameras-20261114.mjs .maintenance/route-cameras-20261114/route-matches.json
node scripts/sync-data.mjs
~~~

此腳本須在 v16 原始 JSON 上執行；已加入過會因重複 ID 停止。OSRM 路線保存在 .maintenance/route-cameras-20261114/osrm-routes.json。
