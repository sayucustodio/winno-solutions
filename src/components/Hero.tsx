import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Red de nodos conectados. Un "sensor" cian sigue al cursor (o recorre la
 * pantalla solo, en móvil o sin mouse) y conecta los nodos cercanos.
 * Sin dependencias: canvas 2D.
 */
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const LINK = 140;
    const PROBE_R = 210;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let nodes: Node[] = [];
    let pointer: { x: number; y: number } | null = null;
    const probe = { x: 0, y: 0 };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 13000), 110);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6,
      }));
      probe.x = w * 0.7;
      probe.y = h * 0.5;
      if (reduceMotion) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Objetivo del sensor: el puntero, o una trayectoria suave por la derecha
      const tx = pointer ? pointer.x : w * (0.7 + 0.16 * Math.sin(t * 0.00035));
      const ty = pointer
        ? pointer.y
        : h * (0.5 + 0.28 * Math.sin(t * 0.0005 + 1));
      probe.x += (tx - probe.x) * 0.07;
      probe.y += (ty - probe.y) * 0.07;

      // Resplandor del sensor
      const glow = ctx.createRadialGradient(
        probe.x,
        probe.y,
        0,
        probe.x,
        probe.y,
        170,
      );
      glow.addColorStop(0, "rgba(0,225,247,0.16)");
      glow.addColorStop(1, "rgba(0,225,247,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(probe.x - 170, probe.y - 170, 340, 340);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = w + 10;
          else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          else if (n.y > h + 10) n.y = -10;
        }

        // Enlaces entre nodos
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(50,103,253,${(1 - d / LINK) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // Enlace con el sensor
        const pdx = probe.x - n.x;
        const pdy = probe.y - n.y;
        const pd = Math.hypot(pdx, pdy);
        const near = pd < PROBE_R;
        if (near) {
          const k = 1 - pd / PROBE_R;
          ctx.strokeStyle = `rgba(0,225,247,${k * 0.85})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(probe.x, probe.y);
          ctx.stroke();
          if (!reduceMotion && pd > 1) {
            n.x += (pdx / pd) * k * 0.45;
            n.y += (pdy / pd) * k * 0.45;
          }
        }

        ctx.fillStyle = near ? "#00E1F7" : "rgba(95,140,255,0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );
    io.observe(host);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E1F7]";

const Hero = () => {
  const { t } = useLang();
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0B1020] text-white"
    >
      <style>{`
        @keyframes winno-rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .winno-rise {
          animation: winno-rise .9s cubic-bezier(.2,.7,.2,1) both;
          animation-delay: var(--d, 0ms);
        }
        html.winno-loading .winno-rise { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .winno-rise { animation: none; }
        }
      `}</style>

      <NetworkCanvas />

      {/* Velo para mantener el texto legible sobre la red */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1020] via-[#0B1020]/75 to-transparent md:via-[#0B1020]/55"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <p
          className="winno-rise flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.18em] text-[#00E1F7]"
          style={{ ["--d" as string]: "0ms" }}
        >
          <span aria-hidden className="block h-px w-8 bg-[#00E1F7]" />
          {t.hero.eyebrow}
        </p>

        <h1
          className="winno-rise mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white [text-wrap:balance] sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          style={{ ["--d" as string]: "120ms" }}
        >
          {t.hero.title}
        </h1>

        <p
          className="winno-rise mt-7 max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg"
          style={{ ["--d" as string]: "260ms" }}
        >
          {t.hero.text}
        </p>

        <div
          className="winno-rise mt-10 flex flex-col gap-4 sm:flex-row"
          style={{ ["--d" as string]: "380ms" }}
        >
          <a
            href="#nosotros"
            className={`inline-flex items-center justify-center gap-2 rounded-none bg-primary px-7 py-4 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-[#00E1F7] hover:text-[#0B1020] ${focusRing}`}
          >
            {t.hero.primary}
            <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
          </a>
          <a
            href="#soluciones"
            className={`inline-flex items-center justify-center rounded-none border border-white/25 px-7 py-4 font-display text-sm font-bold text-white transition-colors duration-200 hover:border-[#00E1F7] hover:text-[#00E1F7] ${focusRing}`}
          >
            {t.hero.secondary}
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      {/* <div className="absolute inset-x-0 bottom-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            href="#nosotros"
            className={`inline-flex items-center gap-3 font-sans text-xs text-white/50 transition-colors hover:text-white ${focusRing}`}
          >
            <span aria-hidden className="block h-8 w-px bg-white/30" />
            {t.hero.scroll}
          </a>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
