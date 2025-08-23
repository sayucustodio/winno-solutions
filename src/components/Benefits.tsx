import { Check, Palette, TrendingUp, CreditCard, Smartphone, HeadphonesIcon } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Palette,
      title: "Diseños modernos y 100% personalizados",
      gradient: "from-primary to-secondary"
    },
    {
      icon: TrendingUp,
      title: "Soluciones escalables que crecen contigo",
      gradient: "from-secondary to-accent"
    },
    {
      icon: CreditCard,
      title: "Integración con pasarelas de pago (Culqi, Stripe, Yape/Plin)",
      gradient: "from-accent to-highlight"
    },
    {
      icon: Smartphone,
      title: "Aplicativos móviles listos para producción (Android/iOS)",
      gradient: "from-highlight to-primary"
    },
    {
      icon: HeadphonesIcon,
      title: "Soporte cercano y ágil",
      gradient: "from-primary to-accent"
    }
  ];

  return (
    <section id="beneficios"  className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nos diferenciamos por nuestra pasión por la innovación y nuestro compromiso con tu éxito
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="group">
                <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;