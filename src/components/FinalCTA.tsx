const FinalCTA = () => {
  return (
    <section id="cta" className="section-padding bg-gradient-to-r from-primary via-accent to-highlight text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Convierte tu idea en una solución digital lista para crecer
        </h2>
        
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          No esperes más. Da el primer paso hacia la transformación digital de tu negocio y comienza a competir en el mercado actual.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
  href="https://wa.me/51966442710?text=%F0%9F%91%8B%20Hola%2C%20quiero%20cotizar%20mi%20proyecto%20%F0%9F%92%BC%20y%20necesito%20m%C3%A1s%20informaci%C3%B3n%20%F0%9F%93%84.%20%C2%BFPodr%C3%ADan%20ayudarme%3F%20%F0%9F%99%8C"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
>
  <span>¡Hablemos hoy mismo!</span>
</a>


          
          <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
          onClick={() => {
            document.getElementById("portafolio").scrollIntoView({ behavior: "smooth" });
          }}>
            Ver portafolio
          </button>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-80">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Respuesta dentro de las 24 horas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Cotización gratuita</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Soporte especializado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;