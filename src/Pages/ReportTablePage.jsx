import ReportTable from '../Components/ReportTable';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";

const ReportesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? 
        <div className="p-4">
          <ReportTable />
        </div>
       : 
        <Login />
      }
    </div>
  );
};

export default ReportesPage;
