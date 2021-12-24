import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

import router from "../routes/index"

import User from "./modules/user";
import Area from "./modules/area";
import Account from "./modules/account";
import Citizen from "./modules/citizen"
import Progress from "./modules/progress";
import Analytics from "./modules/analytics";


const store = new Vuex.Store({
    namespaced: false,
    state: {
        token: localStorage.token,
    },
    getters: {
        getToken: (state) => state.token
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
            localStorage.token = payload
        },
        resetToken(state) {
            state.token = ""
            localStorage.token = ""
        }
    },
    modules: {
        User,
        Area,
        Account,
        Citizen,
        Progress,
        Analytics
    },
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Nếu như token rỗng -> redirect về đăng nhập
        if (!store.getters.getToken) {
            next({ name: 'login' })
        } else {
            store.commit('User/setUserFromToken', store.getters.getToken);
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default store;