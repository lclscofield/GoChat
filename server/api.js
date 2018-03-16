const express = require('express')
const router = express.Router()
const db = require('./db')

// 注册
router.post('/signUp', (req, res) => {
    const { username, phone } = req.body
    db.UserInfo.findOne({ username }, (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !!doc:
                res.send({ errType: 'username' })
                break
            default:
                db.UserInfo.findOne({ phone }, (err, doc) => {
                    switch (true) {
                        case !!err:
                            console.log(err)
                            break
                        case !!doc:
                            res.send({ errType: 'phone' })
                            break
                        default:
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
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc:
                res.send({ errType: 'username' })
                break
            case doc.password !== password:
                res.send({ errType: 'password' })
                break
            default:
                res.cookie('isLoading', doc._id, {
                    path: '/home/user/:id'
                })
                res.send(doc)
        }
    })
})

// // 刷新用户页或直接进用户页
// router.get('/home/user/:id', (req, res, next) => {
//     if (req.cookies.isLoading) {

//         next()
//     } else {

//     }
// })

module.exports = router
