import axios from 'axios';

const API_KEY = import.meta.env.VITE_MASTER_KEY_Proveedores;
const BASE_URL = "https://api.jsonbin.io/v3/b/68217be58561e97a501222ab";
console.log(API_KEY);
console.log(BASE_URL);
const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
};

export const obtenerProveedores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, { headers });
    return response.data.record || [];
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    return [];
  }
};

export const guardarProveedores = async (nuevosProveedores) => {
  try {
    await axios.put(BASE_URL, nuevosProveedores, { headers });
  } catch (error) {
    console.error('Error al guardar proveedores:', error);
  }
};
