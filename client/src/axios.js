import Axios from "axios";

export const makeRequest = Axios.create({
    withCredentials: true
});