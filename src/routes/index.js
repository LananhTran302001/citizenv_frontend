import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ChangePassword from '../views/ChangePassword.vue'
import Contact from '../views/Contact.vue';
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
        component:Login
    },
    {
        path:'/changepass', 
        name:'changepass', 
        component:ChangePassword
    },
    {
        path: '/',
        name:'home',
        component:Home
    },
    {
        path:'/contact',
        name:'contact',
        component:Contact
    },
    {
        path:'/manager_area',
        name:'manager_area',
        component:ManageArea
    },
    {
        path:'/manager_account',
        name:'manager_account',
        component:ManageAccount
    },
    {
        path:'/manager_citizen',
        name:'manager_citizen',
        component:ManageCitizen
    },
    {
        path:'/progress',
        name:'progress',
        component:Progress
    },
    {
        path:'/analytics',
        name:'analytics',
        component: Analytics
    },
    {
        path:'/form',
        name:'form',
        component:CencusForm
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
