import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TareasList from "../Components/TareasList";

const TareasPage = () =>{

    const queryClient = new QueryClient(); 
    return(
        <QueryClientProvider client={queryClient}>
        <TareasList/>
        </QueryClientProvider>
    );
}

export default TareasPage;
