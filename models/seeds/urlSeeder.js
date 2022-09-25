
const Url = require('../url')
const db = require("../../config/mongoose")
db.once('open', () => {
  for (let i = 0; i < 2; i++) {
    Url.create({ short_url: `shorturl-${i}`, origin_url: `originurl-${i}` })
  }
  console.log('done')
}) 