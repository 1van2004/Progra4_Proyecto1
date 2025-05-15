import React, { useEffect, useState } from "react";
import UserForm from "../Components/UserForm";
import { fetchUsers, saveUsers } from "../Services/UsersService";
import { useQueryClient } from "@tanstack/react-query";

const EditUsersPage = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await fetchUsers();
      const usuario = data.find((u) => u.id === userId);
      if (usuario) {
        setFormData(usuario);
      }
    };
    cargarDatos();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nis", "numeroMedidor", "nombre", "apellido", "cedula",
      "telefono", "direccion", "correo", "zona", "copiaPlano"
    ];

    const emptyField = requiredFields.find((field) => !formData[field]);
    if (emptyField) {
      setAlertMessage("Por favor complete todos los campos obligatorios.");
      setShowAlert(true);
      return;
    }

    const usuariosActuales = queryClient.getQueryData(["users"]) || [];

    const isDuplicate = (campo, valor) =>
      usuariosActuales.some((u) => u.id !== userId && u[campo]?.toString().toLowerCase() === valor?.toString().toLowerCase());

    const duplicados = [];
    if (isDuplicate("nis", formData.nis)) duplicados.push("- NIS repetido");
    if (isDuplicate("numeroMedidor", formData.numeroMedidor)) duplicados.push("- Número de Medidor repetido");
    if (isDuplicate("cedula", formData.cedula)) duplicados.push("- Cédula repetida");
    if (isDuplicate("telefono", formData.telefono)) duplicados.push("- Teléfono repetido");
    if (isDuplicate("correo", formData.correo)) duplicados.push("- Correo repetido");

    if (duplicados.length > 0) {
      setAlertMessage(`Ya existe un usuario con:\n${duplicados.join("\n")}`);
      setShowAlert(true);
      return;
    }

    const nuevosUsuarios = usuariosActuales.map((u) =>
      u.id === userId ? formData : u
    );

    queryClient.setQueryData(["users"], nuevosUsuarios);
    await saveUsers(nuevosUsuarios);
    queryClient.invalidateQueries(["users"]);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const closeAlert = () => setShowAlert(false);

  if (!formData) return <p className="text-center">Cargando datos del usuario...</p>;

  return (
    <div>
      
      {showAlert && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-semibold text-red-600">¡Error!</h3>
            <p className="text-gray-700 mt-4 whitespace-pre-line">{alertMessage}</p>
            <div className="mt-4 text-center">
              <button
                onClick={closeAlert}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl text-center">
            <h3 className="text-green-600 text-lg font-semibold mb-2">✅ Usuario actualizado con éxito</h3>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-6">
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          modo="Editar"
        />
      </div>
    </div>
  );
};

export default EditUsersPage;
