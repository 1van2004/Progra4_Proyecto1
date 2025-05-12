import { useForm } from '@tanstack/react-form'
import { useAddTareas } from '../Services/TareasServices'


const AddTareaForm = () => {

  // 1) grab your mutation
  const {
    mutate: addTarea,
    isLoading: 
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddTareas()

     // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      startdate: '',
      enddate: '',
      perincharge: '',
      description: '',
      Priority: '',
    },
    
 onSubmit: async ({ value }) => {
  const nuevaTarea = {
    ...value,
    id: crypto.randomUUID(),
  }

  addTarea({ nuevaTarea })
  form.reset()

}

      
  })

    return (
        <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >


{/* ─── description Field ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-gray-700 font-medium">
            ¿Cual es la tarea?:
          </label>
          <form.Field name="description">
            {field => (
              <input
                id="description"
                name="description"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>

      
        {/* ─── startDate Field ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="startdate" className="mb-1 text-gray-700 font-medium">
            Fecha de inicio:
          </label>
          <form.Field name="startdate">
            {field => (
              <input
                id="startdate"
                name="startdate"
                type="date"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>
      
        {/* ─── enddate Field ────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="enddate" className="mb-1 text-gray-700 font-medium">
            Fecha final:
          </label>
          <form.Field name="enddate">
            {field => (
              <input
                id="enddate"
                name="enddate"
                type="date"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>
      
        {/* ─── Person in charge Field ─────────────────────── */}
        <div className="flex flex-col">
          <label htmlFor="perincharge" className="mb-1 text-gray-700 font-medium">
            Persona a cargo:
          </label>
          <form.Field name="perincharge">
            {field => (
              <input
                id="perincharge"
                name="perincharge"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </form.Field>
        </div>

        
      {/* ─── Priority Field ─────────────────────── */}
<div className="flex flex-col">
  <label htmlFor="Priority" className="mb-1 text-gray-700 font-medium">
    Nivel de prioridad:
  </label>
  <form.Field name="Priority">
    {field => (
      <select
        id="Priority"
        name="Priority"
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona una prioridad</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
    )}
  </form.Field>
</div>

        {/* ─── Buttons ────────────────────────── */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!form.state.canSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Limpiar
          </button>
        </div>
      </form>      
    )
}

export default AddTareaForm;