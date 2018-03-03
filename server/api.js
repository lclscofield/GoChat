const express = require('express')
const router = express.Router()
const db = require('./db')

// 注册
router.post('/signUp', (req, res) => {
    const { username, phone } = req.body
    db.UserInfo.count({ username }, (err, count) => {
        if (!err && count) {
            res.send({ errType: 'username' })
        } else {
            db.UserInfo.count({ phone }, (err, count) => {
                if (!err && count) {
                    res.send({ errType: 'phone' })
                } else {
                    db.UserInfo.create(req.body)
                    res.send({ type: 'success' })
                }
            })
        }
    })
})

// 登录
router.get('/login', (req, res) => {
    const { username, password } = req.query
    console.log(req.query)
    db.UserInfo.findOne({ username }, (err, doc) => {
        console.log(doc)
        if (!err && !doc) {
            res.send({ errType: 'username' })
        } else if (doc.password !== password) {
            res.send({ errType: 'password' })
        } else {
            res.send(doc)
        }
    })
})

module.exports = router
