import React, { useEffect, useState } from 'react';
import ProveedorList from '../Components/ProveedorList';
import {
  obtenerProveedores,
  crearProveedor,
  editarProveedor,
  eliminarProveedor
} from '../Services/ProveedoresService';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerProveedores();
      setProveedores(data);
    }
    cargar();
  }, []);

  const guardar = async (evento) => {
    evento.preventDefault();

    const form = evento.target;

    const nuevoProveedor = {
      nombreEmpresa: form.nombreEmpresa.value.trim(),
      nombreRepresentante: form.nombreRepresentante.value.trim(),
      cedulaRepresentante: form.cedulaRepresentante.value.trim(),
      correoEmpresa: form.correoEmpresa.value.trim(),
      telefonoEmpresa: form.telefonoEmpresa.value.trim(),
      descripcionProductos: form.descripcionProductos.value.trim(),
      numeroCuenta: form.numeroCuenta.value.trim(),
    };

    const validacion = Object.values(nuevoProveedor).every(Boolean);
    if (!validacion) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    let nuevaLista;
    if (proveedorEditando) {
      nuevoProveedor.id = proveedorEditando.id;
      nuevaLista = proveedores.map((p) => (p.id === proveedorEditando.id ? nuevoProveedor : p));
      await editarProveedor(nuevoProveedor);
      toast.success("Proveedor editado correctamente.");
    } else {
      const proveedorConIdUI = { ...nuevoProveedor, id: Date.now() }; // Solo para mostrar en UI
      nuevaLista = [...proveedores, proveedorConIdUI];
      await crearProveedor(nuevoProveedor);
      toast.success("Proveedor agregado correctamente.");
    }

    setProveedores(nuevaLista);
    setProveedorEditando(null);
    setShowModal(false);
    form.reset();
  };



  const editar = (prov) => {
    setProveedorEditando(prov);
    setShowModal(true);
  };

  const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e2504c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (!confirmacion.isConfirmed) return;
  
    try {
      await eliminarProveedor(id); // ✅ Elimina en backend
  
      const dataActualizada = await obtenerProveedores(); // 🔄 Refresca la lista desde backend
      setProveedores(dataActualizada);
  
      // ✅ Mensaje final igual al de la imagen
      await Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El artículo fue eliminado correctamente.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#7f70eb'
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el proveedor.");
    }
  };

  const cancelForm = () => {
    setProveedorEditando(null);
    setShowModal(false);
  };

  const filtrados = proveedores.filter((p) =>
    [p.nombreEmpresa, p.nombreRepresentante, p.cedulaRepresentante, p.correoEmpresa, p.telefonoEmpresa]
      .join(' ')
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  const { user } = useContext(AuthContext)
  
  return (
    <div>
      {user ? <div className="p-4">
        <div className="p-6 w-full mx-auto bg-white min-h-screen">
          <ToastContainer />
          <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>

          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Buscar proveedores..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-64"
            />
            <button
              onClick={() => {
                setProveedorEditando(null);
                setShowModal(true);
              }}
              className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
            >
              Agregar Proveedor
            </button>
          </div>

          <ProveedorList proveedores={filtrados} onEditar={editar} onEliminar={eliminar} />

          {showModal && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 overflow-auto">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg max-h-screen overflow-y-auto mx-4 my-8">
                <h2 className="text-xl font-semibold mb-4">
                  {proveedorEditando ? 'Editar Proveedor' : 'Agregar Proveedor'}
                </h2>
                <form onSubmit={guardar} className="space-y-4">
                  <div>
                    <label className="block font-medium">Nombre de la Empresa</label>
                    <input
                      type="text"
                      name="nombreEmpresa"
                      defaultValue={proveedorEditando?.nombreEmpresa || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Nombre del Representante</label>
                    <input
                      type="text"
                      name="nombreRepresentante"
                      defaultValue={proveedorEditando?.nombreRepresentante || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Cédula del Representante</label>
                    <input
                      type="text"
                      name="cedulaRepresentante"
                      defaultValue={proveedorEditando?.cedulaRepresentante || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Correo de la Empresa</label>
                    <input
                      type="email"
                      name="correoEmpresa"
                      defaultValue={proveedorEditando?.correoEmpresa || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Teléfono de la Empresa</label>
                    <input
                      type="text"
                      name="telefonoEmpresa"
                      defaultValue={proveedorEditando?.telefonoEmpresa || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Descripción de Productos</label>
                    <input
                      type="text"
                      name="descripcionProductos"
                      defaultValue={proveedorEditando?.descripcionProductos || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Número de Cuenta</label>
                    <input
                      type="text"
                      name="numeroCuenta"
                      defaultValue={proveedorEditando?.numeroCuenta || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
        : <Login />
      }
    </div>

  );
}

export default ProveedoresPage;
