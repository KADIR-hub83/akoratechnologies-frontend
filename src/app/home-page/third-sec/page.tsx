"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AKORA — "How We Build Mobile Apps" section
 * Light theme (matches the site's cream/gold/ink identity).
 * A 3D phone (pure CSS transforms — no three.js / no extra installs)
 * starts showing its back, and flips to the front as the section
 * scrolls into view. Once front-facing, a code-typing animation plays
 * on the screen, then resolves into an "app ready" home-screen state
 * with the AKORA logo.
 *
 * NOTE: swap the <img src="/akoralogopngfinal.png" /> paths below for
 * your actual logo file if the path in your /public folder differs.
 */

const codeLines: { tokens: { text: string; color: string }[] }[] = [
  {
    tokens: [
      { text: "import", color: "#C9A56A" },
      { text: " { App } ", color: "#EDE7DA" },
      { text: "from", color: "#C9A56A" },
      { text: " 'akora-native'", color: "#8FC49E" },
    ],
  },
  {
    tokens: [
      { text: "export default function ", color: "#C9A56A" },
      { text: "AkoraApp", color: "#EDE7DA" },
      { text: "() {", color: "#EDE7DA" },
    ],
  },
  {
    tokens: [
      { text: "  return ", color: "#C9A56A" },
      { text: "<App", color: "#8FA9C4" },
      { text: " theme", color: "#C9A56A" },
      { text: "=", color: "#EDE7DA" },
      { text: "\"native\"", color: "#8FC49E" },
      { text: " />", color: "#8FA9C4" },
    ],
  },
  {
    tokens: [{ text: "}", color: "#EDE7DA" }],
  },
  {
    tokens: [
      { text: "// building for iOS & Android…", color: "#6B6558" },
    ],
  },
];

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    let rafId = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top just enters viewport bottom, 1 once section
      // top reaches viewport top — the flip completes as you scroll in.
      const raw = (vh - rect.top) / vh;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return { ref, progress };
}

function useTypedCode(active: boolean) {
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    let li = 0;
    let ci = 0;

    setLineCount(0);
    setCharCount(0);
    setDone(false);

    const startAnimation = () => {
      li = 0;
      ci = 0;

      setLineCount(0);
      setCharCount(0);
      setDone(false);

      const typing = setInterval(() => {
        const line = codeLines[li];
        const fullText = line.tokens.map((t) => t.text).join("");

        if (ci < fullText.length) {
          ci++;
          setCharCount(ci);
        } else {
          li++;
          ci = 0;
          setLineCount(li);
          setCharCount(0);

          if (li >= codeLines.length) {
            clearInterval(typing);

            setDone(true);

            // Show completed screen for 2 seconds
            setTimeout(() => {
              startAnimation();
            }, 2000);
          }
        }
      }, 26);
    };

    startAnimation();
  }, [active]);

  return { lineCount, charCount, done };
}

function renderTypedLine(
  line: { tokens: { text: string; color: string }[] },
  visibleChars: number
) {
  let remaining = visibleChars;
  return line.tokens.map((tok, i) => {
    const slice = tok.text.slice(0, Math.max(0, remaining));
    remaining -= tok.text.length;
    return (
      <span key={i} style={{ color: tok.color }}>
        {slice}
      </span>
    );
  });
}

