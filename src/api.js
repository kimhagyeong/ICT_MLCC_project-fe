import axios from "axios";

// axios.defaults.baseURL = "http://.../api"  //배포
axios.defaults.withCredentials = true;


export default {
    /* token refresh */
    tokenRefresh(data) {
      return axios.post("/user/...", data);
    },
};