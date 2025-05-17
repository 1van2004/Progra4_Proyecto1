import React, { useState, useEffect } from "react";
import { updateUser } from "../Services/UsersService"; // asegúrate que esta ruta es correcta

const EditUsersPage = ({ usuario, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;

    try {
      await updateUser(formData); // ← usa tu servicio con JSONBin
      if (onUserUpdated) onUserUpdated(formData); // actualiza lista, etc.
      onClose(); // cerrar modal
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("No se pudo guardar el usuario.");
    }
  };

  if (!formData) return <div className="p-4">Cargando datos...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-gradient-to-r from-teal-900 to-teal-600 p-1 rounded-xl max-w-3xl w-full mx-auto">
        <div className="bg-white p-6 rounded-xl border border-teal-700 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Editar Usuario
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
              { label: "Zona", name: "zona" },
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
                  required={name !== "zona"}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="text-black-800 font-semibold">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion || ""}
                onChange={handleChange}
                autoComplete="off"
                className="w-full p-2 mt-1 border border-teal-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-center gap-4 mt-4">
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-2 rounded shadow transition"
              >
                Guardar
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow transition"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUsersPage;
