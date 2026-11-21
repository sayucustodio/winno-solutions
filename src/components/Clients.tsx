import { useLang } from '@/i18n/LanguageContext';

const modules = import.meta.glob('@/assets/clients/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

type Client = { src: string; name: string };

const clients: Client[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: (path.split('/').pop() ?? '')
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+[-_\s]*/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

const Row = ({
  items,
  reverse = false,
  duration,
}: {
  items: Client[];
  reverse?: boolean;
  duration: number;
}) => {
  // Se repite la lista hasta que una mitad sea más ancha que el contenedor
  const reps = Math.max(1, Math.ceil(10 / items.length));
  const half = Array.from({ length: reps }).flatMap(() => items);

  const renderHalf = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {half.map((c, i) => (
        <img
          key={`${c.name}-${i}`}
          src={c.src}
          alt={hidden ? '' : c.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="mr-16 h-12 w-auto shrink-0 select-none object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:mr-20 sm:h-14 lg:mr-24 lg:h-16"
          />
      ))}
    </div>
  );

  return (
    <div className="winno-marquee winno-fade overflow-hidden">
      <div
        className="winno-marquee-track flex w-max"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  );
};

const Clients = () => {
  const { t } = useLang();
  if (clients.length === 0) return null;

  // Con pocos logos, una sola fila; con más, dos filas en sentidos opuestos
  const split = clients.length >= 6;
  const mid = Math.ceil(clients.length / 2);
  const rowA = split ? clients.slice(0, mid) : clients;
  const rowB = split ? clients.slice(mid) : [];

  return (
    <div className="mt-12 border-t border-[#0B1020]/15 pt-8">
      <style>{`
        @keyframes winno-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .winno-marquee-track {
          animation: winno-marquee 40s linear infinite;
        }
        .winno-marquee:hover .winno-marquee-track { animation-play-state: paused; }
        .winno-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .winno-marquee-track { animation: none; }
          .winno-marquee { overflow-x: auto; }
          .winno-fade { -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>

      <h3 className="font-display text-xl font-extrabold tracking-tight">{t.clients.title}</h3>
      <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-[#0B1020]/65">
        {t.clients.text}
      </p>

      <div className="mt-7 space-y-6">
        <Row items={rowA} duration={38} />
        {rowB.length > 0 && <Row items={rowB} reverse duration={46} />}
      </div>
    </div>
  );
};

export default Clients;