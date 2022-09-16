// 載入 express 建立應用程式伺服器
const express = require('express')
// 建立middleware
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})