import { ArrowUp } from 'lucide-react';
import logo from '@/assets/winno-logo.svg';
import { SITE } from '@/lib/site';
import { useLang } from '@/i18n/LanguageContext';
import { NAV_LINKS } from '@/i18n/translations';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]';

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Marca */}
          <div className="lg:col-span-6">
            <a href="#inicio" className={`inline-flex items-center gap-3 ${focusRing}`}>
              <img src={logo} alt="" className="h-9 w-auto" />
            </a>
            <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-snug tracking-tight text-white/90">
              {t.footer.slogan}
            </p>
          </div>

          {/* Navegación */}
          <nav className="lg:col-span-3" aria-label={t.footer.nav}>
            <ul className="space-y-3 font-sans text-base">
              {NAV_LINKS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className={`text-white/65 transition-colors hover:text-[#00E1F7] ${focusRing}`}
                  >
                    {t.nav.items[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <ul className="space-y-3 font-sans text-base">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className={`text-white/65 transition-colors hover:text-[#00E1F7] ${focusRing}`}
                >
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/65 transition-colors hover:text-[#00E1F7] ${focusRing}`}
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 py-6 font-sans text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WINNO Solutions. {t.footer.rights}</p>
          <a
            href="#inicio"
            className={`inline-flex items-center gap-2 transition-colors hover:text-white ${focusRing}`}
          >
            {t.footer.top}
            <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>

      {/* Marca gigante: firma de cierre */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.12em] select-none whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.05]"
      >
        WINNO
      </p>
    </footer>
  );
};

export default Footer;