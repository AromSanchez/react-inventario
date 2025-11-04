import axios from 'axios';

export const BASE_URL = 'https://foro-discusion-9gro.onrender.com';
const API_URL = `${BASE_URL}/api`;

// Servicios para Categorías
export const getCategorias = () => axios.get(`${API_URL}/categorias/`);
export const getCategoria = (id) => axios.get(`${API_URL}/categorias/${id}/`);
export const createCategoria = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    return axios.post(`${API_URL}/categorias/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const updateCategoria = (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    return axios.put(`${API_URL}/categorias/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const deleteCategoria = (id) => axios.delete(`${API_URL}/categorias/${id}/`);

// Servicios para Productos
export const getProductos = () => axios.get(`${API_URL}/productos/`);
export const getProducto = (id) => axios.get(`${API_URL}/productos/${id}/`);
export const createProducto = (data) => axios.post(`${API_URL}/productos/`, data);
export const updateProducto = (id, data) => axios.put(`${API_URL}/productos/${id}/`, data);
export const deleteProducto = (id) => axios.delete(`${API_URL}/productos/${id}/`);