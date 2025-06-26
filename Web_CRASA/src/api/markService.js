import axios from './axios';

export const getAll = () => axios.get('/api/marks');
export const getById = (id) => axios.get('/api/marks/' + id);
export const create = (data) => axios.post('/api/marks', data);
export const update = (id, data) => axios.put('/api/marks/' + id, data);
export const remove = (id) => axios.delete('/api/marks/' + id);
