import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/winno-logo.svg';
import { useLang } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';
import { MARK_PATH, DOT_PATH, MARK_VIEWBOX, DOT_CENTER } from '@/lib/winnoMark';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]';

const NotFound = () => {
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#0B1020] text-white">
      <style>{`
        @keyframes winno-lost {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(58px, -34px); }
          50%  { transform: translate(20px, -80px); }
          75%  { transform: translate(-48px, -46px); }
          100% { transform: translate(0px, 0px); }
        }
        .winno-lost {
          animation: winno-lost 12s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .winno-lost { animation: none; transform: translate(48px, -48px); }
        }
      `}</style>

      {/* Barra superior */}
      <header className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className={`flex items-center ${focusRing}`} aria-label={t.nav.home}>
          <img src={logo} alt="WINNO Solutions" className="h-10 w-auto" />
        </Link>
        <LanguageSwitcher />
      </header>

      {/* Contenido */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7]">
              <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
              {t.notFound.eyebrow}
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight [text-wrap:balance] sm:text-6xl lg:text-7xl">
              {t.notFound.title}
            </h1>
            <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-white/70 sm:text-lg">
              {t.notFound.text}
            </p>
            <Link
              to="/"
              className={`mt-10 inline-flex items-center justify-center rounded-none bg-[#3267FD] px-7 py-4 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#00E1F7] hover:text-[#0B1020] ${focusRing}`}
            >
              {t.notFound.cta}
            </Link>
          </div>

          {/* La W y su bolita perdida */}
          <div className="order-first flex justify-center lg:order-none lg:col-span-5">
            <svg
              viewBox={MARK_VIEWBOX}
              aria-hidden
              className="h-auto w-40 overflow-visible sm:w-56 lg:w-[min(30vw,340px)]"
            >
              <path d={MARK_PATH} fill="#FFFFFF" fillRule="evenodd" />
              {/* Hueco que dejó la bolita */}
              <circle
                cx={DOT_CENTER.x}
                cy={DOT_CENTER.y}
                r={DOT_CENTER.r}
                fill="none"
                stroke="#00E1F7"
                strokeOpacity="0.45"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              {/* La bolita, a la deriva */}
              <path d={DOT_PATH} fill="#00E1F7" fillRule="evenodd" className="winno-lost" />
            </svg>
          </div>
        </div>
      </main>

      {/* Número gigante de fondo */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 -mb-[0.1em] select-none whitespace-nowrap text-center font-display text-[34vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.05]"
      >
        404
      </p>
    </div>
  );
};

export default NotFound;