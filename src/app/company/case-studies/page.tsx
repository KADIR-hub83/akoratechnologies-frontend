"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — CASE STUDIES PAGE  ("Case Files")
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/company/case-studies/page.tsx  (route: /company/case-studies)
 *
 * WHAT'S UNIQUE
 *  - Hero: giant outlined "PROOF" — a golden LENS follows your cursor and fills
 *    the letters under it.
 *  - Case reel: vertical scroll drives a PINNED HORIZONTAL film reel of cases
 *    (stacked cards on mobile).
 *  - Every case opens as a full "CASE FILE" dossier (challenge, solution,
 *    count-up results, tech stack).
 *  - "Drag to see the difference": before / after slider.
 *
 * LIVE CASE STUDIES (optional)
 *  - Default: the FALLBACK_CASES array below (edit it by hand).
 *  - To load them LIVE from an API / CMS / Google Sheet, create
 *    frontend/.env.local and add:
 *        NEXT_PUBLIC_CASES_URL=https://your-api.com/case-studies
 *    then restart `npm run dev`. Fetched on load + every 60 seconds.
 *    URL must return JSON (array, or { "cases": [...] }) shaped like:
 *      { "id": "1", "title": "...", "client": "Retail brand",
 *        "industry": "Retail", "kind": "web" | "app" | "dash", "year": "2026",
 *        "summary": "...", "challenge": "...", "solution": "...",
 *        "results": [{ "label": "Load time", "value": "-68%" }],
 *        "tech": ["Next.js"], "accent": "#C9A56A",
 *        "image": "https://.../cover.png", "url": "https://...",
 *        "quote": { "text": "...", "name": "...", "role": "..." } }
 *    Server must allow CORS. If the fetch fails, fallback cases stay.
 *
 * COVER IMAGES: put screenshots in frontend/public/cases/ and set
 *    image: "/cases/my-project.png".  Without an image a mock screen is drawn.
 *
 * ALL CASES / NUMBERS BELOW ARE SAMPLE DATA — replace with your real work.
 * Never publish invented results as real client results.
 *
 * FOOTER: content is inside <PageRevealWrapper>, <Footer /> is outside <main>,
 * and <main> has no background -> the fixed footer is revealed correctly.
 * ==========================================================================*/

const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page
const CASES_URL = process.env.NEXT_PUBLIC_CASES_URL;

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";

/* ---------------------------------- Data ---------------------------------- */

type Kind = "web" | "app" | "dash";

type CaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string;
  kind: Kind;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tech: string[];
  accent: string;
  image?: string;
  url?: string;
  quote?: { text: string; name: string; role: string };
};

