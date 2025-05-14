import { Link } from "@tanstack/react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  // Configuración del carrusel (igual que antes)
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2700,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section con nuevos colores */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/water-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/80 to-[#3498db]/50" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Sistema WATER-SF
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Gestión integral del agua potable para ASADA San Fernando
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/facturacion"
              className="bg-white text-[#2c3e50] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 hover:scale-105 shadow-lg"
            >
              Módulo de Facturación
            </Link>
            <Link
              to="/calidad-agua"
              className="bg-[#3498db] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2980b9] transition duration-300 hover:scale-105 shadow-lg"
            >
              Calidad del Agua
            </Link>
          </div>
        </div>
      </section>

      {/* Módulos del Sistema */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#2c3e50]">Nuestros Servicios</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-[#3498db]">
            <div className="bg-[#ecf0f1] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#3498db]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2c3e50]"> Consulta de Facturación </h3>
            <p className="text-gray-600">El pepe</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-[#2ecc71]">
            <div className="bg-[#ecf0f1] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2c3e50]">Calidad del Agua</h3>
            <p className="text-gray-600">Acceda a los últimos análisis y reportes de calidad del agua en su comunidad.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-[#e74c3c]">
            <div className="bg-[#ecf0f1] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-[#e74c3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2c3e50]">Atención al Cliente</h3>
            <p className="text-gray-600">Reporte problemas, solicite servicios o realice consultas a nuestro equipo.</p>
          </div>
        </div>
      </section>

      {/* Carrusel */}
      <section className="bg-[#ecf0f1] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2c3e50]">Nuestra Comunidad en Imágenes</h2>
          
          <Slider {...carouselSettings}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="px-2">
                <div className="relative overflow-hidden rounded-xl shadow-xl h-64 group">
                  <img 
                    src={`/images/carousel${item}.jpg`} 
                    alt={`Imagen ${item}`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50]/80 to-transparent flex items-end p-6">
                    <p className="text-white font-bold text-lg">Título de la imagen {item}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Footer */}
     <footer className="bg-[#2c3e50] text-white mt-12">
  <div className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-white px-6 py-4 shadow-md">
    <div>
      <h4 className="text-xl font-semibold mb-4">ASADA San Fernando</h4>
      <p className="text-black">Gestión del recurso hídrico para la comunidad con eficiencia y compromiso.</p>
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-4">Contacto</h4>
      <p className="text-black">Tel: <a href="tel:+50622223333" className="text-[#3498db] hover:underline">+506 2222 3333</a></p>
      <p className="text-black">Email: <a href="mailto:info@asadasf.org" className="text-[#3498db] hover:underline">info@asadasf.org</a></p>
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-4">Horario</h4>
      <p className="text-black">Lunes a Viernes: 8:00am - 4:00pm</p>
      <p className="text-black">Sábados y Domingos: Cerrado</p>
    </div>
  </div>
  <div className="bg-[#34495e] text-center py-4 text-sm text-black">
    © 2025 ASADA San Fernando. Todos los derechos reservados.
  </div>
</footer>
    </div>
  );
};

export default HomePage;