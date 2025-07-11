import axios from './axios';

export const getAll = () => axios.get('/api/users');
export const getUserById = (id) => axios.get('/api/users/' + id);
export const createUser = (data) => axios.post('/api/users', data);
export const updateUser = (id, data) => axios.put('/api/users/' + id, data);
export const deleteUser = (id) => axios.delete('/api/users/' + id);

// Autenticación
export const login = (credentials) => axios.post('/api/users/login', credentials);
