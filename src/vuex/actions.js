import http from 'axios'

// 注册验证
export const signUpVerify = ({ commit }, postData) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'post',
            url: '/api/signUp',
            data: postData
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })
}

// 登录验证
export const loginVerify = ({ commit }, postData) => {
    return new Promise((resolve, reject) => {
        http({
            method: 'get',
            url: '/api/login',
            params: postData
        }).then((res) => {
            commit('setUserInfo', res.data)
            resolve(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })
}
