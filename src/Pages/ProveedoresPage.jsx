import ProveedorList from "../Components/ProveedorList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProveedoresPage = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ProveedorList />
        </QueryClientProvider>
    );
};

export default ProveedoresPage;
