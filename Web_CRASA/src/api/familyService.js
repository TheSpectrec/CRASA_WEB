import axios from './axios';

export const getAll = () => axios.get('/api/families');
export const getById = (id) => axios.get('/api/families/' + id);
export const create = (data) => axios.post('/api/families', data);
export const update = (id, data) => axios.put('/api/families/' + id, data);
export const remove = (id) => axios.delete('/api/families/' + id);
