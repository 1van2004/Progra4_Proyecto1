import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useAddReporte } from '../Services/ReportService';
import { v4 as uuidv4 } from 'uuid';
import { LoadingModal } from '../Components/ui/Modals/LoadingModal';
import { SuccessModal } from '../Components/ui/Modals/SuccessModal';
import { Dialog } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const tipos = [
  { nombre: 'Fuga en calle', imagen: '/Imagenes/2.jfif', descripcion: 'Agua brotando en plena calle, posible daño en la red principal.' },
  { nombre: 'Fuga en acera', imagen: '/Imagenes/3.jfif', descripcion: 'Salida de agua constante en la acera, cerca de propiedades.' },
  { nombre: 'Fuga en hidrante', imagen: '/Imagenes/Imgen 1.jpg', descripcion: 'Fuga detectada en uno de los hidrantes de la zona.' },
  { nombre: 'Fuga en medidor', imagen: '/Imagenes/medidor.jpeg', descripcion: 'Goteo o fuga continua desde el medidor del usuario.' },
  { nombre: 'Tubería rota expuesta', imagen: '/Imagenes/4.jfif', descripcion: 'Se observa una tubería dañada visible a simple vista.' },
  { nombre: 'Agua acumulación de agua', imagen: '/Imagenes/5.webp', descripcion: 'Charcos o acumulación sin origen claro, posible fuga subterránea.' },
  { nombre: 'Olor/sabor extraño en el agua', imagen: '/Imagenes/agua_sucia.jfif', descripcion: 'El agua tiene características inusuales que deben ser investigadas.' },
  { nombre: 'Baja presión en la zona', imagen: '/Imagenes/baja precion.jpg', descripcion: 'Reducción notoria en la presión del agua en la vivienda o barrio.' },
  { nombre: 'Otro', imagen: '/images/otro.jpg', descripcion: 'Tipo de avería no listada, describir en el formulario.' },
];

export default function ReporteFormPage() {
  const addReporte = useAddReporte();
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

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
        setShowForm(false);
      } catch (err) {
        console.error('❌ Error al enviar:', err);
        alert('Error al enviar el reporte');
      } finally {
        setShowLoading(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-tr from-white via-cyan-50 to-teal-50 min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-4xl font-extrabold text-teal-700 mb-4 drop-shadow-sm">Reportes de Averías</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          En esta sección podrás reportar cualquier tipo de avería relacionada con el sistema de agua potable. Seleccioná el tipo que observaste y completá el formulario para que el equipo técnico lo atienda lo antes posible.
        </p>
      </div>

      {/* CARRUSEL CON CONTENEDOR */}
      <div className="w-full max-w-5xl mb-12 p-6 bg-white rounded-2xl shadow-xl border">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {tipos.map((tipo) => (
            <SwiperSlide key={tipo.nombre}>
              <div className="rounded-2xl border-t-4 border-teal-500 bg-white shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 p-4 h-full flex flex-col justify-between">
                <img src={tipo.imagen} alt={tipo.nombre} className="rounded-xl w-full h-40 object-cover" />
                <div className="text-center mt-4">
                  <p className="text-lg font-bold text-gray-800 mb-1">{tipo.nombre}</p>
                  <p className="text-sm text-black">{tipo.descripcion}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
      >
        Realizar Reporte
      </button>

      <Dialog open={showForm} onClose={() => setShowForm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold mb-6 text-teal-700 text-center">Formulario de Avería</Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              <form.Field name="nombre">
                {(field) => (
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                )}
              </form.Field>

              <form.Field name="direccion">
                {(field) => (
                  <textarea
                    placeholder="Dirección donde ocurre la avería"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                )}
              </form.Field>

              <form.Field name="tipo">
                {(field) => (
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  >
                    <option value="">Seleccione un tipo de avería</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>
                    ))}
                  </select>
                )}
              </form.Field>

              <form.Field name="descripcion">
                {(field) => (
                  <textarea
                    placeholder="Descripción detallada del problema"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                )}
              </form.Field>

              <form.Field name="ubicacion">
                {(field) => (
                  <input
                    placeholder="Referencia de ubicación (ej. frente al súper tal)"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />
                )}
              </form.Field>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2 rounded-lg"
                >
                  Enviar Reporte
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {showLoading && <LoadingModal />}
      {showSuccess && (
        <SuccessModal message={successMsg} onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}
