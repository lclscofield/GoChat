import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/login/Login'
import User from '@/pages/user/User'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/home/login'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/home/login',
            children: [{
                path: 'login',
                name: 'login',
                component: Login
            }, {
                path: 'user/:id',
                name: 'user',
                component: User
            }]
        }
    ]
})
