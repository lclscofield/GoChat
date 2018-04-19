const express = require('express')
const router = express.Router()
const db = require('./db')

// 注册
router.post('/api/signUp', (req, res) => {
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
                            res.send({ errType: 'success' })
                    }
                })
        }
    })
})

// 登录
router.post('/api/login', (req, res) => {
    const { account, password } = req.body
    console.log(req.body)
    db.UserInfo.findOne({ $or: [{ username: account }, { phone: account }] }, (err, doc) => {
        console.log(doc)
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc:
                res.send({ errType: 'account' })
                break
            case doc.password !== password:
                res.send({ errType: 'password' })
                break
            default:
                res.cookie('isLoading', doc._id, {
                    path: `/home/user/${doc.username}`
                })
                const data = {
                    username: doc.username,
                    phone: doc.phone,
                    friends: doc.friends,
                    groups: doc.groups
                }
                res.send(data)
        }
    })
})

// 刷新用户页或直接进用户页
// router.get('/home/user/:id', (req, res, next) => {
//     if (req.cookies.isLoading) {
//         const id = req.cookies.isLoading
//         db.UserInfo.findOne({ id }, (err, doc) => {
//             switch (true) {
//                 case !!err:
//                     console.log(err)
//                     break
//                 case doc:
//                     res.redirect(301, `/home/user/${doc.username}`)
//                     break
//                 default:
//                     console.log('数据被意外删除')
//             }
//         })
//         next()
//     } else {
//     }
// })

module.exports = router
