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
    db.UserInfo.findOne({ $or: [{ username: account }, { phone: account }] }, (err, doc) => {
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
                res.cookie('isLoading', doc._id, { path: `/home/user/${doc.username}` })
                res.send({
                    username: doc.username,
                    phone: doc.phone,
                    _id: doc._id,
                    friends: doc.friends,
                    groups: doc.groups,
                    chatHistory: doc.chatHistory
                })
        }
    })
})

// 添加会话状态
router.post('/api/addSession', (req, res) => {
    const item = req.body
    const isLoading = req.query.id
    db.UserInfo.update({
        _id: isLoading
    }, { $addToSet: { chatHistory: { chatId: item.chatId, name: item.name } } }, err => {
        if (err) console.log(err)
        db.UserInfo.findById(isLoading, { password: 0 }, (err, doc) => {
            switch (true) {
                case !!err:
                    console.log(err)
                    break
                default:
                    res.send(doc)
            }
        })
    })
})

// 获取聊天记录
router.post('/api/getMessage', (req, res) => {
    const chatId = req.body.chatId
    db.ChatHistory.findById(chatId, (err, doc) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc:
                console.log('拿不到聊天记录')
                break
            default:
                if (doc.chat.length > 50) {
                    doc.chat = doc.chat.slice(doc.chat.length - 50)
                }
                res.send(doc)
        }
    })
})

// 添加好友
router.post('/api/addFriend', (req, res) => {
    const account = req.body.account
    const isLoading = req.query.id
    db.UserInfo.findOne({ $or: [{ username: account }, { phone: account }] }, (err, doc1) => {
        switch (true) {
            case !!err:
                console.log(err)
                break
            case !doc1:
                res.send({ errType: 'account' })
                break
            case !!doc1:
                db.UserInfo.findById(isLoading, (err, doc2) => {
                    switch (true) {
                        case !!err:
                            console.log(err)
                            break
                        case !doc2:
                            console.log('error')
                            break
                        case !!doc2:
                            if (doc2.friends.some(item => {
                                return item.userId + '' === doc1._id + ''
                            })) {
                                res.send({ errType: 'added' })
                            } else {
                                db.ChatHistory.create({
                                    member: [{
                                        userId: doc1._id, // 这个 id 是 UserInfo 的默认 _id
                                        name: doc1.username
                                    }, {
                                        userId: doc2._id, // 这个 id 是 UserInfo 的默认 _id
                                        name: doc2.username
                                    }], // 聊天纪录成员
                                    chat: []
                                }, (err, newDoc) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    doc1.friends.push({
                                        name: doc2.username,
                                        userId: doc2._id,
                                        chatId: newDoc._id
                                    })
                                    doc2.friends.push({
                                        name: doc1.username,
                                        userId: doc1._id,
                                        chatId: newDoc._id
                                    })
                                    doc1.save()
                                    doc2.save()
                                    res.send(doc2.friends)
                                })
                            }
                    }
                })
        }
    })
})

// 添加群组成员
router.post('/api/setGroup', (req, res) => {
    const id = req.query.id
    const { str, nowChat } = req.body
    let name
    if (str === 'set') {
        console.log(1)
        let arr = []
        let docMe, docYou, docNew
        // 转移聊天记录
        db.ChatHistory.findById(nowChat.chatId, (err, doc) => {
            if (err) {
                console.log(err)
            }
            arr = doc.chat
        })
        docMe = findIdName(id)
        docYou = findIdName(nowChat.userId)
        docNew = findIdName(req.body.item.userId)
        setTimeout(() => {
            console.log(docMe, docYou, docNew)
            db.ChatHistory.create({
                member: [docMe, docYou, docNew], // 聊天纪录成员
                chat: arr
            }, (err, newDoc) => {
                if (err) {
                    console.log(err)
                }
                console.log(newDoc.member)
                name = newDoc.member.map(item => {
                    return item.name
                }).join(',')
                updateGroups(id, newDoc._id, name)
                updateGroups(nowChat.userId, newDoc._id, name)
                updateGroups(req.body.item.userId, newDoc._id, name)
                res.send({
                    chatId: newDoc._id,
                    name
                })
            })
        }, 5000)
    } else if (str === 'add') {
        console.log(2)
        db.ChatHistory.findById(nowChat.chatId, (err, doc) => {
            if (err) {
                console.log(err)
            }
            let newMember = findIdName(req.body.item.userId)
            doc.member.push(newMember)
            doc.save()
            console.log(doc.member.map(item => {
                return item.name
            }).join(','))
            name = doc.member.map(item => {
                return item.name
            }).join(',')
            doc.member.forEach(item => {
                updateGroups(item.chatId, doc._id, name)
            })
            db.UserInfo.findById(id, (err, docMe) => {
                if (err) {
                    console.log(err)
                }
                res.send({ groups: docMe.groups, doc })
            })
        })
    }
})

function findIdName (id) {
    let item
    db.UserInfo.findById(id, (err, doc) => {
        if (err) {
            console.log(err)
        }
        item = { userId: id, name: doc.username }
    }).then(() => {
        return item
    })
}

function updateGroups (id, newId, name) {
    db.UserInfo.findById(id, (err, doc) => {
        if (err) {
            console.log(err)
        }
        if (!doc.groups.some(item => {
            if (item.chatId + '' === newId) {
                item.name = name
            }
            return item.chatId + '' === newId
        })) {
            doc.groups.push({
                chatId: newId,
                name
            })
        }
        doc.save()
    })
}

module.exports = router
