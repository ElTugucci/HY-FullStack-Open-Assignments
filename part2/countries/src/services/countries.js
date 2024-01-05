import axios from "axios";
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(respone => respone.data)
}
export default {getAll}