import axios from "axios";
import router from "../../routes"
import VueJwtDecode from 'vue-jwt-decode'
import { messageFormat } from "../statics/messages"

const User = {
    namespaced: true,
    state: () => ({
        user: {
            user_name: null,
            user_id: null,
            user_email: null,
            role: null,
            start_time: null,
            expired_time: null,
            is_locked: null,
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
        serverLoginMsg: "",
        serverMsg: {
            id: 0,
            title: "",
            content: "",
            varient: "info"
        }
    }),
    getters: {
        getUser: (state) => state.user,
        getLoginData: (state) => state.loginData,
        getForgotPwData: (state) => state.forgotPasswordData,
        getChangePwData: (state) => state.changePasswordData,
        getServerLoginMsg: (state) => state.serverLoginMsg,
        getServerMsg: (state) => state.serverMsg
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setUserFromToken(state, token) {
            const data = VueJwtDecode.decode(token)
            const user = {
                user_name: data.name,
                user_id: data.sub,
                user_email: null,
                role: data.role,
                start_time: null,
                expired_time: null,
                is_locked: data.isLocked
            }
            state.user = user;
        },
        setLoginData(state, payload) {
            state.loginData = payload
        },
        setForgotPwData(state, payload) {
            state.forgotPasswordData = payload
        },
        setChangePwData(state, payload) {
            state.changePasswordData = payload
        },
        setServerLoginMsg(state, payload) {
            state.serverLoginMsg = payload
        },
        setServerMsg(state, payload) {
            state.serverMsg = messageFormat(
                state.serverMsg.id + 1,
                payload.title,
                payload.content,
                payload.status
            )
        },
        resetUser(state) {
            state.user = {
                user_name: null,
                user_id: null,
                user_email: null,
                role: null,
                start_time: null,
                expired_time: null,
                is_locked: null,
            };
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
        resetServerLoginMsg(state) {
            state.serverLoginMsg = null;
        }
    },

    actions: {
        login({ commit }, loginData) {
            commit('setLoginData', loginData)

            const login_data = {
                id: loginData.user_id,
                password: loginData.password
            }

            axios
                .post("login", login_data)
                .then((res) => {
                    if (res.status == 200) {
                        commit('setToken', res.data.access_token, { root: true })
                        const token = VueJwtDecode.decode(res.data.access_token)
                        const user = {
                            user_name: token.name,
                            user_id: token.sub,
                            user_email: null,
                            role: token.role,
                            start_time: null,
                            expired_time: null,
                            is_locked: token.isLocked
                        }
                        commit('setUser', user)
                        router.push('/')
                    }

                })

                .catch(err => {
                    commit('setServerLoginMsg', err.response.data.message)
                })


        },

        sendEmail({ commit }, forgotPwData) {
            commit('setForgotPwData', forgotPwData)
            const forgot_pw_data = {
                id: forgotPwData.user_id,
                email: forgotPwData.email
            }
            axios
                .post("repass", forgot_pw_data)
                .then((res) => {
                    if (res.status == 200) {
                        router.push('/')
                    }
                }).catch(err => {
                    commit('setServerLoginMsg', err.response.data.message)
                })

        },

        changePassword({ commit }, changePwData) {
            commit('setChangePwData', changePwData)
            const change_pw_data = {
                password: changePwData.old,
                newpassword: changePwData.new,
            }
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
            axios
                .post("changepass", change_pw_data, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
                }).catch(err => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                })

        },

        logout({ commit }) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`
            }
            axios
                .post("logout", null, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        localStorage.clear();
                    }
                    router.push('/login')
                    commit("resetToken", "", { root: true })
                    commit("resetUser")

                }).catch(err => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                })
        }
    }
}

export default User;