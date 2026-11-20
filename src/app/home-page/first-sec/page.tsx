"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import Navbar from "@/app/components/Navbar";

/* ============================================================
   FONTS — serif display for luxury feel, clean sans for body,
   mono for the code console.
============================================================ */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ============================================================
   TOKENS (white / premium palette)
   paper   #FBFAF6  ink #0E0E10  graphite #6B6B74
   brass   #9C7A3C  brass-light #C7A165  indigo #1F2251
============================================================ */

/* ============================================================
   HOOK — cursor spotlight that follows the mouse over the hero
============================================================ */
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return { ref, pos };
}

/* ============================================================
   HOOK — simple mount-triggered reveal (for headline / copy)
============================================================ */
function useMounted(delayMs = 0) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return on;
}

/* ============================================================
   MAGNETIC BUTTON — nudges toward the cursor on hover
============================================================ */
function MagneticButton({
  children,
  href,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setT({ x: relX * 0.22, y: relY * 0.3 });
  }
  function onLeave() {
    setT({ x: 0, y: 0 });
  }

  return (
    <a
      ref={ref}
      href={href ?? "#"}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
}

/* ============================================================
   TRUST MARQUEE — infinite scrolling strip of credibility markers
============================================================ */
const TRUST_ITEMS = [
  "D2C Retail",
  "Fintech",
  "Healthcare",
  "Real Estate",
  "Hospitality",
  "EdTech",
  "Fashion Houses",
  "Logistics",
];

// function TrustMarquee() {
//   return (
//     <div className="relative overflow-hidden border-y border-[#E7E4DC] bg-[#FBFAF6] py-5">
//       <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FBFAF6] to-transparent" />
//       <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FBFAF6] to-transparent" />
//       <div className="inline-flex animate-akora-marquee whitespace-nowrap">
//         {[0, 1].map((dup) => (
//           <span key={dup} className="inline-flex items-center gap-14 pr-14">
//             <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#9C7A3C]">
//               Trusted across
//             </span>
//             {TRUST_ITEMS.map((item) => (
//               <span
//                 key={item}
//                 className="inline-flex items-center gap-14 font-[var(--font-display)] text-[17px] italic text-[#6B6B74]"
//               >
//                 {item}
//                 <span className="h-1 w-1 rounded-full bg-[#C7A165]" />
//               </span>
//             ))}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

/* ============================================================
   LIVE BUILD CONSOLE — the signature element.
   Multi-file editor (page.tsx / style.css / deploy.sh) types
   itself out tab by tab, a progress bar fills, then the whole
   panel morphs into a living, breathing product preview: a
   cursor moves, clicks a button, a toast slides in, a small
   revenue chart grows, and pagination dots cycle — once —
   then everything settles into its final resting state.
============================================================ */

// const FILES: { name: string; lines: string[] }[] = [
//   {
//     name: "page.tsx",
//     lines: [
//       '<span class="text-[#8b5cf6]">export default function</span> <span class="text-[#0ea5a0]">HomePage</span>() {',
//       '&nbsp;&nbsp;<span class="text-[#8b5cf6]">return</span> (',
//       '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="text-[#c7a165]">Hero</span>',
//       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title=<span class="text-[#9C7A3C]">"Akora Technologies"</span>',
//       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;theme=<span class="text-[#9C7A3C]">"premium-white"</span>',
//       "&nbsp;&nbsp;&nbsp;&nbsp;/&gt;",
//       "&nbsp;&nbsp;);",
//       "}",
//     ],
//   },
//   {
//     name: "style.css",
//     lines: [
//       ".hero {",
//       '&nbsp;&nbsp;background: <span class="text-[#9C7A3C]">#FBFAF6</span>;',
//       '&nbsp;&nbsp;font-family: <span class="text-[#9C7A3C]">"Fraunces"</span>, serif;',
//       "&nbsp;&nbsp;letter-spacing: -0.02em;",
//       "}",
//       "",
//       ".cta {",
//       '&nbsp;&nbsp;background: <span class="text-[#9C7A3C]">linear-gradient(#C7A165, #9C7A3C)</span>;',
//       "}",
//     ],
//   },
//   {
//     name: "deploy.sh",
//     lines: [
//       "$ akora build --production",
//       '<span class="text-[#0ea5a0]">✓</span> Optimizing fonts &amp; images',
//       '<span class="text-[#0ea5a0]">✓</span> Lighthouse score: 98 / 100',
//       '<span class="text-[#0ea5a0]">✓</span> Deployed → akoratechnologies.com',
//     ],
//   },
// ];

/* ------------------------------ Code content ------------------------------ */

type Kind = "k" | "s" | "c" | "f" | "p";
type Tok = [string, Kind];
type FileDef = { name: string; lines: Tok[][] };

const TOKEN_COLOR: Record<Kind, string> = {
  k: "text-[#9C7A3C] font-medium",
  s: "text-[#2F7D6B]",
  c: "text-[#A3A3AB] italic",
  f: "text-[#1F2251]",
  p: "text-[#3a3a40]",
};

const FILES: FileDef[] = [
  {
    name: "page.tsx",
    lines: [
      [["export default function ", "k"], ["Leadership", "f"], ["() {", "p"]],
      [["  return ", "k"], ["<Hero", "f"], [" title=", "p"], ['"The people behind every build."', "s"]],
      [["    orbit", "p"], ["={", "p"], ["true", "k"], ["} />", "f"]],
      [["}", "p"]],
    ],
  },
  {
    name: "style.css",
    lines: [
      [[".hero", "f"], [" {", "p"]],
      [["  background: ", "p"], ["#F5F3EC", "s"], [";", "p"]],
      [["  font-family: ", "p"], ['"Fraunces"', "s"], [", serif;", "p"]],
      [["}", "p"]],
      [[".orbit", "f"], [" {", "p"]],
      [["  animation: ", "p"], ["spin 40s linear infinite", "s"], [";", "p"]],
      [["}", "p"]],
    ],
  },
  {
    name: "deploy.sh",
    lines: [
      [["# ship it", "c"]],
      [["$ ", "c"], ["npm run build", "p"]],
      [["$ ", "c"], ["vercel --prod", "p"]],
      [["✓ Deployed to production", "s"]],
    ],
  },
];

const lineLen = (l: Tok[]) => l.reduce((n, [t]) => n + t.length, 0);
const fileLen = (f: FileDef) => f.lines.reduce((n, l) => n + lineLen(l) + 1, 0);

function CodeView({ lines, count, typing }: { lines: Tok[][]; count: number; typing: boolean }) {
  let left = count;
  const out: ReactNode[] = [];
  for (let li = 0; li < lines.length && left >= 0; li++) {
    const line = lines[li];
    const len = lineLen(line);
    let used = left;
    const spans: ReactNode[] = [];
    line.forEach(([text, kind], ti) => {
      if (used <= 0) return;
      const part = text.slice(0, used);
      used -= part.length;
      spans.push(
        <span key={ti} className={TOKEN_COLOR[kind]}>
          {part}
        </span>
      );
    });
    const isCurrent = left <= len;
    out.push(
      <div key={li} className="flex">
        <span className="w-7 shrink-0 select-none pr-3 text-right text-[#C4C1B6]">{li + 1}</span>
        <span className="whitespace-pre">
          {spans}
          {isCurrent && typing && (
            <span
              className="akc-motion ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] bg-[#9C7A3C]"
              style={{ animation: "akc-blink 1s steps(1) infinite" }}
            />
          )}
        </span>
      </div>
    );
    left -= len + 1;
  }
  return <>{out}</>;
}

/* ------------------------------ Orbit content ----------------------------- */

/* ------------------------------ Orbit content ----------------------------- */

const portrait = (g: "men" | "women", n: number) =>
  `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

const G1 = "from-[#C7A165] to-[#8a6a30]";
const G2 = "from-[#3b3f8f] to-[#1F2251]";
const G3 = "from-[#0ea5a0] to-[#0b6f6c]";
const G4 = "from-[#E8645F] to-[#B8383A]";
const G5 = "from-[#7a6df0] to-[#4a3fb8]";

type Person = { n: string; src: string; g: string };

// same photos as the leadership page (swap src with /team/xyz.jpg for real photos)
const P = {
  aarav: { n: "AK", src: portrait("men", 32), g: G1 },
  rohan: { n: "RS", src: portrait("men", 44), g: G2 },
  meera: { n: "MJ", src: portrait("women", 44), g: G3 },
  pranav: { n: "PN", src: portrait("men", 65), g: G5 },
  kabir: { n: "KV", src: portrait("men", 75), g: G2 },
  ananya: { n: "AR", src: portrait("women", 68), g: G4 },
  vikram: { n: "VS", src: portrait("men", 12), g: G3 },
  isha: { n: "IP", src: portrait("women", 26), g: G1 },
  dev: { n: "DM", src: portrait("men", 52), g: G5 },
  sneha: { n: "SI", src: portrait("women", 12), g: G4 },
  arnav: { n: "AG", src: portrait("men", 22), g: G2 },
  tara: { n: "TM", src: portrait("women", 33), g: G3 },
} satisfies Record<string, Person>;

const RINGS: {
  size: number;
  dur: number;
  rev: boolean;
  avatars: { a: number; s: number; p: Person; gold?: boolean }[];
}[] = [
  {
    size: 360,
    dur: 42,
    rev: false,
    avatars: [
      { a: 10, s: 46, p: P.aarav, gold: true },
      { a: 100, s: 40, p: P.pranav },
      { a: 190, s: 40, p: P.arnav },
      { a: 280, s: 40, p: P.tara },
    ],
  },
  {
    size: 490,
    dur: 60,
    rev: true,
    avatars: [
      { a: 45, s: 42, p: P.rohan },
      { a: 135, s: 40, p: P.meera },
      { a: 225, s: 42, p: P.dev },
      { a: 315, s: 40, p: P.sneha },
    ],
  },
  {
    size: 620,
    dur: 80,
    rev: false,
    avatars: [
      { a: 20, s: 44, p: P.kabir },
      { a: 110, s: 42, p: P.ananya },
      { a: 200, s: 44, p: P.vikram },
      { a: 290, s: 42, p: P.isha },
    ],
  },
];

/** Round photo with gradient+initials fallback */
function Face({
  p,
  size,
  className = "",
  ring = "ring-[3px] ring-white",
}: {
  p: Person;
  size: number;
  className?: string;
  ring?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-[0_10px_24px_-8px_rgba(14,14,16,0.45)] ${ring} ${className}`}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${p.g} font-[var(--font-mono)] text-[11px] font-semibold text-white`}
        >
          {p.n}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/* -------------------------------- Component ------------------------------- */

type Phase = "typing" | "building" | "site";

let hasPlayed = false;
function LiveConsole({ visitHref = "/company/leadership" }: { visitHref?: string }) {
  const [phase, setPhase] = useState<Phase>(hasPlayed ? "site" : "typing");
  const [activeTab, setActiveTab] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(hasPlayed ? 100 : 0);
  const [step, setStep] = useState(hasPlayed ? 4 : 0);
  const [showVisit, setShowVisit] = useState(hasPlayed);

  // runs ONE time, no loop
  useEffect(() => {
    if (hasPlayed) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let interval: ReturnType<typeof setInterval> | undefined;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const reveal = () => {
      setPhase("site");
      at(700, () => setStep(1)); // rings
      at(1300, () => setStep(2)); // photos pop in
      at(2000, () => setStep(3)); // headline + underline
      at(2700, () => setStep(4)); // text + pill + badge
      at(3500, () => {
        setShowVisit(true); // Visit website
        hasPlayed = true;
      });
    };

    const build = () => {
      setPhase("building");
      let p = 0;
      interval = setInterval(() => {
        p += 2;
        setProgress(Math.min(p, 100));
        if (p >= 100) {
          clearInterval(interval);
          at(350, reveal);
        }
      }, 20);
    };

    const typeFile = (f: number) => {
      setActiveTab(f);
      setCount(0);
      const total = fileLen(FILES[f]);
      let c = 0;
      interval = setInterval(() => {
        c += 2;
        setCount(Math.min(c, total));
        if (c >= total) {
          clearInterval(interval);
          at(380, () => (f + 1 < FILES.length ? typeFile(f + 1) : build()));
        }
      }, 16);
    };

    at(900, () => typeFile(0));

    return () => {
      timers.forEach(clearTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const statusLabel = phase === "typing" ? "Coding" : phase === "building" ? "Building" : "Live";
  const buildLabel = progress < 35 ? "Compiling…" : progress < 70 ? "Optimizing assets…" : "Deploying…";
  const reveal = (n: number) =>
    step >= n ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0";

  return (
    <div className="relative">
      <style>{`
        @keyframes akc-spin { to { transform: rotate(360deg); } }
        @keyframes akc-blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .akc-motion { animation: none !important; } }
      `}</style>

      <div className="relative">
        <div className="relative overflow-hidden rounded-[22px] border border-[#E7E4DC] bg-white shadow-[0_60px_120px_-40px_rgba(14,14,16,0.22)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-[#E7E4DC] bg-black/80 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <div className="ml-3 rounded-full bg-white/40 px-3 py-1 font-[var(--font-mono)] text-[11px] text-white shadow-inner">
              akoratechnologies.vercel.app
            </div>
            <div className="ml-auto flex items-center gap-1.5 font-[var(--font-mono)] text-[10.5px] text-[#6B6B74]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  phase === "site" ? "bg-[#28C840]" : "animate-pulse bg-[#C7A165]"
                }`}
              />
              {statusLabel}
            </div>
          </div>

          {/* fixed-height stage */}
          <div className="relative h-[400px] sm:h-[440px]">
            {/* ---------------------------- editor layer --------------------------- */}
            <div
              className={`absolute inset-0 flex flex-col bg-white transition-all duration-700 ${
                phase === "site" ? "scale-[0.97] opacity-0 blur-[2px]" : "scale-100 opacity-100"
              }`}
            >
              <div className="flex gap-1 border-b border-[#E7E4DC] px-3 pt-3">
                {FILES.map((f, i) => (
                  <div
                    key={f.name}
                    className={`rounded-t-lg border border-b-0 px-4 py-2 font-[var(--font-mono)] text-[12px] transition-colors ${
                      i === activeTab
                        ? "border-[#E7E4DC] bg-[#FBFAF6] text-[#0E0E10]"
                        : "border-transparent text-[#6B6B74]"
                    }`}
                  >
                    {f.name}
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-hidden bg-[#FBFAF6] p-5 font-[var(--font-mono)] text-[12.5px] leading-7">
                <CodeView
                  lines={FILES[activeTab].lines}
                  count={count}
                  typing={phase === "typing"}
                />
              </div>

              <div
                className={`absolute inset-x-5 bottom-5 transition-opacity duration-300 ${
                  phase === "building" ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="mb-2 flex justify-between font-[var(--font-mono)] text-[11px] text-[#6B6B74]">
                  <span>{buildLabel}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFEDE5]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C7A165] to-[#9C7A3C] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ------------------------ premium website layer ---------------------- */}
            <div
              className="absolute inset-0 overflow-hidden bg-[#F5F3EC]"
              style={{
                clipPath:
                  phase === "site" ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
                transition: "clip-path 1.1s cubic-bezier(.7,0,.2,1)",
              }}
            >
              <div className="absolute inset-0 [background-image:radial-gradient(#E3DFD2_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7A165]/15 blur-[90px]" />

              {/* orbit rings + photo avatars */}
              {RINGS.map((r, ri) => (
                <div key={ri} className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`relative rounded-full border border-dashed border-[#D9D4C4] transition-all duration-1000 ${
                      step >= 1 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                    style={{ width: r.size, height: r.size, transitionDelay: `${ri * 150}ms` }}
                  >
                    <div
                      className="akc-motion absolute inset-0"
                      style={{
                        animation: `akc-spin ${r.dur}s linear infinite ${
                          r.rev ? "reverse" : "normal"
                        }`,
                      }}
                    >
                      {r.avatars.map((a, ai) => (
                        <div
                          key={ai}
                          className="absolute inset-0"
                          style={{ transform: `rotate(${a.a}deg)` }}
                        >
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                            <div style={{ transform: `rotate(${-a.a}deg)` }}>
                              {/* counter-spin keeps faces upright */}
                              <div
                                className="akc-motion"
                                style={{
                                  animation: `akc-spin ${r.dur}s linear infinite ${
                                    r.rev ? "normal" : "reverse"
                                  }`,
                                }}
                              >
                                <Face
                                  p={a.p}
                                  size={a.s}
                                  ring={a.gold ? "ring-[3px] ring-[#C7A165]" : "ring-[3px] ring-white"}
                                  className={`transition-all duration-700 ${
                                    step >= 2 ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* centre content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <div
                  className={`mb-4 inline-flex items-center gap-2 rounded-full border border-[#E7E4DC] bg-white/90 px-3 py-1.5 font-[var(--font-mono)] text-[9.5px] tracking-[0.18em] text-[#6B6B74] shadow-sm transition-all duration-700 ${reveal(3)}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C7A165]" />
                  LEADERSHIP &amp; TEAM
                </div>

                <h3
                  className={`text-[26px] font-semibold leading-[1.04] tracking-tight text-[#0E0E10] transition-all duration-700 sm:text-[36px] ${reveal(3)}`}
                >
                  The people behind
                  <br />
                  <span className="relative inline-block bg-gradient-to-r from-[#5b4420] via-[#9C7A3C] to-[#C7A165] bg-clip-text font-[var(--font-display)] font-normal italic text-transparent">
                    every build.
                    <svg
                      viewBox="0 0 200 8"
                      className="absolute -bottom-1 left-0 w-full"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 5 Q 100 0 198 5"
                        fill="none"
                        stroke="#C7A165"
                        strokeWidth="2"
                        strokeLinecap="round"
                        pathLength={1}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: step >= 3 ? 0 : 1,
                          transition: "stroke-dashoffset 1s ease .4s",
                        }}
                      />
                    </svg>
                  </span>
                </h3>

                <p
                  className={`mt-4 max-w-xs text-[12px] leading-relaxed text-[#6B6B74] transition-all duration-700 ${reveal(4)}`}
                >
                  Meet the founder, the leads and the engineers who turn ideas into websites,
                  apps and machines that fly.
                </p>

                <div
                  className={`mt-5 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ${reveal(4)}`}
                >
                  <div className="flex items-center gap-2 rounded-full border border-[#E7E4DC] bg-white py-1.5 pl-1.5 pr-4 shadow-sm">
                    <div className="flex -space-x-2">
                      {[P.aarav, P.rohan, P.meera, P.ananya].map((p, i) => (
                        <Face key={i} p={p} size={24} ring="ring-2 ring-white" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#3a3a40]">
                      <b className="font-semibold">12 people</b>, one accountable team
                    </span>
                  </div>
                  <span className="rounded-full bg-[#0E0E10] px-4 py-2 text-[11px] font-semibold text-white">
                    Meet the founder ↗
                  </span>
                </div>
              </div>
            </div>

            {/* Visit website: INSIDE the box, bottom-right */}
            <Link
              href={visitHref}
              tabIndex={showVisit ? 0 : -1}
              className={`group absolute bottom-4 right-4 z-30 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0E0E10] px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_16px_32px_-10px_rgba(14,14,16,0.5)] ring-1 ring-white/10 transition-all duration-700 hover:-translate-y-0.5 ${
                showVisit
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative">Visit website</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* floating "deployed" badge */}
        <div
          className={`absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-2xl border border-[#E7E4DC] bg-white px-4 py-3 font-[var(--font-display)] text-[13px] italic text-[#0E0E10] shadow-[0_30px_60px_-20px_rgba(14,14,16,0.25)] transition-all duration-700 ${
            step >= 4 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0ea5a0]/15 text-[13px] not-italic text-[#0ea5a0]">
            ✓
          </span>
          Deployed to production
        </div>

        {/* floating quality badge */}
        <div className="absolute -right-5 -top-5 animate-akora-fadeup rounded-2xl border border-[#E7E4DC] bg-white px-4 py-3 text-center shadow-[0_30px_60px_-20px_rgba(14,14,16,0.25)] [animation-delay:1.6s]">
          <div className="font-[var(--font-display)] text-lg italic text-[#0E0E10]">98/100</div>
          <div className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.1em] text-[#9C7A3C]">
            Lighthouse
          </div>
        </div>
      </div>
    </div>
  );
}
/* ============================================================
   MAIN — FirstSection (hero only, per brief)
============================================================ */
export default function FirstSection() {
  const { ref: spotRef, pos } = useSpotlight<HTMLDivElement>();
  const showEyebrow = useMounted(80);
  const showHeadline = useMounted(220);
  const showCopy = useMounted(420);
  const showActions = useMounted(580);
  const showStats = useMounted(740);
  const showConsole = useMounted(360);

  return (
    <section
      ref={spotRef}
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} relative overflow-hidden bg-[#FBFAF6] font-[var(--font-body)] text-[#0E0E10]`}
    >
      <Navbar/>
      {/* cursor-reactive spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-300 "  
        style={{
          background: `radial-gradient(480px circle at ${pos.x}% ${pos.y}%, rgba(156,122,60,0.08), transparent 60%)`,
        }}
      />

      {/* drifting soft blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 z-0 h-[420px] w-[420px] rounded-full bg-[#C7A165]/20 blur-[100px] animate-akora-float" />
      <div className="pointer-events-none absolute top-40 -right-32 z-0 h-[380px] w-[380px] rounded-full bg-[#1F2251]/10 blur-[110px] animate-akora-float [animation-delay:2.5s]" />

      {/* faint dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#E7E4DC 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 80%)",
        }}
      />

      {/* nav */}
      {/* <nav className="relative z-20 flex items-center justify-between px-[6vw] py-5">
        <div className="flex items-center gap-2.5 font-[var(--font-display)] text-[19px] italic tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#C7A165] to-[#1F2251] font-[var(--font-body)] text-[14px] font-bold not-italic text-white">
            A
          </span>
          Akora Technologies
        </div>
        <div className="hidden gap-10 md:flex">
          {["Services", "Process", "Work", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative font-[var(--font-body)] text-[14px] text-[#6B6B74] transition-colors hover:text-[#0E0E10]"
            >
              {l}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#9C7A3C] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <MagneticButton
          href="#contact"
          className="rounded-full bg-[#0E0E10] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(14,14,16,0.18)]"
        >
          Start a Project
        </MagneticButton>
      </nav> */}

      {/* hero grid */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-6 px-[6vw] pb-14 pt-20 md:grid-cols-[1.05fr_0.95fr] md:pt-30">
        <div>
          {/* <div
            className={`transition-all duration-700 ease-out ${
              showEyebrow ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#E7E4DC] bg-white px-4 py-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#9C7A3C] shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9C7A3C]" />
              India&apos;s Premium Build Studio
            </span>
          </div> */}

          <h1
            className={`mt-8 font-[var(--font-display)] text-[clamp(46px,4vw,88px)] font-medium leading-[1.02] tracking-tight transition-all duration-700 ease-out ${
              showHeadline ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Websites that make
            <br />
            <span className="relative inline-block italic">
              first impressions
              <svg
                viewBox="0 0 420 18"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 13 C 100 4, 320 4, 418 13"
                  fill="none"
                  stroke="#C7A165"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-akora-draw"
                  pathLength={1}
                />
              </svg>
            </span>{" "}
            unforgettable.
          </h1>

<p
  className={`mt-2 max-w-[540px] text-[18px] leading-[1.75] text-[#6B6B74] transition-all duration-700 ease-out ${
    showCopy ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`}
>
  <span className="relative inline-block font-semibold text-[#111]">
    AKORA TECHNOLOGIES

    <svg
      viewBox="0 0 420 18"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 w-full h-[12px] pointer-events-none"
    >
      <path
        d="M2 13 C 100 4, 320 4, 418 13"
        fill="none"
        stroke="#C7A165"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-akora-draw"
        pathLength={1}
      />
    </svg>
  </span>{" "}
  designs and engineers websites and apps built to feel like a seven-figure
  brand — from the first pixel to the last line of production code.
</p>

          <div
            className={`mt-4 flex flex-wrap items-center gap-5 transition-all duration-700 ease-out ${
              showActions ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <MagneticButton
              href="/home-page/contact"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#9C7A3C] to-[#C7A165] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_-10px_rgba(156,122,60,0.45)]"
            >
              <span className="relative z-10">Start Your Project →</span>
              <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:translate-x-[130%]" />
            </MagneticButton>
            <MagneticButton
              href="company/about#work"
              className="rounded-full border border-[#E7E4DC] bg-white px-7 py-4 text-[15px] font-medium text-[#0E0E10] transition-colors hover:border-[#0E0E10]"
            >
              View Our Work
            </MagneticButton>
          </div>

          <div
            className={`mt-4 flex flex-wrap gap-8 transition-all duration-700 ease-out ${
              showStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div>
              <div className="font-[var(--font-display)] text-[30px] italic">60+</div>
              <div className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[#6B6B74]">
                Projects shipped
              </div>
            </div>
            <div>
              <div className="font-[var(--font-display)] text-[30px] italic">4.9/5</div>
              <div className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[#6B6B74]">
                Client rating
              </div>
            </div>
            <div>
              <div className="font-[var(--font-display)] text-[30px] italic">12 days</div>
              <div className="font-[var(--font-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[#6B6B74]">
                Avg. launch time
              </div>
            </div>
          </div>
        </div>

        {/* signature build console */}
        <div
          className={`transition-all duration-700 ease-out ${
            showConsole ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-[0.97]"
          }`}
        >
          <LiveConsole />
        </div>
      </div>

      {/* <TrustMarquee /> */}

      {/* scroll cue */}
      {/* <div className="relative z-10 flex justify-center py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E4DC] text-[#9C7A3C] animate-bounce">
          ↓
        </span>
      </div> */}

      <style jsx global>{`
        @keyframes akora-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-akora-marquee {
          animation: akora-marquee 30s linear infinite;
        }

        @keyframes akora-blink {
          50% {
            opacity: 0;
          }
        }
        .animate-akora-blink {
          animation: akora-blink 1s steps(1) infinite;
        }

        @keyframes akora-fadeup {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-akora-fadeup {
          animation: akora-fadeup 0.7s ease 1.1s both;
        }

        @keyframes akora-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -20px) scale(1.06);
          }
        }
        .animate-akora-float {
          animation: akora-float 9s ease-in-out infinite;
        }

        @keyframes akora-draw {
          from {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
          }
          to {
            stroke-dasharray: 1;
            stroke-dashoffset: 0;
          }
        }
        .animate-akora-draw {
          animation: akora-draw 1s ease 1s both;
        }
      `}</style>
    </section>
  );
}