import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

// Coloca tu imagen en: src/assets/templates/winno-templates.jpg
import imgProduct from "@/assets/templates/winno-templates.jpg";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]";

const Product = () => {
  const { t } = useLang();

  return (
    <section
      id="templates"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#003CAA] py-24 text-white lg:py-32"
    >
      {/* Marca gigante de fondo, cortada por abajo */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 -ml-[3vw] translate-y-[22%] select-none whitespace-nowrap font-display text-[34vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.055]"
      >
        WINNO
      </p>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Texto + características */}
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7]">
              <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
              {t.product.eyebrow}
            </p>

            <h2 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem]">
              {t.product.name}
            </h2>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-[#00E1F7] [text-wrap:balance]">
              {t.product.title}
            </p>
            <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-white/80">
              {t.product.text}
            </p>

            <ul className="mt-9 max-w-sm border-t border-white/20">
              {t.product.features.map(({ label }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 border-b border-white/20 py-3.5"
                >
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00E1F7] text-[#003CAA]"
                  >
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="font-sans text-base font-bold">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className={`mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#00E1F7] px-7 py-3.5 font-display text-sm font-bold text-[#0B1020] transition-colors duration-200 hover:bg-white ${focusRing}`}
            >
              {t.product.cta}
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </a>
          </div>

          {/* Imagen del producto */}
          <div className="lg:col-span-7">
            <img
              src={imgProduct}
              alt={`${t.product.name}: ${t.product.title}`}
              decoding="async"
              draggable={false}
              className="mx-auto h-auto w-full max-w-[680px] select-none lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;