const FALLBACK_CASES: CaseStudy[] = [
  {
    id: "c1",
    title: "E-commerce Storefront Rebuild",
    client: "Retail brand",
    industry: "Retail",
    kind: "web",
    year: "2026",
    summary: "A slow, template-built shop rebuilt into a fast, conversion-focused storefront.",
    challenge:
      "The old store loaded slowly on mobile, checkout had too many steps and organic traffic was flat.",
    solution:
      "We rebuilt the frontend in Next.js, simplified checkout to a single page, optimised images and added structured data for search.",
    results: [
      { label: "Faster load", value: "-68%" },
      { label: "Conversion", value: "+42%" },
      { label: "Lighthouse", value: "98" },
    ],
    tech: ["Next.js", "Stripe", "Tailwind", "Vercel"],
    accent: "#C9A56A",
  },
  {
    id: "c2",
    title: "Food Delivery App",
    client: "Restaurant group",
    industry: "Food & Beverage",
    kind: "app",
    year: "2026",
    summary: "A native-feel ordering app with live tracking and instant payments.",
    challenge:
      "Orders came through phone calls and third-party apps with high commissions and no customer data.",
    solution:
      "We built an iOS and Android app with menu management, live order tracking, push notifications and in-app payments.",
    results: [
      { label: "Direct orders", value: "+3x" },
      { label: "Repeat users", value: "+55%" },
      { label: "App rating", value: "4.8" },
    ],
    tech: ["React Native", "Firebase", "Node.js"],
    accent: "#E8645F",
  },
  {
    id: "c3",
    title: "Corporate Website + SEO",
    client: "B2B services firm",
    industry: "Professional Services",
    kind: "web",
    year: "2025",
    summary: "A credibility-first company site engineered to rank and generate leads.",
    challenge:
      "The firm was invisible on search and the old site did not explain its services clearly.",
    solution:
      "New information architecture, fast Next.js build and a content plan built alongside the design, not after it.",
    results: [
      { label: "Organic traffic", value: "+210%" },
      { label: "Qualified leads", value: "+64%" },
      { label: "Core Web Vitals", value: "92" },
    ],
    tech: ["Next.js", "Headless CMS", "GA4"],
    accent: "#3178C6",
  },
  {
    id: "c4",
    title: "Fitness & Wellness App",
    client: "Wellness startup",
    industry: "Health & Fitness",
    kind: "app",
    year: "2025",
    summary: "Workout plans, progress tracking and subscriptions in one polished app.",
    challenge:
      "Early users dropped off after the first week because the experience felt generic.",
    solution:
      "Personalised plans, streaks, progress charts and a smooth subscription flow designed with real user feedback.",
    results: [
      { label: "30-day retention", value: "+38%" },
      { label: "Subscriptions", value: "+2.4x" },
      { label: "Crash-free", value: "99.8" },
    ],
    tech: ["React Native", "Node.js", "MongoDB"],
    accent: "#2FA84A",
  },
  {
    id: "c5",
    title: "Real Estate Portal",
    client: "Property agency",
    industry: "Real Estate",
    kind: "web",
    year: "2025",
    summary: "Smart listings with filters, maps and instant lead capture.",
    challenge:
      "Listings were buried in spreadsheets and buyers could not filter or compare properties.",
    solution:
      "A searchable portal with map view, saved searches, agent dashboards and WhatsApp lead alerts.",
    results: [
      { label: "Lead response", value: "-80%" },
      { label: "Listings online", value: "500" },
      { label: "Bounce rate", value: "-31%" },
    ],
    tech: ["Next.js", "MongoDB", "Maps API"],
    accent: "#635BFF",
  },
  {
    id: "c6",
    title: "Drone Survey Dashboard",
    client: "Agritech team",
    industry: "Agriculture",
    kind: "dash",
    year: "2026",
    summary: "Ground-control software and flight tuning for field surveys.",
    challenge:
      "Survey flights were manual and mission data was scattered across tools.",
    solution:
      "We tuned the flight controller, integrated a custom payload and built a dashboard for missions, telemetry and reports.",
    results: [
      { label: "Survey time", value: "-60%" },
      { label: "Area per flight", value: "+45%" },
      { label: "Data errors", value: "-70%" },
    ],
    tech: ["ROS", "Python", "React", "Telemetry"],
    accent: "#38BDF8",
  },
];

const STATS = [
  { to: 60, s: "+", l: "Projects shipped" },
  { to: 98, s: "", l: "Avg. Lighthouse score" },
  { to: 12, s: " days", l: "Avg. launch time" },
  { to: 6, s: "", l: "Disciplines, one team" },
];

const COMPARE = [
  { label: "Load time", before: "6.2s", after: "1.1s" },
  { label: "Lighthouse", before: "41", after: "98" },
  { label: "Bounce rate", before: "72%", after: "34%" },
];

/* ------------------------------ Live case fetch --------------------------- */

const str = (v: unknown, fb: string) => (typeof v === "string" && v.trim() ? v : fb);
const strList = (v: unknown) =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()).map(String) : [];

