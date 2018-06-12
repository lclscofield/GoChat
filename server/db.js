// 引用mongoose模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection
// 连接成功
db.on('connected', () => {
    console.log('连接成功')
})
// 连接失败
db.on('error', () => {
    console.log('连接失败')
})

// mongoose.Schema 方法用来定义数据集的格式
const Schema = mongoose.Schema
// 用户信息数据格式
const UserSchema = new Schema({
    username: String, // 定义一个属性 username，类型为 String
    password: String,
    phone: String,
    friends: [],
    groups: [],
    chatHistory: []
})
// 聊天记录数据格式
const ChatHistory = new Schema({
    member: [], // 聊天纪录成员
    chat: []
})

// mongoose.model方法将格式分配给指定的数据集
const Models = {
    UserInfo: mongoose.model('UserInfo', UserSchema),
    ChatHistory: mongoose.model('ChatHistory', ChatHistory)
}

module.exports = Models

// function addFriend () {
//     Models.UserInfo.findOne({ username: 'lcl' }, (err, doc) => {
//         switch (true) {
//             case !!err:
//                 console.log(err)
//                 break
//             case !!doc:
//                 Models.UserInfo.findOne({ username: 'haha' }, (err, doc2) => {
//                     switch (true) {
//                         case !!err:
//                             console.log(err)
//                             break
//                         case !!doc2:
//                             Models.ChatHistory.create({
//                                 member: [{
//                                     userId: doc._id, // 这个 id 是 UserInfo 的默认 _id
//                                     name: doc.username
//                                 }, {
//                                     userId: doc2._id, // 这个 id 是 UserInfo 的默认 _id
//                                     name: doc2.username
//                                 }], // 聊天纪录成员
//                                 chat: []
//                             })
//                             break
//                     }
//                 })
//                 break
//         }
//     })
// }
// addFriend()

// function find () {
//     Models.UserInfo.find({ username: 'lcl' }, (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('res:')
//             console.log(res)
//         }
//     })
// }
// find()

// // 用户信息数据格式
// const UserSchema = new Schema({
//     username: String, // 定义一个属性 username，类型为 String
//     password: String,
//     phone: String,
//     friends: [{
//         userId: 'xxx', // 这个 id 是 UserInfo 的默认 _id
//         chatId: 'xxx', // 这个 id 是 ChatHistory 的默认 _id
//         name: 'xxx'
//     }],
//     groups: [{
//         chatId: 'xxx', // 这个 id 是 ChatHistory 的默认 _id
//         name: 'xxx'
//     }],
//     chatHistory: [{ // 保存会话状态
//         chatId: 'xxx', // 这个 id 是 ChatHistory 的默认 _id
//         name: 'xxx' // friends 或 groups 的 name
//     }]
// })
// // 聊天记录数据格式
// const ChatHistory = new Schema({
//     member: [{
//         userId: 'xxx', // 这个 id 是 UserInfo 的默认 _id
//         name: 'xxx'
//     }, {
//         userId: 'hahaha', // 这个 id 是 UserInfo 的默认 _id
//         name: 'hahaha'
//     }], // 聊天纪录成员
//     chat: [{
//         date:"2018-05-23 15:53:18",
//         id:"5aded1cd2e6e8f3598f80aa4", // 聊天信息文档 _id
//         msg:"789",
//         myId:"5adc89e65d7daa3e0cd55c0b"
//     }]
// })
