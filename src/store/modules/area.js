import axios from "axios"
const Area = {
    state: () => ({
        area: {
            cities: null
        }
    }),

    getters: {
        getCities: (state) => state.cities
    },

    mutations: {
        setCities (state, payload) {
            state.cities = payload
        }
    },

    actions: {
        clickGetCities({ commit }) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
            axios
                .get("cities", { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data)
                        commit("setCities", res.data.Cities)
                    }
                    console.log("-------------------")
                    console.log(res.data.message)
                }).catch(err => {
                    console.log("Day la loi")
                    console.log(err)
                    console.log("-------------------")
                    console.log(err.response)
                })
        }
    }
}

export default Area