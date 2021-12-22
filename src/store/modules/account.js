import axios from "axios"
import { getAccountAPI } from "../statics/account_constants";
import { messageFormat } from "../statics/messages";

const Account = {
    namespaced: true,
    state: () => ({
        serverMsg: {
            id: 0,
            title: "",
            content: "",
            varient: "info"
        }
    }),

    getters: {
        getServerMsg: (state) => state.serverMsg
    },

    mutations: {
        setServerMsg(state, payload) {
            state.serverMsg = messageFormat(
                state.serverMsg.id + 1,
                payload.title,
                payload.content,
                payload.status
            )
        }
    },

    actions: {
        deleteAccount({ commit }, data) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getAccountAPI(data.role)
            const url = `${API.urlId}/${data.account.id}`;
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {

                    // Hiện lỗi
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err);
                });
        },

        addAccount({ commit }, data) {
            const API = getAccountAPI(data.role)
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .post(
                    API.urlId,
                    { id: data.account.id, email: data.account.email },
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.Message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("-------------------");
                    // Hiện lỗi
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err);
                });
        },

        updateAccount({ commit }, data) {
            console.log("Đây là update data");
            console.log(data);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getAccountAPI(data.role);
            const url = `${API.urlId}/${data.account.id}`;
            const account = {
                password: data.account.password,
                email: data.account.email,
                isLocked: data.account.isLocked,
                startDate: data.account.startDate,
                endDate: data.account.endDate,
            }
            console.log(account)
            axios
                .put(
                    url,
                    account,
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                    }
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: res.data.message,
                            status: res.status
                        }
                    )
                    console.log("-------------------");
                    console.log("-------------------");
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err.response.data.message);
                });
        }

    }
}

export default Account;