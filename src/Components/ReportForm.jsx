import { useState, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { useAddReporte } from "../Services/ReportService";
import { v4 as uuidv4 } from "uuid";
import { LoadingModal } from "./Modals/LoadingModal";
import { SuccessModal } from "./Modals/SuccessModal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const tipos = [
  {
    nombre: "Fuga en calle",
    imagen: "/Imagenes/2.jfif",
    descripcion:
      "Agua brotando en plena calle, posible daño en la red principal.",
  },
  {
    nombre: "Fuga en acera",
    imagen: "/Imagenes/3.jfif",
    descripcion: "Salida de agua constante en la acera, cerca de propiedades.",
  },
  {
    nombre: "Fuga en hidrante",
    imagen: "/Imagenes/Imgen 1.jpg",
    descripcion: "Fuga detectada en uno de los hidrantes de la zona.",
  },
  {
    nombre: "Fuga en medidor",
    imagen: "/Imagenes/medidor.jpeg",
    descripcion: "Goteo o fuga continua desde el medidor del usuario.",
  },
  {
    nombre: "Tubería rota expuesta",
    imagen: "/Imagenes/4.jfif",
    descripcion: "Se observa una tubería dañada visible a simple vista.",
  },
  {
    nombre: "Agua acumulación de agua",
    imagen: "/Imagenes/5.webp",
    descripcion:
      "Charcos o acumulación sin origen claro, posible fuga subterránea.",
  },
  {
    nombre: "Olor/sabor extraño en el agua",
    imagen: "/Imagenes/agua_sucia.jfif",
    descripcion:
      "El agua tiene características inusuales que deben ser investigadas.",
  },
  {
    nombre: "Baja presión en la zona",
    imagen: "/Imagenes/baja precion.jpg",
    descripcion:
      "Reducción notoria en la presión del agua en la vivienda o barrio.",
  },
];

