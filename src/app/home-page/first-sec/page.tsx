"use client";

import { useEffect, useRef, useState } from "react";
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

const FILES: { name: string; lines: string[] }[] = [
  {
    name: "page.tsx",
    lines: [
      '<span class="text-[#8b5cf6]">export default function</span> <span class="text-[#0ea5a0]">HomePage</span>() {',
      '&nbsp;&nbsp;<span class="text-[#8b5cf6]">return</span> (',
      '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="text-[#c7a165]">Hero</span>',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title=<span class="text-[#9C7A3C]">"Akora Technologies"</span>',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;theme=<span class="text-[#9C7A3C]">"premium-white"</span>',
      "&nbsp;&nbsp;&nbsp;&nbsp;/&gt;",
      "&nbsp;&nbsp;);",
      "}",
    ],
  },
  {
    name: "style.css",
    lines: [
      ".hero {",
      '&nbsp;&nbsp;background: <span class="text-[#9C7A3C]">#FBFAF6</span>;',
      '&nbsp;&nbsp;font-family: <span class="text-[#9C7A3C]">"Fraunces"</span>, serif;',
      "&nbsp;&nbsp;letter-spacing: -0.02em;",
      "}",
      "",
      ".cta {",
      '&nbsp;&nbsp;background: <span class="text-[#9C7A3C]">linear-gradient(#C7A165, #9C7A3C)</span>;',
      "}",
    ],
  },
  {
    name: "deploy.sh",
    lines: [
      "$ akora build --production",
      '<span class="text-[#0ea5a0]">✓</span> Optimizing fonts &amp; images',
      '<span class="text-[#0ea5a0]">✓</span> Lighthouse score: 98 / 100',
      '<span class="text-[#0ea5a0]">✓</span> Deployed → akoratechnologies.com',
    ],
  },
];

