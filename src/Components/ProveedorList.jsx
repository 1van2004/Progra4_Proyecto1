import React from 'react';

function ProveedorList({ proveedores, onEditar, onEliminar }) {
  if (!proveedores || proveedores.length === 0) {
    return <p className="text-gray-500">No hay proveedores registrados.</p>;
  }

  return (
    <div className="overflow-x-auto shadow border rounded mt-4">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-gray-100 text-left font-semibold text-gray-700">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Nombre de la Empresa</th>
            <th className="py-2 px-4">Nombre del Representante</th>
            <th className="py-2 px-4">Cédula del Representante</th>
            <th className="py-2 px-4">Correo de la Empresa</th>
            <th className="py-2 px-4">Teléfono de la Empresa</th>
            <th className="py-2 px-4">Descripción de Productos</th>
            <th className="py-2 px-4">Número de Cuenta</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{prov.id}</td>
              <td className="py-2 px-4">{prov.nombreEmpresa}</td>
              <td className="py-2 px-4">{prov.nombreRepresentante}</td>
              <td className="py-2 px-4">{prov.cedulaRepresentante}</td>
              <td className="py-2 px-4">{prov.correoEmpresa}</td>
              <td className="py-2 px-4">{prov.telefonoEmpresa}</td>
              <td className="py-2 px-4">{prov.descripcionProductos}</td>
              <td className="py-2 px-4">{prov.numeroCuenta}</td>
              <td className="py-2 px-4">
                <button onClick={() => onEditar(prov)} className="text-blue-600 hover:underline mr-2">
                  Editar
                </button>
                <button onClick={() => onEliminar(prov.id)} className="text-red-600 hover:underline">
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

export default ProveedorList;
