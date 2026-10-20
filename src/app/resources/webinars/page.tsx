"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — WEBINARS PAGE  ("AKORA LIVE" studio)
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/resources/webinars/page.tsx  (route: /resources/webinars)
 *
 * WHAT'S UNIQUE
 *  - Hero: a neon "ON AIR" sign + an audio WAVEFORM drawn on canvas that reacts
 *    to your cursor.
 *  - Live COUNTDOWN with flip-clock digits to the next webinar (automatically
 *    switches to "ON AIR" while it is happening).
 *  - "Add to Google Calendar" + seat reservation (WhatsApp / email) in a modal.
 *  - A marquee whose SPEED follows your scroll speed.
 *  - Episodes as a STACKING DECK: cards pile up as you scroll.
 *
 * IMAGES
 *  - I did NOT pull photos from Google (copyright/privacy). Cover art is
 *    generated artwork unique to each episode. To use your own cover, set
 *    image: "/webinars/my-cover.jpg" (file in frontend/public/webinars/).
 *  - Speaker photos below are free STOCK placeholders (randomuser.me); replace
 *    with real ones the same way (photo: "/team/name.jpg").
 *
 * LIVE WEBINARS (optional)
 *  - Default: the FALLBACK_WEBINARS array below (dates are relative to today so
 *    the demo always shows an upcoming session). Edit it by hand, OR load live:
 *  - Create frontend/.env.local with
 *        NEXT_PUBLIC_WEBINARS_URL=https://your-api.com/webinars
 *    restart `npm run dev`. Fetched on load + every 60 seconds.
 *    URL must return JSON (array, or { "webinars": [...] }) shaped like:
 *      { "id": "1", "title": "...", "description": "...",
 *        "start": "2026-11-05T18:00:00+05:30", "durationMin": 60,
 *        "speaker": { "name": "...", "role": "...", "photo": "https://..." },
 *        "topics": ["..."], "accent": "#C9A56A",
 *        "registerUrl": "https://...", "recordingUrl": "https://...",
 *        "image": "https://..." }
 *    Upcoming / live / on-demand is decided automatically from `start`.
 *    Server must allow CORS. If the fetch fails the fallback list stays.
 *
 * ALL EVENTS / SPEAKERS BELOW ARE SAMPLES — replace with your real webinars.
 *
 * FOOTER: content is inside <PageRevealWrapper>, <Footer /> is outside <main>,
 * and <main> has no background -> the fixed footer is revealed correctly.
 * ==========================================================================*/

const CONFIG = {
  email: "akoratechnologies@gmail.com",
  whatsappNumber: "917225878057",
} as const;

const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page
const WEBINARS_URL = process.env.NEXT_PUBLIC_WEBINARS_URL;

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";

/* ---------------------------------- Data ---------------------------------- */

type Speaker = { name: string; role: string; photo?: string };

type Webinar = {
  id: string;
  title: string;
  description: string;
  start: string; // ISO date string
  durationMin: number;
  speaker: Speaker;
  topics: string[];
  accent: string;
  registerUrl?: string;
  recordingUrl?: string;
  image?: string;
};

