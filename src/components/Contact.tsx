import { ArrowUpRight, CornerDownRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import { useLang } from '@/i18n/LanguageContext';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B1020]';

const Contact = () => {
  const { t } = useLang();
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;

  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 bg-[#3267FD] py-28 text-white lg:py-44"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight [text-wrap:balance] sm:text-7xl lg:text-8xl">
          {t.contact.title}
        </h2>

        <div className="mt-14 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md font-sans text-xl leading-relaxed text-white sm:text-2xl">
            {t.contact.text}
          </p>

          <div className="flex flex-col items-start gap-6">
            <a
              href={mailto}
              className={`inline-flex items-center gap-3 rounded-none bg-[#0B1020] px-9 py-5 font-display text-base font-bold text-white transition-colors duration-200 hover:bg-[#00E1F7] hover:text-[#0B1020] ${focusRing}`}
            >
              {t.contact.cta}
              <ArrowUpRight size={20} strokeWidth={2.5} aria-hidden />
            </a>

            <ul className="flex flex-col gap-3 font-sans text-base font-medium">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className={`inline-flex items-center gap-2 underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white ${focusRing}`}
                >
                  <CornerDownRight size={16} aria-hidden />
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white ${focusRing}`}
                  >
                    <CornerDownRight size={16} aria-hidden />
                    {t.contact.whatsapp}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;