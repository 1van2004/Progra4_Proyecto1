import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'https://api.jsonbin.io/v3/b/681938448a456b79669844d5';
const API_KEY = '$2a$10$ttOfm2NC8N4JUwcS2DXgWOh77Q/nFXoLtfrysb7ns1IhR7ktVk9MK';

const axiosConfig = {
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json',
    'X-Bin-Versioning': 'false',
  },
};

// 🔹 Obtener lista de reportes
export const fetchReportes = async () => {
  const res = await axios.get(`${API_URL}/latest`, axiosConfig);
  return res.data.record?.reportes ?? [];
};

// 🔹 Guardar lista actualizada de reportes
const saveReportes = async (reportes) => {
  const payload = { reportes };
  await axios.put(API_URL, payload, axiosConfig);
};

// 🔹 Hook para consultar reportes
export const useReportes = () => {
  return useQuery({
    queryKey: ['reportes'],
    queryFn: fetchReportes,
    staleTime: 1000 * 60 * 10,
  });
};

// 🔹 Hook para agregar un nuevo reporte
export const useAddReporte = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nuevo) => {
      const actuales = await fetchReportes();
      await saveReportes([...actuales, nuevo]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportes'] });
    },
  });
};

// 🔹 Hook para eliminar un reporte
export const useDeleteReporte = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const actuales = await fetchReportes();
      const filtrados = actuales.filter((r) => r.id !== id);
      await saveReportes(filtrados);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportes'] });
    },
  });
};
