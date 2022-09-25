// 載入 express 建立應用程式伺服器
const express = require('express')
const Url = require("./models/url")
//載入method-over-ride
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes/')
// 建立middleware
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const exphbs = require('express-handlebars');
const { query } = require('express')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定每一筆請求都會透過 methodOverride、parser 進行處理
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})