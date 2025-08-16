import "./style.css";

export default function Map() {
  return (
    <div className="map-card">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.109194791949!2d13.3985436!3d-9.087145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a5205d78b5aeda1%3A0x1b42d18386b283dd!2sProjeto%20habitacional%20Osvaldo%20MJ!5e0!3m2!1spt-PT!2sao!4v1723801234567!5m2!1spt-PT!2sao"
        width="100%"
        height="100%"
        style={{ border: "0", borderRadius: "20px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa do Condomínio Osvaldo MJ"
      ></iframe>
    </div>
  );
}
