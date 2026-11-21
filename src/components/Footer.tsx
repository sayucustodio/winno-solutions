import type { ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import logo from "@/assets/winno-logo.svg";
import { SITE } from "@/lib/site";
import { useLang } from "@/i18n/LanguageContext";
import { NAV_LINKS } from "@/i18n/translations";

// Bandera de Perú: dos franjas rojas y una blanca al centro (proporción 3:2)
const PeruFlag = () => (
  <svg
    width="21"
    height="14"
    viewBox="0 0 3 2"
    aria-hidden
    className="shrink-0"
  >
    <rect width="3" height="2" fill="#D91023" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
  </svg>
);

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]";

// Íconos de redes con trazo de 2 px (mismo estilo que Lucide). Propios del proyecto,
// así no dependen de la versión de lucide-react (las nuevas eliminaron los íconos de marca).
const SOCIALS: {
  key: keyof typeof SITE.social;
  label: string;
  icon: ReactNode;
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    key: "x",
    label: "X",
    icon: (
      <>
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </>
    ),
  },
];

const Footer = () => {
  const { t } = useLang();
  const socials = SOCIALS.filter((s) => SITE.social[s.key]);

  return (
    <footer className="relative overflow-hidden bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Marca + redes */}
          <div className="lg:col-span-6">
            <a
              href="#inicio"
              className={`inline-flex items-center gap-3 ${focusRing}`}
            >
              <img src={logo} alt="" className="h-12 w-auto" />
            </a>

            {/* <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-snug tracking-tight text-white/90">
              {t.footer.slogan}
            </p> */}

            {socials.length > 0 && (
              <div className="mt-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  {t.footer.follow}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {socials.map(({ key, label, icon }) => (
                    <li key={key}>
                      <a
                        href={SITE.social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-[#00E1F7] hover:bg-[#00E1F7] hover:text-[#0B1020] motion-reduce:transition-none ${focusRing}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          {icon}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
    <p>© {new Date().getFullYear()} WINNO Solutions. {t.footer.rights}</p>
    <p className="inline-flex items-center gap-2">
      <PeruFlag />
      {t.footer.madeIn}
    </p>
  </div>
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
