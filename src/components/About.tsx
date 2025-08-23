import { Target, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="nosotros" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            ¿Quiénes somos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            WINNO SOLUTIONS es una startup peruana que combina innovación y tecnología para impulsar a emprendedores y empresas con soluciones digitales modernas, accesibles y escalables.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Problem */}
          <div className="card-service text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">La problemática</h3>
            <p className="text-muted-foreground">
              Hoy miles de negocios aún dependen de procesos manuales, lo que limita su crecimiento y competitividad.
            </p>
          </div>

          {/* Who We Are */}
          <div className="card-service text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-accent to-highlight rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quiénes somos</h3>
            <p className="text-muted-foreground">
              Somos una startup peruana enfocada en crear soluciones digitales que impulsen el crecimiento de negocios locales.
            </p>
          </div>

          {/* Motivation */}
          <div className="card-service text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Nuestra motivación</h3>
            <p className="text-muted-foreground">
              Nacemos para cerrar esa brecha digital y ayudar a que los negocios gestionen mejor sus recursos, lleguen a más clientes y generen más ingresos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;