import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Tito Minaya",
      business: "Centro Odontológico Pacífico",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: "Con WINNO Solutions optimizamos nuestros procesos manuales. Ahora controlamos a los pacientes, médicos, tratamientos y ventas en tiempo real y ahorramos tiempo y trabajo",
      rating: 5
    },
    {
      name: "Yesenia Blas",
      business: "Salón de Belleza Innova Estetik",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c13a?w=150&h=150&fit=crop&crop=face",
      testimonial: "La plataforma de reservas online cambió nuestro negocio. Los clientes pueden agendar citas 24/7 y nosotros organizamos mejor nuestro tiempo.",
      rating: 5
    },
    {
      name: "Enma ",
      business: "Bodega La Esquinita",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial: "Su app móvil nos permitió crear un 'Uber para mecánicos'. Ahora conectamos con clientes que necesitan servicio a domicilio.",
      rating: 5
    }
  ];

  return (
    <section id="testimonios" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Casos de Éxito
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a otros negocios a crecer con nuestras soluciones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-service text-center">
              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>

              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;