"use client";

/* ============================================================================
 * AKORA TECHNOLOGIES — "ABOUT US" SECTION
 * ----------------------------------------------------------------------------
 * Stack:      Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
 * Dependency: lucide-react, framer-motion
 *             npm install lucide-react framer-motion
 *
 * Design language matches the existing AKORA site:
 *   - Cream canvas (#F4F1E9) alternating with ink-black panels (#0B0B0D)
 *   - Bold serif display headlines with an italic accent phrase + underline
 *   - Rounded pill "eyebrow" labels ("• ABOUT AKORA")
 *   - Dark instrument-panel cards with avatar chips and status pills
 *   - Numbered process cards with colored icon roundels (gold / green / maroon / navy)
 *
 * Drop this file in as `components/AboutSection.tsx` and import it into any
 * route, e.g. `src/app/home-page/about-sec/page.tsx`:
 *
 *   import AboutSection from "@/components/AboutSection";
 *   export default function Page() { return <AboutSection />; }
 *
 * If your project's global font isn't a serif display face yet, add one
 * (Playfair Display / Instrument Serif / Fraunces work well) and reference it
 * via a `font-display` utility in tailwind.config — this file falls back to
 * `font-serif` so it works out of the box either way.
 * ==========================================================================*/

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Globe,
  Smartphone,
  Search,
  BrainCircuit,
  Bot,
  PlaneTakeoff,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Quote,
  MapPin,
  Users2,
  Award,
  Target,
  Eye,
  Compass,
  Sparkles,
  Zap,
  Signal,
  Clock,
  ShieldCheck,
} from "lucide-react";

/* ============================================================================
 * SECTION 0 — DESIGN TOKENS
 * ----------------------------------------------------------------------------
 * Centralised so the whole section can be re-themed from one place. These are
 * plain Tailwind-arbitrary-value strings rather than a tailwind.config edit,
 * so the component works even if you can't touch the config right now.
 * ==========================================================================*/

const TOKENS = {
  cream: "#F4F1E9",
  creamSoft: "#EDE8DC",
  ink: "#141414",
  inkSoft: "#4B4A45",
  dark: "#0B0B0D",
  darkPanel: "#17171B",
  darkPanel2: "#1D1D22",
  gold: "#C9A265",
  goldSoft: "#E7D6B6",
  maroon: "#7A2E2E",
  green: "#2F5233",
  navy: "#243B55",
  hairlineOnCream: "rgba(20,20,20,0.10)",
  hairlineOnDark: "rgba(255,255,255,0.10)",
} as const;

/* ============================================================================
 * SECTION 1 — SHARED PRIMITIVES
 * ==========================================================================*/

/**
 * Eyebrow pill — the small rounded label that sits above every headline
 * across the AKORA site, e.g. "• ABOUT AKORA".
 */
function Eyebrow({
  children,
  tone = "onCream",
}: {
  children: ReactNode;
  tone?: "onCream" | "onDark";
}) {
  const toneClasses =
    tone === "onCream"
      ? "bg-white/70 text-[#4B4A45] ring-1 ring-black/10"
      : "bg-white/[0.06] text-white/70 ring-1 ring-white/15";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5",
        "text-[11px] font-medium uppercase tracking-[0.18em]",
        "backdrop-blur-sm",
        toneClasses,
      ].join(" ")}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: TOKENS.gold }}
        aria-hidden
      />
      {children}
    </span>
  );
}

/**
 * Section heading — big serif headline, first line regular weight, second
 * line italic with a short accent underline. Mirrors the hero treatment
 * used across the rest of the AKORA homepage.
 */
