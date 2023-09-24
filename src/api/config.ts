import axios from 'axios';

const poeAxios = axios.create({
    baseURL: 'http://localhost:5000/api/poe',
});

export default poeAxios;
