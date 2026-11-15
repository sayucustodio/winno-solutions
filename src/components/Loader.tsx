import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { MARK_PATH, DOT_PATH, MARK_VIEWBOX } from '@/lib/winnoMark';

// true  = el loader se muestra en CADA carga y recarga de la página
// false = solo en la primera carga de cada sesión (al cerrar la pestaña vuelve a salir)
const SHOW_EVERY_TIME = true;
const SESSION_KEY = 'winno-loaded';
const MIN_MS = 1800; // tiempo mínimo para que la animación se aprecie
const MAX_MS = 6000; // tope de seguridad: nunca bloquea la página más de esto
const HOLD_MS = 450; // pausa al llegar a 100 (la bolita "late")
const EXIT_MS = 900; // duración de la salida

const VIEWBOX = MARK_VIEWBOX;
const TOP = 78; // borde superior del isotipo (incluye la bolita)
const BOTTOM = 275; // borde inferior

const shouldSkip = () => {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  if (SHOW_EVERY_TIME) return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

/** Un dígito del contador: columna 0-9 que rueda como un odómetro. */
const Digit = ({ setRef }: { setRef: (el: HTMLSpanElement | null) => void }) => (
  <span className="block h-[1em] overflow-hidden">
    <span
      ref={setRef}
      className="block transition-transform duration-300 ease-out motion-reduce:transition-none"
      style={{ transform: 'translateY(0%)' }}
    >
      {Array.from({ length: 10 }, (_, n) => (
        <span key={n} className="block h-[1em] leading-none">
          {n}
        </span>
      ))}
    </span>
  </span>
);

/**
 * Pantalla de carga: la "W" de WINNO se llena desde abajo como un depósito,
 * con una línea de escaneo cian en el borde del nivel, y un contador de
 * odómetro a gran tamaño. La bolita cian es lo último en encenderse; al
 * llegar a 100 late, y la pantalla se cierra como un iris hacia ella,
 * revelando la página.
 */
const Loader = () => {
  const { t } = useLang();
  const [skip] = useState(shouldSkip);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'leaving' | 'done'>(
    skip ? 'done' : 'loading'
  );
  const [radius] = useState(() =>
    typeof window === 'undefined' ? 2000 : Math.ceil(Math.hypot(window.innerWidth, window.innerHeight))
  );
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const clipRectRef = useRef<SVGRectElement>(null);
  const scanRef = useRef<SVGRectElement>(null);
  const dotRef = useRef<SVGPathElement>(null);
  const digitRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Mientras carga: pausa la entrada del Hero y bloquea el scroll
  useLayoutEffect(() => {
    if (skip) return;
    document.documentElement.classList.add('winno-loading');
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.classList.remove('winno-loading');
      document.body.style.overflow = '';
    };
  }, [skip]);

  // Progreso real: tipografías + recursos de la página
  useEffect(() => {
    if (skip) return;
    let raf = 0;
    let p = 0;
    let ready = false;
    let lastInt = -1;
    const start = performance.now();

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const pageLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener('load', () => resolve(), { once: true })
          );
    Promise.all([fontsReady, pageLoaded]).then(() => {
      ready = true;
    });

    const paint = (value: number) => {
      const level = BOTTOM - ((BOTTOM - TOP) * value) / 100;
      clipRectRef.current?.setAttribute('y', String(level));
      clipRectRef.current?.setAttribute('height', String(BOTTOM - level));
      if (scanRef.current) {
        scanRef.current.setAttribute('y', String(level - 0.75));
        scanRef.current.style.opacity = value >= 100 || value <= 0 ? '0' : '1';
      }
      const n = Math.round(value);
      if (n !== lastInt) {
        lastInt = n;
        const digits = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
        digits.forEach((d, i) => {
          const col = digitRefs.current[i];
          if (col) col.style.transform = `translateY(-${d * 10}%)`;
        });
      }
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const canFinish = (ready && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      const target = canFinish ? 100 : Math.min(92, (elapsed / MIN_MS) * 92);
      p += (target - p) * 0.1;
      if (canFinish && p > 99.5) p = 100;
      paint(p);
      if (p >= 100) {
        setPhase('ready');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    paint(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skip]);

  // Al llegar a 100: la bolita late y luego el iris se cierra hacia ella
  useEffect(() => {
    if (phase !== 'ready') return;
    const id = window.setTimeout(() => {
      const r = dotRef.current?.getBoundingClientRect();
      setOrigin(
        r
          ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
          : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      );
      setPhase('leaving');
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'leaving') return;
    document.documentElement.classList.remove('winno-loading');
    document.body.style.overflow = '';
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignorar */
    }
    const id = window.setTimeout(() => setPhase('done'), EXIT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (phase === 'done') return null;

  const leaving = phase === 'leaving' && origin;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t.loader.label}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0B1020] text-white transition-[clip-path] ease-[cubic-bezier(0.7,0,0.2,1)]"
      style={{
        clipPath: leaving
          ? `circle(0px at ${origin.x}px ${origin.y}px)`
          : `circle(${radius}px at 50% 50%)`,
        transitionDuration: `${EXIT_MS}ms`,
      }}
    >
      <style>{`
        @keyframes winno-dot-pop {
          0% { transform: scale(1); }
          45% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        .winno-dot-pop { animation: winno-dot-pop .45s cubic-bezier(.3,.7,.3,1) both; }
      `}</style>

      {/* Etiqueta superior */}
      <p className="absolute left-6 top-8 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7] sm:left-10 lg:left-12">
        <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
        {t.loader.label}
      </p>

      {/* Isotipo W que se llena desde abajo */}
      <div className="flex h-full items-center justify-center px-6 pb-16 sm:pb-0">
        <svg
          viewBox={VIEWBOX}
          aria-hidden
          className="h-auto w-[min(58vw,300px)] overflow-visible"
        >
          <defs>
            <clipPath id="winno-loader-clip">
              <rect ref={clipRectRef} x="120" y={BOTTOM} width="240" height="0" />
            </clipPath>
          </defs>

          {/* Versión tenue (el "molde") */}
          <path d={MARK_PATH} fill="#FFFFFF" fillRule="evenodd" opacity="0.12" />
          <path d={DOT_PATH} fill="#00E1F7" fillRule="evenodd" opacity="0.2" />

          {/* Versión que se revela con el progreso */}
          <g clipPath="url(#winno-loader-clip)">
            <path d={MARK_PATH} fill="#FFFFFF" fillRule="evenodd" />
            <path
              ref={dotRef}
              d={DOT_PATH}
              fill="#00E1F7"
              fillRule="evenodd"
              className={phase === 'ready' ? 'winno-dot-pop' : ''}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </g>

          {/* Línea de escaneo en el borde del nivel */}
          <rect
            ref={scanRef}
            x="124"
            y={BOTTOM}
            width="222"
            height="1.5"
            fill="#00E1F7"
            style={{ opacity: 0 }}
          />
        </svg>
      </div>

      {/* Contador tipo odómetro */}
      <div
        aria-hidden
        className="absolute bottom-6 right-6 flex items-start font-display text-7xl font-extrabold leading-none tracking-tighter tabular-nums sm:bottom-8 sm:right-10 sm:text-9xl lg:right-12 lg:text-[11rem]"
      >
        {[0, 1, 2].map((i) => (
          <Digit
            key={i}
            setRef={(el) => {
              digitRefs.current[i] = el;
            }}
          />
        ))}
        <span className="ml-1 mt-1 font-sans text-base font-semibold tracking-normal text-[#00E1F7] sm:ml-2 sm:mt-3 sm:text-2xl">
          %
        </span>
      </div>
    </div>
  );
};

export default Loader;