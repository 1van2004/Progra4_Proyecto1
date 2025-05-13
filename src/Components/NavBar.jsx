import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-lg font-medium hover:text-gray-200">Inicio</Link>
      <Link to="/works" className="text-lg font-medium hover:text-gray-200">Tareas</Link>
      <Link to="/proveedores" className="text-lg font-medium hover:text-gray-200">Proveedores</Link>
      <Link to="/inventario" className="text-lg font-medium hover:text-gray-200">Inventario</Link>
      <Link to="/reportForms" className="text-lg font-medium hover:text-gray-200">Reportes</Link>
      <Link to="/reportTable" className="text-lg font-medium hover:text-gray-200">Lista de Reportes</Link>
    </nav>
  );
};

export default NavBar;

