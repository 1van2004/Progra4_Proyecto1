import React, { useState, useContext } from "react";
import { useNavigate } from "@tanstack/react-router";
import UserForm from "../Components/UserForm";
import { useUsers, addUser } from "../Services/UsersService";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../Context/AuthContext.jsx";
import Login from "../Components/Login";

const AddUsersPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: users = [] } = useUsers();

  const [formData, setFormData] = useState({
    nis: "",
    numeroMedidor: "",
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    direccion: "",
    correo: "",
    zona: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let filteredValue = value;

    if (name === "nis") {
      filteredValue = value.replace(/\D/g, "");
    } else if (name === "numeroMedidor") {
      filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nis", "numeroMedidor", "nombre", "apellido",
      "cedula", "telefono", "direccion", "correo"
    ];

    const emptyField = requiredFields.find(
      (field) => !formData[field] || formData[field].toString().trim() === ""
    );

    if (emptyField) {
      setAlertMessage("Por favor complete todos los campos obligatorios.");
      setShowAlert(true);
      return;
    }

    const usersArray = Array.isArray(users) ? users : [];

    const isNisDuplicate = usersArray.some((user) => user.nis === formData.nis);
    const isMedidorDuplicate = usersArray.some((user) => user.numeroMedidor === formData.numeroMedidor);
    const isCedulaDuplicate = usersArray.some((user) => user.cedula === formData.cedula);
    const isTelefonoDuplicate = usersArray.some((user) => user.telefono === formData.telefono);
    const isCorreoDuplicate = usersArray.some((user) => user.correo.toLowerCase() === formData.correo.toLowerCase());

    if (isNisDuplicate || isMedidorDuplicate || isCedulaDuplicate || isTelefonoDuplicate || isCorreoDuplicate) {
      let mensaje = "Ya existe un usuario con:";
      if (isNisDuplicate) mensaje += "\n- NIS repetido";
      if (isMedidorDuplicate) mensaje += "\n- Número de Medidor repetido";
      if (isCedulaDuplicate) mensaje += "\n- Cédula repetida";
      if (isTelefonoDuplicate) mensaje += "\n- Teléfono repetido";
      if (isCorreoDuplicate) mensaje += "\n- Correo repetido";
      setAlertMessage(mensaje);
      setShowAlert(true);
      return;
    }

 try {
  const usuarioGuardado = await addUser(formData); // ← espera el ID generado por la API

  const nuevosUsuarios = [...usersArray, usuarioGuardado];
  queryClient.setQueryData(["users"], nuevosUsuarios);

  setFormData({
    nis: "",
    numeroMedidor: "",
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    direccion: "",
    correo: "",
    zona: "",
  });

  setShowSuccess(true);
  setTimeout(() => {
    setShowSuccess(false);
  }, 1500);

} catch (error) {
  console.error("Error al agregar usuario:", error);
  setAlertMessage("Ocurrió un error al guardar el usuario.");
  setShowAlert(true);
}
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div>
      {user ? (
        <div className="p-4">
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
                <h3 className="text-green-600 text-lg font-semibold mb-2">✅ Usuario guardado con éxito</h3>
              </div>
            </div>
          )}

          <UserForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitText="Guardar Usuario"
          />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AddUsersPage;