// import type { Metadata } from "next";
// import CareersClient from "./CareersClient";

// export const metadata: Metadata = {
//   title: "Careers | Join AKORA Technologies",
//   description:
//     "Explore career opportunities at AKORA Technologies. Work on meaningful digital products, modern software, websites, and creative technology solutions.",
//   alternates: {
//     canonical: "/company/careers",
//   },
//   openGraph: {
//     title: "Careers at AKORA Technologies",
//     description:
//       "Build meaningful digital experiences with a team that values curiosity, craftsmanship, and ambitious ideas.",
//     type: "website",
//   },
// };

// export default function CareersPage() {
//   return <CareersClient />;
// }


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — CAREERS PAGE  ("Departures")
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/company/careers/page.tsx   (route: /company/careers)
 *
 * CONCEPT: open roles are shown as an airport DEPARTURES BOARD. Click a row and
 * it opens as a BOARDING PASS. Hiring steps are a flight route that fills as you
 * scroll. Hero has split-flap letters and a plane flying along a dashed path.
 *
 * LIVE JOB POSTS (optional)
 *  - By default the page uses the FALLBACK_JOBS array below (edit it by hand).
 *  - To load jobs LIVE from an API / CMS / Google Sheet, create
 *    frontend/.env.local and add:
 *        NEXT_PUBLIC_JOBS_URL=https://your-api.com/jobs
 *    then restart `npm run dev`. The page fetches on load and every 60 seconds.
 *    The URL must return JSON (array, or { "jobs": [...] }) shaped like:
 *      { "id": "1", "title": "UI/UX Designer", "team": "Design",
 *        "type": "Full-time", "location": "Remote", "status": "open",
 *        "summary": "...", "responsibilities": ["..."],
 *        "requirements": ["..."], "perks": ["..."] }
 *    status: "open" | "closing" | "closed". The server must allow CORS.
 *    If the fetch fails the page silently keeps the fallback jobs.
 *
 * ROLES BELOW ARE SAMPLES — replace with your real openings.
 *
 * FOOTER: content is inside <PageRevealWrapper>, <Footer /> is outside <main>,
 * and <main> has no background -> the fixed footer is revealed correctly.
 * ==========================================================================*/

const CONFIG = {
  email: "akoratechnologies@gmail.com",
  whatsappNumber: "917225878057",
} as const;

const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page
const JOBS_URL = process.env.NEXT_PUBLIC_JOBS_URL;

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/* ---------------------------------- Data ---------------------------------- */

type Status = "open" | "closing" | "closed";

type Job = {
  id: string;
  title: string;
  team: string;
  type: string;
  location: string;
  status: Status;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
};

