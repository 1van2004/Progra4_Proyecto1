import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://localhost:7255/api/Tareas";
const headers = {
  'Content-Type': 'application/json',
};

export const useObtenerTareas = () => {
  return useQuery({
    queryKey: ['tareas'],
    queryFn: async () => {
      const response = await axios.get(BASE_URL, { headers });
      return response.data || [];
    }
  });
};

export const useCrearTarea = (options) => {
  return useMutation({
    mutationFn: async (tarea) => {
      await axios.post(BASE_URL, tarea, { headers });
    },
    ...options
  });
};

export const useEditarTarea = () => {
  return useMutation({
    mutationFn: async (tarea) => {
      await axios.put(`${BASE_URL}/${tarea.id}`, tarea, { headers });
    }
  });
};

export const eliminarTarea = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, { headers });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
};


