import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTareas } from "../Services/TareaServices";

const WorkList = () => {
const { data, isLoading, isError, error } = useTareas();
const tareas = useMemo(() => data ?? [], [data]); 

    
    const columns = useMemo(
        () => [
            { header: 'ID', accessorKey: 'id' },
            { header: 'Fecha de inicio', accessorKey: 'startdate' },
            { header: 'Fecha de fin', accessorKey: 'enddate' },
            { header: 'Persona a cargo', accessorKey: 'perincharge' },
            { header: 'Descripcion', accessorKey: 'description' },
            { header: 'Prioridad', accessorKey: 'Priority' },
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
            <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
</div> 


)
}

export default WorkList