export default function ReporteFormPage() {
  const addReporte = useAddReporte();
  const carruselRef = useRef(null);

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null);

  const form = useForm({
    defaultValues: {
      nombre: "",
      direccion: "",
      tipo: "",
      descripcion: "",
      ubicacion: "",
    },
    onSubmit: async ({ value }) => {
      const nuevo = {
        id: uuidv4(),
        nombre: value.nombre,
        direccion: value.direccion,
        tiporeporte: value.tipo,
        descripcionFuga: value.descripcion,
        ubicacionReferencia: value.ubicacion,
        fechaHora: new Date().toISOString(),
      };

      setShowLoading(true);
      try {
        await addReporte.mutateAsync(nuevo);
        setSuccessMsg("✅ Reporte enviado exitosamente");
        setShowSuccess(true);
        form.reset();
        setMostrarFormulario(false);
        setTipoSeleccionado(null);
        setTarjetaExpandida(null);
      } catch (err) {
        console.error("❌ Error al enviar:", err);
        alert("Error al enviar el reporte");
      } finally {
        setShowLoading(false);
      }
    },
  });

  function abrirFormulario(tipo = null) {
    setMostrarFormulario(true);
    setTipoSeleccionado(tipo);
    form.setFieldValue("tipo", tipo ? tipo.nombre : "");
  }

  function scrollCarrusel(direccion) {
    const contenedor = carruselRef.current;
    const distancia = 300;
    if (contenedor) {
      contenedor.scrollBy({
        left: direccion === "derecha" ? distancia : -distancia,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="space-y-10 p-6">
      {/* Cuadro principal de introducción */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow border border-teal-200 text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent mb-2">
          Realizar reporte
        </h1>
        <p className="text-gray-700">
          En este apartado podrá realizar reportes relacionados con fugas de
          agua y otras anomalías en el sistema. Complete la información con el
          mayor detalle posible para facilitar la atención.
        </p>
      </div>

      {/* Carrusel */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow border border-teal-200 relative">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent text-center mb-4">
          Seleccione el tipo de reporte
        </h2>

        <button
          onClick={() => scrollCarrusel("izquierda")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-teal-900 to-teal-600 text-white border border-green-300 rounded-full p-2 shadow hover:from-teal-800 hover:to-teal-500 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carrusel */}
        <div
          ref={carruselRef}
          className="overflow-x-auto no-scrollbar flex space-x-4 px-10 py-4 scroll-smooth transition-transform duration-300"
        >
          {tipos.map((tipo, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-md border border-green-200 hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => setTarjetaExpandida(tipo)}
            >
              <img
                src={tipo.imagen}
                alt={tipo.nombre}
                className="rounded-t-xl w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent text-center">
                  {tipo.nombre}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCarrusel("derecha")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-teal-900 to-teal-600 text-white border border-green-300 rounded-full p-2 shadow hover:from-teal-800 hover:to-teal-500 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => abrirFormulario()}
          className="px-6 py-3 bg-gradient-to-r from-teal-900 to-teal-600 text-white rounded-lg shadow hover:from-teal-800 hover:to-teal-500 transition"
        >
          Realizar un reporte
        </button>
      </div>

      {/* Tarjeta */}
      {tarjetaExpandida && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative space-y-4">
            <button
              onClick={() => setTarjetaExpandida(null)}
              title="Cerrar"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 border border-gray-300 rounded-full p-1 shadow-md transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={tarjetaExpandida.imagen}
              alt={tarjetaExpandida.nombre}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent text-center">
              {tarjetaExpandida.nombre}
            </h3>
            <p className="text-gray-800 text-center">
              {tarjetaExpandida.descripcion}
            </p>
            <button
              onClick={() => {
                abrirFormulario(tarjetaExpandida);
                setTarjetaExpandida(null);
              }}
              className="w-full bg-gradient-to-r from-teal-900 to-teal-600 text-white py-2 rounded hover:from-teal-800 hover:to-teal-500 transition"
            >
              Realizar este reporte
            </button>
          </div>
        </div>
      )}

      {/* Formulario emergente */}
      {mostrarFormulario && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setMostrarFormulario(false);
                setTipoSeleccionado(null);
              }}
              title="Cerrar"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 border border-gray-300 rounded-full p-1 shadow-md transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {tipoSeleccionado && (
              <div className="mb-4 p-4 border border-green-300 rounded bg-green-50">
                <h3 className="text-lg font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent text-center">
                  {tipoSeleccionado.nombre}
                </h3>
                <p className="mt-2 text-green-900 text-center">
                  {tipoSeleccionado.descripcion}
                </p>
              </div>
            )}

            <h2 className="text-xl font-extrabold bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent mb-4 text-center">
              Formulario de reporte
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <form.Field
                name="nombre"
                validators={{
                  onChange: ({ value }) => {
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
                      return "Solo se permiten letras y espacios";
                    }
                  },
                }}
              >
                {(field) => (
                  <>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded p-2"
                      required
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>

              <form.Field
                name="direccion"
                validators={{
                  onChange: ({ value }) => {
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/.test(value)) {
                      return "Solo se permiten letras, números y espacios";
                    }
                  },
                }}
              >
                {(field) => (
                  <>
                    <textarea
                      placeholder="Dirección de la avería"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded p-2"
                      required
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>

              <form.Field name="tipo">
                {(field) => (
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                    disabled={!!tipoSeleccionado}
                  >
                    {!tipoSeleccionado && (
                      <option value="">Seleccione un tipo de avería</option>
                    )}
                    {tipos.map((t) => (
                      <option key={t.nombre} value={t.nombre}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </form.Field>

              <form.Field
                name="descripcion"
                validators={{
                  onChange: ({ value }) => {
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/.test(value)) {
                      return "Solo se permiten letras, números y espacios";
                    }
                  },
                }}
              >
                {(field) => (
                  <>
                    <textarea
                      placeholder="Descripción detallada de la avería"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded p-2"
                      required
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>

              <form.Field
                name="ubicacion"
                validators={{
                  onChange: ({ value }) => {
                    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/.test(value)) {
                      return "Solo se permiten letras, números y espacios";
                    }
                  },
                }}
              >
                {(field) => (
                  <>
                    <input
                      placeholder="Ubicación referencial"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded p-2"
                      required
                    />
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-900 to-teal-600 text-white py-2 rounded hover:from-teal-800 hover:to-teal-500 transition"
              >
                Enviar reporte
              </button>
            </form>
          </div>
        </div>
      )}

      {showLoading && <LoadingModal />}
      {showSuccess && (
        <SuccessModal
          message={successMsg}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
