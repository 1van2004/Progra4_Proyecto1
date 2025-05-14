import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useAddReporte } from '../Services/ReportService';
import { v4 as uuidv4 } from 'uuid';
import { LoadingModal } from '../Components/ui/Modals/LoadingModal';
import { SuccessModal } from '../Components/ui/Modals/SuccessModal';
import { ConfirmModal } from '../Components/ui/Modals/ConfirmModal';

const tipos = [
  'Fuga en calle',
  'Fuga en acera',
  'Fuga en hidrante',
  'Fuga en medidor',
  'Tubería rota expuesta',
  'Agua acumulada sin fuente visible (sospecha)',
  'Olor/sabor extraño en el agua',
  'Baja presión en la zona',
  'Otro',
];

export default function ReporteFormPage() {
  const addReporte = useAddReporte();

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const form = useForm({
    defaultValues: {
      nombre: '',
      direccion: '',
      tipo: '',
      descripcion: '',
      ubicacion: '',
    },
    onSubmit: async ({ value }) => {
      const nuevo = {
        id: uuidv4(),
        ...value,
        fechaHora: new Date().toISOString(),
      };

      setShowLoading(true);
      try {
        await addReporte.mutateAsync(nuevo);
        setSuccessMsg('✅ Reporte enviado exitosamente');
        setShowSuccess(true);
        form.reset();
      } catch (err) {
        console.error('❌ Error al enviar:', err);
        alert('Error al enviar el reporte');
      } finally {
        setShowLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow border border-teal-200">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-700">
          Reportes de Averías
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="nombre">
            {(field) => (
              <input
                type="text"
                placeholder="Nombre"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            )}
          </form.Field>

          <form.Field name="direccion">
            {(field) => (
              <textarea
                placeholder="Dirección de la avería"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            )}
          </form.Field>

          <form.Field name="tipo">
            {(field) => (
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Seleccione un tipo de avería</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            )}
          </form.Field>

          <form.Field name="descripcion">
            {(field) => (
              <textarea
                placeholder="Descripción detallada de avería"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            )}
          </form.Field>

          <form.Field name="ubicacion">
            {(field) => (
              <input
                placeholder="Ubicación referencial"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Enviar reporte
          </button>
        </form>
      </div>

      {showLoading && <LoadingModal />}
      {showSuccess && (
        <SuccessModal message={successMsg} onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
