function Footer() {
  return (
    <footer className="footer">
      <p><strong>Creado por:</strong> Cristian David Betts Sarmiento</p>
      <p>
        <strong>Correos:</strong> 
        <a href="mailto:cdbettss@gmail.com"> cdbettss@gmail.com</a> |
        <a href="mailto:cbettss@unicartagena.edu.co"> cbettss@unicartagena.edu.co</a>
      </p>
      <p>
        <strong>Teléfonos:</strong> 
        <span> Llamadas: 60(5) 645 2218</span> |
        <span> WhatsApp: +57 320 792 0339</span>
      </p>
      <p>© {new Date().getFullYear()} GameTracker — Todos los derechos reservados.</p>
    </footer>
  );
}
export default Footer;
