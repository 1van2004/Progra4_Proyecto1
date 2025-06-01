import AddTareaForm from "./AddTareaForm";
import AddGenericModal from "./Modals/AddGenericModal";
import { useState, useMemo } from "react";

const TareaButton = ({ tareas, onFiltrarResponsable }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const responsables = useMemo(() => {
  if (!tareas) return [];
  const nombres = tareas.map(t => t.perInCharge);
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
        className="bg-[#009285] text-white px-4 py-2 rounded hover:bg-[#055a55]"
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