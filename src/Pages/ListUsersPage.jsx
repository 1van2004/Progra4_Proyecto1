import React, { useEffect, useState } from "react";
import { deleteUser, useUsers } from "../Services/UsersService";
import { SortAsc, SortDesc } from "lucide-react";
import AddGenericModal from "../Components/Modals/AddGenericModal";
import EditUsersPage from "./EditUsersPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";
const ListUsersPage = () => {
    const { user } = useContext(AuthContext)
  const { data: users, isLoading, isError } = useUsers();
  const queryClient = useQueryClient();

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const [busquedaInput, setBusquedaInput] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("nis");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ordenCampo, setOrdenCampo] = useState("nis");
  const [ordenAscendente, setOrdenAscendente] = useState(true);

 useEffect(() => {
  if (users && Array.isArray(users)) {
    const resultado = aplicarFiltro(users);
    const ordenados = ordenarUsuarios(resultado, ordenCampo, ordenAscendente);
    setUsuariosFiltrados(ordenados);

    // Si después de aplicar el filtro no hay usuarios, limpia la búsqueda
    if (resultado.length === 0 && busqueda !== "") {
      setBusqueda("");
      setBusquedaInput("");
    }
  }
}, [users, busqueda, filtro, ordenCampo, ordenAscendente]);


  const aplicarFiltro = (lista) => {
    const texto = busqueda.trim().toLowerCase();
    if (texto === "") return lista;
    return lista.filter((u) =>
      u[filtro]?.toString().toLowerCase().includes(texto)
    );
  };

  const ordenarUsuarios = (lista, campo, ascendente) => {
    return [...lista].sort((a, b) => {
      const valorA = a[campo]?.toString().toLowerCase() || "";
      const valorB = b[campo]?.toString().toLowerCase() || "";
      if (valorA > valorB) return ascendente ? 1 : -1;
      if (valorA < valorB) return ascendente ? -1 : 1;
      return 0;
    });
  };

  const confirmarEliminacion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVisible(true);
  };

  const eliminarUsuarioConfirmado = async () => {
  if (!usuarioSeleccionado) return;
  const id = usuarioSeleccionado.id;
  setModalVisible(false);
  setUsuarioSeleccionado(null);
  setShowNotification(true);

  try {
    await deleteUserMutation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        // Forzar que usuariosFiltrados se limpie si no quedan usuarios
        if (usuariosFiltrados.length === 1) {
          setUsuariosFiltrados([]);
        }
      },
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }

  setTimeout(() => setShowNotification(false), 2000);
};



  const handleUserUpdated = () => {
    queryClient.invalidateQueries(["users"]);
    setEditModalOpen(false);
  };

  if (isLoading) return <div className="text-center">Cargando usuarios...</div>;
  if (isError) return <div className="text-center text-red-500">Error al cargar usuarios.</div>;

  return (
    
    <div>
    {user ? <div className="p-4">
      <div className="relative max-w-7xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Lista de Usuarios</h2>

      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-center text-sm md:text-base animate-fade-in-out transition duration-500">
            ✅ Usuario eliminado correctamente.
          </div>
        </div>
      )}

   {/* Contenedor del buscador y filtros */}
<div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
  {/* Buscador + botón */}
  <div className="flex w-full md:w-3/5 gap-2">
    <input
  type="text"
  placeholder={`Buscar por ${filtro}`}
  value={busquedaInput}
  onChange={(e) => {
    setBusquedaInput(e.target.value);
    if (e.target.value === "") {
      setBusqueda("");
    }
      }}
      className="flex-grow p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setBusqueda(busquedaInput);
        }
      }}
    />
    <button
      onClick={() => setBusqueda(busquedaInput)}
      className="bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 rounded-md"
    >
      Buscar
    </button>
  </div>

  {/* Filtro */}
  <div className="w-full md:w-1/5">
    <select
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      className="w-full p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="nis">NIS</option>
      <option value="cedula">Cédula</option>
      <option value="zona">Zona</option>
    </select>
  </div>
</div>

      {/* Orden */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <select
          value={ordenCampo}
          onChange={(e) => setOrdenCampo(e.target.value)}
          className="p-2 border border-blue-400 rounded-md"
        >
          <option value="nis">Ordenar NIS</option>
          <option value="cedula">Ordenar Cédula</option>
          <option value="apellido">Ordenar Apellido</option>
          <option value="nombre">Ordenar Nombre</option>
        </select>
        <button
          onClick={() => setOrdenAscendente(!ordenAscendente)}
          className="bg-teal-800 hover:bg-teal-900 text-white p-1.5 rounded mr-3 shadow"
        >
          {ordenAscendente ? (
            <SortDesc className="inline-block w-5 h-5" />
          ) : (
            <SortAsc className="inline-block w-5 h-5" />
          )}
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
       <table className="min-w-full table-fixed border border-gray-300 shadow-sm text-sm">
  <thead className="bg-gray-100 text-gray-800 border-b border-gray-300">
            <tr>
              <th className="border border-gray-300 px-3 py-2">#</th>
              <th className="border border-gray-300 px-3 py-2">NIS</th>
              <th className="border border-gray-300 px-3 py-2">Medidor</th>
              <th className="border border-gray-300 px-3 py-2">Nombre</th>
              <th className="border border-gray-300 px-3 py-2">Apellido</th>
              <th className="border border-gray-300 px-3 py-2">Cédula</th>
              <th className="border border-gray-300 px-3 py-2">Teléfono</th>
              <th className="border border-gray-300 px-3 py-2w-[220px]">Dirección</th>
              <th className="border border-gray-300 px-3 py-2w-[220px]">Correo</th>
              <th className="border border-gray-300 px-3 py-2">Zona</th>
              <th className="border border-gray-300 px-3 py-2">Plano</th>
              <th className="border border-gray-300 px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((user, index) => (
                <tr
                  key={user.id}
                  className="text-center border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{user.nis}</td>
                  <td className="border px-2 py-1">{user.numeroMedidor}</td>
                  <td className="border px-2 py-1">{user.nombre}</td>
                  <td className="border px-2 py-1">{user.apellido}</td>
                  <td className="border px-2 py-1">{user.cedula}</td>
                  <td className="border px-2 py-1">{user.telefono}</td>
                  <td className="border px-2 py-1">{user.direccion}</td>
                  <td className="border px-2 py-1">{user.correo}</td>
                  <td className="border px-2 py-1">{user.zona}</td>
                  <td className="border px-2 py-1">{user.copiaPlano ? "Sí" : "No"}</td>
                  <td className="border px-2 py-1">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setUsuarioSeleccionado(user);
                          setEditModalOpen(true);
                        }}
                        className="bg-teal-800 hover:bg-teal-900 text-white text-xs px-3 py-1 rounded-full shadow-sm opacity-90 hover:opacity-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmarEliminacion(user)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ¿Eliminar Usuario?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de eliminar al
              usuario{" "}
              <span className="font-bold">{usuarioSeleccionado?.nombre}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={eliminarUsuarioConfirmado}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && usuarioSeleccionado && (
        <EditUsersPage
          usuario={usuarioSeleccionado}
          onClose={() => setEditModalOpen(false)}
          onUserUpdated={handleUserUpdated}
        />
      )}

      <AddGenericModal />
    </div>
    </div>
        : <Login />
    }
</div>

  );
};

export default ListUsersPage;