function normalizeCases(data: unknown): CaseStudy[] | null {
  const arr = Array.isArray(data) ? data : (data as { cases?: unknown } | null)?.cases;
  if (!Array.isArray(arr)) return null;
  return arr
    .filter((c) => c && typeof c === "object")
    .map((raw, i) => {
      const c = raw as Record<string, unknown>;
      const kind: Kind = c.kind === "app" || c.kind === "dash" ? c.kind : "web";
      const results = Array.isArray(c.results)
        ? c.results
            .filter((r) => r && typeof r === "object")
            .map((r) => {
              const o = r as Record<string, unknown>;
              return { label: str(o.label, ""), value: str(o.value, "") };
            })
            .filter((r) => r.label && r.value)
        : [];
      const q = c.quote as Record<string, unknown> | undefined;
      return {
        id: String(c.id ?? i),
        title: str(c.title, "Untitled case"),
        client: str(c.client, "Client"),
        industry: str(c.industry, "Industry"),
        kind,
        year: str(c.year, ""),
        summary: str(c.summary, ""),
        challenge: str(c.challenge, ""),
        solution: str(c.solution, ""),
        results,
        tech: strList(c.tech),
        accent: str(c.accent, GOLD),
        image: typeof c.image === "string" && c.image ? c.image : undefined,
        url: typeof c.url === "string" && c.url ? c.url : undefined,
        quote:
          q && typeof q.text === "string"
            ? { text: q.text, name: str(q.name, ""), role: str(q.role, "") }
            : undefined,
      };
    });
}

