import { useLang } from './LanguageContext';
import type { Lang } from './translations';

const OPTIONS: { code: Lang; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex border border-white/20 ${className}`}
    >
      {OPTIONS.map((o) => {
        const on = o.code === lang;
        return (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            title={o.name}
            aria-label={o.name}
            aria-pressed={on}
            onClick={() => setLang(o.code)}
            className={`px-2.5 py-1.5 font-sans text-xs font-bold tracking-wide transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#00E1F7] ${
              on ? 'bg-[#00E1F7] text-[#0B1020]' : 'text-white/65 hover:text-white'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;