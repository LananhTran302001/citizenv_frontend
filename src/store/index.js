import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

import User from "./modules/user";

export default new Vuex.Store ({
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
        }
    },
    modules: {
        User
    },
})