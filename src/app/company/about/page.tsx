"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — ABOUT US PAGE
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/company/about/page.tsx   (route: /company/about)
 *
 * PORTFOLIO PHOTOS
 *  1. Put your screenshots in  frontend/public/portfolio/
 *     e.g.  public/portfolio/shop-website.png
 *  2. In the PROJECTS array below set   image: "/portfolio/shop-website.png"
 *  Projects without an `image` show a designed mock screen automatically.
 *  (The titles below are generic placeholders — replace with your real work.)
 *
 * FOOTER: content sits inside <PageRevealWrapper>, <Footer /> is outside <main>,
 * and <main> has NO background, so the fixed footer is revealed correctly.
 * ==========================================================================*/

const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";

type Category = "Website" | "App";

type Project = {
  id: string;
  title: string;
  category: Category;
  desc: string;
  tags: string[];
  accent: string; // used by the auto-generated mock screen
  image?: string; // e.g. "/portfolio/my-site.png"
  url?: string; // live link (optional)
  wide?: boolean; // spans 2 columns on large screens (when filter = All)
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "E-commerce Storefront",
    category: "Website",
    desc: "A fast, conversion-focused online store with secure checkout and a clean admin panel.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    accent: "#C9A56A",
    wide: true,
  },
  {
    id: "p2",
    title: "Food Delivery App",
    category: "App",
    desc: "Live order tracking, instant payments and a smooth ordering flow on iOS and Android.",
    tags: ["React Native", "Firebase"],
    accent: "#E8645F",
  },
  {
    id: "p3",
    title: "Corporate Website",
    category: "Website",
    desc: "A premium company site built for speed, clarity and search visibility.",
    tags: ["Next.js", "SEO"],
    accent: "#3178C6",
  },
  {
    id: "p4",
    title: "Fitness & Wellness App",
    category: "App",
    desc: "Workout plans, progress tracking and subscriptions in one polished mobile experience.",
    tags: ["React Native", "Node.js"],
    accent: "#2FA84A",
    wide: true,
  },
  {
    id: "p5",
    title: "Real Estate Portal",
    category: "Website",
    desc: "Property listings with smart filters, maps and lead capture.",
    tags: ["Next.js", "MongoDB"],
    accent: "#635BFF",
  },
  {
    id: "p6",
    title: "Learning Platform",
    category: "App",
    desc: "Courses, live classes and progress dashboards for students and teachers.",
    tags: ["React", "Express"],
    accent: "#38BDF8",
  },
  {
    id: "p7",
    title: "Booking & Services Site",
    category: "Website",
    desc: "Online appointments, payments and automated reminders for a services business.",
    tags: ["Next.js", "Calendly"],
    accent: "#FFB020",
  },
];

const FILTERS: ("All" | Category)[] = ["All", "Website", "App"];

const TECH = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
  "Docker",
  "Stripe",
  "Vercel",
];

/* --------------------------------- Helpers -------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

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

/* ------------------------- Auto-generated mock screen --------------------- */

