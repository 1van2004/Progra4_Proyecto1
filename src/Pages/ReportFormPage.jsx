import ReportForm from '../Components/ReportForm'; // Corregimos el nombre de importación
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ReportesPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReportForm /> 
    </QueryClientProvider>
  );
};

export default ReportesPage;
