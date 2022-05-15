import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000"


export default {
    /* token refresh */
    tokenRefresh(data) {
      return axios.post("/user/...", data);
    },

    signin(data) {
      return axios.post("/signin", data);
    },

    signup(data) {
      return axios.post("/signup", data);
    }
};