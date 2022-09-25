const express = require('express')
const router = express.Router()
const Url = require("../../models/url")
// 載入產生隨機碼的函式
const randomGenerator = require('../../shorten_url')


// 設定首頁路由
router.get('/', (req, res) => {
  res.render('index')
})


// 新增縮短網址後的路由
router.post('/', (req, res) => {
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
router.get('/:randomstring', (req, res) => {

  // mongoose 的find方法來篩選
  return Url.find({ short_url: `localhost:3000/${req.params.randomstring}` })
    .lean()
    // 重新導向到原本的url，注意find回傳是陣列
    .then(specificUrl => res.redirect(`${specificUrl[0].origin_url}`))
    //如果有錯誤導到錯誤的網頁
    .catch(() => res.render('error'))
})


module.exports = router