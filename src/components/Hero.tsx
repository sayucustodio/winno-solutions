import heroIllustration from '@/assets/hero_conection.svg';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-highlight/20 animate-gradient-shift"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Innova. Crece. Gana</span>
              <br />
              con tecnología.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Transformamos tu idea en sistemas digitales modernos: desde plataformas de gestión para tu negocio hasta landing pages con pagos, marketplaces y apps móviles a medida.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-hero animate-pulse-glow" onClick={() => {
    document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
  }}>
                ¡Quiero mi solución ahora!
              </button>
              <button className="btn-outline" onClick={() => {
    document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
  }}>
                Ver servicios
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="animate-float">
              <img
                src={heroIllustration}
                alt="Profesionales usando tecnología moderna"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-accent to-highlight rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;