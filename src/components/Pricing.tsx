import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Plan Emprendedor",
      price: "desde S/499",
      description: "Landing page + agendamiento + pagos",
      features: [
        "Diseño moderno y responsive",
        "Sistema de agendamiento online",
        "Integración con pasarela de pagos",
        "Panel de administración",
        "Soporte técnico básico"
      ],
      gradient: "from-primary to-secondary",
      popular: false
    },
    {
      name: "Plan Negocio",
      price: "desde S/799",
      description: "Sistema de gestión completo (ventas + inventario + clientes)",
      features: [
        "Todo del Plan Emprendedor",
        "Gestión de inventario en tiempo real",
        "Sistema de ventas completo",
        "CRM de clientes avanzado",
        "Reportes y analytics",
        "Soporte técnico prioritario"
      ],
      gradient: "from-accent to-highlight",
      popular: true
    },
    {
      name: "Plan Escala",
      price: "cotización a medida",
      description: "Marketplace de servicios o App Móvil personalizada",
      features: [
        "Todo del Plan Negocio",
        "Desarrollo de app móvil nativa",
        "Marketplace completo",
        "Geolocalización de servicios",
        "Notificaciones push",
        "API personalizada",
        "Soporte 24/7"
      ],
      gradient: "from-secondary to-primary",
      popular: false
    }
  ];

  return (
    <section id="planes" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Planes claros y accesibles
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">
                    {plan.name.charAt(0)}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2 gradient-text">{plan.price}</div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg' 
                  : 'bg-muted text-foreground hover:bg-primary hover:text-white'
              }`}>
                <span>Elegir plan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-hero">
            Cotiza tu proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;