function useCases() {
  const [cases, setCases] = useState<CaseStudy[]>(FALLBACK_CASES);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!CASES_URL) return;
    let alive = true;
    const ctrl = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(CASES_URL, { signal: ctrl.signal, cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const parsed = normalizeCases(await res.json());
        if (alive && parsed && parsed.length) {
          setCases(parsed);
          setLive(true);
        }
      } catch {
        /* keep fallback cases */
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

  return { cases, live };
}

/* ------------------------------ Motion helpers ---------------------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

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

/** Counts a plain number up when it scrolls into view. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, go] = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/** Animates the number inside strings like "+42%", "-68%", "4.8", "+3x". */
function AnimatedValue({ value, go }: { value: string; go: boolean }) {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m || !go) return;
    if (prefersReducedMotion()) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go, value]);

  if (!m) return <>{value}</>;
  return (
    <>
      {m[1]}
      {n.toFixed(decimals)}
      {m[3]}
    </>
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
const ArrowRight = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
const CloseIcon = () => (
  <Icon className="h-5 w-5">
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
);

/* ------------------------------ Mock screens ------------------------------ */

function MockScreen({ kind, accent }: { kind: Kind; accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
        style={{ background: `${accent}55` }}
      />

      {kind === "web" && (
        <div className="relative w-[78%] overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-transform duration-500 group-hover:scale-[1.03]">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#FBFAF6] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            <span className="ml-2 h-2 w-24 rounded-full bg-black/[0.06]" />
          </div>
          <div className="space-y-2 p-4">
            <div className="h-3 w-2/3 rounded" style={{ background: accent }} />
            <div className="h-2 w-1/2 rounded bg-black/10" />
            <div className="h-2 w-2/5 rounded bg-black/[0.07]" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg"
                  style={{ background: `${accent}${i === 1 ? "44" : "22"}` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {kind === "app" && (
        <div className="relative h-[84%] w-[34%] min-w-[120px] rounded-[24px] bg-[#141414] p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.04]">
          <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-[19px] bg-white p-2.5">
            <div className="mx-auto h-1 w-8 rounded-full bg-black/15" />
            <div className="h-10 rounded-xl" style={{ background: accent }} />
            <div className="h-2 w-3/4 rounded bg-black/10" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-lg" style={{ background: `${accent}33` }} />
              <div className="h-14 rounded-lg bg-black/[0.05]" />
            </div>
            <div className="h-9 rounded-lg bg-black/[0.05]" />
            <div className="mt-auto h-7 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      )}

      {kind === "dash" && (
        <div className="relative w-[82%] overflow-hidden rounded-xl bg-[#0B0A08] p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.03]">
          <div className="flex items-center justify-between">
            <span className="h-2 w-20 rounded-full bg-white/20" />
            <span className="h-2 w-8 rounded-full" style={{ background: accent }} />
          </div>
          <div className="mt-4 flex h-24 items-end gap-2">
            {[40, 65, 50, 85, 60, 95, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}55` }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-6 rounded bg-white/[0.07]" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Cover({ c }: { c: CaseStudy }) {
  return (
    <div
      className="group relative h-full min-h-[240px] w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${c.accent}26 0%, ${c.accent}66 100%)` }}
    >
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.image}
          alt={c.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <MockScreen kind={c.kind} accent={c.accent} />
      )}
    </div>
  );
}

/* -------------------------------- Case card ------------------------------- */

function CaseCard({
  c,
  index,
  total,
  onOpen,
  tall,
}: {
  c: CaseStudy;
  index: number;
  total: number;
  onOpen: (c: CaseStudy) => void;
  tall?: boolean;
}) {
  return (
    <article
      className={`group grid overflow-hidden rounded-[32px] bg-[#F4F1E9] text-[#141414] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] lg:grid-cols-[1.05fr_0.95fr] ${
        tall ? "lg:h-[min(72vh,640px)]" : ""
      }`}
    >
      <div className="group relative min-h-[240px]">
        <Cover c={c} />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-[#141414] shadow-sm backdrop-blur">
          FILE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A8980]">
          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">{c.industry}</span>
          {c.year && (
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">{c.year}</span>
          )}
        </div>

        <h3 className="mt-5 font-serif text-[clamp(1.6rem,2.5vw,2.3rem)] leading-tight">{c.title}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#6B6A63]">{c.summary}</p>

        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {c.results.slice(0, 3).map((r) => (
            <div key={r.label} className="rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.05]">
              <p className="font-serif text-[24px] italic leading-none" style={{ color: GOLD_DARK }}>
                {r.value}
              </p>
              <p className="mt-2 text-[10.5px] uppercase leading-tight tracking-[0.1em] text-[#8A8980]">
                {r.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <button
            type="button"
            onClick={() => onOpen(c)}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
          >
            Open case file
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
          <div className="flex flex-wrap gap-1.5">
            {c.tech.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-[#57564F]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- Case reel ------------------------------- */

function CaseReel({ cases, live, onOpen }: { cases: CaseStudy[]; live: boolean; onOpen: (c: CaseStudy) => void }) {
  const sec = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const f = () => setDesktop(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    let raf = 0;

    const layout = () => {
      const s = sec.current;
      const t = track.current;
      if (!s || !t) return;
      const maxX = Math.max(0, t.scrollWidth - window.innerWidth);
      s.style.height = `${maxX + window.innerHeight}px`;
    };

    const update = () => {
      raf = 0;
      const s = sec.current;
      const t = track.current;
      if (!s || !t) return;
      const r = s.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = clamp(-r.top / total, 0, 1);
      const maxX = Math.max(0, t.scrollWidth - window.innerWidth);
      t.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setActive(Math.min(cases.length, Math.round(p * cases.length)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      layout();
      onScroll();
    };

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(onResize, 400); // after fonts / images settle
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [desktop, cases.length]);

  /* ---- mobile / tablet: simple stack ---- */
  if (!desktop) {
    return (
      <section className="bg-[#0B0A08] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow dark>Case files</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.2rem,8vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
            {cases.length} files.{" "}
            <span className="font-serif font-normal italic" style={{ color: GOLD }}>
              Zero fluff.
            </span>
          </h2>
          {live && <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-emerald-300">● LIVE DATA</p>}
          <div className="mt-12 space-y-6">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={60}>
                <CaseCard c={c} index={i} total={cases.length} onOpen={onOpen} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---- desktop: pinned horizontal film reel ---- */
  return (
    <section ref={sec} className="relative bg-[#0B0A08] text-white" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-80 w-[40rem] rounded-full bg-[#C9A56A]/15 blur-[130px]" />
          {/* film perforations */}
          <div
            className="absolute inset-x-0 top-5 h-3 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#fff 0 18px,transparent 18px 40px)",
              maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)",
              WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-5 h-3 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#fff 0 18px,transparent 18px 40px)",
              maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)",
              WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)",
            }}
          />
        </div>

        <div ref={track} className="flex h-full items-center gap-10 pl-[8vw] pr-[8vw] pt-8 will-change-transform">
          {/* intro slide */}
          <div className="w-[min(34vw,480px)] shrink-0">
            <Eyebrow dark>Case files</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
              {cases.length} files.
              <br />
              <span className="font-serif font-normal italic" style={{ color: GOLD }}>
                Zero fluff.
              </span>
            </h2>
            <p className="mt-6 max-w-sm text-[15.5px] leading-relaxed text-white/55">
              Real problems, honest numbers. Keep scrolling — the reel moves sideways.
            </p>
            {live && <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-emerald-300">● LIVE DATA</p>}
            <div className="cs-nudge mt-8 inline-flex items-center gap-3 text-[#E0C28D]">
              <span className="font-mono text-[12px] tracking-[0.2em]">SCROLL</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          {cases.map((c, i) => (
            <div key={c.id} className="w-[min(78vw,1000px)] shrink-0">
              <CaseCard c={c} index={i} total={cases.length} onOpen={onOpen} tall />
            </div>
          ))}

          {/* end slide */}
          <div className="w-[min(34vw,460px)] shrink-0">
            <h3 className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.1]">
              File {String(cases.length + 1).padStart(2, "0")} could be{" "}
              <span className="italic" style={{ color: GOLD }}>
                yours.
              </span>
            </h3>
            <a
              href={CONTACT_HREF}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* HUD: counter + progress */}
        <div className="pointer-events-none absolute bottom-10 left-[8vw] right-[8vw] flex items-center gap-5">
          <span className="font-mono text-[12px] tracking-[0.2em] text-white/60">
            {String(Math.min(active, cases.length)).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-white/15">
            <div
              ref={bar}
              className="h-full origin-left bg-gradient-to-r from-[#8A6B32] to-[#E7D6B6]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Before / After ----------------------------- */

function Compare() {
  const [x, setX] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const setFrom = (e: ReactPointerEvent) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(clamp(((e.clientX - r.left) / r.width) * 100, 0, 100));
  };

  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") setX((v) => clamp(v - 5, 0, 100));
    if (e.key === "ArrowRight") setX((v) => clamp(v + 5, 0, 100));
  };

  return (
    <div>
      <div
        ref={box}
        onPointerDown={(e) => {
          drag.current = true;
          box.current?.setPointerCapture(e.pointerId);
          setFrom(e);
        }}
        onPointerMove={(e) => drag.current && setFrom(e)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.08] sm:aspect-[16/9]"
      >
        {/* AFTER (base layer) */}
        <div className="absolute inset-0 bg-[#F4F1E9] p-5 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="h-3 w-24 rounded-full bg-[#141414]" />
            <span className="flex gap-3">
              <span className="h-2 w-10 rounded-full bg-black/20" />
              <span className="h-2 w-10 rounded-full bg-black/20" />
              <span className="h-6 w-16 rounded-full bg-[#141414]" />
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="h-5 w-4/5 rounded" style={{ background: GOLD }} />
              <div className="mt-3 h-5 w-3/5 rounded bg-[#141414]" />
              <div className="mt-4 h-2.5 w-full rounded bg-black/10" />
              <div className="mt-2 h-2.5 w-4/5 rounded bg-black/10" />
              <div className="mt-6 h-9 w-32 rounded-full" style={{ background: `linear-gradient(90deg,${GOLD_DARK},${GOLD})` }} />
            </div>
            <div className="hidden rounded-2xl sm:block" style={{ background: `linear-gradient(135deg,${GOLD}55,${GOLD}22)` }} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white ring-1 ring-black/5 sm:h-20" />
            ))}
          </div>
        </div>

        {/* BEFORE (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden bg-[#D8D6D0] p-5 sm:p-8"
          style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
        >
          <div className="flex items-center justify-between">
            <span className="h-3 w-16 rounded bg-[#6b6b6b]" />
            <span className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-3 w-7 rounded-sm bg-[#8a8a8a]" />
              ))}
            </span>
          </div>
          <div className="mt-4 rounded bg-[#C23B3B] px-3 py-2 text-center font-mono text-[11px] font-bold tracking-widest text-white sm:text-[13px]">
            !!! SALE — BUY NOW !!!
          </div>
          <div className="mt-4 grid grid-cols-[1fr_1.4fr_0.8fr] gap-2">
            <div className="h-24 rounded bg-[#aaa] sm:h-32" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-[#888]" />
              <div className="h-3 w-5/6 rounded bg-[#999]" />
              <div className="h-3 w-full rounded bg-[#888]" />
              <div className="h-3 w-2/3 rounded bg-[#999]" />
              <div className="h-3 w-full rounded bg-[#888]" />
            </div>
            <div className="h-24 rounded bg-[#b9b9b9] sm:h-32" />
          </div>
          <div className="absolute bottom-6 right-6 h-20 w-36 rounded border-2 border-[#777] bg-[#f0f0f0] p-2 shadow-lg sm:h-24 sm:w-44">
            <div className="h-2 w-full rounded bg-[#999]" />
            <div className="mt-2 h-2 w-4/5 rounded bg-[#bbb]" />
            <div className="mt-3 h-5 w-14 rounded bg-[#C23B3B]" />
          </div>
        </div>

        {/* labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-white backdrop-blur">
          BEFORE
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-[#141414] backdrop-blur">
          AFTER
        </span>

        {/* handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(x)}
          onKeyDown={onKey}
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] outline-none focus-visible:shadow-[0_0_0_3px_#C9A56A]"
          style={{ left: `${x}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#141414] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {/* metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {COMPARE.map((m) => (
          <div key={m.label} className="rounded-[24px] bg-white p-6 ring-1 ring-black/[0.06]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8980]">{m.label}</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif text-[22px] text-[#9a9a94] line-through decoration-[#C23B3B]/60">
                {m.before}
              </span>
              <ArrowRight className="h-4 w-4 text-[#8A6B32]" />
              <span className="font-serif text-[34px] italic leading-none" style={{ color: GOLD_DARK }}>
                {m.after}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[12.5px] text-[#8A8980]">
        Illustrative example with sample metrics — replace with a real before/after from your work.
      </p>
    </div>
  );
}

/* ------------------------------- Case modal ------------------------------- */

function CaseModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => setGo(true), 350);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={c.title}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close case file"
        onClick={onClose}
        className="cs-fadein absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        data-lenis-prevent
        className="cs-pop relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[32px] bg-[#F4F1E9] text-[#141414] shadow-2xl sm:rounded-[32px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#141414] shadow-md ring-1 ring-black/10 transition-transform duration-300 hover:rotate-90"
        >
          <CloseIcon />
        </button>

        <div className="relative h-56 sm:h-72">
          <Cover c={c} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1E9] via-transparent to-transparent" />
        </div>

        <div className="relative -mt-10 px-6 pb-10 sm:px-12">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A8980]">
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">{c.industry}</span>
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">{c.client}</span>
            {c.year && <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">{c.year}</span>}
          </div>

          <h3 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">{c.title}</h3>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#8A6B32]">01 · THE CHALLENGE</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3a3932]">{c.challenge}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#8A6B32]">02 · WHAT WE DID</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3a3932]">{c.solution}</p>
            </div>
          </div>

          {c.results.length > 0 && (
            <div className="mt-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#8A6B32]">03 · THE RESULT</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {c.results.map((r) => (
                  <div key={r.label} className="rounded-[22px] bg-[#0B0A08] p-6 text-white">
                    <p className="font-serif text-[44px] italic leading-none" style={{ color: GOLD }}>
                      <AnimatedValue value={r.value} go={go} />
                    </p>
                    <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-white/50">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {c.quote && (
            <blockquote
              className="mt-10 border-l-2 pl-6 font-serif text-[clamp(1.2rem,2vw,1.6rem)] italic leading-snug text-[#2a2924]"
              style={{ borderColor: GOLD }}
            >
              &ldquo;{c.quote.text}&rdquo;
              <footer className="mt-3 font-sans text-[13px] not-italic text-[#6B6A63]">
                {c.quote.name}
                {c.quote.role ? ` · ${c.quote.role}` : ""}
              </footer>
            </blockquote>
          )}

          <div className="mt-10 flex flex-wrap gap-2">
            {c.tech.map((t) => (
              <span key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[12.5px] text-[#3a3932] ring-1 ring-black/[0.06]">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT_HREF}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-7 py-4 text-[14.5px] font-medium text-white shadow-[0_14px_34px_-14px_rgba(138,107,50,0.9)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get a result like this
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
              >
                Visit live project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero({ count }: { count: number }) {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const w = word.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      w.style.setProperty("--px", `${e.clientX - r.left}px`);
      w.style.setProperty("--py", `${e.clientY - r.top}px`);
      const s = el.getBoundingClientRect();
      el.style.setProperty("--cx", `${e.clientX - s.left}px`);
      el.style.setProperty("--cy", `${e.clientY - s.top}px`);
      el.style.setProperty("--ho", "1");
    };
    const onLeave = () => el.style.setProperty("--ho", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const mask =
    "radial-gradient(230px circle at var(--px, 50%) var(--py, 50%), #000 0%, #000 42%, transparent 100%)";

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center bg-[#F4F1E9] px-6 pb-24 pt-28 md:px-12"
      style={{ "--ho": 0 } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#141414 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#C9A56A]/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[130px]" />
        {/* lens ring that follows the cursor */}
        <div
          className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A56A]/70 transition-opacity duration-300"
          style={{
            left: "var(--cx, 50%)",
            top: "var(--cy, 50%)",
            opacity: "var(--ho)",
            boxShadow: "0 0 0 1px rgba(201,165,106,0.25), 0 0 40px rgba(201,165,106,0.35)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="cs-fade" style={{ animationDelay: "50ms" }}>
          <Eyebrow>Case studies</Eyebrow>
        </div>

        <div ref={word} className="relative mx-auto mt-6 inline-block">
          <span
            className="block select-none font-serif text-[clamp(5.5rem,24vw,19rem)] font-semibold italic leading-[0.95] tracking-tight text-transparent"
            style={{ WebkitTextStroke: "2px rgba(20,20,20,0.22)" }}
          >
            PROOF
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 block select-none bg-gradient-to-br from-[#8A6B32] via-[#C9A56A] to-[#E7D6B6] bg-clip-text font-serif text-[clamp(5.5rem,24vw,19rem)] font-semibold italic leading-[0.95] tracking-tight text-transparent"
            style={{ WebkitMaskImage: mask, maskImage: mask }}
          >
            PROOF
          </span>
        </div>

        <h1 className="mt-2 text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-tight">
          {["not", "promises."].map((w, i) => (
            <span key={w} className="cs-mask mr-[0.22em] last:mr-0">
              <span className="cs-rise" style={{ animationDelay: `${300 + i * 140}ms` }}>
                {i === 1 ? (
                  <span className="relative font-serif font-normal italic">
                    <span className="cs-shine">{w}</span>
                    <Underline />
                  </span>
                ) : (
                  w
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="cs-fade mx-auto mt-8 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]"
          style={{ animationDelay: "800ms" }}
        >
          {count} case files — real problems, honest numbers, and the team that fixed them.
        </p>

        <p
          className="cs-fade mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8980]"
          style={{ animationDelay: "1000ms" }}
        >
          Move your cursor over the word ↑
        </p>
      </div>

      <div
        className="cs-fade pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8A8980]"
        style={{ animationDelay: "1300ms" }}
      >
        Scroll
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-black/25 pt-2">
          <span className="cs-wheel h-1.5 w-[3px] rounded-full bg-[#8A6B32]" />
        </span>
      </div>
    </section>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function CaseStudiesPage() {
  const { cases, live } = useCases();
  const [open, setOpen] = useState<CaseStudy | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="overflow-x-clip">
      <style>{`
        @keyframes cs-rise { from { transform: translateY(118%); } to { transform: translateY(0); } }
        .cs-mask { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.08em 0.14em; margin-bottom: -0.14em; }
        .cs-rise { display: inline-block; transform: translateY(118%); animation: cs-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes cs-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .cs-fade { opacity: 0; animation: cs-fade 0.9s ease forwards; }

        @keyframes cs-shine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        .cs-shine {
          display: inline-block;
          background: linear-gradient(100deg, #141414 0%, #8a6b32 30%, #e7d6b6 50%, #8a6b32 70%, #141414 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cs-shine 6s linear infinite;
        }

        @keyframes cs-wheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        .cs-wheel { animation: cs-wheel 1.6s ease-in-out infinite; }

        @keyframes cs-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
        .cs-nudge { animation: cs-nudge 1.8s ease-in-out infinite; }

        @keyframes cs-pop { from { opacity: 0; transform: translateY(40px) scale(0.97); } to { opacity: 1; transform: none; } }
        .cs-pop { animation: cs-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes cs-fadein { from { opacity: 0; } to { opacity: 1; } }
        .cs-fadein { animation: cs-fadein 0.4s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .cs-rise { animation: none; transform: none; }
          .cs-fade, .cs-pop, .cs-fadein { animation: none; opacity: 1; transform: none; }
          .cs-shine, .cs-wheel, .cs-nudge { animation: none; }
        }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* NO background on <main> — it would cover the fixed footer */}
      <main className="relative z-20 text-[#141414]">
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <Hero count={cases.length} />

          {/* ============================== STATS ============================= */}
          <section className="bg-[#F4F1E9] px-6 pb-24 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.l} delay={i * 90} dir="scale">
                  <div className="rounded-[24px] bg-white p-7 text-center ring-1 ring-black/[0.06]">
                    <p className="font-serif text-[48px] italic leading-none">
                      <CountUp to={s.to} suffix={s.s} />
                    </p>
                    <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-[#8A8980]">{s.l}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ============================ CASE REEL =========================== */}
          <CaseReel cases={cases} live={live} onOpen={setOpen} />

          {/* ============================ BEFORE / AFTER ====================== */}
          <section className="bg-[#EDE8DC] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-5xl">
              <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                <Eyebrow>The difference</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  Drag to see{" "}
                  <span className="relative font-serif font-normal italic">
                    what changes.
                    <Underline />
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Compare />
              </Reveal>
            </div>
          </section>

          {/* ================================ CTA ============================= */}
          <section className="bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
            <Reveal dir="scale">
              <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#0B0A08] px-8 py-16 text-center text-white sm:px-16 sm:py-20">
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#C9A56A]/25 blur-[90px]" />
                <div className="relative">
                  <Eyebrow dark>Your turn</Eyebrow>
                  <h2 className="mx-auto mt-6 max-w-2xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1]">
                    Let&apos;s write your{" "}
                    <span className="italic" style={{ color: GOLD }}>
                      next case file.
                    </span>
                  </h2>
                  <a
                    href={CONTACT_HREF}
                    className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start a project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
        </PageRevealWrapper>
      </main>

      {open && <CaseModal c={open} onClose={close} />}

      {/* Footer is OUTSIDE <main>; it is revealed as the page scrolls up */}
      <Footer />
    </div>
  );
}