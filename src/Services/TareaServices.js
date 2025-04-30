import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WORKS_API_URL = 'https://api.jsonbin.io/v3/qs/681257b28960c979a5908062'; 

// Fetch function to get users from the server 

const fetchTareas = async () => { 
const response = await axios.get(WORKS_API_URL); 
// Extract the array of user records from the JSON payload 
return response.data.record;  // assumes response.data has the shape { id, record, metadata } 
};

/** 

 * Custom hook to retrieve users via React Query. 

 * Returns { data, isLoading, isError, error } where data is an array of users. 

 * Uses the object syntax required by React Query. 

 */ 

export const useTareas = () => { 
return useQuery({ 
queryKey: ['Tareas'], 
queryFn: fetchTareas, 
staleTime: 5 * 60 * 1000, // cache for 5 minutes 
retry: 1,// retry once on failure 
}); 
}; 