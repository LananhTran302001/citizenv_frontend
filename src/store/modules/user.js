const User = {
    state: () => ({
        user: {
            user_name: null,
            user_id: null,
            user_email: null,
            start_time: null,
            expired_time: null
        },
        loginData: {
            user_id: "",
            password: "",

        },
        forgotPasswordData: {
            user_id: "",
            user_email: ""
        },
        changePasswordData: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },

    }),
    getters: {
        getUser: (state) => state.user,
        getLoginData: (state) => state.loginData,
        getForgotPwData: (state) => state.forgotPasswordData,
        getChangePwData: (state) => state.changePasswordData,
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLoginData(state, payload) {
            state.loginData = payload
            console.log('set login data')
            console.log(state.loginData)
        },
        setForgotPwData(state, payload) {
            state.forgotPasswordData = payload
        },
        resetLoginData(state) {
            state.loginData = {
                user_id: "",
                password: "",
            };
        },
        resetForgotPwData(state) {
            state.forgotPasswordData = {
                user_id: "",
                user_email: ""
            };
        },
        resetChangePwData(state) {
            state.changePasswordData = {
                old_password: "",
                new_password: "",
                confirm_password: ""
            }
        },
    },

    actions: {
        login({commit}, loginData) {
            commit('setLoginData', loginData)
            console.log("Login...")
        },
        sendEmail({commit}, forgotPwData) {
            commit('setForgotPwData', forgotPwData)
            console.log("send email...")
        }
    }
}

export default User;