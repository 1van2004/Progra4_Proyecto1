import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
<<<<<<< HEAD
    <nav className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo WATER-SF alineado a la izquierda */}
        <div className="text-xl font-bold tracking-tight">
          WATER-SF
        </div>
        
        {/* Menú alineado a la derecha */}
        <div className="flex space-x-8">
          <Link 
            to="/" 
            className="text-[15px] font-medium hover:text-gray-300 transition-colors"
          >
            Inicio
          </Link>
          <Link 
            to="/works" 
            className="text-[15px] font-medium hover:text-gray-300 transition-colors"
          >
            Tareas
          </Link>
          <Link 
            to="/proveedores" 
            className="text-[15px] font-medium hover:text-gray-300 transition-colors"
          >
            Proveedores
          </Link>
          <Link 
            to="/inventario" 
            className="text-[15px] font-medium hover:text-gray-300 transition-colors"
          >
            Inventario
          </Link>
        </div>
      </div>
=======
    <nav className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-lg font-medium hover:text-gray-200">Inicio</Link>
      <Link to="/works" className="text-lg font-medium hover:text-gray-200">Tareas</Link>
      <Link to="/proveedores" className="text-lg font-medium hover:text-gray-200">Proveedores</Link>
      <Link to="/inventario" className="text-lg font-medium hover:text-gray-200">Inventario</Link>
      <Link to="/reportForms" className="text-lg font-medium hover:text-gray-200">Reportes</Link>
      <Link to="/reportTable" className="text-lg font-medium hover:text-gray-200">Lista de Reportes</Link>
>>>>>>> 89b8a4dbfa47cf142973b24da6ae230dccb61849
    </nav>
  );
};

<<<<<<< HEAD
export default NavBar;
=======
export default NavBar;

>>>>>>> 89b8a4dbfa47cf142973b24da6ae230dccb61849
