import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name:'home',
        meta: {title:"CitizenV"},
        component:Home
    },
    {
        path:'/login', 
        name:'login', 
        meta: {title:"Đăng nhập"},
        component:Login
    },
    {
        path: '/view',
        name:'view',
        meta: {title:"Danh sách"},
        component:Home
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