function LiveConsole() {
  const [activeTab, setActiveTab] = useState(0);
  const [typed, setTyped] = useState<string[]>(["", "", ""]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"typing" | "building" | "preview">("typing");
  const [cursorAt, setCursorAt] = useState({ x: 18, y: 18 });
  const [clicked, setClicked] = useState(false);
  const [toast, setToast] = useState(false);
  const [bars, setBars] = useState([0, 0, 0, 0, 0]);
  const [dot, setDot] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function run() {
      while (mounted) {
        // reset everything for a fresh cycle
        setActiveTab(0);
        setTyped(["", "", ""]);
        setProgress(0);
        setPhase("typing");
        setCursorAt({ x: 18, y: 18 });
        setClicked(false);
        setToast(false);
        setBars([0, 0, 0, 0, 0]);
        setDot(0);
        await new Promise((r) => setTimeout(r, 200));

        // 1) type each file, tab by tab
        for (let f = 0; f < FILES.length; f++) {
          if (!mounted) return;
          setActiveTab(f);
          let built = "";
          for (const line of FILES[f].lines) {
            if (!mounted) return;
            await new Promise((r) => setTimeout(r, 90));
            built += (built ? "\n" : "") + line;
            setTyped((prev) => {
              const next = [...prev];
              next[f] = built;
              return next;
            });
          }
          await new Promise((r) => setTimeout(r, 380));
        }

        // 2) build progress bar
        if (!mounted) return;
        setPhase("building");
        for (let p = 0; p <= 100; p += 4) {
          if (!mounted) return;
          setProgress(p);
          await new Promise((r) => setTimeout(r, 22));
        }
        await new Promise((r) => setTimeout(r, 300));

        // 3) morph into live preview + choreographed micro-interactions
        if (!mounted) return;
        setPhase("preview");
        await new Promise((r) => setTimeout(r, 500));

        if (!mounted) return;
        setCursorAt({ x: 78, y: 62 });
        await new Promise((r) => setTimeout(r, 700));

        if (!mounted) return;
        setClicked(true);
        await new Promise((r) => setTimeout(r, 220));
        setToast(true);

        const targets = [40, 70, 55, 90, 65];
        for (let i = 0; i < targets.length; i++) {
          if (!mounted) return;
          await new Promise((r) => setTimeout(r, 90));
          setBars((prev) => {
            const next = [...prev];
            next[i] = targets[i];
            return next;
          });
        }

        for (let d = 0; d < 3; d++) {
          if (!mounted) return;
          await new Promise((r) => setTimeout(r, 500));
          setDot(d);
        }

        // hold the finished preview for a moment, then loop back
        await new Promise((r) => setTimeout(r, 2200));
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[22px] border border-[#E7E4DC] bg-white shadow-[0_60px_120px_-40px_rgba(14,14,16,0.22)]">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#E7E4DC] bg-[#FBFAF6] px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 font-[var(--font-mono)] text-[11px] text-[#6B6B74] shadow-inner">
            akoratechnologies.com
          </div>
        </div>

        {/* file tabs */}
        <div
          className={`flex gap-1 border-b border-[#E7E4DC] bg-white px-3 pt-3 transition-opacity duration-500 ${
            phase === "preview" ? "opacity-0 h-0 pointer-events-none overflow-hidden py-0" : "opacity-100"
          }`}
        >
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

        {/* editor body */}
        <div
          className={`relative min-h-[300px] md:min-h-[250px] transition-all duration-700 ${
            phase === "preview" ? "opacity-0 scale-[0.98] absolute inset-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="p-6 font-[var(--font-mono)] text-[13.5px] leading-8 text-[#3a3a40]">
            <div dangerouslySetInnerHTML={{ __html: typed[activeTab] }} />
            {phase === "typing" && (
              <span className="ml-0.5 inline-block h-4 w-[7px] animate-akora-blink bg-[#9C7A3C] align-middle" />
            )}
          </div>

          {phase === "building" && (
            <div className="absolute inset-x-6 bottom-6">
              <div className="mb-2 flex justify-between font-[var(--font-mono)] text-[11px] text-[#6B6B74]">
                <span>Building for production…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFEDE5]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C7A165] to-[#9C7A3C] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* live product preview (morphed state) */}
        <div
          className={`relative min-h-[300px] md:min-h-[340px] p-6 transition-all duration-700 ${
            phase === "preview" ? "opacity-100 scale-100" : "opacity-0 scale-[0.98] absolute inset-0 pointer-events-none"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#C7A165] to-[#1F2251]" />
              <span className="font-[var(--font-display)] text-[15px] italic text-[#0E0E10]">Akora</span>
            </div>
            <div className="flex gap-5 font-[var(--font-mono)] text-[11px] text-[#6B6B74]">
              <span>Work</span>
              <span>Studio</span>
              <span>Contact</span>
            </div>
          </div>

          <div className="mb-1 h-3 w-3/4 rounded bg-[#EFEDE5]" />
          <div className="mb-6 h-3 w-1/2 rounded bg-[#EFEDE5]" />

          <div className="mb-6 grid grid-cols-5 items-end gap-2 rounded-xl border border-[#E7E4DC] bg-[#FBFAF6] p-4">
            {bars.map((h, i) => (
              <div key={i} className="flex h-16 items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#9C7A3C] to-[#C7A165] transition-all duration-700 ease-out"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dot === i ? "w-6 bg-[#9C7A3C]" : "w-1.5 bg-[#E7E4DC]"
                }`}
              />
            ))}
          </div>

          {/* fake cursor + click ripple */}
          <div
            className="pointer-events-none absolute z-20 transition-all duration-700 ease-in-out"
            style={{ left: `${cursorAt.x}%`, top: `${cursorAt.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              {clicked && (
                <span className="absolute inline-flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#9C7A3C]/40" />
              )}
              <svg width="18" height="18" viewBox="0 0 18 18" className="drop-shadow-md">
                <path d="M2 1 L2 15 L6 11.5 L8.5 16.5 L10.5 15.5 L8 10.5 L13 10.2 Z" fill="#0E0E10" />
              </svg>
            </div>
          </div>

          {/* toast */}
          <div
            className={`absolute bottom-6 right-6 flex items-center gap-2 rounded-xl border border-[#E7E4DC] bg-white px-4 py-3 shadow-[0_20px_40px_-10px_rgba(14,14,16,0.18)] transition-all duration-500 ${
              toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0ea5a0]/15 text-[#0ea5a0]">
              ✓
            </span>
            <span className="font-[var(--font-mono)] text-[12px] text-[#0E0E10]">
              Message sent
            </span>
          </div>
        </div>
      </div>

      {/* floating "deployed" badge */}
      <div className="absolute -bottom-6 -left-6 flex items-center gap-2.5 rounded-2xl border border-[#E7E4DC] bg-white px-4 py-3.5 font-[var(--font-display)] text-[13px] italic text-[#0E0E10] shadow-[0_30px_60px_-20px_rgba(14,14,16,0.25)] animate-akora-fadeup">
        <span className="h-8 w-8 rounded-full border-[3px] border-[#C7A165] border-t-transparent animate-spin" />
        Deployed to production
      </div>

      {/* floating quality badge */}
      <div className="absolute -top-5 -right-5 rounded-2xl border border-[#E7E4DC] bg-white px-4 py-3 text-center shadow-[0_30px_60px_-20px_rgba(14,14,16,0.25)] animate-akora-fadeup [animation-delay:1.6s]">
        <div className="font-[var(--font-display)] text-lg italic text-[#0E0E10]">98/100</div>
        <div className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.1em] text-[#9C7A3C]">
          Lighthouse
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
      <div className="relative z-10 grid grid-cols-1 items-center gap-16 px-[6vw] pb-14 pt-20 md:grid-cols-[1.05fr_0.95fr] md:pt-30">
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
            className={`mt-8 font-[var(--font-display)] text-[clamp(46px,6vw,88px)] font-medium leading-[1.02] tracking-tight transition-all duration-700 ease-out ${
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
  className={`mt-8 max-w-[540px] text-[18px] leading-[1.75] text-[#6B6B74] transition-all duration-700 ease-out ${
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
            className={`mt-10 flex flex-wrap items-center gap-5 transition-all duration-700 ease-out ${
              showActions ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <MagneticButton
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#9C7A3C] to-[#C7A165] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_-10px_rgba(156,122,60,0.45)]"
            >
              <span className="relative z-10">Start Your Project →</span>
              <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:translate-x-[130%]" />
            </MagneticButton>
            <MagneticButton
              href="#work"
              className="rounded-full border border-[#E7E4DC] bg-white px-7 py-4 text-[15px] font-medium text-[#0E0E10] transition-colors hover:border-[#0E0E10]"
            >
              View Our Work
            </MagneticButton>
          </div>

          <div
            className={`mt-10 flex flex-wrap gap-8 transition-all duration-700 ease-out ${
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