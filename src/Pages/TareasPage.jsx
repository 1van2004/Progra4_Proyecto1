import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TareasList from "../Components/TareasList";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";

const TareasPage = () => {

    const { user } = useContext(AuthContext)
    return (

        <div>
            {user ? <div className="p-4">
                <TareasList />
            </div>
                : <Login />
            }
        </div>
    );
}


export default TareasPage;
