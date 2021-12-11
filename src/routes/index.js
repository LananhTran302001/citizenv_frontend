import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import ManageAccess from "../views/ManageAccess.vue";
import ManageCencus from "../views/ManageCencus.vue";
import Progress from "../views/Progress.vue";
import CencusForm from "../views/CencusForm.vue";

import CencusTable from "../components/table/CencusTable.vue";
import EditableTable from "../components/table/EditableTable.vue";

Vue.use(VueRouter);

const routes = [
    {
        path:'/login', 
        name:'login', 
        component:Login
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
        path:'/admin',
        name:'admin',
        component:ManageAccess
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
        path:'/form',
        name:'form',
        component:CencusForm
    },
    {
        path: '/cencus_table',
        name: 'cencus table',
        component: CencusTable
    },
    {
        path: '/table',
        component: EditableTable
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
