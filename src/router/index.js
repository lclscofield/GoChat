import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/home/Login'
import User from '@/components/home/User'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: '/',
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
