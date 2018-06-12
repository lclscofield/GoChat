import http from 'axios'
import io from 'socket.io-client'

// 获取 cookie
export function getCookie (name) {
    let cookies = document.cookie.split(';')
    let value
    cookies.forEach(item => {
        if (item.slice(0, item.indexOf('=')) === name) {
            value = item.slice(item.indexOf('=') + 8, -3)
        }
    })
    return value
}

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
    commit('setUserInfo', {})
    commit('setChatHistories', false)
    commit('setNowChat', {})
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/login',
            data: postData
        }).then(res => {
            if (!res.hasOwnProperty('errType')) {
                commit('setSocket', io.connect('http://localhost:3000'))
                commit('setUserInfo', res.data)
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                resolve(res.data)
            }
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
            params: {
                id: state.userInfo._id
            },
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
export const getMessage = ({ commit, state }, item) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/getMessage',
            data: item
        }).then((res) => {
            commit('setChatHistories', res.data)
            sessionStorage.setItem('chatHistories', JSON.stringify(state.chatHistories))
            resolve(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })
}

// 添加好友
export const addFriend = ({ commit, state }, postData) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/addFriend',
            params: {
                id: state.userInfo._id
            },
            data: postData
        }).then((res) => {
            if (!res.data.hasOwnProperty('errType')) {
                console.log(res.data)
                let user = state.userInfo
                user.friends = res.data
                commit('setUserInfo', user)
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            }
            resolve(res.data)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}
