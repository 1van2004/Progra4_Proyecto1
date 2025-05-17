import React from 'react';

function InventarioList({ inventario, onEditar, onEliminar }) {
  if (!inventario || inventario.length === 0) {
    return <p className="text-gray-500">No hay productos en el inventario.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead style={{ backgroundColor: '#00D09E' }}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">ID </th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Unidad</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Fecha Ingreso</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventario.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.nombre}</td>
              <td className="py-2 px-4">{item.descripcion}</td>
              <td className="py-2 px-4">{item.cantidad}</td>
              <td className="py-2 px-4">{item.unidad}</td>
              <td className="py-2 px-4">{item.fechaIngreso}</td>
              <td className="py-2 px-4">${item.precio}</td>
              <td className="py-2 px-4">{item.categoria}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEditar(item)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(item)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventarioList;


