import http from 'axios'

// 注册验证
export const signUpVerify = ({
    commit
}, postData) => {
    return new Promise((resolve, reject) => {
        http.post('/api/signUp', postData)
            .then(function (res) {
                resolve(res.data)
            }).catch(function (err) {
                console.log(err)
                reject(err)
            })
    })
}
