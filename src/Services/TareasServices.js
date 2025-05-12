import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
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
return response.data.record.tareas; // assumes response.data has the shape { id, record, metadata } 
}
catch(error){
    console.error('Error fetching works:', error);
    return[];
}

};

export async function postTarea({ nuevaTarea }) {
  const tareas = await fetchTareas();
  //const updated = [...existing, newUser];              
  tareas.push(nuevaTarea);

  try {
      const response = await axios.put(
        TAREAS_API_URL,
          { tareas: tareas },
          {
            headers: {
              'X-Access-Key': TAREAS_API_KEY,
            }
          }
      );

      if(response.status != 200) 
          throw new Error("Error adding work");

      return nuevaTarea;
  } catch (error) {
      console.error("Error adding work:", error);
  }
}


export const useTareas = () => { 
return useQuery({ 
queryKey: ['tareas'], 
queryFn: fetchTareas, 
staleTime: 5 * 60 * 1000, // cache for 5 minutes 
retry: 1,// retry once on failure 
}); 
}; 

// Hook to encapsulate the mutation + cache updates
  export function useAddTareas() {
    const queryClient = useQueryClient()
    
    // **Optimistic update**: before the request fires
    return useMutation({
      mutationFn: postTarea,
      onMutate: async ({ nuevaTarea }) => {
        await queryClient.cancelQueries(['tareas'])
        const previous = queryClient.getQueryData(['tareas'])
        queryClient.setQueryData(['tareas'], old => [...(old||[]), nuevaTarea])
        return { previous }
      },
      onError: (err, variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(['tareas'], context.previous)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['tareas'])
      }
    })
}


export async function deleteTarea(id) {
  const tareas = await fetchTareas();
  const nuevasTareas = tareas.filter(t => t.id !== id);

  const response = await axios.put(
    TAREAS_API_URL,
    { tareas: nuevasTareas },
    {
      headers: {
        'X-Access-Key': TAREAS_API_KEY,
      }
    }
  );

  if (response.status !== 200) {
    throw new Error("Error al eliminar tarea");
  }

  return id;
}

export async function updateTarea(updatedTarea) {
  const tareas = await fetchTareas();
  const nuevasTareas = tareas.map(t => t.id === updatedTarea.id ? updatedTarea : t);

  const response = await axios.put(
    TAREAS_API_URL,
    { tareas: nuevasTareas },
    {
      headers: {
        'X-Access-Key': TAREAS_API_KEY,
      }
    }
  );

  if (response.status !== 200) throw new Error("Error al actualizar tarea");

  return updatedTarea;
}

export function useUpdateTarea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTarea,
    onSuccess: () => {
      queryClient.invalidateQueries(['tareas']);
    }
  });
}