function Mock({ kind, accent }: { kind: Category; accent: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}55 100%)` }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
        style={{ background: `${accent}55` }}
      />

      {kind === "Website" ? (
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
      ) : (
        <div className="relative h-[86%] w-[34%] min-w-[110px] rounded-[24px] bg-[#141414] p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.04]">
          <div className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-[19px] bg-white p-2.5">
            <div className="mx-auto h-1 w-8 rounded-full bg-black/15" />
            <div className="h-10 rounded-xl" style={{ background: accent }} />
            <div className="h-2 w-3/4 rounded bg-black/10" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-lg" style={{ background: `${accent}33` }} />
              <div className="h-14 rounded-lg bg-black/[0.05]" />
            </div>
            <div className="h-9 rounded-lg bg-black/[0.05]" />
            <div className="mt-auto h-7 rounded-full" style={{ background: `${accent}` }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Project card ------------------------------ */

function ProjectCard({ p, wide }: { p: Project; wide: boolean }) {
  const Wrapper = p.url ? "a" : "div";
  const linkProps = p.url
    ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`group relative block overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.35)] ${
        wide ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`relative w-full ${wide ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Mock kind={p.category} accent={p.accent} />
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#141414] shadow-sm backdrop-blur">
          {p.category}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <h3 className="font-serif text-[21px] leading-snug text-[#141414]">{p.title}</h3>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#6B6A63]">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-black/[0.04] px-3 py-1 text-[11.5px] text-[#57564F] ring-1 ring-black/[0.05]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F1E9] text-[#57564F] transition-all duration-300 group-hover:bg-[#141414] group-hover:text-white">
          <ArrowUpRight />
        </span>
      </div>
    </Wrapper>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function AboutPage() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <div>
      <Navbar />

      {/* NO background on <main> — it would cover the fixed footer */}
      <main className="relative z-20 text-[#141414]">
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <section className="relative overflow-hidden bg-[#F4F1E9] px-6 pb-14 pt-24 md:px-12 md:pb-16 md:pt-28">
            <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#C9A56A]/20 blur-[120px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[130px]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(#141414 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            <div className="relative mx-auto max-w-6xl">
         

              <Reveal delay={80}>
                <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,3.8rem)] font-extralight leading-[1.04] tracking-tight">
                  We&apos;re not a vendor.
                  <br />
                  <span className="relative font-serif font-normal italic">
                    We&apos;re the team that never hands you off.
                    <Underline />
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-9 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]">
                  <span className="font-medium text-[#141414]">AKORA Technologies</span>{" "}
                  designs and engineers websites, apps, search growth and applied AI —
                  alongside R&amp;D in robotics and drones. One accountable team, six
                  disciplines, zero lossy hand-offs.
                </p>
              </Reveal>

              <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
                >
                  See our work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={CONTACT_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-medium text-[#141414] ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
                >
                  Start a project
                </a>
              </Reveal>
            </div>
          </section>

          {/* ===================== TOP GRID (bento boxes) ===================== */}
          <section className="bg-[#F4F1E9] px-6 pb-20 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-4 lg:grid-rows-2">
              {/* big story box */}
              <Reveal className="lg:col-span-2 lg:row-span-2">
                <div className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[28px] bg-[#0B0A08] p-8 text-white sm:p-10">
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[90px]"
                    style={{ background: "rgba(201,165,106,0.25)" }}
                  />
                  <div className="relative">
                    <Eyebrow dark>Who we are</Eyebrow>
                    <h2 className="mt-6 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15]">
                      A single build team for everything a brand needs to{" "}
                      <span className="italic" style={{ color: GOLD }}>
                        show up
                      </span>
                      , and everything an engineering-led company needs to{" "}
                      <span className="italic" style={{ color: GOLD }}>
                        invent.
                      </span>
                    </h2>
                  </div>
                  <p className="relative mt-auto pt-8 text-[14.5px] leading-relaxed text-white/60">
                    Most companies split their web presence, growth engine and hardware
                    ambitions across several vendors who never talk to each other. We built
                    AKORA to close that gap — specifications first, disciplined builds,
                    measured outcomes.
                  </p>
                </div>
              </Reveal>

              {[
                { v: "60+", l: "Projects shipped" },
                { v: "4.9/5", l: "Client rating" },
                { v: "12 days", l: "Avg. launch time" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={(i + 1) * 80}>
                  <div className="flex h-full min-h-[160px] flex-col justify-between rounded-[28px] bg-white p-7 ring-1 ring-black/[0.06]">
                    <span className="h-1.5 w-8 rounded-full" style={{ background: GOLD }} />
                    <div>
                      <p className="font-serif text-[40px] italic leading-none">{s.v}</p>
                      <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-[#8A8980]">
                        {s.l}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={400}>
                <div
                  className="flex h-full min-h-[160px] flex-col justify-between rounded-[28px] p-7 text-white"
                  style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})` }}
                >
                  <p className="text-[11.5px] uppercase tracking-[0.14em] text-white/80">
                    Remote-first
                  </p>
                  <p className="font-serif text-[22px] leading-snug">
                    Building for clients across India &amp; worldwide.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================ PORTFOLIO =========================== */}
          <section id="work" className="scroll-mt-24 bg-[#EDE8DC] px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-xl">
                  <Eyebrow>Our work</Eyebrow>
                  <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.08] tracking-tight">
                    Websites &amp; apps{" "}
                    <span className="relative font-serif font-normal italic">
                      we&apos;re proud of.
                      <Underline />
                    </span>
                  </h2>
                </div>

                <div
                  role="tablist"
                  aria-label="Filter projects"
                  className="inline-flex rounded-full bg-white p-1.5 ring-1 ring-black/[0.06]"
                >
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      role="tab"
                      aria-selected={filter === f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-5 py-2 text-[13.5px] font-medium transition-all duration-200 ${
                        filter === f
                          ? "bg-[#141414] text-white shadow"
                          : "text-[#57564F] hover:text-[#141414]"
                      }`}
                    >
                      {f === "All" ? "All" : f === "Website" ? "Websites" : "Apps"}
                    </button>
                  ))}
                </div>
              </Reveal>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p) => (
                  <ProjectCard key={p.id} p={p} wide={filter === "All" && !!p.wide} />
                ))}
              </div>
            </div>
          </section>

          {/* ==================== BOTTOM GRID (bento boxes) =================== */}
          <section className="bg-[#F4F1E9] px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mb-12 max-w-xl">
                <Eyebrow>What drives us</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight">
                  What drives the build,{" "}
                  <span className="relative font-serif font-normal italic">
                    top to bottom.
                    <Underline />
                  </span>
                </h2>
              </Reveal>

              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  {
                    k: "01 / Mission",
                    t: "Build the whole stack, not just a slice of it.",
                    d: "Give founders and enterprises one team that takes an idea from a landing page to a search-ranked product — and, where relevant, to the machine that runs it.",
                  },
                  {
                    k: "02 / Vision",
                    t: "Be the quiet engineering partner behind what's next.",
                    d: "Our fingerprints on the software people use daily and on the autonomous systems working behind the scenes.",
                  },
                  {
                    k: "03 / Value",
                    t: "Ship measurable. Defend it with data.",
                    d: "Every engagement ends in a number that matters — load time, ranking, conversion, uptime. The readout decides.",
                  },
                ].map((c, i) => (
                  <Reveal key={c.k} delay={i * 80}>
                    <div className="h-full rounded-[28px] bg-white p-8 ring-1 ring-black/[0.06] transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)]">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8980]">
                        {c.k}
                      </p>
                      <h3 className="mt-5 font-serif text-[22px] leading-snug">{c.t}</h3>
                      <p className="mt-4 text-[14.5px] leading-relaxed text-[#6B6A63]">{c.d}</p>
                    </div>
                  </Reveal>
                ))}

                {/* tech stack box */}
                <Reveal delay={80} className="lg:col-span-2">
                  <div className="h-full rounded-[28px] bg-[#EDE8DC] p-8">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#8A8980]">
                      Our stack
                    </p>
                    <h3 className="mt-4 font-serif text-[22px] leading-snug">
                      Modern, production-grade tools.
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {TECH.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white px-4 py-2 text-[13px] text-[#3a3932] ring-1 ring-black/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* CTA box */}
                <Reveal delay={160}>
                  <a
                    href={CONTACT_HREF}
                    className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#0B0A08] p-8 text-white"
                  >
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[80px] transition-opacity duration-500 group-hover:opacity-80"
                      style={{ background: "rgba(201,165,106,0.3)" }}
                    />
                    <p className="relative text-[11px] uppercase tracking-[0.14em] text-white/50">
                      Have a project?
                    </p>
                    <div className="relative">
                      <p className="font-serif text-[26px] leading-snug">
                        Let&apos;s build{" "}
                        <span className="italic" style={{ color: GOLD }}>
                          something great.
                        </span>
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[14px] text-[#E0C28D] transition-colors group-hover:text-white">
                        Get in touch <ArrowUpRight />
                      </span>
                    </div>
                  </a>
                </Reveal>
              </div>
            </div>
          </section>
        </PageRevealWrapper>
      </main>

      {/* Footer is OUTSIDE <main>; it's revealed as the page scrolls up */}
      <Footer />
    </div>
  );
}