function SectionHeading({
  eyebrow,
  lineOne,
  lineTwoItalic,
  tone = "onCream",
  align = "left",
  sub,
}: {
  eyebrow: string;
  lineOne: string;
  lineTwoItalic?: string;
  tone?: "onCream" | "onDark";
  align?: "left" | "center";
  sub?: string;
}) {
  const headingColor = tone === "onCream" ? "text-[#141414]" : "text-white";
  const subColor = tone === "onCream" ? "text-[#6B6A63]" : "text-white/60";
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClasses} max-w-2xl`}>
      <div className="mb-5">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        className={[
          "font-serif leading-[1.08] tracking-tight",
          "text-[clamp(2rem,4.2vw,3.4rem)]",
          headingColor,
        ].join(" ")}
      >
        {lineOne}
        {lineTwoItalic ? (
          <>
            <br />
            <span className="relative italic">
              {lineTwoItalic}
              <svg
                className="absolute left-0 -bottom-2 w-full"
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0 3 C 50 0, 150 6, 200 3"
                  stroke={TOKENS.gold}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </>
        ) : null}
      </h2>
      {sub ? (
        <p className={`mt-5 text-[15.5px] leading-relaxed ${subColor}`}>{sub}</p>
      ) : null}
    </div>
  );
}

/**
 * Reveal — a small wrapper that fades + slides content up into view once,
 * the first time it scrolls into the viewport. Used instead of manually
 * wiring IntersectionObserver everywhere.
 */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Primary / ghost buttons — matches the pill CTA buttons used across the
 * AKORA homepage ("Start a Project", "Start Your Project →").
 */
function AkoraButton({
  children,
  href = "#contact",
  variant = "primary",
  tone = "onCream",
  icon = true,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  tone?: "onCream" | "onDark";
  icon?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-medium transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-[#141414] text-white hover:bg-[#2a2a2a]"
      : tone === "onCream"
      ? "bg-white text-[#141414] ring-1 ring-black/10 hover:ring-black/20"
      : "bg-white/[0.06] text-white ring-1 ring-white/15 hover:bg-white/[0.1]";

  return (
    <a href={href} className={`${base} ${styles} group`}>
      {children}
      {icon ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}

/**
 * AnimatedNumber — counts up from 0 to `value` once it enters the viewport.
 * Used for the stats strip (projects shipped, retention rate, etc).
 */
function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;

    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ============================================================================
 * SECTION 2 — DATA
 * ----------------------------------------------------------------------------
 * Swap this content for your real copy, team names, and metrics whenever
 * you have them finalised — everything below is structured so the JSX never
 * needs to change, only the arrays.
 * ==========================================================================*/

interface ServiceDomain {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

}

const SERVICE_DOMAINS: ServiceDomain[] = [
  {
    id: "web",
    index: "01",
    title: "Website Development",
    description:
      "Custom-built, high-performance websites — corporate, e-commerce, and product sites — engineered for speed, clarity, and conversion, not assembled from templates.",
    tags: ["Next.js", "Headless CMS", "Core Web Vitals"],
    Icon: Globe,
  },
  {
    id: "app",
    index: "02",
    title: "App Development",
    description:
      "Native iOS and Android apps built in-house from product design through App Store launch — no bloated wrappers, no compromise on speed.",
    tags: ["Native iOS", "Native Android", "React Native"],
    Icon: Smartphone,
  },
  {
    id: "seo",
    index: "03",
    title: "SEO & Organic Growth",
    description:
      "Technical SEO and content architecture planned alongside the build itself, so rankings are never retrofitted onto a site that wasn't built for them.",
    tags: ["Technical Audit", "Content Ops", "Analytics"],
    Icon: Search,
  },
  {
    id: "ai",
    index: "04",
    title: "AI & Applied R&D",
    description:
      "Applied machine learning — computer vision, automation pipelines, and custom model integration — built directly into your product, not bolted on after.",
    tags: ["Computer Vision", "LLM Integration", "Automation"],
    Icon: BrainCircuit,
  },
  {
    id: "robotics",
    index: "05",
    title: "Robotics Engineering",
    description:
      "Design and control-systems work for autonomous platforms — sensing, real-time navigation, and embedded firmware built for the field, not the lab.",
    tags: ["ROS", "Sensor Fusion", "Embedded Firmware"],
    Icon: Bot,
  },
  {
    id: "drone",
    index: "06",
    title: "Drone Technology",
    description:
      "Flight-controller tuning, custom payload integration, and ground-control software for survey, inspection, and delivery-focused drone systems.",
    tags: ["Flight Firmware", "Telemetry", "GCS Software"],
    Icon: PlaneTakeoff,
  },
];

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { id: "projects", value: 120, suffix: "+", label: "Projects Shipped" },
  { id: "retention", value: 98, suffix: "%", label: "Client Retention" },
  { id: "vitals", value: 92, suffix: "/100", label: "Avg. Core Web Vitals" },
  { id: "labs", value: 3, suffix: "", label: "Active R&D Labs" },
];

interface WhyCard {
  id: string;
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

}

const WHY_CARDS: WhyCard[] = [
  {
    id: "one-team",
    title: "One team, zero hand-offs",
    description:
      "Your web developer, SEO lead, and drone firmware engineer sit in the same standup — no lossy hand-offs between separate agencies.",
    Icon: Users2,
  },
  {
    id: "fast-start",
    title: "From kickoff to launch, fast",
    description:
      "A scoped brief and a dedicated team means work starts within days, not weeks — with a real proof of concept early, not just a proposal deck.",
    Icon: Zap,
  },
  {
    id: "dedicated-lead",
    title: "One dedicated project lead, always",
    description:
      "A single point of contact owns scheduling, monitoring, and delivery — so you always know exactly who to ask and where things stand.",
    Icon: Compass,
  },
  {
    id: "support",
    title: "Support that doesn't disappear",
    description:
      "SEO, apps, and drones all need tending after day one. Every engagement includes a real post-launch support window, not a closed ticket.",
    Icon: ShieldCheck,
  },
];

interface MissionCard {
  id: string;
  index: string;
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MISSION_CARDS: MissionCard[] = [
  {
    id: "mission",
    index: "01 / Mission",
    title: "Build the whole stack, not just a slice of it.",
    description:
      "Give founders and enterprises one team that can take an idea from a landing page to a search-ranked product to, where relevant, the physical machine that runs it.",
    Icon: Target,
  },
  {
    id: "vision",
    index: "02 / Vision",
    title: "Be the quiet engineering partner behind what's next.",
    description:
      "We want AKORA's fingerprints on the software people use daily, and on the autonomous systems working behind the scenes across logistics, agriculture, and inspection.",
    Icon: Eye,
  },
  {
    id: "value",
    index: "03 / Operating Value",
    title: "Ship measurable. Defend it with data.",
    description:
      "Every engagement ends in a number that matters — load time, ranking position, conversion lift, flight stability, uptime. Opinions are welcome; the readout decides.",
    Icon: Sparkles,
  },
];

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

const TIMELINE: TimelineItem[] = [
  {
    id: "y1",
    year: "Year 01",
    title: "Founded on web & app delivery",
    description:
      "AKORA started as a focused web and app development studio, shipping production sites and mobile apps for early clients across retail and services.",
  },
  {
    id: "y2",
    year: "Year 02",
    title: "SEO & growth practice formalized",
    description:
      "Clients kept asking the same question after launch — \"now what gets us found?\" — so we built a dedicated technical SEO and growth practice in-house.",
  },
  {
    id: "y3",
    year: "Year 03",
    title: "AI & applied research desk opens",
    description:
      "We stood up an applied AI team to bring computer vision, automation, and model integration directly into client products as core engineering.",
  },
  {
    id: "y4",
    year: "Year 04",
    title: "Robotics & drone R&D labs launched",
    description:
      "The same engineering discipline behind our software stack turned toward hardware — robotics control systems and drone flight software became a permanent lab.",
  },
  {
    id: "today",
    year: "Today",
    title: "One team, six disciplines, one pipeline",
    description:
      "AKORA now runs web, app, SEO, AI, robotics, and drone engineering as a single coordinated practice for clients who need more than one vendor can offer.",
  },
];

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  color: string;
}

const TEAM: TeamMember[] = [
  { id: "ak", initials: "AK", name: "Founder & CEO", role: "Strategy & Delivery", color: TOKENS.gold },
  { id: "rs", initials: "RS", name: "Head of Engineering", role: "Web & App Systems", color: TOKENS.maroon },
  { id: "mj", initials: "MJ", name: "Growth Lead", role: "SEO & Analytics", color: TOKENS.green },
  { id: "pn", initials: "PN", name: "R&D Lead", role: "AI · Robotics · Drones", color: TOKENS.navy },
];

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  tag: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "AKORA rebuilt our site and our search rankings in the same sprint. Organic leads overtook paid within four months.",
    name: "Marketing Director",
    role: "Retail chain, 40+ outlets",
    tag: "Website + SEO",
  },
  {
    id: "t2",
    quote:
      "They shipped our booking app in eight weeks and it hasn't gone down once. Support actually answers on weekends.",
    name: "Founder",
    role: "Services startup",
    tag: "Mobile App",
  },
  {
    id: "t3",
    quote:
      "Their R&D team tuned our flight controller and built the ground-control software from scratch. Field-ready in one season.",
    name: "Operations Lead",
    role: "Agritech survey team",
    tag: "Drone R&D",
  },
];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "Do you handle web, app, and SEO as one project?",
    answer:
      "Yes — it's how we prefer to work. Building the site's architecture and its SEO strategy together avoids the retrofitting most agencies do after a separate vendor gets involved later.",
  },
  {
    id: "f2",
    question: "Can you take on just the AI or robotics piece of a bigger product?",
    answer:
      "Yes. Plenty of clients come to us for a single discipline — a computer-vision feature, a flight-controller tune, an ML pipeline — without needing the rest of the stack.",
  },
  {
    id: "f3",
    question: "How long does a typical website or app build take?",
    answer:
      "Most marketing sites ship in 3–5 weeks and mobile apps in 6–10 weeks, depending on scope. Drone and robotics R&D timelines are scoped per project after a feasibility pass.",
  },
  {
    id: "f4",
    question: "Do you offer support after launch?",
    answer:
      "Every engagement includes a post-launch support window, and ongoing retainers are available for ranking maintenance, app updates, or flight-hardware servicing.",
  },
  {
    id: "f5",
    question: "Where is AKORA based, and do you work with clients remotely?",
    answer:
      "Our team and R&D lab are based in Indore, India, and we work with clients across India and internationally through remote-first delivery.",
  },
];

/* ============================================================================
 * SECTION 3 — SUB-COMPONENTS
 * ==========================================================================*/

/**
 * 3.1 — Hero block (cream). The opening thesis statement for the About page,
 * paired with the stats strip underneath, mirroring the homepage hero.
 */
function AboutHero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pb-20 pt-8 md:px-12 "
      style={{ backgroundColor: TOKENS.cream }}
    >
      {/* faint blueprint dot-grid, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(${TOKENS.ink} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>About AKORA Technologies</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] tracking-tight text-[#141414]">
            We're not a vendor.
            <br />
            <span className="italic">We're the team that never hands you off.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]">
            <span className="font-medium text-[#141414]">AKORA Technologies</span>{" "}
            designs and engineers websites, apps, search visibility, and applied
            AI — alongside dedicated R&amp;D in robotics and drone systems. One
            accountable team, six disciplines, zero lossy hand-offs.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-4">
          <AkoraButton href="#capabilities" variant="primary">
            View Capabilities
          </AkoraButton>
          <AkoraButton href="#contact" variant="ghost">
            Start a Project
          </AkoraButton>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={0.32} className="mt-16">
          <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.id}>
                <div className="font-serif text-3xl text-[#141414] md:text-4xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[11.5px] uppercase tracking-[0.12em] text-[#8A8980]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 3.2 — Narrative block (cream). The longer "who we are" copy paired with a
 * dark instrument-panel figure that lists the six core domains.
 */
function AboutNarrative() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.cream }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-6 max-w-lg font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[#141414]">
            A single build team for everything a modern brand needs to{" "}
            <span className="italic">show up</span>, and everything an
            engineering-led company needs to{" "}
            <span className="italic">invent</span>.
          </h2>

          <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-[#57564F]">
            <p>
              AKORA Technologies was founded on a simple observation: most
              companies split their web presence, their growth engine, and
              their hardware ambitions across three or four vendors who never
              talk to each other. We built AKORA to close that gap.
            </p>
            <p>
              We work the way an engineering team works — specifications
              first, disciplined builds, measured outcomes. Every project,
              whether it's a marketing site or a flight-controller firmware
              update, goes through the same rigor of planning, prototyping,
              testing, and handover.
            </p>
            <p>
              Today our work spans web &amp; app development, SEO &amp;
              organic growth, applied AI, and R&amp;D across autonomous
              robotics and drone technology — for clients who need software
              that performs and hardware that flies straight.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="rounded-3xl p-7 ring-1 ring-white/10"
            style={{ backgroundColor: TOKENS.dark }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[11px]  tracking-[0.14em] text-white/50">
              <span>https://akoratechnologies.in</span>
              <span className="flex items-center gap-2 text-[#7ADBC9]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7ADBC9]" />
                Live
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
              {SERVICE_DOMAINS.map((domain) => (
                <div
                  key={domain.id}
                  className="flex flex-col gap-3 bg-[#17171B] p-4 transition-colors duration-300 hover:bg-[#1D1D22]"
                >
                  <domain.Icon className="h-5 w-5" style={{ color: TOKENS.gold }} />
                  <span className="text-[11px] leading-snug text-white/70">
                    {domain.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 3.3 — Mission / Vision / Value trio (cream, three-column cards).
 */
function MissionVisionValue() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.creamSoft }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <Eyebrow>Direction</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[#141414]">
              What drives the build, <span className="italic">top to bottom.</span>
            </h2>
          </div>
          <p className="flex items-center gap-2 text-[12.5px] text-[#8A8980]">
            <MapPin className="h-3.5 w-3.5" />
            22.7196° N, 75.8577° E — HQ Bangaluru, India
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MISSION_CARDS.map((card, i) => (
            <Reveal delay={i * 0.08} key={card.id}>
              <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-black/[0.06] transition-shadow duration-300 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.25)]">
                <div
                  className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: TOKENS.goldSoft }}
                >
                  <card.Icon className="h-5 w-5" style={{ color: "#8A6B32" }} />
                </div>
                <div className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#8A8980]">
                  {card.index}
                </div>
                <h3 className="mb-3 font-serif text-xl leading-snug text-[#141414]">
                  {card.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#6B6A63]">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 3.4 — Six core-domain capability grid (cream).
 */
function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      className="px-6 py-8 md:px-12"
      style={{ backgroundColor: TOKENS.cream }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-xl">
          <SectionHeading
            eyebrow="Capabilities"
            lineOne="Six disciplines."
            lineTwoItalic="One accountable team."
            sub="From the site your customers land on to the drone your ops team flies — every discipline below is built and supported in-house."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_DOMAINS.map((domain, i) => (
            <Reveal delay={i * 0.06} key={domain.id}>
              <div className="group h-full rounded-3xl bg-white p-7 ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#141414] transition-transform duration-300 group-hover:-rotate-6">
                    <domain.Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-serif text-2xl text-black/10">
                    {domain.index}
                  </span>
                </div>
                <h3 className="mb-2.5 font-serif text-lg text-[#141414]">
                  {domain.title}
                </h3>
                <p className="mb-5 text-[14px] leading-relaxed text-[#6B6A63]">
                  {domain.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {domain.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] text-[#57564F] ring-1 ring-black/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 3.5 — "Why AKORA" panel (dark, two-column instrument-panel cards),
 * matching the "Real-time visibility / From kickoff to launch" cards
 * already on the homepage.
 */
function WhyAkora() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.dark }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-xl">
          <SectionHeading
            eyebrow="Why AKORA"
            lineOne="Every project,"
            lineTwoItalic="one command center."
            tone="onDark"
            sub="AKORA keeps your team, our engineers, and every update in one place — so nothing gets lost between the brief and the launch."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {WHY_CARDS.map((card, i) => (
            <Reveal delay={i * 0.08} key={card.id}>
              <div className="h-full rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.06]">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <card.Icon className="h-5 w-5" style={{ color: TOKENS.gold }} />
                </div>
                <h3 className="mb-3 font-serif text-xl text-white">{card.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-white/60">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Avatar / status strip, matching the homepage "engineers on standby" chip */}
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
          <div className="flex -space-x-3">
            {TEAM.map((member) => (
              <div
                key={member.id}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-medium text-white ring-2 ring-[#0B0B0D]"
                style={{ backgroundColor: member.color }}
              >
                {member.initials}
              </div>
            ))}
          </div>
          <span className="text-[13.5px] text-white/60">
            Engineers on standby across all six disciplines
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 3.6 — Journey / timeline (cream).
 */
function JourneyTimeline() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.cream }}>
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 max-w-xl">
          <SectionHeading
            eyebrow="Flight log"
            lineOne="How AKORA got to"
            lineTwoItalic="six disciplines under one roof."
          />
        </Reveal>

        <div className="relative">
          <div className="absolute left-[104px] top-2 bottom-2 hidden w-px bg-black/10 sm:block" />

          <div className="space-y-2">
            {TIMELINE.map((item, i) => (
              <Reveal delay={i * 0.07} key={item.id}>
                <div className="grid grid-cols-1 gap-2 border-b border-black/10 py-8 sm:grid-cols-[104px_1fr] sm:gap-8">
                  <div className="relative">
                    <span className="font-serif text-sm text-[#8A6B32]">
                      {item.year}
                    </span>
                    <span
                      className="absolute -right-[3px] top-1.5 hidden h-2.5 w-2.5 rounded-full ring-2 ring-[#F4F1E9] sm:block"
                      style={{ backgroundColor: TOKENS.gold }}
                    />
                  </div>
                  <div>
                    <h4 className="mb-2 font-serif text-lg text-[#141414] sm:text-xl">
                      {item.title}
                    </h4>
                    <p className="max-w-xl text-[14.5px] leading-relaxed text-[#6B6A63]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 3.7 — Team grid (cream).
 */
function TeamGrid() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.creamSoft }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-xl">
          <SectionHeading
            eyebrow="The team"
            lineOne="Engineers, designers,"
            lineTwoItalic="and one flight-test crew."
            sub="A cross-disciplinary team built to move a project from a Figma file to a flight log without losing context in between."
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal delay={i * 0.06} key={member.id}>
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06]">
                <div
                  className="flex aspect-square items-center justify-center text-2xl font-medium text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-[15px] text-[#141414]">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-[11.5px] uppercase tracking-[0.08em] text-[#8A6B32]">
                    {member.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 3.8 — Testimonials (dark).
 */
function Testimonials() {
  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.dark }}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-xl">
          <SectionHeading
            eyebrow="Transmissions received"
            lineOne="What clients say"
            lineTwoItalic="once the build ships."
            tone="onDark"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal delay={i * 0.08} key={t.id}>
              <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10">
                <Quote className="mb-5 h-6 w-6" style={{ color: TOKENS.gold }} />
                <p className="mb-8 flex-1 font-serif text-lg leading-snug text-white">
                  {t.quote}
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-[13.5px] font-medium text-white">{t.name}</div>
                  <div className="mt-1 text-[11.5px] uppercase tracking-[0.08em] text-white/40">
                    {t.role}
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">
                    {t.tag}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 3.9 — FAQ accordion (cream).
 */
function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section className="px-6 py-8 md:px-12" style={{ backgroundColor: TOKENS.cream }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-6 max-w-sm font-serif text-[clamp(1.8rem,3.2vw,2.4rem)] leading-tight text-[#141414]">
            Questions we get <span className="italic">before kickoff.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-[#6B6A63]">
            Still deciding which of our six teams your project needs? Send us
            a two-line brief and we'll route it to the right desk within a
            business day.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-black/10 border-t border-black/10">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-[#141414]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-[#8A8980] transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#8A6B32]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-md pb-6 text-[14.5px] leading-relaxed text-[#6B6A63]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * 3.10 — Closing CTA banner (dark).
 */
function AboutCta() {
  return (
    <section
      id="contact"
      className="px-6 py-8 md:px-12"
      style={{ backgroundColor: TOKENS.dark }}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow tone="onDark">Get in touch</Eyebrow>
        <h2 className="mt-6 font-serif text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.1] text-white">
          Have a brief that spans{" "}
          <span className="italic">a screen and a flight path?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-white/60">
          Tell us what you're building — a website, an app, a growth plan, or
          a working prototype. We'll tell you exactly which of our six teams
          it needs.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <AkoraButton href="/home-page/contact" 
          variant="primary" tone="onDark">
            Start a project
          </AkoraButton>
          <a
            href="/company/about#work"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-medium text-white/70 ring-1 ring-white/15 transition-colors duration-300 hover:bg-white/[0.06]"
          >
            See our work
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11.5px] uppercase tracking-[0.1em] text-white/40">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> HQ — Bangaluru, India
          </span>
          <span className="flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5" /> 22.7196° N, 75.8577° E
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Web · App · SEO · AI · Robotics · Drone
          </span>
        </div> */}
      </Reveal>
    </section>
  );
}

/* ============================================================================
 * SECTION 4 — ROOT EXPORT
 * ----------------------------------------------------------------------------
 * Compose every sub-block into the final "About Us" section. Each block owns
 * its own background color and vertical padding, so you can freely delete,
 * reorder, or lift any one of them out into its own file (mirroring how the
 * rest of the AKORA site is split into first-sec / second-sec / etc).
 * ==========================================================================*/

export default function AboutSection() {
  return (
    <main className="w-full">
      {/* <AboutHero /> */}
      <AboutNarrative />
      <MissionVisionValue />
      <CapabilitiesGrid />
      <WhyAkora />
      <JourneyTimeline />
      {/* <TeamGrid /> */}
      <Testimonials />
      <FaqAccordion />
      <AboutCta />
    </main>
  );
}