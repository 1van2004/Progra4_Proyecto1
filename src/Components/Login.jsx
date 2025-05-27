import { useRef, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
  const { login, loginLoading, loginError } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      // Error handled by loginError
    }
  };

  return (
    <div className="min-h-screen min-w-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md   p-8 rounded-2xl shadow-xl ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              ref={emailRef}
              placeholder="Usuario"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>
          {loginError && (
            <p className="text-sm text-red-600 text-center">Credenciales incorrectas</p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-2 bg-[#009285] hover:bg-[#055a55] text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loginLoading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
