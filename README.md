# 餐廳清單2.0
使用者可以輸入網址後獲得一組縮短後的網址<br>


## 功能

+ 輸入網址後獲得一組縮短後的網址
+ 可以直接點取縮短後的網址導向原先輸入的網址
+ 輸入相同網址時，產生一樣的縮址
+ 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
+ 縮短完按下copy按鈕，可以直接取得縮短後的網址



## 參考畫面
![image](https://user-images.githubusercontent.com/54500773/192105921-9f1559f3-45b9-4aac-b103-fdaf0601c447.png)
![image](https://user-images.githubusercontent.com/54500773/192105936-f660dc0f-0dcd-4305-ba3e-053d432154d4.png)
![image](https://user-images.githubusercontent.com/54500773/192105944-8c36e569-3633-4c40-be7b-9da255bec2cf.png)
![image](https://user-images.githubusercontent.com/54500773/192105966-4b27bd6c-00e8-4d90-94a3-277829ae971c.png)


## 使用工具
+ Visual Studio Code - 開發環境
+ Express - 應用程式架構
+ Express-Handlebars - 模板引擎
+ Mongoose - ODM
+ MongoDB - 文件資料庫

## 安裝與執行步驟
1. 開啟終端機，cd 到想要存放此專案的資料夾，輸入以下指令
```
git clone https://github.com/yujen77300/URL-Shortener
```
2. 輸入以下指令，進入存放此專案的資料夾
```
cd URL-Shortener
```
3. 安裝npm套件
```
npm install
```
4. 設定環境變數連線 MongoDB (非MONGODB_URI)
```
MONGOURL_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
5. 執行此專案
```
npm run dev
```
6. 打開瀏覽器，輸入下列
```
localhost:3000
```
