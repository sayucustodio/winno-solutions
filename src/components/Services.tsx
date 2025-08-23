import { BarChart3, Globe, Smartphone, ShoppingCart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Sistemas de gestión para PYMEs",
      description: "Optimiza tu negocio con módulos de ventas, inventario, facturación y clientes. Todo en la nube, accesible desde cualquier dispositivo.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: Globe,
      title: "Landing pages",
      description: "Atrae más clientes con páginas profesionales integradas con agendamiento online y pasarela de pagos segura.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: ShoppingCart,
      title: "Marketplaces de servicios locales",
      description: "Conecta proveedores y clientes en una sola app. Perfecto para crear un 'Uber de tu sector': mecánicos, profesores, peluquerías y más.",
      gradient: "from-accent to-highlight"
    },
    {
      icon: Smartphone,
      title: "Aplicativos Móviles (iOS y Android)",
      description: "Transforma tu negocio en una app nativa o híbrida: desde apps de delivery, e-commerce, gestión interna, hasta apps personalizadas con login, notificaciones push y pasarelas de pago.",
      gradient: "from-highlight to-primary"
    }
  ];

  return (
    <section id="servicios" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones digitales modernas diseñadas para impulsar tu negocio hacia el siguiente nivel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="card-service group">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;