import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ChangePassword from '../views/ChangePassword.vue'
import Contact from '../views/Contact.vue';
import ManageAccount from "../views/ManageAccount.vue";
import ManageCencus from "../views/ManageCencus.vue";
import Progress from "../views/Progress.vue";
import Analytics from "../views/Analytics.vue";
import CencusForm from "../views/CencusForm.vue";

import CencusTable from "../components/table/CencusTable.vue";

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
        path:'/admin_area',
        name:'admin_area',
        component:ManageAccount
    },
    {
        path:'/admin_cencus',
        name:'admin_cencus',
        component:ManageCencus
    },
    {
        path:'/view',
        name:'view',
        component:ManageCencus
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
    {
        path: '/cencus_table',
        name: 'cencus table',
        component: CencusTable
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
