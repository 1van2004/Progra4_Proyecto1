import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerInventario, guardarInventario } from '../Services/InventarioServices';
import InventarioList from '../Components/InventarioList';
import logo from '../assets/login.png';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";

function InventoryPage() {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idExistente, setIdExistente] = useState(false);
  const [productoActual, setProductoActual] = useState({
    id: '', nombre: '', descripcion: '', cantidad: '', unidad: '',
    fechaIngreso: '', precio: '', moneda: 'colones', categoria: ''
  });
  const [productoAEliminar, setProductoAEliminar] = useState(null);


  useEffect(() => {
    obtenerInventario().then(setInventory);
  }, []);

  useEffect(() => {
    if (search.trim() === '') setSearchTerm('');
  }, [search]);

  const handleSearch = () => {
    if (search.trim() === '') {
      setSearchTerm('');
      return;
    }
    const resultados = inventory.filter(item =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.categoria.toLowerCase().includes(search.toLowerCase())
    );
    if (resultados.length === 0) toast.warn("No se encontraron productos.");
    setSearchTerm(search);
  };

  const handleGuardar = async () => {
    const { id, nombre, descripcion, cantidad, unidad, fechaIngreso, precio, moneda, categoria } = productoActual;

    if (!id.trim() || !nombre.trim() || !descripcion.trim() || cantidad === '' || isNaN(cantidad) || parseFloat(cantidad) < 0 || precio === '' || isNaN(precio) || parseFloat(precio) < 0 || !unidad || !fechaIngreso || !moneda || !categoria) {
      toast.error("Por favor, complete todos los campos correctamente.");
      return;
    }

    const existe = inventory.find(item => item.id === id);
    let nuevaLista;

    if (existe) {
      nuevaLista = inventory.map(item => item.id === id ? productoActual : item);
      toast.info("Producto actualizado correctamente.");
    } else {
      nuevaLista = [...inventory, productoActual];
      toast.success("Producto agregado correctamente.");
    }

    setInventory(nuevaLista);
    await guardarInventario(nuevaLista);

    setShowModal(false);
    setProductoActual({
      id: '', nombre: '', descripcion: '', cantidad: '', unidad: '',
      fechaIngreso: '', precio: '', moneda: 'colones', categoria: ''
    });
    setIdExistente(false);
  };

  const handleEditar = (item) => {
    setProductoActual(item);
    setIdExistente(false);
    setShowModal(true);
  };

  const confirmarEliminacion = (item) => {
    setProductoAEliminar(item);
  };

  const handleEliminar = async () => {
    if (!productoAEliminar) return;
    const nuevaLista = inventory.filter(item => item.id !== productoAEliminar.id);
    setInventory(nuevaLista);
    await guardarInventario(nuevaLista);
    toast.success("Producto eliminado correctamente.");
    setProductoAEliminar(null);
  };

  const filteredInventory = inventory.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { user } = useContext(AuthContext)

  return (

    <div>
    {user ? <div className="p-4">
      <div className="p-4 md:p-8">
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold">📦 Inventario</h1>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex gap-2 flex-grow">
          <input
            type="text"
            className="border rounded px-3 py-2 w-full max-w-xs shadow-sm"
            placeholder="Buscar producto, ID o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
          >
            Buscar
          </button>
        </div>
        <button
          className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
          onClick={() => {
            setProductoActual({
              id: '', nombre: '', descripcion: '', cantidad: '', unidad: '',
              fechaIngreso: '', precio: '', moneda: 'colones', categoria: ''
            });
            setIdExistente(false);
            setShowModal(true);
          }}
        >
          Agregar producto
        </button>
      </div>

      <InventarioList
        inventario={filteredInventory}
        onEditar={handleEditar}
        onEliminar={confirmarEliminacion}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg max-h-screen overflow-y-auto mx-4 my-8">
            <h2 className="text-xl font-semibold mb-4">
              {productoActual.id && inventory.find(item => item.id === productoActual.id)
                ? 'Editar producto'
                : 'Agregar producto'}
            </h2>

            <div className="mb-3">
              <label className="block font-medium">ID Producto</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.id}
                onChange={(e) => {
                  const idIngresado = e.target.value;
                  const encontrado = inventory.find(item => item.id === idIngresado);
                  if (encontrado) {
                    setProductoActual(encontrado);
                    setIdExistente(false);
                  } else {
                    setProductoActual(prev => ({ ...prev, id: idIngresado }));
                    setIdExistente(false);
                  }
                }}
              />
            </div>

            {[{ label: 'Nombre', key: 'nombre' }, { label: 'Descripción', key: 'descripcion' }].map(({ label, key }) => (
              <div className="mb-3" key={key}>
                <label className="block font-medium">{label}</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded shadow-sm"
                  value={productoActual[key]}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, [key]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block font-medium">Cantidad</label>
              <input
                type="number"
                min="0"
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.cantidad}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, cantidad: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium">Fecha de ingreso</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.fechaIngreso}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, fechaIngreso: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium">Precio</label>
              <input
                type="number"
                min="0"
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.precio}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, precio: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium">Moneda</label>
              <select
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.moneda}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, moneda: e.target.value })
                }
              >
                <option value="colones">Colones (₡)</option>
                <option value="dolares">Dólares ($)</option>
                <option value="euros">Euros (€)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block font-medium">Unidad</label>
              <select
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.unidad}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, unidad: e.target.value })
                }
              >
                <option value="" disabled hidden>Seleccione una unidad</option>
                <option value="metros lineales">Metros lineales</option>
                <option value="litros">Litros</option>
                <option value="milímetros">Milímetros</option>
                <option value="pulgadas">Pulgadas</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block font-medium">Categoría</label>
              <select
                className="w-full border px-3 py-2 rounded shadow-sm"
                value={productoActual.categoria}
                onChange={(e) =>
                  setProductoActual({ ...productoActual, categoria: e.target.value })
                }
              >
                <option value="" disabled hidden>Seleccione una categoría</option>
                <option value="administración">Administración</option>
                <option value="limpieza">Limpieza</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2 rounded-lg"
              >
                {inventory.find(item => item.id === productoActual.id) ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
     
      {productoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm mx-4">
            <h2 className="text-xl font-semibold mb-4">¿Eliminar producto?</h2>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar el producto{' '}
              <strong>{productoAEliminar.nombre}</strong> con ID{' '}
              <strong>{productoAEliminar.id}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setProductoAEliminar(null)}
                className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
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
export default InventoryPage;