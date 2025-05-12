import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTareas } from "../Services/TareasServices";
import { deleteTarea } from "../Services/TareasServices";
import AddGenericModal from "./AddGenericModal"
import EditTareaForm from "./EditTareaForm"

const TareasList = () => {
const { data, isLoading, isError, error } = useTareas();
const tareas = useMemo(() => data ?? [], [data]); 

 const [showEditModal, setShowEditModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const handleEditar = (tarea) => {
    setTareaSeleccionada(tarea);
    setShowEditModal(true);
  };

const handleDelete = async (tarea) => {
  const confirm = window.confirm(`¿Seguro que quieres borrar la tarea "${tarea.description}"?`);
  if (!confirm) return;

  try {
    await deleteTarea(tarea.id);
    alert("Tarea eliminada correctamente.");
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    alert("Ocurrió un error al borrar la tarea.");
  }
};





    
    const columns = useMemo(
        () => [
            { header: 'Descripcion', accessorKey: 'description' },
            { header: 'Fecha de inicio', accessorKey: 'startdate' },
            { header: 'Fecha de fin', accessorKey: 'enddate' },
            { header: 'Persona a cargo', accessorKey: 'perincharge' },
            { header: 'Nivel de Prioridad', accessorKey: 'Priority' },
            {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:underline mr-2"
            onClick={() => handleEditar(row.original)}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={() => handleDelete(row.original)}
          >
            Borrar
          </button>
        </div>
      )
    }
  ],
  []
);
        

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Loading and error states 
if (isLoading) { 
    return <div className="p-4">Cargando tareas...</div>; 
    } 
    if (isError) { 
    return <div className="p-4 text-red-500">Error: {error.message}</div>; 
    } 
    


return(
<div className="p-4 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-4">Tareas</h1>
    <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: '#00D09E' }}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Modal para editar */}
      <AddGenericModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Tarea"
      >
        {tareaSeleccionada && (
          <EditTareaForm
            tarea={tareaSeleccionada}
            onSuccess={() => setShowEditModal(false)}
          />
        )}
      </AddGenericModal>
    </div>
  );
};


export default TareasList