import { Code2, MonitorSmartphone, Workflow, Lightbulb } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

// Un ícono por servicio, en el mismo orden que t.expertise.services
const icons = [Code2, MonitorSmartphone, Workflow, Lightbulb];

const Expertise = () => {
  const { t } = useLang();

  return (
    <section
      id="soluciones"
      className="relative scroll-mt-20 bg-[#0B1020] py-24 text-white lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Título (queda fijo mientras se leen los servicios en desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7]">
                <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
                {t.expertise.eyebrow}
              </p>
              <h2 className="mt-6 max-w-md font-display text-4xl font-extrabold leading-[1.05] tracking-tight [text-wrap:balance] sm:text-5xl lg:text-6xl">
                {t.expertise.title}
              </h2>
            </div>
          </div>

          {/* Servicios */}
          <ul className="lg:col-span-7" aria-label={t.expertise.servicesLabel}>
            {t.expertise.services.map(({ title, description }, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={title}
                  className="group relative flex items-start gap-6 border-t border-white/15 py-9 last:border-b sm:gap-8 sm:py-12"
                >
                  {/* Línea que recorre el borde al pasar el cursor */}
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[#00E1F7] transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />

                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-[#00E1F7] transition-colors duration-300 group-hover:border-[#3267FD] group-hover:bg-[#3267FD] group-hover:text-white motion-reduce:transition-none sm:h-14 sm:w-14"
                  >
                    <Icon size={24} strokeWidth={1.75} />
                  </span>

                  <div>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00E1F7] motion-reduce:transition-none sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-sm font-sans text-base leading-relaxed text-white/65">
                      {description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Expertise;