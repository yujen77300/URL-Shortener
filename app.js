// 載入 express 建立應用程式伺服器
const express = require('express')
//載入method-over-ride
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes/')
// Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')
// 建立middleware
const app = express()
const exphbs = require('express-handlebars');
const { query } = require('express')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定每一筆請求都會透過 methodOverride、parser 進行處理
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})