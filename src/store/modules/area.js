import axios from "axios"
const Area = {

    actions: {
        clickGetCities() {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`
            }
            axios
                .get("cities", { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        return res.data.Cities
                    }
                    console.log("-------------------")
                    return null
                }).catch(err => {
                    console.log("Day la loi")
                    console.log("-------------------")
                    console.log(err)
                    return null
                })
        }
    }
}

export default Area