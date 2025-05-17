import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BIN_ID = '681677788a456b7966971031';
const API_KEY = '$2a$10$jDsAdbubSFTv/kzDxfFqz.fhsfFSjO8kgyy0Aiy6A7il2wAB/Gja6';
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
};

// Obtener usuarios
export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/latest`, { headers });
  const data = response?.data?.record;
  return Array.isArray(data) ? data : [];
};


// Hook para usar usuarios
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// Guardar usuarios
export const saveUsers = async (newUsers) => {
  try {
    await axios.put(BASE_URL, newUsers, { headers });
  } catch (error) {
    console.error('Error al guardar usuarios:', error);
  }
};

// Agregar usuario
export const addUser = async (newUser) => {
  try {
    const currentUsers = await fetchUsers();
    const updatedUsers = [...currentUsers, newUser];
    await saveUsers(updatedUsers);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
};

// Eliminar usuario (optimizado)
export const deleteUser = async (userId) => {
  try {
    const currentUsers = await fetchUsers();
    const updatedUsers = currentUsers.filter(user => user.id !== userId);

    // Si queda vacío, igual guardar arreglo vacío
    await saveUsers(updatedUsers.length > 0 ? updatedUsers : []);

    console.log(`Usuario con ID ${userId} eliminado.`);
    return updatedUsers; // ← devolver la lista ya actualizada
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};
// Editar usuario existente
export const updateUser = async (updatedUser) => {
  try {
    const currentUsers = await fetchUsers();
    const updatedUsers = currentUsers.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    await saveUsers(updatedUsers);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

