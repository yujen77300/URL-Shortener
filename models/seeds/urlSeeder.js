const mongoose = require('mongoose')
const Url = require('../url')
mongoose.connect(process.env.MONGOURL_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')

  for (let i = 0; i < 2; i++) {
    Url.create({ short_url: `shorturl-${i}`, origin_url: `originurl-${i}` })
  }
  console.log('done')
}) 