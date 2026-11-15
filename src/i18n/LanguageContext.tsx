import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Dictionary, type Lang } from './translations';

const STORAGE_KEY = 'winno-lang';
const DEFAULT_LANG: Lang = 'es'; // idioma por defecto (tu público habla español)

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLang = (): Lang => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* localStorage no disponible: usamos el idioma por defecto */
  }
  return DEFAULT_LANG;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    const { meta } = translations[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignorar */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de <LanguageProvider>');
  return ctx;
};