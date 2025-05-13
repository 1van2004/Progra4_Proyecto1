import ReportTable from '../Components/ReportTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ReportesPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReportTable /> 
    </QueryClientProvider>
  );
};

export default ReportesPage;
