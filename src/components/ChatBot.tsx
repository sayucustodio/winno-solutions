import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { RotateCcw, Send, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { MARK_PATH, DOT_PATH, MARK_VIEWBOX } from '@/lib/winnoMark';
import { askAgent, type ChatMessage } from '@/lib/chatAgent';
import  agentWinno  from '@/assets/agente_winno.jpg';

const STORAGE_KEY = 'winno-chat';
const HINT_KEY = 'winno-chat-hint';
const MAX_LENGTH = 1000;
const REQUEST_TIMEOUT_MS = 45000; // los agentes de IA en Make pueden tardar

const focusLight =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3267FD]';
const focusOnBlue =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const chipClass = `rounded-full border-[1.5px] border-[#3267FD] bg-white px-3.5 py-1.5 font-sans text-[13px] font-semibold text-[#3267FD] transition-colors duration-200 hover:bg-[#3267FD] hover:text-white motion-reduce:transition-none ${focusLight}`;
const bubbleClass =
  'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 font-sans text-sm leading-relaxed';

/* ---------- Utilidades ---------- */

const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const store = {
  get: (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* ignorar */
    }
  },
};

/** Convierte las URLs del texto en enlaces clicables. */
const linkify = (text: string, light: boolean): ReactNode[] =>
  text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
    i % 2 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-2 ${light ? 'text-white' : 'text-[#3267FD]'}`}
      >
        {part}
      </a>
    ) : (
      part
    )
  );

/** Isotipo "W" de WINNO con su bolita. */
const Mark = ({ w, dot, size }: { w: string; dot: string; size: number }) => (
  <svg width={size} height={size} viewBox={MARK_VIEWBOX} aria-hidden>
    <path d={MARK_PATH} fill={w} fillRule="evenodd" />
    <path d={DOT_PATH} fill={dot} fillRule="evenodd" />
  </svg>
);

/** Conversación guardada durante la sesión del navegador (sobrevive a recargas). */
type Session = { sessionId: string; messages: ChatMessage[] };

const loadSession = (): Session => {
  try {
    const saved = JSON.parse(store.get(STORAGE_KEY) ?? 'null') as Session | null;
    if (saved?.sessionId && Array.isArray(saved.messages)) return saved;
  } catch {
    /* dato dañado: empezamos de cero */
  }
  return { sessionId: uid(), messages: [] };
};

const useSession = () => {
  const [session, setSession] = useState(loadSession);

  useEffect(() => store.set(STORAGE_KEY, JSON.stringify(session)), [session]);

  return {
    ...session,
    add: (m: ChatMessage) => setSession((s) => ({ ...s, messages: [...s.messages, m] })),
    reset: () => setSession({ sessionId: uid(), messages: [] }),
  };
};

/* ---------- Componente ---------- */

const ChatWidget = () => {
  const { t, lang } = useLang();
  const c = t.chat;
  const { sessionId, messages, add, reset } = useSession();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [hint, setHint] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const sending = status === 'sending';
  const lastUserText = [...messages].reverse().find((m) => m.role === 'user')?.text;

  // Globito de invitación: una sola vez por sesión
  useEffect(() => {
    if (store.get(HINT_KEY)) return;
    const show = setTimeout(() => {
      setHint(true);
      store.set(HINT_KEY, '1');
    }, 4500);
    const hide = setTimeout(() => setHint(false), 13500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Al abrir: foco en el campo, Escape para cerrar y sin scroll de fondo en móvil
  useEffect(() => {
    if (!open) return;
    setHint(false);
    const focus = setTimeout(() => textareaRef.current?.focus(), 60);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const lockScroll = window.matchMedia('(max-width: 639px)').matches;
    if (lockScroll) document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focus);
      window.removeEventListener('keydown', onKey);
      if (lockScroll) document.body.style.overflow = '';
    };
  }, [open]);

  // Mantiene visible lo último de la conversación
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages, status, open]);

  // Cancela la petición en curso al desmontar
  useEffect(() => () => abortRef.current?.abort(), []);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const ask = async (message: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
    setStatus('sending');
    try {
      const text = await askAgent({ sessionId, lang, message, signal: ctrl.signal });
      if (abortRef.current !== ctrl) return; // la conversación se reinició
      add({ role: 'assistant', text });
      setStatus('idle');
    } catch (err) {
      if (abortRef.current !== ctrl) return;
      console.error('Error del chat:', err);
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  const send = (text: string) => {
    const message = text.trim();
    if (!message || sending) return;
    add({ role: 'user', text: message });
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    void ask(message);
  };

  const resetChat = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    reset();
    setStatus('idle');
    setInput('');
    textareaRef.current?.focus();
  };

  const goToContact = () => {
    setOpen(false);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const headerButton = `flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white ${focusOnBlue}`;

  return (
    <>
      <style>{`
        @keyframes winno-ring { from { transform: scale(1); opacity: .7; } to { transform: scale(1.55); opacity: 0; } }
        .winno-ring { animation: winno-ring 1.8s ease-out 3 3s both; }
        @keyframes winno-typing { 0%, 80%, 100% { opacity: .3; transform: none; } 40% { opacity: 1; transform: translateY(-3px); } }
        .winno-typing span { animation: winno-typing 1.1s ease-in-out infinite; }
        .winno-typing span:nth-child(2) { animation-delay: .15s; }
        .winno-typing span:nth-child(3) { animation-delay: .3s; }
        .winno-chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(11,16,32,.22) transparent; }
        @media (prefers-reduced-motion: reduce) { .winno-ring, .winno-typing span { animation: none; } }
      `}</style>

      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 sm:bottom-6 sm:right-6">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`max-w-[200px] rounded-xl bg-white px-3.5 py-2.5 text-left font-display text-[13px] font-bold leading-snug text-[#0B1020] shadow-[0_10px_30px_-8px_rgba(11,16,32,0.45)] ${focusLight}`}
          >
            {c.hint}
          </button>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="winno-chat"
          aria-label={open ? c.close : c.launcher}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#3267FD] text-white shadow-[0_10px_30px_-6px_rgba(50,103,253,0.65)] transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-[#2757D8] active:scale-95 motion-reduce:transition-none sm:h-14 sm:w-14 ${focusLight} ${
            open ? 'max-sm:hidden' : ''
          }`}
        >
          {!open && (
            <span
              aria-hidden
              className="winno-ring pointer-events-none absolute -inset-0.5 rounded-full border-2 border-[#3267FD]"
            />
          )}
          {open ? <X size={24} strokeWidth={2.5} aria-hidden /> : <img src={agentWinno} alt="" className="h-6 w-6 rounded-full sm:h-7 sm:w-7" />}
        </button>
      </div>

      {/* Ventana del chat */}
      <div
        id="winno-chat"
        role="dialog"
        aria-label={c.title}
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] flex flex-col overflow-hidden bg-[#EEF2FB] text-[#0B1020] transition-[clip-path,visibility] duration-[450ms] ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none sm:inset-auto sm:bottom-[5.25rem] sm:right-6 sm:h-[min(520px,calc(100dvh-7.5rem))] sm:w-[340px] sm:rounded-2xl sm:shadow-[0_24px_70px_-12px_rgba(11,16,32,0.5)] ${
          open ? '' : 'invisible'
        }`}
        style={{ clipPath: open ? 'inset(-80px)' : 'inset(100% -80px -80px -80px)' }}
      >
        {/* Cabecera */}
        <div className="flex items-center gap-3 bg-[#3267FD] px-4 py-3 text-white">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00E1F7]">
            <Mark w="#0B1020" dot="#3267FD" size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-extrabold leading-tight">{c.title}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-sans text-xs text-white/90">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#00E1F7]" />
              {c.status}
            </p>
          </div>
          <button type="button" onClick={resetChat} aria-label={c.reset} title={c.reset} className={headerButton}>
            <RotateCcw size={16} aria-hidden />
          </button>
          <button type="button" onClick={close} aria-label={c.close} title={c.close} className={headerButton}>
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Conversación */}
        <div role="log" aria-live="polite" className="winno-chat-scroll flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          <p className={`${bubbleClass} bg-white shadow-sm`}>{c.greeting}</p>

          {messages.length === 0 && !sending && (
            <div className="flex flex-wrap gap-2 pt-1">
              {c.quick.map((q) => (
                <button key={q} type="button" onClick={() => send(q)} className={chipClass}>
                  {q}
                </button>
              ))}
              <button type="button" onClick={goToContact} className={chipClass}>
                {c.human}
              </button>
            </div>
          )}

          {messages.map((m, i) => (
            <p
              key={i}
              className={`${bubbleClass} ${m.role === 'user' ? 'ml-auto bg-[#3267FD] text-white' : 'bg-white shadow-sm'}`}
            >
              {linkify(m.text, m.role === 'user')}
            </p>
          ))}

          {sending && (
            <div
              role="status"
              aria-label={c.typing}
              className="winno-typing inline-flex items-center gap-1.5 rounded-2xl bg-white px-3.5 py-3.5 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#3267FD]" />
              <span className="h-2 w-2 rounded-full bg-[#3267FD]" />
              <span className="h-2 w-2 rounded-full bg-[#3267FD]" />
            </div>
          )}

          {status === 'error' && (
            <div role="alert" className="rounded-2xl border border-[#E5484D]/40 bg-white px-3.5 py-3 font-sans text-sm">
              <p className="text-[#C62A2F]">{c.error}</p>
              <div className="mt-2.5 flex flex-wrap gap-4 font-semibold text-[#3267FD]">
                {lastUserText && (
                  <button
                    type="button"
                    onClick={() => void ask(lastUserText)}
                    className={`underline underline-offset-4 hover:text-[#0B1020] ${focusLight}`}
                  >
                    {c.retry}
                  </button>
                )}
                <button
                  type="button"
                  onClick={goToContact}
                  className={`underline underline-offset-4 hover:text-[#0B1020] ${focusLight}`}
                >
                  {c.toContact}
                </button>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Campo de mensaje */}
        <div className="border-t border-[#E3E8F4] bg-white transition-colors focus-within:border-t-[#3267FD]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 px-4 py-2.5"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
              }}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={MAX_LENGTH}
              placeholder={c.placeholder}
              aria-label={c.placeholder}
              className="max-h-[100px] min-h-[40px] flex-1 resize-none bg-transparent py-2 font-sans text-sm text-[#0B1020] placeholder-[#8A94AD] outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label={c.send}
              title={c.send}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#3267FD] transition-colors hover:bg-[#3267FD]/10 disabled:cursor-not-allowed disabled:text-[#B6BED3] disabled:hover:bg-transparent ${focusLight}`}
            >
              <Send size={20} aria-hidden />
            </button>
          </form>
          <p className="px-4 pb-2.5 font-sans text-[10.5px] leading-snug text-[#6B7690]">{c.disclaimer}</p>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;