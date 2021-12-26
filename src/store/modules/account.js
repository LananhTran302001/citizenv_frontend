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
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.msg,
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
                            content: err.response.data.msg,
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
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.msg,
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
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
                    console.log(err);
                });
        },

        updateIsLocked({ commit }, data) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getAccountAPI(data.role);
            const url = `${API.urlId}/${data.account.id}`;
            const account = {
                isLocked: data.account.isLocked
            }
            console.log("Đây là update account sau khi sửa khóa")
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
                            content: res.data.msg,
                            status: res.status
                        }
                    )
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
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
                // Không gửi password
                email: data.account.email,
                StartDate: data.account.startDate,
                EndDate: data.account.endDate,
            }
            console.log("Đây là update account không có khóa")
            console.log(account)
            axios
                .put(
                    url,
                    account,
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log("Đây là response")
                        console.log(res);
                    }
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: res.data.msg,
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
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
                    console.log(err.response.data.msg);
                });
        }

    }
}

export default Account;