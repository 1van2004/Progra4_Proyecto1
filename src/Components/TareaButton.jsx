import AddTareaForm from "./AddTareaForm";
import AddGenericModal from "./AddGenericModal";
import { useState, useMemo } from "react";

const TareaButton = ({ tareas, onFiltrarResponsable }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const responsables = useMemo(() => {
  if (!tareas) return [];
  const nombres = tareas.map(t => t.perincharge);
  return [...new Set(nombres)];
}, [tareas]);


  return (
    <div className="flex justify-between items-center mb-4">
      {/* Dropdown para filtro */}
      <select
        onChange={(e) => onFiltrarResponsable(e.target.value)}
        className="px-3 py-2 border rounded"
      >
        <option value="">Todos</option>
        {responsables.map((nombre) => (
          <option key={nombre} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>

      {/* Botón para agregar */}
      <button
        onClick={() => setShowAddModal(true)}
        className="px-5 py-2.5 text-sm font-medium text-white 
                   bg-blue-600 rounded-lg hover:bg-blue-700 
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Agregar Tareas
      </button>

      {/* Modal */}
      <AddGenericModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Agregar nueva Tarea"
      >
        <AddTareaForm />
      </AddGenericModal>
    </div>
  );
};

export default TareaButton;