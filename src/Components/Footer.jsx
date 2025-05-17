const Footer = () => (
  <footer className="bg-[#2c3e50] text-white mt-12">
    <div className="bg-gradient-to-r from-teal-900 to-teal-600 text-white">
      <div className="container mx-auto max-w-7xl px-8 py-5 grid grid-cols-1 md:grid-cols-3 gap-60">
        <div>
          <h4 className="text-emerald-200 text-lg font-semibold mb-2">ASADA San Fernando</h4>
          <p className="leading-relaxed">
            Gestión del recurso hídrico para la comunidad con eficiencia y compromiso.
          </p>
        </div>
        <div>
          <h4 className="text-emerald-200 text-lg font-semibold mb-2">Contacto</h4>
          <p>Tel: <a href="tel:+50622223333" className="text-[#3498db] hover:underline">+506 2222 3333</a></p>
          <p>Email: <a href="mailto:info@asadasf.org" className="text-[#3498db] hover:underline">info@asadasf.org</a></p>
        </div>
        <div>
          <h4 className="text-emerald-200 text-lg font-semibold mb-2">Horario</h4>
          <p>Lunes a Viernes: 8:00am - 4:00pm</p>
          <p>Sábados y Domingos: Cerrado</p>
        </div>
      </div>
    </div>

  
    <div className="text-cyan-200 font-semibold text-center py-4">
      © 2025 ASADA San Fernando. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;
