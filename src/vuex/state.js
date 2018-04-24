export default {
    userInfo: {}, // 用户信息
    chatHistories: [], // 聊天纪录
    nowChat: {}, // 选中的聊天对象
    isActive: false, // 控制罩层
    showSignUp: false // 控制 signUp 页面显示
}
// userInfo: {
//     username: 'lcl',
//     phone: 123,
//     friends: [{
//         userId: 'xxx', // 这个 id 是 ChatHistory 的默认 _id
//         chatId: 'xxx', // 这个 id 是 UserInfo 的默认 _id
//         name: 'xxx'
//     }, {
//         userId: 'shabi',
//         chatId: 'shabi',
//         name: 'shabi'
//     }],
//     groups: [{
//         chatId: 'lcl,xxx,shabi', // 这个 id 是 ChatHistory 的默认 _id
//         name: 'lcl,xxx,shabi'
//     }],
//     chatHistory: [{
//         chatId: 'xxx', // 这个 id 是 ChatHistory 的默认 _id
//         name: 'xxx' // friends 或 groups 的 name
//     }, {
//         chatId: 'shabi',
//         name: 'shabi'
//     }, {
//         chatId: 'lcl,xxx,shabi',
//         name: 'lcl,xxx,shabi'
//     }]
// }, // 用户信息
// chatHistories: [{
//     id: 'lcl,xxx,shabi',
//     member: [{
//         userId: 'lcl', // 这个 id 是 UserInfo 的默认 _id
//         name: 'lcl'
//     }, {
//         userId: 'xxx', // 这个 id 是 UserInfo 的默认 _id
//         name: 'xxx'
//     }, {
//         userId: 'shabi', // 这个 id 是 UserInfo 的默认 _id
//         name: 'shabi'
//     }], // 聊天纪录成员
//     chat: [{
//         time: '1231651616', // 距离2018.4.21 00:00:00 的时间差
//         username: 'xxx',
//         content: 'xxxxx'
//     }]
// }], // 聊天纪录
