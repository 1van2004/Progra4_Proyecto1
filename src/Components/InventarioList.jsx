import React from 'react';

function InventarioList({ inventario, onEditar, onEliminar }) {
  if (!inventario || inventario.length === 0) {
    return <p className="text-gray-500">No hay productos en el inventario.</p>;
  }

  return (
    <div className="overflow-x-auto shadow border rounded mt-4">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-gray-100 text-left font-semibold text-gray-700">
            <th className="py-2 px-4">ID </th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Cantidad</th>
            <th className="py-2 px-4">Unidad</th>
            <th className="py-2 px-4">Fecha Ingreso</th>
            <th className="py-2 px-4">Precio</th>
            <th className="py-2 px-4">Categoría</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
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
                  onClick={() => onEliminar(item.id)}
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


