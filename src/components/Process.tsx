import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLang } from '@/i18n/LanguageContext';

const STEP_COUNT = 4; // número de pasos (los textos viven en i18n/translations.ts)

/* ---------- Ciudad que se construye con cada paso ---------- */

const COLUMNS = [2, 3, 5, 3, 4, 2]; // altura base de cada torre (en bloques)
const SIZE = 56;
const PITCH = 64;
const VIEW_W = COLUMNS.length * PITCH - (PITCH - SIZE);
const VIEW_H = 392;
const BASE_Y = 384; // línea de suelo de los bloques

const transition =
  'fill .6s ease, stroke .6s ease, transform .6s cubic-bezier(.2,.7,.2,1), opacity .6s ease';

const blockStyle = (
  step: number,
  col: number,
  row: number,
  isTop: boolean,
  extra: boolean
): CSSProperties => {
  const common: CSSProperties = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transition,
    transitionDelay: `${row * 90 + col * 35}ms`,
    strokeWidth: 1.5,
  };

  if (extra) {
    // Bloques nuevos que aparecen al "evolucionar"
    return step === 3
      ? {
          ...common,
          opacity: 1,
          transform: 'scale(1)',
          fill: 'rgba(0,225,247,0)',
          stroke: '#00E1F7',
          strokeDasharray: '5 4',
        }
      : {
          ...common,
          opacity: 0,
          transform: 'scale(0.6)',
          fill: 'rgba(0,225,247,0)',
          stroke: '#00E1F7',
          strokeDasharray: '5 4',
        };
  }

  if (step === 0) {
    return { ...common, transform: 'scale(0.1)', fill: '#00E1F7', stroke: 'rgba(0,225,247,0)' };
  }
  if (step === 1) {
    return { ...common, transform: 'scale(1)', fill: 'rgba(0,225,247,0)', stroke: '#00E1F7' };
  }
  if (step === 2) {
    return { ...common, transform: 'scale(1)', fill: '#3267FD', stroke: '#3267FD' };
  }
  return {
    ...common,
    transform: 'scale(1)',
    fill: isTop ? '#00E1F7' : '#3267FD',
    stroke: isTop ? '#00E1F7' : '#3267FD',
  };
};

const City = ({ step }: { step: number }) => (
  <svg
    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    className="h-auto w-full max-w-md"
    aria-hidden
    focusable="false"
  >
    <line x1="0" x2={VIEW_W} y1={BASE_Y + 4} y2={BASE_Y + 4} stroke="rgba(255,255,255,0.25)" />
    {COLUMNS.map((height, c) =>
      Array.from({ length: height + 1 }, (_, r) => {
        const extra = r === height;
        return (
          <rect
            key={`${c}-${r}`}
            x={c * PITCH}
            y={BASE_Y - r * PITCH - SIZE}
            width={SIZE}
            height={SIZE}
            style={blockStyle(step, c, r, r === height - 1, extra)}
          />
        );
      })
    )}
  </svg>
);

/* ---------- Sección ---------- */

const Process = () => {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      let p = 1; // en móvil la lista no está fija: todo se ve completo
      if (mq.matches) {
        const rect = el.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      }
      el.style.setProperty('--p', p.toFixed(4));
      const s = Math.min(STEP_COUNT - 1, Math.floor(p * STEP_COUNT));
      if (s !== last) {
        last = s;
        setStep(s);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    mq.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative bg-[#0B1020] text-white lg:h-[340vh]"
      style={{ ['--p' as string]: 1 }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Título + pasos */}
            <div className="lg:col-span-6">
              <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7]">
                <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
                {t.process.eyebrow}
              </p>
              <h2 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-5xl">
                {t.process.title}
              </h2>

              <ol className="mt-10 lg:mt-9">
                {t.process.steps.map((s, i) => {
                  const state = i < step ? 'done' : i === step ? 'active' : 'up';
                  const isLast = i === STEP_COUNT - 1;
                  return (
                    <li
                      key={s.title}
                      aria-current={state === 'active' ? 'step' : undefined}
                      className="relative py-4 pl-10 lg:py-3.5"
                    >
                      {/* Tramo de línea hasta el siguiente paso, rellenado con el scroll */}
                      {!isLast && (
                        <>
                          <span
                            aria-hidden
                            className="absolute left-[6px] top-[calc(1.75rem+7px)] h-full w-px bg-white/15"
                          />
                          <span
                            aria-hidden
                            className="absolute left-[6px] top-[calc(1.75rem+7px)] h-full w-px origin-top bg-[#00E1F7]"
                            style={{
                              transform: `scaleY(clamp(0, calc(var(--p, 1) * ${STEP_COUNT} - ${i}), 1))`,
                            }}
                          />
                        </>
                      )}

                      {/* Marcador */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-7 block h-3.5 w-3.5 border bg-[#00E1F7] border-[#00E1F7] transition-colors duration-500 motion-reduce:transition-none ${
                          state === 'up' ? 'lg:border-white/30 lg:bg-[#0B1020]' : ''
                        }`}
                      />

                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-sans text-sm font-semibold tabular-nums text-[#00E1F7] transition-colors duration-500 motion-reduce:transition-none ${
                            state === 'up' ? 'lg:text-white/40' : ''
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className={`font-display text-2xl font-extrabold tracking-tight text-white transition-colors duration-500 motion-reduce:transition-none xl:text-3xl ${
                            state === 'done' ? 'lg:text-white/70' : state === 'up' ? 'lg:text-white/40' : ''
                          }`}
                        >
                          {s.title}
                        </h3>
                      </div>
                      <p
                        className={`mt-1 pl-9 font-sans text-base text-white/65 transition-colors duration-500 motion-reduce:transition-none ${
                          state === 'active' ? 'lg:text-white/80' : 'lg:text-white/35'
                        }`}
                      >
                        {s.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Ciudad que se construye (solo desktop) */}
            <div className="hidden items-center justify-center lg:col-span-6 lg:flex">
              <City step={step} />
            </div>
          </div>
        </div>

        {/* Indicación de scroll (solo desktop, desaparece al terminar) */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-6 hidden transition-opacity duration-500 lg:block ${
            step < STEP_COUNT - 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="mx-auto max-w-7xl px-8">
            <span className="inline-flex items-center gap-3 font-sans text-xs text-white/50">
              <span className="block h-8 w-px bg-white/30" />
              {t.process.scroll}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;