const FALLBACK_JOBS: Job[] = [
  {
    id: "fullstack",
    title: "Senior Full-Stack Developer",
    team: "Engineering",
    type: "Full-time",
    location: "Remote · India",
    status: "open",
    summary:
      "Own features end to end across Next.js frontends and Node.js backends for client products.",
    responsibilities: [
      "Design and build web apps and APIs from scratch",
      "Review code and mentor junior developers",
      "Work directly with clients and designers",
    ],
    requirements: [
      "Strong TypeScript, React / Next.js and Node.js",
      "Experience with MongoDB or SQL databases",
      "Clear communication and a sense of ownership",
    ],
    perks: ["Remote-first", "Learning support", "Real ownership"],
  },
  {
    id: "frontend",
    title: "Frontend Developer (React / Next.js)",
    team: "Engineering",
    type: "Full-time",
    location: "Remote · India",
    status: "open",
    summary:
      "Turn designs into fast, accessible, beautifully animated interfaces.",
    responsibilities: [
      "Build responsive UI with React, Next.js and Tailwind",
      "Implement smooth animations and interactions",
      "Keep performance and accessibility high",
    ],
    requirements: [
      "Solid HTML, CSS, JavaScript / TypeScript",
      "Eye for detail and design systems",
      "Portfolio of shipped work",
    ],
    perks: ["Remote-first", "Design-led team", "Modern stack"],
  },
  {
    id: "mobile",
    title: "React Native Mobile Developer",
    team: "Engineering",
    type: "Full-time",
    location: "Remote · India",
    status: "closing",
    summary: "Ship polished iOS and Android apps from first screen to store launch.",
    responsibilities: [
      "Build and maintain cross-platform mobile apps",
      "Integrate APIs, payments and push notifications",
      "Publish and update apps on the stores",
    ],
    requirements: [
      "React Native experience with published apps",
      "Firebase or REST API integration",
      "Good understanding of mobile UX",
    ],
    perks: ["Remote-first", "End-to-end ownership"],
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    team: "Design",
    type: "Full-time",
    location: "Remote · India",
    status: "open",
    summary: "Design premium websites and app experiences that clients love.",
    responsibilities: [
      "Create wireframes, prototypes and polished UI in Figma",
      "Build and maintain design systems",
      "Collaborate closely with developers",
    ],
    requirements: [
      "Strong Figma skills and visual taste",
      "Portfolio showing product thinking",
      "Understanding of web and mobile patterns",
    ],
    perks: ["Remote-first", "Creative freedom"],
  },
  {
    id: "seo",
    title: "SEO & Growth Specialist",
    team: "Growth",
    type: "Full-time",
    location: "Remote · India",
    status: "open",
    summary: "Plan search strategy alongside every build and grow client traffic.",
    responsibilities: [
      "Run technical SEO audits and content plans",
      "Track rankings, traffic and conversions",
      "Work with developers on Core Web Vitals",
    ],
    requirements: [
      "Hands-on SEO and analytics experience",
      "Comfort with Search Console and GA4",
      "Data-driven, clear writer",
    ],
    perks: ["Remote-first", "Measurable impact"],
  },
  {
    id: "drone",
    title: "Robotics & Drone Engineer",
    team: "R&D",
    type: "Full-time",
    location: "On-site lab · India",
    status: "open",
    summary:
      "Build flight software, control systems and payload integrations in our R&D lab.",
    responsibilities: [
      "Develop and tune flight-controller firmware",
      "Integrate sensors and custom payloads",
      "Run field tests and log results",
    ],
    requirements: [
      "Embedded C/C++ or Python, ideally ROS",
      "Understanding of control systems",
      "Hands-on hardware tinkering",
    ],
    perks: ["Real hardware lab", "Field testing"],
  },
  {
    id: "intern",
    title: "Web Development Intern",
    team: "Engineering",
    type: "Internship",
    location: "Remote · India",
    status: "open",
    summary: "Learn by shipping real client work alongside senior engineers.",
    responsibilities: [
      "Build components and pages under guidance",
      "Fix bugs and write clean code",
      "Learn our workflow end to end",
    ],
    requirements: [
      "Basics of HTML, CSS, JavaScript and React",
      "Eagerness to learn fast",
      "Any projects or GitHub profile",
    ],
    perks: ["Mentorship", "Path to full-time"],
  },
];

const PERKS = [
  { t: "Remote-first", d: "Do your best work from wherever you are, with a team that communicates clearly." },
  { t: "Real ownership", d: "You own features from idea to production — and see them live." },
  { t: "Hardware lab", d: "Touch real drones and robots, not just code." },
  { t: "Always learning", d: "Time and support to pick up new tools and ship experiments." },
  { t: "Small team, big impact", d: "No bureaucracy. Your work ships and gets seen by clients." },
  { t: "Outcomes over hours", d: "We care about what you deliver, not when you log in." },
];

const STEPS = [
  { t: "Apply", d: "Send your resume or portfolio — a link to your work is enough." },
  { t: "Intro call", d: "A short, friendly chat about you, the role and our team." },
  { t: "Skill round", d: "A practical task or pairing session. No trick questions." },
  { t: "Take-off", d: "Offer, onboarding and your first real project." },
];

