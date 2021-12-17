import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

import User from "./modules/user";
import Area from "./modules/area"

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
        },
        resetToken(state) {
            state.token = ""
            localStorage.token = ""
        }
    },
    modules: {
        User,
        Area
    },
})