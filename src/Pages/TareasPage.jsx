import WorkList from "../Components/TareasList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TareasPage = () =>{

    const queryClient = new QueryClient(); 
    return(
        <QueryClientProvider client={queryClient}>
        <WorkList/>
        </QueryClientProvider>
    );
}

export default TareasPage;
