import axios from "axios"
import { getAccountAPI } from "../statics/account_constants";

const Account = {
    namespaced: true,
    state: () => ({
        serverMsg: "",
    }),

    getters: {
        getServerMsg: (state) => state.serverMsg
    },

    mutations: {
        setServerMsg(state, payload) {
            state.serverMsg = payload
        }
    },

    actions: {

        deleteAccount({ commit }, account) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getAccountAPI()
            const url = `${API.urlId}/${account.id}`;
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    commit("setServerMsg", err.response.message)
                    console.log(err);
                });
        },

        addAccount({ commit }, account) {
            const API = getAccountAPI()
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .post(
                    API.urlId,
                    {id: account.id, email: account.email},
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("Day la loi");
                    console.log("-------------------");
                    commit("setServerMsg", err.response.message)
                    console.log(err);
                });
        },

    }
}

export default Account;