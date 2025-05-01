import { useQuery } from "@tanstack/react-query";
import axios, { AxiosHeaders } from "axios";

const PROVEEDORES_API_URL = import.meta.env.VITE_API_URL_Proveedores; 
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY_Proveedores;
const MASTER_KEY = import.meta.env.VITE_MASTER_KEY_Proveedores;

const fetchProveedores = async () => {
  const response = await axios.get(PROVEEDORES_API_URL, {
    headers: {
      'X-Master-Key': MASTER_KEY,
      'X-Access-Key': ACCESS_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.record;
};



export const useProveedores = () => {
  return useQuery({
    queryKey: ['Proveedores'],
    queryFn: fetchProveedores,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
