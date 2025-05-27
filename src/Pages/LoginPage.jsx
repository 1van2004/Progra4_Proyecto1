import Login from '../Components/Login';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext.jsx';
const LoginPage = () => {

  const { user } = useContext(AuthContext)
  const { logout } = useContext(AuthContext);
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
      { user ?        <div className="p-4 flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold mb-4">¿Desea cerrar la sesión?</h1>
         

        <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">Cerrar Sesión</button >

      </div>
      : <Login/>
      }
      </div>
    );
  }
  
export default LoginPage;