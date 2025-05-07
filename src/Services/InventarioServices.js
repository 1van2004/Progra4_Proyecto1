import axios from 'axios';

const BIN_ID = '68144f0d8561e97a500c0c72';
const API_KEY = '$2a$10$lDxcpKtBbfpQM19RWmlnh.GMorZJOcb9UNvs6GmXJTHfFfB49xUU6';
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Cabeceras para autenticación y tipo de contenido
const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
};

// Obtener los datos del inventario desde JSON Bin
export const obtenerInventario = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, { headers });
    return response.data.record || [];
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    return [];
  }
};

// Guardar el inventario completo (se usa para agregar, editar y eliminar)
export const guardarInventario = async (nuevoInventario) => {
  try {
    await axios.put(BASE_URL, nuevoInventario, { headers });
  } catch (error) {
    console.error('Error al guardar inventario:', error);
  }
};
