import { Calendar, ArrowRight, User } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      title: "Cómo digitalizar tu negocio en 5 pasos",
      excerpt: "Descubre el proceso completo para llevar tu negocio tradicional al mundo digital y aumentar tus ventas.",
      date: "15 Ene 2025",
      author: "WINNO Team",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      title: "Ventajas de tener un sistema en la nube",
      excerpt: "Conoce por qué migrar a la nube es fundamental para la continuidad y crecimiento de tu empresa.",
      date: "12 Ene 2025", 
      author: "WINNO Team",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"
    },
    {
      title: "Tendencias tecnológicas para PYMEs 2025",
      excerpt: "Las principales tendencias tech que transformarán las pequeñas y medianas empresas este año.",
      date: "10 Ene 2025",
      author: "WINNO Team", 
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Blog & Recursos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mantente al día con las últimas tendencias y consejos para hacer crecer tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="card-service group cursor-pointer">
              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Leer más</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;