export default function MobileAppSection() {
  const { ref: sectionRef, progress } = useScrollProgress<HTMLDivElement>();

  // -180deg = back facing camera, 0deg = front facing camera
  const angle = -180 + progress * 180;
  const isFrontFacing = progress > 0.72;

  const { lineCount, charCount, done } = useTypedCode(isFrontFacing);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAF7F0] px-6 py-8 sm:px-10 md:px-16"
    >
      {/* soft ambient gold glow, restrained */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#C9A56A]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT — copy */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8935B]/30 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#14110D]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8935B]" />
            Mobile Application Development
          </div>

          <h2 className="font-serif text-4xl italic leading-[1.15] text-[#14110D] sm:text-5xl">
            How AKORA builds
            <br />
            <span className="not-italic font-sans font-normal">mobile apps.</span>
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#14110D]/60">
            Every AKORA app is engineered natively for iOS and Android from
            day one — no bloated wrappers, no compromise on speed. Design,
            code and QA happen under one roof, so what ships feels as fast
            as it looks.
          </p>

          <ul className="mt-10 space-y-5">
            {[
              { n: "01", label: "Product design & flow mapping" },
              { n: "02", label: "Native iOS & Android engineering" },
              { n: "03", label: "QA across real devices" },
              { n: "04", label: "App Store & Play Store launch" },
            ].map((step) => (
              <li key={step.n} className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B8935B]/30 bg-white text-xs font-semibold text-[#14110D]">
                  {step.n}
                </span>
                <span className="text-sm text-[#14110D]/70">{step.label}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#14110D] px-7 py-3.5 text-sm font-medium text-[#FAF7F0] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start Your App
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* RIGHT — 3D phone */}
        <div className="relative mx-auto flex justify-center [perspective:1800px]">
          {/* floating badge chips (desktop only, safely inline-positioned) */}
          <div className="pointer-events-none absolute -left-6 top-10 z-20 hidden -rotate-6 items-center gap-2 rounded-full border border-[#B8935B]/30 bg-white/90 px-4 py-2 text-xs font-medium text-[#14110D] shadow-lg backdrop-blur md:flex">
            🇺🇸 Native iOS
          </div>
          <div className="pointer-events-none absolute -right-8 top-1/3 z-20 hidden rotate-6 items-center gap-2 rounded-full border border-[#B8935B]/30 bg-white/90 px-4 py-2 text-xs font-medium text-[#14110D] shadow-lg backdrop-blur md:flex">
            🤖 Native Android
          </div>
          <div className="pointer-events-none absolute -left-10 bottom-12 z-20 hidden -rotate-3 items-center gap-2 rounded-full border border-[#B8935B]/30 bg-white/90 px-4 py-2 text-xs font-medium text-[#14110D] shadow-lg backdrop-blur md:flex">
            ⚡ Built in-house
          </div>

          {/* rotating phone */}
          <div
            style={{ transform: `rotateY(${angle}deg)` }}
            className="relative h-[560px] w-[270px] transition-transform duration-100 ease-out [transform-style:preserve-3d] sm:h-[600px] sm:w-[290px]"
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <div className="relative h-full w-full rounded-[2.5rem] border-[6px] border-[#14110D] bg-[#0B0A08] p-2 shadow-[0_40px_80px_-30px_rgba(20,17,13,0.5)]">
                {/* notch */}
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#14110D]" />

                <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-[#0B0A08]">
                  {/* status bar */}
                  <div className="flex items-center justify-between px-6 pb-2 pt-4 text-[10px] font-medium text-white/70">
                    <span>9:41</span>
                    <span>●●● 100%</span>
                  </div>

                  {/* code editor */}
                  <div
                    className={`px-5 pt-3 font-mono text-[11px] leading-relaxed transition-opacity duration-500 ${
                      done ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {codeLines.slice(0, lineCount).map((line, i) => (
                      <div key={i}>{renderTypedLine(line, 999)}</div>
                    ))}
                    {lineCount < codeLines.length && (
                      <div>
                        {renderTypedLine(codeLines[lineCount], charCount)}
                        <span className="ml-0.5 inline-block h-3 w-[6px] animate-pulse bg-[#C9A56A] align-middle" />
                      </div>
                    )}
                  </div>

                  {/* app-ready overlay */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0B0A08] transition-opacity duration-700 ${
                      done ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div
                      className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#fefefe] to-[#ffffff] shadow-lg transition-transform duration-700 ${
                        done ? "scale-100" : "scale-50"
                      }`}
                    >
                      {/* Replace with your real logo asset if the path differs */}
                      <img
                        src="/akoralogopngfinal.png"
                        alt="AKORA Technologies"
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">
                        AKORA
                      </p>
                      <p className="mt-1 text-[11px] text-[#8FC49E]">
                        ✓ Build complete
                      </p>
                    </div>
                  </div>

                  {/* home indicator */}
                  <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/25" />
                </div>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="relative h-full w-full rounded-[2.5rem] border-[6px] border-[#14110D] bg-gradient-to-b from-[#2b2318] to-[#14110D] p-2 shadow-[0_40px_80px_-30px_rgba(20,17,13,0.5)]">
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-[#2b2318] to-[#14110D]">
                  {/* camera bump */}
                  <div className="absolute left-6 top-8 h-14 w-14 rounded-2xl bg-black/40" />
                  <img
                    src="/akoralogopngfinal.png"
                    alt="AKORA Technologies"
                    className="h-10 w-10 object-contain opacity-90"
                  />
                  <p className="text-xs font-medium tracking-[0.3em] text-white/50">
                    AKORA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}