const portrait = (g: "men" | "women", n: number) =>
  `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

const inDays = (days: number, hour = 18, minute = 0) => {
  const t = new Date();
  t.setDate(t.getDate() + days);
  t.setHours(hour, minute, 0, 0);
  return t.toISOString();
};

const FALLBACK_WEBINARS: Webinar[] = [
  {
    id: "w1",
    title: "Next.js in Production: Speed, SEO & Scale",
    description:
      "How we ship fast, search-friendly Next.js sites — caching, Core Web Vitals, images and deployments, with live demos.",
    start: inDays(6, 18, 0),
    durationMin: 60,
    speaker: { name: "Rohan Sharma", role: "Head of Engineering", photo: portrait("men", 44) },
    topics: ["Core Web Vitals", "Caching", "Deployments", "Live Q&A"],
    accent: "#C9A56A",
  },
  {
    id: "w2",
    title: "From Idea to MVP in 12 Days",
    description:
      "A practical walkthrough of how we scope, design and launch a first version quickly — without cutting the wrong corners.",
    start: inDays(20, 17, 30),
    durationMin: 45,
    speaker: { name: "Aarav Khanna", role: "Founder & CEO", photo: portrait("men", 32) },
    topics: ["Scoping", "MVP", "Launch plan"],
    accent: "#E8645F",
  },
  {
    id: "w3",
    title: "Technical SEO Playbook for 2026",
    description:
      "Audits, structured data, content architecture and measuring what actually moves rankings.",
    start: inDays(34, 19, 0),
    durationMin: 60,
    speaker: { name: "Meera Joshi", role: "Growth & SEO Lead", photo: portrait("women", 44) },
    topics: ["SEO", "Analytics", "Content"],
    accent: "#2FA84A",
  },
  {
    id: "w4",
    title: "Drones with ROS: A Hands-on Intro",
    description:
      "From flight controller basics to ground-control software — how we approach robotics and drone projects.",
    start: inDays(-12, 18, 0),
    durationMin: 75,
    speaker: { name: "Pranav Nair", role: "R&D Lead", photo: portrait("men", 65) },
    topics: ["ROS", "Flight firmware", "Telemetry"],
    accent: "#38BDF8",
  },
  {
    id: "w5",
    title: "React Native vs Native: What Should You Choose?",
    description:
      "Costs, performance, team size and timelines — an honest framework for choosing your mobile approach.",
    start: inDays(-40, 18, 30),
    durationMin: 50,
    speaker: { name: "Rohan Sharma", role: "Head of Engineering", photo: portrait("men", 44) },
    topics: ["Mobile", "React Native", "Architecture"],
    accent: "#635BFF",
  },
  {
    id: "w6",
    title: "Designing Interfaces That Convert",
    description:
      "Layout, hierarchy, motion and copy — the small design decisions that lift conversion.",
    start: inDays(-70, 17, 0),
    durationMin: 45,
    speaker: { name: "Aarav Khanna", role: "Founder & CEO", photo: portrait("men", 32) },
    topics: ["UI/UX", "Conversion", "Motion"],
    accent: "#FFB020",
  },
];

const MARQUEE_WORDS = ["Engineering", "SEO", "Design", "AI", "Robotics", "Drones", "Product", "Growth"];

/* ------------------------------ Live data fetch --------------------------- */

const str = (v: unknown, fb: string) => (typeof v === "string" && v.trim() ? v : fb);
const strList = (v: unknown) =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()).map(String) : [];

function normalizeWebinars(data: unknown): Webinar[] | null {
  const arr = Array.isArray(data) ? data : (data as { webinars?: unknown } | null)?.webinars;
  if (!Array.isArray(arr)) return null;
  const out: Webinar[] = [];
  arr.forEach((raw, i) => {
    if (!raw || typeof raw !== "object") return;
    const w = raw as Record<string, unknown>;
    const start = typeof w.start === "string" ? w.start : "";
    if (!start || Number.isNaN(new Date(start).getTime())) return; // skip invalid dates
    const sp = (w.speaker && typeof w.speaker === "object" ? w.speaker : {}) as Record<string, unknown>;
    out.push({
      id: String(w.id ?? i),
      title: str(w.title, "Untitled webinar"),
      description: str(w.description, ""),
      start,
      durationMin: typeof w.durationMin === "number" && w.durationMin > 0 ? w.durationMin : 60,
      speaker: {
        name: str(sp.name, "AKORA Team"),
        role: str(sp.role, ""),
        photo: typeof sp.photo === "string" && sp.photo ? sp.photo : undefined,
      },
      topics: strList(w.topics),
      accent: str(w.accent, GOLD),
      registerUrl: typeof w.registerUrl === "string" && w.registerUrl ? w.registerUrl : undefined,
      recordingUrl: typeof w.recordingUrl === "string" && w.recordingUrl ? w.recordingUrl : undefined,
      image: typeof w.image === "string" && w.image ? w.image : undefined,
    });
  });
  return out;
}

function useWebinars() {
  const [items, setItems] = useState<Webinar[]>(FALLBACK_WEBINARS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!WEBINARS_URL) return;
    let alive = true;
    const ctrl = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(WEBINARS_URL, { signal: ctrl.signal, cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const parsed = normalizeWebinars(await res.json());
        if (alive && parsed && parsed.length) {
          setItems(parsed);
          setLive(true);
        }
      } catch {
        /* keep fallback webinars */
      }
    };
    load();
    const iv = window.setInterval(load, 60_000);
    return () => {
      alive = false;
      ctrl.abort();
      window.clearInterval(iv);
    };
  }, []);

  return { items, live };
}

/* ------------------------------ Date helpers ------------------------------ */

type Phase = "live" | "upcoming" | "past";

const startMs = (w: Webinar) => new Date(w.start).getTime();
const endMs = (w: Webinar) => startMs(w) + w.durationMin * 60_000;
const phaseOf = (w: Webinar, now: number): Phase =>
  now >= endMs(w) ? "past" : now >= startMs(w) ? "live" : "upcoming";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

const calStamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
const calendarLink = (w: Webinar) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `AKORA Live: ${w.title}`
  )}&dates=${calStamp(startMs(w))}/${calStamp(endMs(w))}&details=${encodeURIComponent(
    `${w.description}\n\nSpeaker: ${w.speaker.name}`
  )}`;

