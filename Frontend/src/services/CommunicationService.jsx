import axios from "axios";
const baseURL = "/api/items"

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

const add = async (item) => {
    const request = axios.post(baseURL, item)
    const response = await request;
    return response.data;
}

const remove = async (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    const response = await request;
    return response.data;
}

export default { add, remove, getAll }