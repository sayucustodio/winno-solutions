import { useState, useRef, useEffect } from 'react';
import { Check, Palette, TrendingUp, CreditCard, Smartphone, HeadphonesIcon, ArrowRight, Quote } from 'lucide-react';
import ImgWinnoDent from '../assets/proyectos/winnodental.png'
const Portafolio = () => {
    const [activeCategory, setActiveCategory] = useState('todos');
    const gridRef = useRef(null);

    const categories = [
        { id: 'todos', label: 'Todos' },
        { id: 'sistemas', label: 'Sistemas de Gestión' },
        { id: 'landing', label: 'Landing Pages' },
        { id: 'apps', label: 'Apps Móviles' },
        { id: 'ecommerce', label: 'E-commerce' }
    ];

    const projects = [
        {
            id: 1,
            title: "Sistema de Gestión Empresarial",
            category: "sistemas",
            description: "Plataforma integral para administrar inventario, ventas, clientes y reportes financieros en tiempo real.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: ["Dashboard interactivo", "Múltiples usuarios", "Reportes personalizados", "Soporte 24/7"],
            price: "Desde $1,200",
            whatsappMessage: "Hola, estoy interesado en el Sistema de Gestión Empresarial. Me gustaría agendar una demo para conocer más sobre sus funcionalidades."
          },
          {
            id: 2,
            title: "Landing Page Corporativa",
            category: "landing",
            description: "Diseño moderno y responsive para captar leads y presentar tu empresa de manera profesional.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: ["Diseño responsive", "Optimizada para SEO", "Formulario de contacto", "Integración con redes"],
            price: "Desde $500",
            whatsappMessage: "Hola, estoy interesado en una Landing Page Corporativa. Me gustaría agendar una consultoría para mi proyecto."
          },
          {
            id: 3,
            title: "App Móvil: Gestión Comercial Integral",
            category: "apps",
            description: "Aplicación nativa para iOS y Android para gestión completa de inventario, ventas, clientes y reportes financieros en tiempo real.",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: [
              "Control de inventario con código de barras",
              "Registro de ventas y facturación electrónica", 
              "CRM integrado con historial de clientes",
              "Reportes financieros y dashboards en tiempo real",
              "Sincronización offline y multi-dispositivo"
            ],
            price: "Desde $2,800",
            whatsappMessage: "Hola, estoy interesado en la App Móvil de Gestión Comercial Integral. Me gustaría agendar una demo."
          },
          {
            id: 4,
            title: "Tienda Online E-commerce",
            category: "ecommerce",
            description: "Plataforma de comercio electrónico con pasarelas de pago, gestión de productos y carrito de compras.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: ["Pasarelas de pago", "Panel administrativo", "Gestión de inventario", "Sistema de cupones"],
            price: "Desde $1,800",
            whatsappMessage: "Hola, estoy interesado en una Tienda Online E-commerce. Necesito cotización para mi negocio."
          },
          {
            id: 5,
            title: "Sistema de Gestión para Clínicas Dentales",
            category: "sistemas",
            description: "Software especializado para optimizar la administración de consultorios y clínicas odontológicas.",
            image: ImgWinnoDent,
            features: [
              "Gestión de citas y recordatorios automáticos",
              "Historial clínico digital con odontogramas interactivos",
              "Control de inventario de insumos dentales",
              "Facturación electrónica y reportes financieros",
              "Almacenamiento seguro en la nube"
            ],
            price: "Desde S/.20 mensuales",
            whatsappMessage: "Hola, estoy interesado en el Sistema de Gestión para Clínicas Dentales. Quisiera una demo y información sobre precios."
          },
          {
            id: 6,
            title: "Landing Page para Eventos",
            category: "landing",
            description: "Sitio web especializado para promocionar eventos con registro de asistencia y pasarela de pago.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: ["Registro de asistentes", "Integración con pagos", "Countdown timer", "Formulario personalizado"],
            price: "Desde $700",
            whatsappMessage: "Hola, necesito una Landing Page para Eventos. Me gustaría conocer opciones y precios."
          },
          {
            id: 7,
            title: "App Móvil: Gestión de Citas Médicas",
            category: "apps", 
            description: "Solución especializada para clínicas y consultorios médicos con agenda de citas, historial clínico y seguimiento de pacientes.",
            image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: [
              "Agenda médica con recordatorios automáticos",
              "Historial clínico digital accesible",
              "Seguimiento de tratamientos y evolución",
              "Portal de pacientes con acceso propio",
              "Integración con historias clínicas electrónicas"
            ],
            price: "Desde $2,200",
            whatsappMessage: "Hola, estoy interesado en la App Móvil de Gestión de Citas Médicas. Me gustaría agendar una demo."
          },
          {
            id: 8,
            title: "App Móvil: Gestión Veterinaria", 
            category: "apps",
            description: "Aplicación completa para clínicas veterinarias con control de pacientes peludos, citas, vacunas y tratamientos especializados.",
            image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            features: [
              "Historial médico de mascotas con fotos",
              "Control de vacunación y desparasitación",
              "Agenda de citas y recordatorios para dueños",
              "Gestión de inventario de medicamentos",
              "Reportes de seguimiento y carnets digitales"
            ],
            price: "Desde $2,100",
            whatsappMessage: "Hola, estoy interesado en la App Móvil de Gestión Veterinaria. Quisiera información y una demostración."
          }

    ];

    const filteredProjects = activeCategory === 'todos'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    // Animación de entrada para los proyectos
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const projectElements = document.querySelectorAll('.project-item');
        projectElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [filteredProjects]);

    const scrollGrid = (direction) => {
        if (gridRef.current) {
            const scrollAmount = 300;
            gridRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="portafolio" className="section-padding bg-gradient-to-b from-slate-50 to-blue-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Nuestros Proyectos
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Descubre nuestros sistemas, landing pages y aplicaciones móviles diseñadas para impulsar tu negocio
                    </p>
                </div>

                {/* Filtro de categorías */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Grid de proyectos con scroll horizontal */}
                <div className="relative">
                    <button
                        onClick={() => scrollGrid('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-blue-50 transition-all hidden md:block"
                        aria-label="Anterior"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-6 scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="project-item opacity-0 translate-y-10 transition-all duration-700 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 flex flex-col"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>

                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                            {categories.find(cat => cat.id === project.category)?.label}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">{project.description}</p>

                                    <ul className="mb-5">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-center mb-2">
                                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="px-6 pb-6 mt-auto">
                                    {/* <div className="flex justify-between items-center mb-4">
                                        {/* <span className="text-lg font-bold text-blue-600">{project.price}</span> 
                                        <button className="flex items-center text-blue-600 font-medium group">
                                            Cotizar ahora
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div> */}
                                    {/* <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center">
                                        <Quote className="w-5 h-5 mr-2" />
                                        Solicitar demo
                                    </button> */}
                                    <a
                                        href={`https://wa.me/51966442710?text=${encodeURIComponent(project.whatsappMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center">
                                        <Quote className="w-5 h-5 mr-2" />
                                        <span>Solicitar Demo</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollGrid('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-blue-50 transition-all hidden md:block"
                        aria-label="Siguiente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Indicador de scroll para móviles */}
                <div className="text-center mt-6 md:hidden">
                    <span className="text-sm text-gray-500">Desliza para ver más proyectos</span>
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </section>
    );
};

export default Portafolio;