const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* ------------------------------ Motion helpers ---------------------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Current time in ms, ticking every second. null until mounted (avoids hydration mismatch). */
function useNow(interval = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const iv = window.setInterval(() => setNow(Date.now()), interval);
    return () => window.clearInterval(iv);
  }, [interval]);
  return now;
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

type Dir = "up" | "left" | "right" | "scale";
const HIDDEN: Record<Dir, string> = {
  up: "translate-y-10 opacity-0",
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  scale: "scale-95 opacity-0",
};

function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  dir?: Dir;
  className?: string;
}) {
  const [ref, shown] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN[dir]
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const p = clamp(h.scrollTop / (h.scrollHeight - h.clientHeight || 1), 0, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-[#8A6B32] via-[#C9A56A] to-[#E7D6B6]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ------------------------------ Small UI parts ---------------------------- */

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm ${
        dark
          ? "bg-white/[0.06] text-white/70 ring-1 ring-white/15"
          : "bg-white/70 text-[#4B4A45] ring-1 ring-black/10"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
      {children}
    </span>
  );
}

function Underline() {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full"
      height="8"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0 4 C 50 0, 150 8, 200 4" stroke={GOLD} strokeWidth="2.5" fill="none" />
    </svg>
  );
}

const Icon = ({ children, className = "h-4 w-4" }: { children: ReactNode; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const ArrowUpRight = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);
const CloseIcon = () => (
  <Icon className="h-5 w-5">
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
);
const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"} fill="currentColor" aria-hidden>
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
  </svg>
);

/** Speaker photo with graceful fallback (gradient + initials). Fills its parent. */
function Avatar({ s, accent }: { s: Speaker; accent: string }) {
  const [failed, setFailed] = useState(false);
  const initials = s.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  if (!s.photo || failed) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, #141414)` }}
      >
        {initials}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.photo}
      alt={s.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/* ------------------------------ Generated art ----------------------------- */

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const seeded = (seed: number) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Cover artwork unique to each webinar: glow, rings and a waveform. */
function Art({ w }: { w: Webinar }) {
  if (w.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={w.image} alt={w.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    );
  }
  const rnd = seeded(hash(w.id + w.title));
  const bars = Array.from({ length: 34 }, () => 0.18 + rnd() * 0.82);
  const rings = [0.35, 0.55, 0.78].map((r) => r + rnd() * 0.06);
  const gid = `g-${w.id.replace(/\W/g, "")}`;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={w.accent} stopOpacity="0.95" />
          <stop offset="1" stopColor="#0B0A08" />
        </linearGradient>
        <linearGradient id={`${gid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid}-bg)`} />
      {rings.map((r, i) => (
        <circle
          key={i}
          cx="300"
          cy="70"
          r={r * 300}
          fill="none"
          stroke="#fff"
          strokeOpacity={0.12 - i * 0.025}
          strokeWidth="1.5"
        />
      ))}
      <circle cx="300" cy="70" r="46" fill="#fff" fillOpacity="0.1" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={14 + i * 11}
          y={230 - b * 110}
          width="6"
          height={b * 110}
          rx="3"
          fill={`url(#${gid}-bar)`}
          opacity={0.55 + (i % 5) * 0.09}
        />
      ))}
    </svg>
  );
}

/* ------------------------------ Hero waveform ----------------------------- */

function Waveform() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, level: 0, target: 0 };
    const reduce = prefersReducedMotion();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      mouse.level += (mouse.target - mouse.level) * 0.08;

      const gap = 14;
      const n = Math.floor(w / gap);
      const cy = h * 0.55;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(231,214,182,0.95)");
      grad.addColorStop(1, "rgba(138,107,50,0.35)");
      ctx.fillStyle = grad;

      for (let i = 0; i < n; i++) {
        const x = i * gap + gap / 2;
        const base =
          0.3 +
          0.22 * Math.sin(t * 0.0021 + i * 0.33) +
          0.14 * Math.sin(t * 0.0013 + i * 0.91) +
          0.08 * Math.sin(t * 0.0042 + i * 0.17);
        const d = (x - mouse.x) / 130;
        const boost = Math.exp(-d * d) * mouse.level * 1.1;
        const bh = Math.max(3, (base + boost) * h * 0.55);
        const bw = 5;
        const r = bw / 2;
        // mirrored bar around the centre line
        ctx.beginPath();
        ctx.roundRect(x - bw / 2, cy - bh, bw, bh * 2, r);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
    });

    resize();
    io.observe(canvas);
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ------------------------------- Flip clock ------------------------------- */

function Digit({ d }: { d: string }) {
  return (
    <span className="relative flex h-14 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1d1d22] to-[#0B0A08] font-mono text-[28px] font-semibold text-[#E7D6B6] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:h-[72px] sm:w-[52px] sm:text-[36px]">
      <span key={d} className="wb-flip block">
        {d}
      </span>
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/70" />
    </span>
  );
}

