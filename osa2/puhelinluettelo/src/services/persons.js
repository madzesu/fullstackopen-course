import axios from "axios";


const BASE_URL = '/api/persons';

const getAll = () =>
    axios
        .get(BASE_URL)
        .then(response => response.data);

const create = person =>
    axios
        .post(BASE_URL, person)
        .then(response => response.data);

const update = (id, person) =>
    axios
        .put(`${BASE_URL}/${id}`, person)
        .then(response => response.data);

const remove = id =>
    axios
        .delete(`${BASE_URL}/${id}`)
        .then(response => response.status);

export default {
    getAll,
    create,
    update,
    remove
};
