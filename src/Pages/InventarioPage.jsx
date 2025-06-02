import React, { useEffect, useState, useContext } from 'react';
import InventarioList from '../Components/InventarioList';
import {
  obtenerInventario,
  crearInventario,
  editarInventario,
  eliminarInventario
} from '../Services/InventarioService';
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function InventarioPage() {
  const [inventario, setInventario] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [itemEditando, setItemEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerInventario();
      setInventario(data);
    }
    cargar();
  }, []);

  const guardar = async (evento) => {
    evento.preventDefault();
    const form = evento.target;

    const nuevoItem = {
     nombre: form.nombre.value.trim(),
     descripcion: form.descripcion.value.trim(),
     cantidad: parseFloat(form.cantidad.value),
     unidad: form.unidad.value.trim(),
     fechaIngreso: form.fechaIngreso.value,
     precio: parseFloat(form.precio.value),
     moneda: form.moneda.value,
    categoria: form.categoria.value.trim(),
    };
     
    if (nuevoItem.precio < 0 || nuevoItem.cantidad < 0) {
    toast.error('Cantidad y precio deben ser mayores o iguales a cero');
    return;
  }
    const validacion = Object.values(nuevoItem).every(val => val !== '' && val !== null && val !== undefined);
    if (!validacion) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (itemEditando) {
      nuevoItem.id = itemEditando.id;
      await editarInventario(nuevoItem);
      toast.success("Artículo editado correctamente.");
    } else {
      await crearInventario(nuevoItem);
      toast.success("Artículo agregado correctamente.");
    }

    const data = await obtenerInventario();
    setInventario(data);

    setItemEditando(null);
    setShowModal(false);
    form.reset();
  };

  const editar = (item) => {
    setItemEditando(item);
    setShowModal(true);
  };

   const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás deshacer esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e2504c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      await eliminarInventario(id);
      const data = await obtenerInventario();
      setInventario(data);
      Swal.fire(
        '¡Eliminado!',
        'El artículo fue eliminado correctamente.',
        'success'
      );
    }
  };

  const cancelForm = () => {
    setItemEditando(null);
    setShowModal(false);
  };

  const filtrados = inventario.filter((i) =>
    [i.nombre, i.descripcion, i.unidad, i.categoria]
      .join(' ')
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <div>
      {user ? <div className="p-4">
        <div className="p-6 w-full mx-auto bg-white min-h-screen">
          <ToastContainer />
          <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>

          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Buscar en el inventario..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-64"
            />
            <button
              onClick={() => {
                setItemEditando(null);
                setShowModal(true);
              }}
              className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
            >
              Agregar Artículo
            </button>
          </div>

          <InventarioList inventario={filtrados} onEditar={editar} onEliminar={eliminar} />

          {showModal && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 overflow-auto">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg max-h-screen overflow-y-auto mx-4 my-8">
                <h2 className="text-xl font-semibold mb-4">
                  {itemEditando ? 'Editar Artículo' : 'Agregar Artículo'}
                </h2>
                <form onSubmit={guardar} className="space-y-4">
                  <div>
                    <label className="block font-medium">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      defaultValue={itemEditando?.nombre || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Descripción</label>
                    <input
                      type="text"
                      name="descripcion"
                      defaultValue={itemEditando?.descripcion || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Cantidad</label>
                    <input
                      type="number"
                      name="cantidad"
                      defaultValue={itemEditando?.cantidad || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Unidad</label>
                    <input
                      type="text"
                      name="unidad"
                      defaultValue={itemEditando?.unidad || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Fecha de Ingreso</label>
                    <input
                      type="date"
                      name="fechaIngreso"
                      defaultValue={itemEditando?.fechaIngreso?.slice(0, 10) || ''}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                 <div>
                 <label className="block font-medium">Precio</label>
                 <div className="flex gap-2">
                  <input
                    type="number"
                    name="precio"
                    defaultValue={itemEditando?.precio || ''}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                   min="0"
                   step="0.01"
                 />
                  <select
                  name="moneda"
                 defaultValue={itemEditando?.moneda || '₡'}
                 className="border border-gray-300 px-2 py-2 rounded"
                 >
                 <option value="₡">₡</option>
                  <option value="$">$</option>
                 <option value="€">€</option>
                 </select>
                 </div>
                  </div>

                  <div>
                    <label className="block font-medium">Categoría</label>
                    <input
                      type="text"
                      name="categoria"
                      defaultValue={itemEditando?.categoria || ''}
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

export default InventarioPage;
