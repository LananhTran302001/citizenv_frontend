
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ChangePassword from '../views/ChangePassword.vue'
import ManageArea from "../views/ManageArea.vue";
import ManageAccount from "../views/ManageAccount.vue";
import ManageCitizen from "../views/ManageCitizen.vue";
import Progress from "../views/Progress.vue";
import Analytics from "../views/Analytics.vue";
import CencusForm from "../views/CencusForm.vue";


Vue.use(VueRouter);

const routes = [
    {
        path:'/login', 
        name:'login', 
        component:Login,
    },
    {
        path:'/changepass', 
        name:'changepass', 
        component:ChangePassword,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name:'home',
        component:Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path:'/manager_area',
        name:'manager_area',
        component:ManageArea,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/manager_account',
        name:'manager_account',
        component:ManageAccount,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/manager_citizen',
        name:'manager_citizen',
        component:ManageCitizen,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/progress',
        name:'progress',
        component:Progress,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/analytics',
        name:'analytics',
        component: Analytics,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/form',
        name:'form',
        component:CencusForm,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
