// 載入 express 建立應用程式伺服器
const express = require('express')
// 建立middleware
const app = express()

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})