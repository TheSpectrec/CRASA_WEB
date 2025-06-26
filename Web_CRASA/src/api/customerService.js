import axios from './axios';

export const getAll = () => axios.get('/api/customers');
export const getById = (id) => axios.get('/api/customers/' + id);
export const create = (data) => axios.post('/api/customers', data);
export const update = (id, data) => axios.put('/api/customers/' + id, data);
export const remove = (id) => axios.delete('/api/customers/' + id);
