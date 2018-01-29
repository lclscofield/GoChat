const express = require('express')
const router = express.Router()
// const db = require('./db')

router.post('/register', (req, res) => {
    console.log(req.body.xxx1)
    res.send(req.body.xxx1)
})

module.exports = router
