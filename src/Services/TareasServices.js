import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TAREAS_BIN = '681a4afb8960c979a594875e';
const TAREAS_API_URL = 'https://api.jsonbin.io/v3/b/' + TAREAS_BIN; 
const TAREAS_API_KEY = '$2a$10$d8Zx8W4fPo2BaLJywRDCaeNpzshSkUPHwKsCRvfxPPqRBJOU8Fbuy';

// Fetch function to get users from the server 

const fetchTareas = async () => { 

    try
    {
const response = await axios.get(TAREAS_API_URL,
    {
        headers:{
            'X-Access-Key': TAREAS_API_KEY,
        }
    }); 
// Extract the array of user records from the JSON payload 
return response.data.record.Tareas; // assumes response.data has the shape { id, record, metadata } 
}
catch(error){
    console.error('Error fetching works:', error);
    return[];
}

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