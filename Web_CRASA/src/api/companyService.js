import axios from './axios';

export const getAll = () => axios.get('/api/companies');
export const getById = (id) => axios.get('/api/companies/' + id);
export const create = (data) => axios.post('/api/companies', data);
export const update = (id, data) => axios.put('/api/companies/' + id, data);
export const remove = (id) => axios.delete('/api/companies/' + id);
