import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Cada concepto pasa de gris tenue a tinta cuando llega al centro de la
 * pantalla durante el scroll. Los tres forman una secuencia: de la idea
 * (innovación) al medio (tecnología) y al resultado (transformación).
 */
const ConceptRow = ({ index, label }: { index: number; label: string }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // También se activa si la fila ya quedó por encima (carga con scroll previo)
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className="flex items-center justify-between gap-6 border-t border-[#0B1020]/15 py-6 last:border-b sm:py-8"
    >
      <div className="flex items-baseline gap-5 sm:gap-8">
        <span
          className={`font-sans text-sm font-semibold tabular-nums transition-colors duration-700 motion-reduce:transition-none ${
            on ? 'text-[#3267FD]' : 'text-[#0B1020]/25'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className={`font-display text-5xl font-extrabold leading-none tracking-tight transition-colors duration-700 motion-reduce:transition-none sm:text-7xl lg:text-8xl ${
            on ? 'text-[#0B1020]' : 'text-[#0B1020]/15'
          }`}
        >
          {label}
        </span>
      </div>
      <span
        aria-hidden
        className={`block h-3 w-3 shrink-0 transition-colors duration-700 motion-reduce:transition-none sm:h-4 sm:w-4 ${
          on ? 'bg-[#00E1F7]' : 'bg-[#0B1020]/10'
        }`}
      />
    </li>
  );
};

const About = () => {
  const { t } = useLang();
  return (
    <section
      id="nosotros"
      className="relative scroll-mt-20 bg-[#F7F9FC] py-24 text-[#0B1020] lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Título */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#3267FD]">
              <span aria-hidden className="block h-px w-8 bg-[#3267FD]" />
              {t.about.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">{t.about.title1}</span>
              <span className="block">{t.about.title2}</span>
            </h2>
          </div>

          {/* Descripción */}
          <div className="lg:col-span-5 lg:pt-[3.25rem]">
            <p className="max-w-md font-sans text-lg leading-relaxed text-[#0B1020]/70">
              {t.about.text}
            </p>
          </div>
        </div>

        {/* Conceptos */}
        <ul className="mt-20 lg:mt-28" aria-label={t.about.conceptsLabel}>
          {t.about.concepts.map((c, i) => (
            <ConceptRow key={c} index={i} label={c} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;