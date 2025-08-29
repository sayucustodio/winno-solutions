import { Star } from 'lucide-react';
import test1_img from '../assets/testimonios/test1.png';
import test2_img from '../assets/testimonios/test2.jpg';
import test3_img from '../assets/testimonios/test3.jpg';
const Testimonials = () => {
  const testimonials = [
    {
      name: "Tito Minaya",
      business: "Centro Odontológico Pacífico",
      image: test1_img,
      testimonial: "Con WINNO Solutions optimizamos nuestros procesos manuales. Ahora controlamos a los pacientes, médicos, tratamientos y ventas en tiempo real y ahorramos tiempo y trabajo",
      rating: 5
    },
    {
      name: "Yesenia Blas",
      business: "Salón de Belleza Innova Esthetic",
      image: test2_img,
      testimonial: "Con el sistema de control de ingresos y salidas mejoramos la puntualidad y organización del personal. Ahora tenemos reportes claros y ahorramos tiempo en la gestión.",
      rating: 5
    },
    
    {
      name: "Enma Vásquez",
      business: "Bodega La Esquinita",
      image: test3_img,
      testimonial: "Su app móvil nos permitió organizar nuestro inventario y reducir las horas en el cálculo de las ganancias diarias . Ahora tenemos un resumen detallando de las ventas y los productos que están en stock",
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