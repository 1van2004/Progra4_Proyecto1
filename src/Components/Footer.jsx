// src/Components/Footer.jsx
const Footer = () => (
  <footer className="bg-[#2c3e50] text-white mt-12">
    <div className="bg-gradient-to-r from-teal-900 to-teal-600 text-white px-6 py-4 shadow-md grid md:grid-cols-3 gap-4">
      <div>
        <h4 className="text-emerald-200 font-semibold">ASADA San Fernando</h4>
        <p>Gestión del recurso hídrico para la comunidad con eficiencia y compromiso.</p>
      </div>
      <div>
        <h4 className="text-emerald-200 font-semibold">Contacto</h4>
        <p>Tel: <a href="tel:+50622223333" className="text-[#3498db] hover:underline">+506 2222 3333</a></p>
        <p>Email: <a href="mailto:info@asadasf.org" className="text-[#3498db] hover:underline">info@asadasf.org</a></p>
      </div>
      <div>
        <h4 className="text-emerald-200 font-semibold">Horario</h4>
        <p>Lunes a Viernes: 8:00am - 4:00pm</p>
        <p>Sábados y Domingos: Cerrado</p>
      </div>
    </div>
    <div className="text-cyan-200 font-semibold text-center py-4">
      © 2025 ASADA San Fernando. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;
