import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/post instagram_winno solutions (1).png';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Testimonios', href: '#testimonios' },
    // { name: 'Planes', href: '#planes' },
    // { name: 'Blog', href: '#blog' },
    // { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 header-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center"> */}
              {/* <span className="text-white font-bold text-xl">W</span> */}
              <img
                src={logo}
                className="w-40 h-18"
                alt="Profesionales usando tecnología moderna"
                
              />
            {/* </div> */}
            {/* <span className="text-xl font-bold gradient-text">WINNO SOLUTIONS</span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-hero" onClick={() => {
    document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
  }}>
              Cotiza ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="btn-hero mt-4">
                Cotiza ahora
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;