import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";
import { Plus, List, ChevronDown } from 'lucide-react';

const NavBar = () => {
  const { user } = useContext(AuthContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (

    <>
    {user ? 
      <nav className="bg-gradient-to-r from-teal-900 to-teal-600  text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo WATER-SF alineado a la izquierda */}
        <div className="text-xl font-bold tracking-tight">
          WATER-SF
        </div>

        {/* Menú alineado a la derecha */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Inicio
          </Link>
          <Link to="/works" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Tareas
          </Link>
          <Link to="/proveedores" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Proveedores
          </Link>
          <Link to="/inventario" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Inventario
          </Link>
          <Link to="/reportForms" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Reportes
          </Link>
          <Link to="/reportTable" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Lista de Reportes
          </Link>


          {/* Dropdown de Gestión de Usuarios */}
          <div className="relative" ref={dropdownRef}>
  <button
    onClick={handleDropdownClick}
    className="text-[15px] font-medium hover:text-blue-500 transition-colors flex items-center gap-2"
  >
    Gestión de Usuarios <ChevronDown size={18} />
  </button>

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl z-50 border border-blue-200 text-gray-800 overflow-hidden">
      <Link
        to="/agregar-usuario"
        onClick={handleLinkClick}
        className="flex items-center gap-2 px-4 py-3 hover:bg-blue-100 hover:text-blue-700 transition-colors"
      >
        <Plus size={18} />
        <span>Agregar Usuario</span>
      </Link>
      <Link
        to="/lista-usuarios"
        onClick={handleLinkClick}
        className="flex items-center gap-2 px-4 py-3 hover:bg-blue-100 hover:text-blue-700 transition-colors"
      >
        <List size={18} />
        <span>Lista de Usuarios</span>
      </Link>
    </div>
  )}
</div>
          <Link to="/login" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
            Logout
          </Link>
        </div>
      </div>
    </nav>

        : <nav className="bg-gradient-to-r from-teal-900 to-teal-600  text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo WATER-SF alineado a la izquierda */}
          <div className="text-xl font-bold tracking-tight">
            WATER-SF
          </div>
  
          {/* Menú alineado a la derecha */}
          <div className="flex space-x-6 items-center">
            <Link to="/" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
              Inicio
            </Link>
            <Link to="/reportForms" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
              Reportes
            </Link>
            <Link to="/login" className="text-[15px] font-medium hover:text-gray-300 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>
    }
</>
    
  );
};

export default NavBar;
