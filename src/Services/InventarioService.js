import axios from 'axios';

const API_KEY = import.meta.env.VITE_MASTER_KEY_Inventario;
const BASE_URL = "http://localhost:5067/api/Inventario";
const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
};

export const obtenerInventario = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers });
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    return [];
  }
};

export const crearInventario = async (item) => {
  try {
    await axios.post(BASE_URL, item, { headers });
  } catch (error) {
    console.error('Error al crear artículo de inventario:', error);
  }
};

export const editarInventario = async (item) => {
  try {
    await axios.put(`${BASE_URL}/${item.id}`, item, { headers });
  } catch (error) {
    console.error('Error al editar artículo de inventario:', error);
  }
};

export const eliminarInventario = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, { headers });
  } catch (error) {
    console.error('Error al eliminar artículo de inventario:', error);
  }
};
