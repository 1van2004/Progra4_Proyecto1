import React from "react";
import { FaFileUpload } from "react-icons/fa";

const UserForm = ({ formData, handleChange, handleSubmit, modo = "Agregar" }) => {
  if (!formData) return <div className="p-4">Cargando datos...</div>;

  return (
    <div className="bg-gradient-to-r from-teal-900 to-teal-600 p-1 rounded-xl max-w-3xl mx-auto mt-3 mb-6 p-6 bg-white shadow-xl rounded-xl border border-teal-700">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {modo} Usuario
        </h2>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "NIS", name: "nis" },
            { label: "Número de Medidor", name: "numeroMedidor" },
            { label: "Nombre", name: "nombre" },
            { label: "Apellido", name: "apellido" },
            { label: "Cédula", name: "cedula" },
            { label: "Teléfono", name: "telefono" },
            { label: "Dirección", name: "direccion" },
            { label: "Correo", name: "correo", type: "email" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="text-black-800 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                autoComplete="off"
                className="w-full p-2 mt-1 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>
          ))}

          {/* Zona */}
          <div>
            <label className="text-black-800 font-semibold">Zona</label>
            <input
              type="text"
              name="zona"
              value={formData.zona || ""}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 mt-1 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Copia del Plano */}
          <div>
            <label className="text-green-800 font-semibold mb-1 block">Copia del Plano</label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="copiaPlano"
                className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded cursor-pointer transition h-[42px]"
              >
                📎 Subir
              </label>
              <span className="text-sm text-gray-600 truncate max-w-[150px]">
                {formData.copiaPlano?.name || "Ningún archivo seleccionado"}
              </span>
              <input
                id="copiaPlano"
                type="file"
                name="copiaPlano"
                className="hidden"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Aquí agregamos un div que ocupe todo el ancho para que el botón quede centrado abajo */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