/* ------------------------------ Live job fetch ---------------------------- */

const str = (v: unknown, fb: string) => (typeof v === "string" && v.trim() ? v : fb);
const list = (v: unknown) =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()).map(String) : [];

function normalizeJobs(data: unknown): Job[] | null {
  const arr = Array.isArray(data) ? data : (data as { jobs?: unknown } | null)?.jobs;
  if (!Array.isArray(arr)) return null;
  return arr
    .filter((j) => j && typeof j === "object")
    .map((raw, i) => {
      const j = raw as Record<string, unknown>;
      const status = ["open", "closing", "closed"].includes(String(j.status))
        ? (j.status as Status)
        : "open";
      return {
        id: String(j.id ?? i),
        title: str(j.title, "Untitled role"),
        team: str(j.team, "Other"),
        type: str(j.type, "Full-time"),
        location: str(j.location, "Remote"),
        status,
        summary: str(j.summary, ""),
        responsibilities: list(j.responsibilities),
        requirements: list(j.requirements),
        perks: list(j.perks),
      };
    });
}

function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(FALLBACK_JOBS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!JOBS_URL) return;
    let alive = true;
    const ctrl = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(JOBS_URL, { signal: ctrl.signal, cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const parsed = normalizeJobs(await res.json());
        if (alive && parsed) {
          setJobs(parsed);
          setLive(true);
        }
      } catch {
        /* keep fallback jobs */
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

  return { jobs, live };
}

/* ------------------------------ Apply links ------------------------------- */

const waLink = (role: string) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi AKORA Technologies, I'd like to apply for the ${role} role.\n\nMy portfolio / LinkedIn / GitHub: `
  )}`;

const mailLink = (role: string) =>
  `mailto:${CONFIG.email}?subject=${encodeURIComponent(
    `Application — ${role}`
  )}&body=${encodeURIComponent(
    `Hi AKORA team,\n\nI'd like to apply for the ${role} role.\n\nName:\nPortfolio / LinkedIn / GitHub:\n\nMy resume is attached.\n`
  )}`;

/* ------------------------------ Motion helpers ---------------------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      const p = Math.min(1, Math.max(0, h.scrollTop / (h.scrollHeight - h.clientHeight || 1)));
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

/** One split-flap tile: flips through random characters, then lands on `ch`. */
function FlapChar({ ch, go, delay }: { ch: string; go: boolean; delay: number }) {
  const [c, setC] = useState(" ");

  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) {
      setC(ch);
      return;
    }
    let tick = 0;
    const total = 8 + Math.floor(Math.random() * 8);
    let iv: number | undefined;
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => {
        tick += 1;
        if (tick >= total) {
          setC(ch);
          window.clearInterval(iv);
        } else {
          setC(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }, 60);
    }, delay);
    return () => {
      window.clearTimeout(t);
      if (iv) window.clearInterval(iv);
    };
  }, [go, ch, delay]);

  if (ch === " ") return <span className="inline-block w-[0.5em]" />;

  return (
    <span className="relative inline-flex h-[1.55em] w-[0.95em] items-center justify-center rounded-[0.18em] bg-gradient-to-b from-[#1d1d22] to-[#0B0A08] font-mono text-[#E7D6B6] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
      {c.trim() ? c : "\u00A0"}
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/70" />
    </span>
  );
}

function FlapText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [ref, go] = useInView<HTMLSpanElement>(0.3);
  return (
    <span ref={ref} className="inline-flex flex-wrap justify-center gap-[0.12em]" aria-label={text}>
      {text.split("").map((ch, i) => (
        <FlapChar key={i} ch={ch} go={go} delay={delay + i * 70} />
      ))}
    </span>
  );
}

/** Text that scrambles into place when it scrolls into view. */
function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [ref, go] = useInView<HTMLSpanElement>(0.3);
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!go || prefersReducedMotion()) {
      setOut(text);
      return;
    }
    let frame = 0;
    const iv = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      if (settled >= text.length) {
        window.clearInterval(iv);
        setOut(text);
      }
    }, 32);
    return () => window.clearInterval(iv);
  }, [go, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
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

const ArrowUpRight = ({ className = "h-4 w-4" }: { className?: string }) => (
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
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const ChevronDown = ({ className = "h-5 w-5" }: { className?: string }) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PlaneIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M2 4 22 12 2 20 6 12Z" />
  </svg>
);

const STATUS_UI: Record<Status, { label: string; dot: string; text: string; blink: boolean }> = {
  open: { label: "BOARDING", dot: "bg-emerald-400", text: "text-emerald-300", blink: true },
  closing: { label: "FINAL CALL", dot: "bg-amber-400", text: "text-amber-300", blink: true },
  closed: { label: "CLOSED", dot: "bg-red-400", text: "text-red-300", blink: false },
};

/* ------------------------------ Departures row ---------------------------- */

function BoardRow({
  job,
  gate,
  open,
  onToggle,
}: {
  job: Job;
  gate: string;
  open: boolean;
  onToggle: () => void;
}) {
  const st = STATUS_UI[job.status];
  const closed = job.status === "closed";
  const panelId = `panel-${job.id}`;

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`group grid w-full grid-cols-[56px_1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-5 text-left transition-colors duration-300 sm:px-6 md:grid-cols-[72px_1.6fr_0.7fr_1fr_150px_28px] ${
          open ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
        }`}
      >
        <span className="font-mono text-[18px] font-semibold text-[#E7D6B6]">{gate}</span>

        <span className="min-w-0">
          <Scramble
            text={job.title.toUpperCase()}
            className="block truncate font-mono text-[14px] font-medium tracking-wide text-white sm:text-[15px]"
          />
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 md:hidden">
            {job.team} · {job.type} · {job.location}
          </span>
        </span>

        <span className="hidden font-mono text-[12px] uppercase tracking-[0.12em] text-white/60 md:block">
          {job.type}
        </span>
        <span className="hidden font-mono text-[12px] uppercase tracking-[0.12em] text-white/60 md:block">
          {job.location}
        </span>

        <span className={`flex items-center justify-end gap-2 font-mono text-[11px] tracking-[0.14em] md:justify-start ${st.text}`}>
          <span className="relative flex h-2 w-2">
            {st.blink && (
              <span className={`cr-blink absolute inline-flex h-full w-full rounded-full ${st.dot}`} />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${st.dot}`} />
          </span>
          {st.label}
        </span>

        <ChevronDown
          className={`hidden h-5 w-5 text-white/40 transition-transform duration-300 group-hover:text-white md:block ${
            open ? "rotate-180 text-[#C9A56A]" : ""
          }`}
        />
      </button>

      {/* boarding-pass panel */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-6 pt-2 sm:px-6">
            <div className="relative grid overflow-hidden rounded-3xl bg-[#F4F1E9] text-[#141414] md:grid-cols-[1fr_240px]">
              {/* main */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8980]">
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">
                    {job.team}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">
                    {job.type}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 ring-1 ring-black/[0.06]">
                    {job.location}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
                  {job.title}
                </h3>
                {job.summary && (
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B6A63]">
                    {job.summary}
                  </p>
                )}

                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  {job.responsibilities.length > 0 && (
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6B32]">
                        What you&apos;ll do
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {job.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2.5 text-[14px] leading-relaxed text-[#3a3932]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {job.requirements.length > 0 && (
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A6B32]">
                        What we look for
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {job.requirements.map((r) => (
                          <li key={r} className="flex gap-2.5 text-[14px] leading-relaxed text-[#3a3932]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {job.perks.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {job.perks.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[12px] text-[#57564F] ring-1 ring-black/[0.05]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* stub */}
              <div className="relative flex flex-col justify-between gap-6 border-t-2 border-dashed border-black/15 bg-[#EDE8DC] p-6 md:border-l-2 md:border-t-0">
                {/* ticket cut-outs */}
                <span className="absolute -top-3 left-1/2 hidden h-6 w-6 -translate-x-1/2 rounded-full bg-[#0B0A08] md:block" />
                <span className="absolute -bottom-3 left-1/2 hidden h-6 w-6 -translate-x-1/2 rounded-full bg-[#0B0A08] md:block" />

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A8980]">
                    Boarding pass
                  </p>
                  <p className="mt-2 font-mono text-[28px] font-semibold leading-none">{gate}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#8A6B32]">
                    AKORA · {job.team}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="h-10 w-full opacity-70"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg,#141414 0 2px,transparent 2px 5px,#141414 5px 6px,transparent 6px 9px,#141414 9px 12px,transparent 12px 14px)",
                  }}
                />

                {closed ? (
                  <p className="rounded-full bg-black/[0.06] px-4 py-3 text-center text-[13px] text-[#6B6A63]">
                    This role is closed
                  </p>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={waLink(job.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-5 py-3 text-[13.5px] font-medium text-white shadow-[0_12px_28px_-14px_rgba(138,107,50,0.9)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Apply on WhatsApp
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                    <a
                      href={mailLink(job.title)}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-[#141414] ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
                    >
                      Apply by email
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Open application form ----------------------- */

function OpenApplication() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const compose = () =>
    [
      "Hi AKORA Technologies 👋 — open application",
      "",
      `Name: ${name.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      link.trim() ? `Portfolio / LinkedIn / GitHub: ${link.trim()}` : null,
      "",
      message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");

  const ok = () => {
    if (!name.trim() || message.trim().length < 10) {
      setError("Add your name and a few lines about what you do (10+ characters).");
      return false;
    }
    setError("");
    return true;
  };

  const sendWa = (e: FormEvent) => {
    e.preventDefault();
    if (!ok()) return;
    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(compose())}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const sendMail = () => {
    if (!ok()) return;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
      `Open application — ${name.trim()}`
    )}&body=${encodeURIComponent(compose())}`;
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition focus:border-[#C9A56A] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#C9A56A]/15";

  return (
    <form onSubmit={sendWa} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <input className={input} placeholder="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>
      <input className={input} placeholder="Portfolio / LinkedIn / GitHub link" value={link} onChange={(e) => setLink(e.target.value)} />
      <textarea
        rows={4}
        className={`${input} resize-y leading-6`}
        placeholder="What do you do best, and what would you love to build with us?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
          Send on WhatsApp <ArrowUpRight />
        </button>
        <button
          type="button"
          onClick={sendMail}
          className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-4 text-[14.5px] font-medium text-white ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
        >
          Send by email
        </button>
      </div>
      <p className="text-[12.5px] text-white/45">
        Opens WhatsApp or your email app, ready to send. Attach your resume in the chat or email.
      </p>
    </form>
  );
}

/* ----------------------------- Hiring flight route ------------------------ */

function HiringRoute() {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = (window.innerHeight * 0.6 - r.top) / r.height;
      setP(Math.min(1, Math.max(0, Math.round(v * 1000) / 1000)));
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
  }, []);

  return (
    <div ref={wrap} className="relative">
      {/* track */}
      <div className="absolute bottom-6 left-[19px] top-6 w-px bg-black/10" />
      <div
        className="absolute left-[19px] top-6 w-px bg-gradient-to-b from-[#8A6B32] to-[#C9A56A]"
        style={{ height: `calc((100% - 3rem) * ${p})` }}
      />
      {/* plane riding the line */}
      <div
        className="absolute left-[19px] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#8A6B32] drop-shadow-[0_6px_10px_rgba(138,107,50,0.5)]"
        style={{ top: `calc(1.5rem + (100% - 3rem) * ${p})` }}
      >
        <PlaneIcon className="h-6 w-6" />
      </div>

      <ol className="space-y-12">
        {STEPS.map((s, i) => {
          const reached = p >= i / (STEPS.length - 1) - 0.04;
          return (
            <li key={s.t} className="relative flex gap-6 pl-0">
              <span
                className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ring-1 transition-all duration-500 ${
                  reached
                    ? "scale-110 bg-[#141414] text-[#E7D6B6] ring-[#C9A56A] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]"
                    : "bg-white text-[#8A8980] ring-black/10"
                }`}
              >
                0{i + 1}
              </span>
              <div
                className={`pt-1.5 transition-all duration-500 ${
                  reached ? "opacity-100" : "opacity-45"
                }`}
              >
                <h3 className="font-serif text-[24px] leading-tight">{s.t}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#6B6A63]">{s.d}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function CareersPage() {
  const { jobs, live } = useJobs();
  const [team, setTeam] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const teams = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.team)))], [jobs]);
  const shown = jobs.filter((j) => team === "All" || j.team === team);
  const openCount = jobs.filter((j) => j.status !== "closed").length;

  // if the selected team disappears after a live refresh, fall back to All
  useEffect(() => {
    if (!teams.includes(team)) setTeam("All");
  }, [teams, team]);

  return (
    <div className="overflow-x-clip">
      <style>{`
        @keyframes cr-rise { from { transform: translateY(118%); } to { transform: translateY(0); } }
        .cr-mask { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.08em 0.14em; margin-bottom: -0.14em; }
        .cr-rise { display: inline-block; transform: translateY(118%); animation: cr-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes cr-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .cr-fade { opacity: 0; animation: cr-fade 0.9s ease forwards; }

        @keyframes cr-shine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        .cr-shine {
          display: inline-block;
          background: linear-gradient(100deg, #141414 0%, #8a6b32 30%, #e7d6b6 50%, #8a6b32 70%, #141414 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cr-shine 6s linear infinite;
        }

        @keyframes cr-fly { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        .cr-plane {
          position: absolute; left: 0; top: 0;
          offset-path: path("M -60 430 C 260 40, 720 560, 1500 130");
          offset-rotate: auto;
          animation: cr-fly 16s linear infinite;
        }

        @keyframes cr-dash { to { stroke-dashoffset: -60; } }
        .cr-dash { animation: cr-dash 3s linear infinite; }

        @keyframes cr-blink { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.6); opacity: 0; } }
        .cr-blink { animation: cr-blink 1.6s ease-out infinite; }

        @keyframes cr-wheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        .cr-wheel { animation: cr-wheel 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .cr-rise { animation: none; transform: none; }
          .cr-fade { animation: none; opacity: 1; }
          .cr-shine, .cr-plane, .cr-dash, .cr-blink, .cr-wheel { animation: none; }
          .cr-plane { offset-distance: 40%; }
        }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* NO background on <main> — it would cover the fixed footer */}
      <main className="relative z-20 text-[#141414]">
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <section className="relative flex min-h-[100svh] items-center justify-center bg-[#F4F1E9] px-6  pt-28 md:px-12">
            {/* flight path + plane */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#141414 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 h-[560px] w-[1440px] -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 1440 560" className="absolute inset-0 h-full w-full" fill="none">
                  <path
                    className="cr-dash"
                    d="M -60 430 C 260 40, 720 560, 1500 130"
                    stroke={GOLD}
                    strokeWidth="2"
                    strokeDasharray="6 14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="cr-plane text-[#8A6B32] drop-shadow-[0_10px_14px_rgba(138,107,50,0.5)]">
                  <PlaneIcon className="h-9 w-9" />
                </div>
              </div>
              <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#C9A56A]/20 blur-[120px]" />
              <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[130px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="absolute -inset-x-[8%] -inset-y-[14%] -z-10 bg-[radial-gradient(closest-side,rgba(244,241,233,0.92),rgba(244,241,233,0))]" />

              <div className="cr-fade" style={{ animationDelay: "50ms" }}>
                <Eyebrow>Careers at AKORA</Eyebrow>
              </div>

              <div className="mt-8 text-[clamp(1.5rem,4.6vw,3.2rem)]">
                <FlapText text="NOW BOARDING" delay={300} />
              </div>

              <h1 className="mt-8 text-[clamp(2.4rem,6.4vw,5rem)] font-semibold leading-[1.04] tracking-tight">
                {["Join", "the", "crew", "building"].map((w, i) => (
                  <span key={w} className="cr-mask mr-[0.22em]">
                    <span className="cr-rise" style={{ animationDelay: `${300 + i * 110}ms` }}>
                      {w}
                    </span>
                  </span>
                ))}
                <br />
                {["what's", "next."].map((w, i) => (
                  <span key={w} className="cr-mask mr-[0.22em] font-serif font-normal italic last:mr-0">
                    <span className="cr-rise" style={{ animationDelay: `${740 + i * 130}ms` }}>
                      <span className="cr-shine">{w}</span>
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className="cr-fade mx-auto mt-8 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]"
                style={{ animationDelay: "1100ms" }}
              >
                Engineers, designers and researchers who love shipping real things — from
                websites and apps to machines that fly.
              </p>

              <div
                className="cr-fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                style={{ animationDelay: "1250ms" }}
              >
                <a
                  href="#roles"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
                >
                  View departures
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-[13.5px] text-[#3a3932] ring-1 ring-black/[0.06] backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="cr-blink absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-semibold">{openCount}</span> open {openCount === 1 ? "role" : "roles"}
                </span>
              </div>
            </div>

            {/* <div
              className="cr-fade pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8A8980]"
              style={{ animationDelay: "1600ms" }}
            >
              Scroll
              <span className="flex h-9 w-[22px] justify-center rounded-full border border-black/25 pt-2">
                <span className="cr-wheel h-1.5 w-[3px] rounded-full bg-[#8A6B32]" />
              </span>
            </div> */}
          </section>

          {/* ============================== PERKS ============================= */}
          <section className="bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal className="max-w-2xl">
                <Eyebrow>Why AKORA</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  A small crew,{" "}
                  <span className="relative font-serif font-normal italic">
                    big altitude.
                    <Underline />
                  </span>
                </h2>
              </Reveal>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PERKS.map((p, i) => (
                  <Reveal key={p.t} delay={(i % 3) * 90} dir="scale">
                    <div
                      className={`group h-full rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 ${
                        i === 1
                          ? "bg-[#0B0A08] text-white hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]"
                          : "bg-white ring-1 ring-black/[0.06] hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.3)]"
                      }`}
                    >
                      <p
                        className="font-serif text-[40px] italic leading-none"
                        style={{ color: i === 1 ? GOLD : GOLD_DARK }}
                      >
                        0{i + 1}
                      </p>
                      <h3 className="mt-6 font-serif text-[21px] leading-snug">{p.t}</h3>
                      <p
                        className={`mt-3 text-[14.5px] leading-relaxed ${
                          i === 1 ? "text-white/60" : "text-[#6B6A63]"
                        }`}
                      >
                        {p.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ DEPARTURES ========================== */}
          <section id="roles" className="relative scroll-mt-20 bg-[#0B0A08] px-6 py-24 text-white md:px-12 md:py-32">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[#C9A56A]/15 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <Eyebrow dark>Open roles</Eyebrow>
                  <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                    Departures{" "}
                    <span className="font-serif font-normal italic" style={{ color: GOLD }}>
                      today.
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by team">
                  {teams.map((t) => (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={team === t}
                      onClick={() => {
                        setTeam(t);
                        setOpenId(null);
                      }}
                      className={`rounded-full px-4 py-2 text-[13px] transition-all duration-200 ${
                        team === t
                          ? "bg-[#C9A56A] font-medium text-[#141414]"
                          : "bg-white/[0.06] text-white/70 ring-1 ring-white/10 hover:bg-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-12">
                <div className="overflow-hidden rounded-[28px] bg-[#111114] ring-1 ring-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
                  {/* board header */}
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.04] px-4 py-3.5 sm:px-6">
                    <div className="flex items-center gap-2.5 font-mono text-[12px] tracking-[0.2em] text-[#E7D6B6]">
                      <PlaneIcon className="h-4 w-4 -rotate-45" />
                      DEPARTURES
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-white/50">
                      <span className="relative flex h-2 w-2">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full ${
                            live ? "cr-blink bg-emerald-400" : "bg-white/30"
                          }`}
                        />
                        <span
                          className={`relative inline-flex h-2 w-2 rounded-full ${
                            live ? "bg-emerald-400" : "bg-white/40"
                          }`}
                        />
                      </span>
                      {live ? "LIVE" : "UPDATED"}
                    </div>
                  </div>

                  {/* column labels */}
                  <div className="hidden grid-cols-[72px_1.6fr_0.7fr_1fr_150px_28px] gap-x-4 border-b border-white/10 px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/35 md:grid">
                    <span>Gate</span>
                    <span>Role</span>
                    <span>Type</span>
                    <span>Location</span>
                    <span>Status</span>
                    <span />
                  </div>

                  {shown.length === 0 ? (
                    <p className="px-6 py-16 text-center font-mono text-[13px] tracking-[0.1em] text-white/50">
                      NO DEPARTURES IN THIS TEAM RIGHT NOW
                    </p>
                  ) : (
                    shown.map((job, i) => (
                      <BoardRow
                        key={job.id}
                        job={job}
                        gate={`${String.fromCharCode(65 + (i % 6))}${Math.floor(i / 6) + 1}`}
                        open={openId === job.id}
                        onToggle={() => setOpenId(openId === job.id ? null : job.id)}
                      />
                    ))
                  )}
                </div>
              </Reveal>

              <p className="mt-6 text-center text-[13.5px] text-white/45">
                Don&apos;t see your role? Scroll down and send an open application.
              </p>
            </div>
          </section>

          {/* ============================ HIRING ROUTE ======================== */}
          <section className="bg-[#EDE8DC] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <Eyebrow>How hiring works</Eyebrow>
                  <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.08] tracking-tight">
                    Your flight{" "}
                    <span className="relative font-serif font-normal italic">
                      plan.
                      <Underline />
                    </span>
                  </h2>
                  <p className="mt-8 max-w-sm text-[15.5px] leading-relaxed text-[#6B6A63]">
                    Four simple stops from hello to take-off. Scroll and watch the route fill
                    in.
                  </p>
                </Reveal>
              </div>

              <HiringRoute />
            </div>
          </section>

          {/* ========================= OPEN APPLICATION ======================= */}
          <section className="bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
            <Reveal dir="scale">
              <div className="relative mx-auto grid max-w-6xl gap-12 overflow-hidden rounded-[36px] bg-[#0B0A08] p-8 text-white sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-16">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A56A]/25 blur-[90px]" />
                <div className="relative">
                  <Eyebrow dark>Open application</Eyebrow>
                  <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1]">
                    No gate for you?{" "}
                    <span className="italic" style={{ color: GOLD }}>
                      Make one.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
                    Tell us what you&apos;re great at. If there&apos;s a fit now or later,
                    we&apos;ll reach out personally.
                  </p>
                  <a
                    href={CONTACT_HREF}
                    className="mt-8 inline-flex items-center gap-2 text-[14px] text-[#E0C28D] transition-colors hover:text-white"
                  >
                    Or just say hello <ArrowUpRight />
                  </a>
                </div>
                <div className="relative">
                  <OpenApplication />
                </div>
              </div>
            </Reveal>
          </section>
        </PageRevealWrapper>
      </main>

      {/* Footer is OUTSIDE <main>; it is revealed as the page scrolls up */}
      <Footer />
    </div>
  );
}