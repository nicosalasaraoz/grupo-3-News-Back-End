const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const newsRoutes = require('./newsRoutes')

router.use('/user', userRoutes)
router.use('/new', newsRoutes)

module.exports = router
