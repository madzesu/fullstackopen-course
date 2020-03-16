import axios from 'axios';

const BASE_URL = 'http://localhost:3001/notes';

const handleResponse = response => response.data;

const getAll = () => {
    return axios
        .get(BASE_URL)
        .then(handleResponse);
};

const create = newObject => {
    return axios
        .post(BASE_URL, newObject)
        .then(handleResponse);
};

const update = (id, newObject) => {
    return axios
        .put(`${BASE_URL}/${id}`, newObject)
        .then(handleResponse);
};

export default {
    getAll,
    create,
    update
};


