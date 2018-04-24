import http from 'axios'

// 注册验证
export const signUpVerify = ({ commit }, postData) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/signUp',
            data: postData
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err)
        })
    })
}

// 登录验证
export const loginVerify = ({ commit }, postData) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/login',
            data: postData
        }).then(res => {
            commit('setUserInfo', res.data)
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            resolve(res.data)
        }).catch(err => {
            console.log(err)
        })
    })
}

// 添加会话状态
export const addSession = ({ commit, state }, item) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/addSession',
            data: item
        }).then(res => {
            commit('setUserInfo', res.data)
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            resolve(res.data)
        }).catch(err => {
            console.log(err)
        })
    })
}

// 获取聊天纪录
export const getMessage = ({ commit }, obj) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/getMessage',
            data: obj
        }).then((res) => {
            commit('setChatHistories', res.data)
            sessionStorage.setItem('chatHistories', res.data)
        }).catch((err) => {
            console.log(err)
        })
    })
}
