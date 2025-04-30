import WorkList from "../Components/WorkList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TareasPages = () =>{

    const queryClient = new QueryClient(); 
    return(
        <QueryClientProvider client={queryClient}>
        <WorkList/>
        </QueryClientProvider>
    );
}

export default TareasPages;
