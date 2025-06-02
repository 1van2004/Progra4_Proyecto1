import axios from 'axios';

const BASE_URL = "https://localhost:7255/api/Inventario";


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const obtenerInventario = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers: getAuthHeaders() });
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    return [];
  }
};

export const crearInventario = async (item) => {
  try {
    await axios.post(BASE_URL, item, { headers: getAuthHeaders() });
  } catch (error) {
    console.error('Error al crear artículo de inventario:', error);
  }
};

export const editarInventario = async (item) => {
  try {
    await axios.put(`${BASE_URL}/${item.id}`, item, { headers: getAuthHeaders() });
  } catch (error) {
    console.error('Error al editar artículo de inventario:', error);
  }
};

export const eliminarInventario = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error('Error al eliminar artículo de inventario:', error);
  }
};
