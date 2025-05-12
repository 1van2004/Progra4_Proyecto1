import React, { useEffect, useState } from 'react';
import ProveedorList from '../Components/ProveedorList';
import { obtenerProveedores, guardarProveedores } from '../Services/ProveedoresService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      id: proveedorEditando ? proveedorEditando.id : Date.now(),
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
      nuevaLista = proveedores.map((p) => (p.id === proveedorEditando.id ? nuevoProveedor : p));
    } else {
      nuevaLista = [...proveedores, nuevoProveedor];
      toast.success("Proveedor agregado correctamente.");
    }

    setProveedores(nuevaLista);
    await guardarProveedores(nuevaLista);

    setProveedorEditando(null);
    setShowModal(false);
    form.reset();
  };

  const editar = (prov) => {
    setProveedorEditando(prov);
    setShowModal(true);
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este proveedor?')) return;

    const nuevaLista = proveedores.filter((p) => p.id !== id);
    setProveedores(nuevaLista);
    await guardarProveedores(nuevaLista);
    toast.success("Proveedor eliminado correctamente.");
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

  return (
    <div className="p-6 w-full mx-auto">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Proveedor
        </button>
      </div>

      <ProveedorList proveedores={filtrados} onEditar={editar} onEliminar={eliminar} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
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
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProveedoresPage;
