> 目前正式候選版本為v14，已完成339項QA；本文較早版本的「不QA、不部署」為當時製作紀錄，最新狀態請見tottori-livecams-readme.md及tottori-livecams-qa.md。

# v13：自動載入與外觀

版本：20261026-adaptive-v13。

## 本次調整

- 攝影機名稱為卡片大字；對應你的行程為下方小字。A～B、日期與時段資料保留。
- 外觀可選自動（依系統）、淺色、深色。未手動選過時預設依系統；既有淺／深色偏好繼續保留。自動時監聽系統變更，手動時不受系統變更覆蓋。
- 影片載入預設自動判斷，也可手動選不省流或省流。
- 電腦自動不省流，不用視窗寬度判定電腦／手機。
- 手機／平板若瀏覽器明確回報Wi-Fi或有線，採不省流；明確回報cellular則省流，包括4G／5G等行動網路。
- 手機無法取得連線類型時先省流，工具內會說明無法辨識，可手動切換。不以網速的effectiveType="4g"冒充實際4G連線。
- 省流最多同播2路影片；不省流遵守播放上限，預設最多12路。定時圖片在省流時自動更新至少相隔20分鐘，手動更新仍可使用。
- 支援的瀏覽器回報Wi-Fi／行動網路變更時，自動模式會重新調整。手動選擇不會被自動判斷蓋掉。

## 舊偏好遷移

首次使用v13改為自動載入。舊省資源預設的2路上限在遷移時改為12路，以免電腦名義上不省流卻仍卡在2路；先前不省流模式的上限保留。之後的模式與上限選擇都持續保存。

## 瀏覽器限制與依據

NetworkInformation.type 並非所有瀏覽器支援，因此不能承諾每支手機都能自動辨識Wi-Fi／4G。effectiveType表示速度等級，不是實際連線方式。裝置識別也是瀏覽器提供資訊的盡力判斷，桌面模式／隱私設定可能改變結果。

- [Network Information API 原始規格](https://wicg.github.io/netinfo/)
- [NetworkInformation.type 的值與相容性](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type)
- [effectiveType 的速度分級含義](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)

沒有索取Wi-Fi名稱、定位權限或電信商資訊，沒有加入外部網路偵測服務。

## 保留與交付

日期、地區、行程三組主選項、v12逐日歸屬及全部84來源保留。攝影機／行程對照資料沒有改動。

本次依要求不QA、不部署，沒有啟動server／瀏覽器或執行測試。公開網站仍是v10。兩版HTML同步更新，使用原本start-tottori-livecams.cmd及完整livecams-assets資料夾。
