import axios from "axios";
const baseUrl = "api/persons"

const getAll = () =>{
    return axios.get(baseUrl)
}
const create = (newPerson) => {
    const request =  axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}