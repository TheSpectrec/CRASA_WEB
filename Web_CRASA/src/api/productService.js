import axios from './axios';

export const getAll = () => axios.get('/api/products');
export const getById = (id) => axios.get('/api/products/' + id);
export const create = (data) => axios.post('/api/products', data);
export const update = (id, data) => axios.put('/api/products/' + id, data);
export const remove = (id) => axios.delete('/api/products/' + id);