function Tile({ value, label }: { value: number; label: string }) {
  const s = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex gap-1">
        {s.split("").map((d, i) => (
          <Digit key={i} d={d} />
        ))}
      </div>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8A8980]">{label}</span>
    </div>
  );
}

function Countdown({ ms }: { ms: number }) {
  const t = Math.max(0, ms);
  const d = Math.floor(t / 86_400_000);
  const h = Math.floor((t % 86_400_000) / 3_600_000);
  const m = Math.floor((t % 3_600_000) / 60_000);
  const s = Math.floor((t % 60_000) / 1000);
  return (
    <div className="flex flex-wrap items-start gap-3 sm:gap-5" role="timer" aria-live="off">
      <Tile value={d} label="Days" />
      <Tile value={h} label="Hours" />
      <Tile value={m} label="Mins" />
      <Tile value={s} label="Secs" />
    </div>
  );
}

/* --------------------------- Scroll-speed marquee ------------------------- */

function VelocityMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    let x = 0;
    let boost = 0;
    let lastY = window.scrollY;

    const loop = () => {
      const y = window.scrollY;
      const v = y - lastY;
      lastY = y;
      boost += (v * 0.35 - boost) * 0.12; // smoothed scroll velocity
      x -= 0.7 + boost;
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
        <span
          key={`${key}-${i}`}
          className="flex items-center gap-8 px-8 font-serif text-[clamp(3rem,8vw,6.5rem)] italic leading-none text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(231,214,182,0.55)" }}
        >
          {w}
          <span className="h-3 w-3 rounded-full" style={{ background: GOLD }} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-[#0B0A08] py-10 md:py-14" aria-hidden>
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ----------------------------- Registration modal ------------------------- */

function RegisterModal({ w, onClose }: { w: Webinar; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const text = () =>
    `Hi AKORA Technologies, I'd like to reserve a seat for the webinar "${w.title}" (${fmtDate(
      w.start
    )}, ${fmtTime(w.start)}).\n\nName: ${name.trim()}${email.trim() ? `\nEmail: ${email.trim()}` : ""}`;

  const check = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look right.");
      return false;
    }
    setError("");
    return true;
  };

  const viaWa = (e: FormEvent) => {
    e.preventDefault();
    if (!check()) return;
    window.open(waLink(text()), "_blank", "noopener,noreferrer");
  };
  const viaMail = () => {
    if (!check()) return;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
      `Webinar seat — ${w.title}`
    )}&body=${encodeURIComponent(text())}`;
  };

  const input =
    "w-full rounded-xl border border-black/10 bg-[#FBFAF6] px-4 py-3.5 text-[15px] text-[#141414] placeholder:text-[#a5a49a] outline-none transition focus:border-[#C9A56A] focus:bg-white focus:ring-4 focus:ring-[#C9A56A]/15";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Reserve a seat: ${w.title}`}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="wb-fadein absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        data-lenis-prevent
        className="wb-pop relative max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-[32px] bg-[#F4F1E9] p-7 text-[#141414] shadow-2xl sm:rounded-[32px] sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 transition-transform duration-300 hover:rotate-90"
        >
          <CloseIcon />
        </button>

        <Eyebrow>Reserve your seat</Eyebrow>
        <h3 className="mt-5 pr-10 font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">{w.title}</h3>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] tracking-[0.08em] text-[#6B6A63]">
          <span>{fmtDate(w.start)}</span>
          <span>{fmtTime(w.start)}</span>
          <span>{w.durationMin} MIN</span>
        </p>

        <form onSubmit={viaWa} noValidate className="mt-7 space-y-4">
          <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          <input className={input} placeholder="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {error && (
            <p role="alert" className="text-[13px] text-[#B4432F]">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-6 py-4 text-[14.5px] font-medium text-white shadow-[0_14px_34px_-14px_rgba(138,107,50,0.9)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Reserve on WhatsApp <ArrowUpRight />
            </button>
            <button
              type="button"
              onClick={viaMail}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-4 text-[14.5px] font-medium ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
            >
              Reserve by email
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-[13.5px]">
          <a
            href={calendarLink(w)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
            style={{ color: GOLD_DARK }}
          >
            <CalendarIcon className="h-4 w-4" /> Add to Google Calendar
          </a>
          {w.registerUrl && (
            <a
              href={w.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              style={{ color: GOLD_DARK }}
            >
              Official registration page <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Episode card ----------------------------- */

function EpisodeCard({
  w,
  phase,
  onReserve,
}: {
  w: Webinar;
  phase: Phase;
  onReserve: (w: Webinar) => void;
}) {
  const label = phase === "live" ? "ON AIR" : phase === "upcoming" ? "UPCOMING" : "ON-DEMAND";
  const dot = phase === "live" ? "bg-red-500" : phase === "upcoming" ? "bg-emerald-400" : "bg-white/40";

  return (
    <article className="grid min-h-[360px] overflow-hidden rounded-[32px] bg-[#0B0A08] text-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:grid-cols-[0.85fr_1.15fr]">
      <div className="relative min-h-[220px]">
        <Art w={w} />
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] backdrop-blur">
          <span className="relative flex h-2 w-2">
            {phase !== "past" && <span className={`wb-ping absolute inline-flex h-full w-full rounded-full ${dot}`} />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
          </span>
          {label}
        </span>
        <span className="absolute bottom-5 left-5 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] backdrop-blur">
          {w.durationMin} MIN
        </span>
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <p className="font-mono text-[12px] tracking-[0.1em] text-[#E7D6B6]">
          {fmtDate(w.start).toUpperCase()} · {fmtTime(w.start)}
        </p>
        <h3 className="mt-4 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight">{w.title}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{w.description}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/20">
            <Avatar s={w.speaker} accent={w.accent} />
          </span>
          <span>
            <span className="block text-[14px] font-medium">{w.speaker.name}</span>
            <span className="block text-[12px] text-white/50">{w.speaker.role}</span>
          </span>
        </div>

        {w.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {w.topics.map((t) => (
              <span key={t} className="rounded-full bg-white/[0.07] px-3 py-1 text-[11.5px] text-white/70 ring-1 ring-white/10">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-7">
          {phase === "past" ? (
            w.recordingUrl ? (
              <a
                href={w.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[14px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
              >
                <PlayIcon className="h-3.5 w-3.5" /> Watch recording
              </a>
            ) : (
              <span className="inline-flex rounded-full bg-white/[0.07] px-5 py-3 font-mono text-[12px] tracking-[0.12em] text-white/50 ring-1 ring-white/10">
                RECORDING COMING SOON
              </span>
            )
          ) : (
            <button
              type="button"
              onClick={() => onReserve(w)}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_14px_34px_-14px_rgba(138,107,50,0.9)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {phase === "live" ? "Join / reserve" : "Reserve my seat"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------- Stacking deck ---------------------------- */

function Deck({
  list,
  now,
  onReserve,
}: {
  list: Webinar[];
  now: number;
  onReserve: (w: Webinar) => void;
}) {
  const wraps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      wraps.current.forEach((el, i) => {
        if (!el) return;
        const inner = el.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const next = wraps.current[i + 1];
        let p = 0;
        if (next) {
          const er = el.getBoundingClientRect();
          const nr = next.getBoundingClientRect();
          p = clamp(1 - (nr.top - er.top) / Math.max(1, er.height), 0, 1);
        }
        inner.style.transform = `scale(${(1 - p * 0.06).toFixed(4)})`;
        inner.style.filter = `brightness(${(1 - p * 0.3).toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [list]);

  return (
    <div>
      {list.map((w, i) => (
        <div
          key={w.id}
          ref={(el) => {
            wraps.current[i] = el;
          }}
          className="sticky mb-10 md:mb-14"
          style={{ top: `calc(5.5rem + ${i * 16}px)` }}
        >
          <div className="origin-top will-change-transform">
            <EpisodeCard w={w} phase={phaseOf(w, now)} onReserve={onReserve} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Topic suggestion --------------------------- */

function TopicForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const text = () =>
    `Hi AKORA Technologies, I'd love a webinar on: ${topic.trim()}${name.trim() ? `\n\n— ${name.trim()}` : ""}`;
  const ok = () => {
    if (topic.trim().length < 4) {
      setError("Tell us the topic in a few words.");
      return false;
    }
    setError("");
    return true;
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition focus:border-[#C9A56A] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#C9A56A]/15";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ok()) window.open(waLink(text()), "_blank", "noopener,noreferrer");
      }}
      noValidate
      className="space-y-4"
    >
      <input className={input} placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      <textarea
        rows={3}
        className={`${input} resize-y leading-6`}
        placeholder="What should we teach next?"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      {error && (
        <p role="alert" className="text-[13px] text-red-300">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-7 py-4 text-[14.5px] font-medium text-white shadow-[0_14px_34px_-14px_rgba(138,107,50,0.9)] transition-all duration-300 hover:-translate-y-0.5"
        >
          Suggest on WhatsApp <ArrowUpRight />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!ok()) return;
            window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
              "Webinar topic suggestion"
            )}&body=${encodeURIComponent(text())}`;
          }}
          className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-4 text-[14.5px] font-medium text-white ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
        >
          Suggest by email
        </button>
      </div>
    </form>
  );
}

/* ---------------------------------- Page ---------------------------------- */

type Filter = "all" | "upcoming" | "ondemand";

export default function WebinarsPage() {
  const { items, live } = useWebinars();
  const now = useNow(1000);
  const [filter, setFilter] = useState<Filter>("all");
  const [reserve, setReserve] = useState<Webinar | null>(null);
  const closeModal = useCallback(() => setReserve(null), []);

  // hero scroll-linked fade (CSS variable)
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sp", clamp(-r.top / Math.max(1, r.height), 0, 1).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // split + sort (only once we know the current time)
  const { upcoming, past, nextUp } = useMemo(() => {
    if (now === null) return { upcoming: [] as Webinar[], past: [] as Webinar[], nextUp: null as Webinar | null };
    const sorted = [...items].sort((a, b) => startMs(a) - startMs(b));
    const up = sorted.filter((w) => phaseOf(w, now) !== "past");
    const pa = sorted.filter((w) => phaseOf(w, now) === "past").reverse();
    return { upcoming: up, past: pa, nextUp: up[0] ?? null };
  }, [items, now]);

  const deckList = filter === "upcoming" ? upcoming : filter === "ondemand" ? past : [...upcoming, ...past];
  const nextPhase = nextUp && now !== null ? phaseOf(nextUp, now) : null;
  const isLive = nextPhase === "live";

  return (
    <div className="overflow-x-clip">
      <style>{`
        @keyframes wb-rise { from { transform: translateY(118%); } to { transform: translateY(0); } }
        .wb-mask { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.08em 0.14em; margin-bottom: -0.14em; }
        .wb-rise { display: inline-block; transform: translateY(118%); animation: wb-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes wb-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .wb-fade { opacity: 0; animation: wb-fade 0.9s ease forwards; }

        @keyframes wb-shine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        .wb-shine {
          display: inline-block;
          background: linear-gradient(100deg, #e7d6b6 0%, #c9a56a 30%, #fff 50%, #c9a56a 70%, #e7d6b6 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wb-shine 6s linear infinite;
        }

        @keyframes wb-flicker {
          0%, 18%, 22%, 62%, 64%, 100% { opacity: 1; }
          20%, 63% { opacity: 0.55; }
        }
        .wb-neon-gold { color: #e7d6b6; border-color: #c9a56a; text-shadow: 0 0 6px #c9a56a, 0 0 22px rgba(201,165,106,0.7); box-shadow: 0 0 22px rgba(201,165,106,0.35), inset 0 0 16px rgba(201,165,106,0.25); animation: wb-flicker 5s infinite; }
        .wb-neon-red { color: #ff6b6b; border-color: #ff4d4d; text-shadow: 0 0 6px #ff4d4d, 0 0 24px rgba(255,77,77,0.8); box-shadow: 0 0 26px rgba(255,77,77,0.45), inset 0 0 16px rgba(255,77,77,0.3); animation: wb-flicker 4s infinite; }

        @keyframes wb-flip { from { transform: translateY(-60%) rotateX(80deg); opacity: 0; } to { transform: none; opacity: 1; } }
        .wb-flip { animation: wb-flip 0.45s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes wb-ping { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.6); opacity: 0; } }
        .wb-ping { animation: wb-ping 1.6s ease-out infinite; }

        @keyframes wb-wheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        .wb-wheel { animation: wb-wheel 1.6s ease-in-out infinite; }

        @keyframes wb-pop { from { opacity: 0; transform: translateY(40px) scale(0.97); } to { opacity: 1; transform: none; } }
        .wb-pop { animation: wb-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes wb-fadein { from { opacity: 0; } to { opacity: 1; } }
        .wb-fadein { animation: wb-fadein 0.4s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .wb-rise { animation: none; transform: none; }
          .wb-fade, .wb-pop, .wb-fadein { animation: none; opacity: 1; transform: none; }
          .wb-shine, .wb-neon-gold, .wb-neon-red, .wb-flip, .wb-ping, .wb-wheel { animation: none; }
        }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* NO background on <main> — it would cover the fixed footer */}
      <main className="relative z-20 text-[#141414]">
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <section
            ref={hero}
            className="relative flex min-h-[100svh] items-center justify-center bg-[#0B0A08] px-6 pb-28 pt-28 text-white md:px-12"
            style={{ "--sp": 0 } as CSSProperties}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-[#C9A56A]/15 blur-[130px]" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[48%]"
                style={{
                  maskImage: "linear-gradient(to top, #000 40%, transparent)",
                  WebkitMaskImage: "linear-gradient(to top, #000 40%, transparent)",
                }}
              >
                <Waveform />
              </div>
            </div>

            <div
              className="relative z-10 mx-auto max-w-4xl text-center"
              style={{
                transform: "translate3d(0, calc(var(--sp) * 80px), 0)",
                opacity: "calc(1 - var(--sp) * 1.2)",
              }}
            >
              <div className="wb-fade" style={{ animationDelay: "50ms" }}>
                <span
                  className={`inline-flex items-center gap-3 rounded-2xl border-2 px-6 py-3 font-mono text-[clamp(0.95rem,2.2vw,1.35rem)] font-bold tracking-[0.32em] ${
                    isLive ? "wb-neon-red" : "wb-neon-gold"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="wb-ping absolute inline-flex h-full w-full rounded-full bg-current" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  {isLive ? "ON AIR" : "AKORA LIVE"}
                </span>
              </div>

              <h1 className="mt-9 text-[clamp(2.8rem,8vw,6.2rem)] font-semibold leading-[1.02] tracking-tight">
                {["Learn", "live."].map((w, i) => (
                  <span key={w} className="wb-mask mr-[0.22em]">
                    <span className="wb-rise" style={{ animationDelay: `${200 + i * 120}ms` }}>
                      {w}
                    </span>
                  </span>
                ))}
                <br />
                {["Build", "faster."].map((w, i) => (
                  <span key={w} className="wb-mask mr-[0.22em] font-serif font-normal italic last:mr-0">
                    <span className="wb-rise" style={{ animationDelay: `${500 + i * 130}ms` }}>
                      <span className="wb-shine">{w}</span>
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className="wb-fade mx-auto mt-8 max-w-xl text-[16.5px] leading-relaxed text-white/60"
                style={{ animationDelay: "950ms" }}
              >
                Free, practical sessions from the engineers and designers behind AKORA — web, apps,
                SEO, AI, robotics and drones.
              </p>

              <div
                className="wb-fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                style={{ animationDelay: "1100ms" }}
              >
                {nextUp ? (
                  <button
                    type="button"
                    onClick={() => setReserve(nextUp)}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-7 py-4 text-[14.5px] font-medium text-white shadow-[0_14px_40px_-14px_rgba(201,165,106,0.9)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Reserve my seat
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <a
                    href="#topic"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Suggest a topic
                  </a>
                )}
                <a
                  href="#episodes"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-[14.5px] font-medium text-white ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Browse episodes
                </a>
              </div>

              {nextUp && now !== null && (
                <p
                  className="wb-fade mt-8 font-mono text-[11.5px] uppercase tracking-[0.18em] text-white/45"
                  style={{ animationDelay: "1300ms" }}
                >
                  Next: {nextUp.title.length > 46 ? `${nextUp.title.slice(0, 46)}…` : nextUp.title}
                  {" · "}
                  {fmtDate(nextUp.start)}
                </p>
              )}
            </div>

            <div
              className="wb-fade pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40"
              style={{ animationDelay: "1500ms" }}
            >
              Scroll
              <span className="flex h-9 w-[22px] justify-center rounded-full border border-white/25 pt-2">
                <span className="wb-wheel h-1.5 w-[3px] rounded-full bg-[#C9A56A]" />
              </span>
            </div>
          </section>

          {/* ============================ NEXT BROADCAST ====================== */}
          <section className="bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <Reveal className="max-w-2xl">
                <Eyebrow>{isLive ? "On air now" : "Next broadcast"}</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  {isLive ? "We're live " : "Save your "}
                  <span className="relative font-serif font-normal italic">
                    {isLive ? "right now." : "seat."}
                    <Underline />
                  </span>
                </h2>
                {live && (
                  <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-emerald-600">● LIVE DATA</p>
                )}
              </Reveal>

              <Reveal delay={100} dir="scale" className="mt-14">
                {now === null ? (
                  <div className="h-[420px] animate-pulse rounded-[36px] bg-black/[0.05]" />
                ) : nextUp ? (
                  <div className="grid overflow-hidden rounded-[36px] bg-white shadow-[0_50px_110px_-50px_rgba(0,0,0,0.5)] ring-1 ring-black/[0.06] lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[280px]">
                      <Art w={nextUp} />
                      <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-white backdrop-blur">
                        <span className="relative flex h-2 w-2">
                          <span className={`wb-ping absolute inline-flex h-full w-full rounded-full ${isLive ? "bg-red-500" : "bg-emerald-400"}`} />
                          <span className={`relative inline-flex h-2 w-2 rounded-full ${isLive ? "bg-red-500" : "bg-emerald-400"}`} />
                        </span>
                        {isLive ? "ON AIR" : "UPCOMING"}
                      </span>
                    </div>

                    <div className="p-7 sm:p-10">
                      <p className="font-mono text-[12px] tracking-[0.1em] text-[#8A6B32]">
                        {fmtDate(nextUp.start).toUpperCase()} · {fmtTime(nextUp.start)} · {nextUp.durationMin} MIN
                      </p>
                      <h3 className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.5rem)] leading-tight">
                        {nextUp.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#6B6A63]">
                        {nextUp.description}
                      </p>

                      <div className="mt-7">
                        {isLive ? (
                          <p className="font-serif text-[28px] italic" style={{ color: GOLD_DARK }}>
                            It&apos;s happening now — join in!
                          </p>
                        ) : (
                          <Countdown ms={startMs(nextUp) - now} />
                        )}
                      </div>

                      <div className="mt-7 flex items-center gap-3">
                        <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-black/10">
                          <Avatar s={nextUp.speaker} accent={nextUp.accent} />
                        </span>
                        <span>
                          <span className="block text-[14.5px] font-medium">{nextUp.speaker.name}</span>
                          <span className="block text-[12.5px] text-[#6B6A63]">{nextUp.speaker.role}</span>
                        </span>
                      </div>

                      {nextUp.topics.length > 0 && (
                        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                          {nextUp.topics.map((t) => (
                            <li key={t} className="flex items-center gap-2.5 text-[14px] text-[#3a3932]">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4F1E9] ring-1 ring-black/[0.06]">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                              </span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setReserve(nextUp)}
                          className="group inline-flex items-center gap-2 rounded-full bg-[#141414] px-7 py-4 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
                        >
                          Reserve my seat
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                        <a
                          href={calendarLink(nextUp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14.5px] font-medium ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
                        >
                          <CalendarIcon /> Add to calendar
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[36px] bg-white p-10 text-center ring-1 ring-black/[0.06] sm:p-16">
                    <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic">
                      No live session scheduled right now.
                    </p>
                    <p className="mx-auto mt-4 max-w-md text-[15px] text-[#6B6A63]">
                      Watch past recordings below, or tell us what we should teach next.
                    </p>
                    <a
                      href="#topic"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#141414] px-7 py-4 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Suggest a topic
                    </a>
                  </div>
                )}
              </Reveal>
            </div>
          </section>

          {/* ======================= SCROLL-SPEED MARQUEE ===================== */}
          <VelocityMarquee />

          {/* ============================== EPISODES ========================== */}
          <section id="episodes" className="scroll-mt-20 bg-[#EDE8DC] px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32">
            <div className="mx-auto max-w-5xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-xl">
                  <Eyebrow>All episodes</Eyebrow>
                  <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                    The{" "}
                    <span className="relative font-serif font-normal italic">
                      episode deck.
                      <Underline />
                    </span>
                  </h2>
                </div>

                <div role="tablist" aria-label="Filter episodes" className="inline-flex rounded-full bg-white p-1.5 ring-1 ring-black/[0.06]">
                  {(
                    [
                      ["all", "All"],
                      ["upcoming", "Upcoming"],
                      ["ondemand", "On-demand"],
                    ] as [Filter, string][]
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={filter === key}
                      onClick={() => setFilter(key)}
                      className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-200 ${
                        filter === key ? "bg-[#141414] text-white shadow" : "text-[#57564F] hover:text-[#141414]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Reveal>

              <div className="mt-14">
                {now === null ? (
                  <div className="h-[360px] animate-pulse rounded-[32px] bg-black/[0.05]" />
                ) : deckList.length === 0 ? (
                  <p className="rounded-[28px] bg-white px-6 py-16 text-center font-serif text-[22px] italic text-[#6B6A63] ring-1 ring-black/[0.06]">
                    Nothing here yet — check back soon.
                  </p>
                ) : (
                  <Deck key={filter} list={deckList} now={now} onReserve={setReserve} />
                )}
              </div>
            </div>
          </section>

          {/* ============================ TOPIC REQUEST ======================= */}
          <section id="topic" className="scroll-mt-20 bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
            <Reveal dir="scale">
              <div className="relative mx-auto grid max-w-6xl gap-12 overflow-hidden rounded-[36px] bg-[#0B0A08] p-8 text-white sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-16">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A56A]/25 blur-[90px]" />
                <div className="relative">
                  <Eyebrow dark>You pick the topic</Eyebrow>
                  <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                    What should we{" "}
                    <span className="italic" style={{ color: GOLD }}>
                      broadcast next?
                    </span>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
                    The best sessions start with a real question. Tell us what you&apos;re stuck on
                    and we may build a webinar around it.
                  </p>
                  <a
                    href={CONTACT_HREF}
                    className="mt-8 inline-flex items-center gap-2 text-[14px] text-[#E0C28D] transition-colors hover:text-white"
                  >
                    Or talk to us directly <ArrowUpRight />
                  </a>
                </div>
                <div className="relative">
                  <TopicForm />
                </div>
              </div>
            </Reveal>
          </section>
        </PageRevealWrapper>
      </main>

      {reserve && <RegisterModal w={reserve} onClose={closeModal} />}

      {/* Footer is OUTSIDE <main>; it is revealed as the page scrolls up */}
      <Footer />
    </div>
  );
}