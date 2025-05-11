
import AddTareaForm from "./AddTareaForm";
import AddGenericModal from "./AddGenericModal";
import { useState } from "react";


const AddTareaButton = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);

    return (
        <>
            {/* Button row */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white 
                            bg-blue-600 rounded-lg hover:bg-blue-700 
                            focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Agregar Tareas
                </button>
            </div>

            {/* Modal */}
            <AddGenericModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Agregar nueva Tarea"
            >
                <AddTareaForm />
            </AddGenericModal>
            
        </>
    )
}

export default AddTareaButton;