import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useLang } from '@/i18n/LanguageContext';

// Coloca los 4 SVG en: src/assets/templates/
import imgDiseno from '@/assets/templates/template-diseno.svg';
import imgPedidos from '@/assets/templates/template-pedidos.svg';
import imgInventario from '@/assets/templates/template-inventario.svg';
import imgWhatsapp from '@/assets/templates/template-whatsapp.svg';

/* ---------- Características (una imagen por cada una) ---------- */

const features = [
  { id: 'diseno', image: imgDiseno },
  { id: 'pedidos', image: imgPedidos },
  { id: 'inventario', image: imgInventario },
  { id: 'whatsapp', image: imgWhatsapp },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3267FD]';

const Product = () => {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const select = (i: number) => {
    const next = (i + features.length) % features.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      select(i + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      select(i - 1);
    }
  };

  // Paralaje: la ilustración se desplaza suavemente en sentido contrario al cursor
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    stage.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    stage.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onPointerLeave = () => {
    stageRef.current?.style.setProperty('--mx', '0');
    stageRef.current?.style.setProperty('--my', '0');
  };

  return (
    <section
      id="templates"
      className="relative scroll-mt-20 bg-[#F7F9FC] py-24 text-[#0B1020] lg:py-36"
    >
      <style>{`
        @keyframes winno-float {
          from { transform: translateY(6px); }
          to { transform: translateY(-8px); }
        }
        .winno-float { animation: winno-float 6s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .winno-float { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Texto + características */}
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#3267FD]">
              <span aria-hidden className="block h-px w-8 bg-[#3267FD]" />
              {t.product.eyebrow}
            </p>
            <p className="mt-6 font-display text-xl font-bold text-[#3267FD]">{t.product.name}</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-5xl lg:text-[3.25rem]">
              {t.product.title}
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-[#0B1020]/70">
              {t.product.text}
            </p>

            <div
              role="tablist"
              aria-label={t.product.tabsLabel}
              aria-orientation="vertical"
              className="mt-10"
            >
              {features.map((f, i) => {
                const on = i === active;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${f.id}`}
                    aria-selected={on}
                    aria-controls="templates-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`flex w-full items-center gap-4 border-l-2 py-3.5 pl-5 text-left font-sans text-base font-semibold transition-colors duration-200 motion-reduce:transition-none ${focusRing} ${
                      on
                        ? 'border-[#3267FD] text-[#0B1020]'
                        : 'border-[#0B1020]/15 text-[#0B1020]/50 hover:text-[#0B1020]'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`block h-2 w-2 shrink-0 ${on ? 'bg-[#00E1F7]' : 'bg-[#0B1020]/20'}`}
                    />
                    {t.product.features[i].label}
                  </button>
                );
              })}
            </div>

            <a
              href="#contacto"
              className={`mt-10 inline-flex items-center gap-2 rounded-none bg-[#3267FD] px-7 py-4 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0B1020] ${focusRing}`}
            >
              {t.product.cta}
            </a>
          </div>

          {/* Escenario con las ilustraciones */}
          <div className="lg:col-span-7">
            <div
              role="tabpanel"
              id="templates-panel"
              aria-labelledby={`tab-${features[active].id}`}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              className="relative aspect-[4/3] overflow-hidden bg-[#0B1020] shadow-[6px_6px_0_0_#3267FD] sm:shadow-[10px_10px_0_0_#3267FD]"
            >
              {/* Capa de paralaje */}
              <div
                ref={stageRef}
                className="absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{
                  transform:
                    'translate3d(calc(var(--mx, 0) * -12px), calc(var(--my, 0) * -12px), 0)',
                }}
              >
                {/* Todas las imágenes quedan montadas: cambio sin parpadeo.
                    La activa se revela con un barrido vertical y flota suavemente. */}
                {features.map((f, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={f.id}
                      aria-hidden={!on}
                      className={`absolute inset-0 p-6 transition-[clip-path,opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none sm:p-10 ${
                        on ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.04] opacity-0'
                      }`}
                      style={{ clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
                    >
                      <img
                        src={f.image}
                        alt={on ? t.product.features[i].alt : ''}
                        draggable={false}
                        className={`h-full w-full select-none object-contain ${
                          on ? 'winno-float' : ''
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;