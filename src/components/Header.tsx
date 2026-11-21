import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/winno-logo.svg';
import { useLang } from '@/i18n/LanguageContext';
import { NAV_LINKS } from '@/i18n/translations';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';

// TODO: reemplaza por el correo real de WINNO
const CONTACT_EMAIL = 'hola@winnosolutions.com';

const Header = () => {
  const { t } = useLang();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#inicio');
  const progressRef = useRef<HTMLDivElement>(null);

  // Estado del header + barra de progreso (sin re-render por frame)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Sección activa según el scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Menú móvil: bloquear scroll, cerrar con Escape y al pasar a desktop
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const goToContact = () => {
    setIsMenuOpen(false);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled && !isMenuOpen
            ? 'bg-[#0B1020]/80 backdrop-blur-md border-white/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#inicio" className={`flex items-center ${focusRing}`} aria-label={t.nav.home}>
              <img src={logo} alt="WINNO Solutions" className="h-10 w-auto" />
            </a>

            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center gap-9" aria-label={t.nav.main}>
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative flex items-center gap-2 py-2 font-sans text-sm font-medium transition-colors duration-200 ${focusRing} ${
                      isActive ? 'text-white' : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {t.nav.items[item.key]}
                    <span
                      aria-hidden
                      className={`absolute left-0 -bottom-0.5 h-0.5 w-full origin-left bg-[#00E1F7] transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Idioma + CTA desktop */}
            <div className="hidden md:flex items-center gap-5">
              <LanguageSwitcher />
              <button
                onClick={goToContact}
                className={`inline-flex items-center gap-2 rounded-none bg-primary px-5 py-2.5 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#00E1F7] hover:text-[#0B1020] ${focusRing}`}
              >
                {t.nav.cta}
              </button>
            </div>

            {/* Idioma + botón menú móvil */}
            <div className="flex items-center gap-3 md:hidden">
              <LanguageSwitcher />
              <button
                className={`-mr-2 p-2 text-white ${focusRing}`}
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-expanded={isMenuOpen}
                aria-controls="menu-movil"
                aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Progreso de lectura */}
        <div
          ref={progressRef}
          aria-hidden
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-[#00E1F7] will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        aria-hidden={!isMenuOpen}
        className={`md:hidden fixed inset-0 z-40 flex flex-col bg-[#0B1020] px-4 pt-28 pb-8 transition-[clip-path] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none ${
          isMenuOpen ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'
        }`}
      >
        <nav className="flex flex-col" aria-label={t.nav.mobile}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between border-b border-white/10 py-5 font-display text-3xl font-extrabold tracking-tight transition-colors ${focusRing} ${
                active === item.href ? 'text-[#00E1F7]' : 'text-white hover:text-[#00E1F7]'
              }`}
            >
              {t.nav.items[item.key]}
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-5">
          <button
            onClick={goToContact}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`flex w-full items-center justify-center gap-2 rounded-none bg-primary py-4 font-display text-base font-bold text-white hover:bg-[#00E1F7] hover:text-[#0B1020] transition-colors ${focusRing}`}
          >
            {t.nav.cta}
          </button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`block text-center font-sans text-sm text-white/60 hover:text-white ${focusRing}`}
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;