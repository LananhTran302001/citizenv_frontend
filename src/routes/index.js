import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import CencusTable from "../components/table/CencusTable.vue";
import EditableTable from "../components/table/EditableTable.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name:'home',
        component:Home
    },
    {
        path:'/login', 
        name:'login', 
        component:Login
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
