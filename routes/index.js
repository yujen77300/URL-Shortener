const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const shortenurl = require('./modules/shortenurl')
router.use('/', home)
router.use('/shorten', shortenurl)
module.exports = router

