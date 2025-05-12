import React from 'react';

function ProveedorList({ proveedores, onEditar, onEliminar }) {
  if (!proveedores || proveedores.length === 0) {
    return <p className="text-gray-500">No hay proveedores registrados.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead style={{ backgroundColor: '#00D09E' }}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Nombre de la Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Nombre del Representante</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Cédula del Representante</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Correo de la Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Teléfono de la Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Descripción de Productos</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Número de Cuenta</th>
            <th className="px-6 py-3 text-left text-xs font-large text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {proveedores.map((prov) => (
            <tr key={prov.id}>
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
