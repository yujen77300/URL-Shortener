// 載入 express 建立應用程式伺服器
const express = require('express')
const Url = require("./models/url")
//載入method-over-ride
const methodOverride = require('method-override')
// 載入產生隨機碼的函式
const randomGenerator = require('./shorten_url')
const bodyParser = require('body-parser')
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

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

//新增縮短網址後的路由
app.post('/shorten', (req, res) => {
  Url.findOne({ origin_url: `${req.body.inputurl}` })
    .then(data => {
      // data是null如果為true，代表是第一次出現
      if (!data) {
        // 將如果是第一次出現的的變數存到mongodb
        const randomstring = randomGenerator(5)
        Url.create({ short_url: `localhost:3000/${randomstring}`, origin_url: `${req.body.inputurl}` })
          .then(() => res.render('shortenresult', { randomstring: randomstring }))
          .catch(err => console.log(err))
      } else {
        const short_url = data.short_url
        // 已經存在的要找的最後五碼的隨機碼，傳回shortenresult.hbs
        // 輸入相同網址時，產生一樣的縮址
        res.render('shortenresult', { randomstring: short_url.substring(short_url.length - 5) })
      }
    })
    .catch(err => console.log(err))

})


// 設定縮短網址後可以導向原本網址的路由
app.get('/:randomstring', (req, res) => {
  // mongoose 的find方法來篩選
  return Url.find({ short_url: `localhost:3000/${req.params.randomstring}` })
    .lean()
    // 重新導向到原本的url，注意find回傳是陣列
    .then(specificUrl => res.redirect(`${specificUrl[0].origin_url}`))
    .catch(error => console.log(error))
})





// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})