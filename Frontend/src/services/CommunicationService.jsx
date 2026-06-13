import axios from "axios";
const baseURL = "/api/items"

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

const add = async (item) => {
    const response = await axios.post(baseURL, item);
    return response.data;
}

const remove = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
}

export default { add, remove, getAll }