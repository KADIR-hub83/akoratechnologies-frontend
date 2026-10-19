// "use client";

// import { useEffect, useRef, useState } from "react";
// import type { MouseEvent, ReactNode } from "react";
// import Footer, { PageRevealWrapper } from "../../../../components/Footer";
// import Navbar from "@/app/components/Navbar";

// /* ============================================================================
//  * AKORA — LEADERSHIP PAGE
//  * ----------------------------------------------------------------------------
//  * Location: frontend/src/app/company/leadership/page.tsx  (route: /company/leadership)
//  *
//  * TEAM PHOTOS
//  *  - The photos below are free STOCK placeholder portraits (randomuser.me),
//  *    not real people from your team. Replace them with your own photos:
//  *      1. put images in  frontend/public/team/   (e.g. public/team/founder.jpg)
//  *      2. set  photo: "/team/founder.jpg"
//  *  - If an image fails to load, a gradient avatar with initials is shown.
//  *
//  * TEAM NAMES
//  *  - Names / bios below are SAMPLE text. Replace with your real team.
//  *
//  * ANIMATIONS (no extra libraries): scroll progress bar, parallax, sticky founder
//  * photo, directional reveals, staggered grid, count-up numbers, 3D tilt cards,
//  * marquee strip.
//  *
//  * FOOTER: content is inside <PageRevealWrapper>, <Footer /> is outside <main>,
//  * and <main> has no background -> the fixed footer is revealed correctly.
//  * ==========================================================================*/

// const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page

// const GOLD = "#C9A56A";
// const GOLD_DARK = "#8A6B32";

// type Member = {
//   id: string;
//   name: string;
//   role: string;
//   bio?: string;
//   photo?: string;
//   skills?: string[];
//   accent: string;
//   linkedin?: string;
//   github?: string;
//   x?: string;
// };

// const portrait = (g: "men" | "women", n: number) =>
//   `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

// /* ---------------------------- REPLACE WITH REAL --------------------------- */

// const FOUNDER: Member = {
//   id: "founder",
//   name: "Aarav Khanna",
//   role: "Founder & CEO",
//   bio: "Aarav started AKORA with one belief: a business should never have to chase five different vendors to ship one product. He leads strategy, client partnerships and the overall direction of the company.",
//   photo: portrait("men", 32),
//   skills: ["Strategy", "Product", "Client success"],
//   accent: GOLD,
//   linkedin: "#",
//   github: "#",
//   x: "#",
// };

// const LEADS: Member[] = [
//   {
//     id: "l1",
//     name: "Rohan Sharma",
//     role: "Head of Engineering",
//     bio: "Owns architecture, code quality and delivery across web and mobile.",
//     photo: portrait("men", 44),
//     accent: "#3178C6",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "l2",
//     name: "Meera Joshi",
//     role: "Growth & SEO Lead",
//     bio: "Plans search, content and analytics alongside every build.",
//     photo: portrait("women", 44),
//     accent: "#2FA84A",
//     linkedin: "#",
//     x: "#",
//   },
//   {
//     id: "l3",
//     name: "Pranav Nair",
//     role: "R&D Lead — AI, Robotics & Drones",
//     bio: "Leads applied AI and our robotics and drone engineering lab.",
//     photo: portrait("men", 65),
//     accent: "#635BFF",
//     linkedin: "#",
//     github: "#",
//   },
// ];

// const DEVELOPERS: Member[] = [
//   {
//     id: "d1",
//     name: "Kabir Verma",
//     role: "Senior Full-Stack Developer",
//     photo: portrait("men", 75),
//     skills: ["Next.js", "Node.js", "MongoDB"],
//     accent: "#3178C6",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d2",
//     name: "Ananya Rao",
//     role: "Frontend Developer",
//     photo: portrait("women", 68),
//     skills: ["React", "TypeScript", "Tailwind"],
//     accent: "#61DAFB",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d3",
//     name: "Vikram Singh",
//     role: "Backend Developer",
//     photo: portrait("men", 12),
//     skills: ["Node.js", "Express", "APIs"],
//     accent: "#339933",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d4",
//     name: "Isha Patel",
//     role: "Mobile App Developer",
//     photo: portrait("women", 26),
//     skills: ["React Native", "Firebase"],
//     accent: "#E8645F",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d5",
//     name: "Dev Malhotra",
//     role: "UI/UX Designer",
//     photo: portrait("men", 52),
//     skills: ["Figma", "Design systems"],
//     accent: "#F24E1E",
//     linkedin: "#",
//     x: "#",
//   },
//   {
//     id: "d6",
//     name: "Sneha Iyer",
//     role: "AI / ML Engineer",
//     photo: portrait("women", 12),
//     skills: ["Python", "Computer vision"],
//     accent: "#FFB020",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d7",
//     name: "Arnav Gupta",
//     role: "Robotics & Drone Engineer",
//     photo: portrait("men", 22),
//     skills: ["ROS", "Embedded", "Flight firmware"],
//     accent: "#38BDF8",
//     linkedin: "#",
//     github: "#",
//   },
//   {
//     id: "d8",
//     name: "Tara Menon",
//     role: "DevOps & QA Engineer",
//     photo: portrait("women", 33),
//     skills: ["Docker", "CI/CD", "Testing"],
//     accent: "#2496ED",
//     linkedin: "#",
//     github: "#",
//   },
// ];

// const PRINCIPLES = [
//   { t: "Specifications first", d: "Clear scope before a single line of code." },
//   { t: "One accountable team", d: "No lossy hand-offs between separate vendors." },
//   { t: "Measured outcomes", d: "Every project ends with numbers that matter." },
// ];

// const MARQUEE = [
//   "Engineers",
//   "Designers",
//   "Builders",
//   "Problem solvers",
//   "Researchers",
//   "Flight testers",
// ];

// /* ------------------------------ Scroll helpers ---------------------------- */

// const prefersReducedMotion = () =>
//   typeof window !== "undefined" &&
//   window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// function ScrollProgress() {
//   const bar = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const update = () => {
//       const h = document.documentElement;
//       const max = h.scrollHeight - h.clientHeight || 1;
//       const p = Math.min(1, Math.max(0, h.scrollTop / max));
//       if (bar.current) bar.current.style.transform = `scaleX(${p})`;
//     };
//     update();
//     window.addEventListener("scroll", update, { passive: true });
//     window.addEventListener("resize", update);
//     return () => {
//       window.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//     };
//   }, []);

//   return (
//     <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
//       <div
//         ref={bar}
//         className="h-full origin-left bg-gradient-to-r from-[#8A6B32] via-[#C9A56A] to-[#E7D6B6]"
//         style={{ transform: "scaleX(0)" }}
//       />
//     </div>
//   );
// }

// /** Moves its children vertically at a different speed than the page scroll. */
// function Parallax({
//   children,
//   speed = 0.12,
//   className = "",
// }: {
//   children: ReactNode;
//   speed?: number;
//   className?: string;
// }) {
//   const outer = useRef<HTMLDivElement>(null);
//   const inner = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (prefersReducedMotion()) return;
//     let raf = 0;
//     const update = () => {
//       raf = 0;
//       if (!outer.current || !inner.current) return;
//       const r = outer.current.getBoundingClientRect();
//       const offset = r.top + r.height / 2 - window.innerHeight / 2;
//       inner.current.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
//     };
//     const onScroll = () => {
//       if (!raf) raf = requestAnimationFrame(update);
//     };
//     update();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (raf) cancelAnimationFrame(raf);
//     };
//   }, [speed]);

//   return (
//     <div ref={outer} className={className}>
//       <div ref={inner} className="will-change-transform">
//         {children}
//       </div>
//     </div>
//   );
// }

// type Dir = "up" | "left" | "right" | "scale";

// const HIDDEN: Record<Dir, string> = {
//   up: "translate-y-10 opacity-0",
//   left: "-translate-x-12 opacity-0",
//   right: "translate-x-12 opacity-0",
//   scale: "scale-95 opacity-0",
// };

// function Reveal({
//   children,
//   delay = 0,
//   dir = "up",
//   className = "",
// }: {
//   children: ReactNode;
//   delay?: number;
//   dir?: Dir;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [shown, setShown] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     if (typeof IntersectionObserver === "undefined") {
//       setShown(true);
//       return;
//     }
//     const io = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           setShown(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       style={{ transitionDelay: `${delay}ms` }}
//       className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
//         shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN[dir]
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const [val, setVal] = useState(0);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     let raf = 0;
//     const run = () => {
//       if (prefersReducedMotion()) {
//         setVal(to);
//         return;
//       }
//       const start = performance.now();
//       const dur = 1400;
//       const step = (t: number) => {
//         const p = Math.min(1, (t - start) / dur);
//         setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
//         if (p < 1) raf = requestAnimationFrame(step);
//       };
//       raf = requestAnimationFrame(step);
//     };
//     const io = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           run();
//           io.disconnect();
//         }
//       },
//       { threshold: 0.4 }
//     );
//     io.observe(el);
//     return () => {
//       io.disconnect();
//       cancelAnimationFrame(raf);
//     };
//   }, [to]);

//   return (
//     <span ref={ref}>
//       {val}
//       {suffix}
//     </span>
//   );
// }

// function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
//   const ref = useRef<HTMLDivElement>(null);

//   const move = (e: MouseEvent<HTMLDivElement>) => {
//     const el = ref.current;
//     if (!el || prefersReducedMotion()) return;
//     const r = el.getBoundingClientRect();
//     const x = (e.clientX - r.left) / r.width - 0.5;
//     const y = (e.clientY - r.top) / r.height - 0.5;
//     el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
//   };
//   const leave = () => {
//     if (ref.current) ref.current.style.transform = "";
//   };

//   return (
//     <div
//       ref={ref}
//       onMouseMove={move}
//       onMouseLeave={leave}
//       className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// /* ------------------------------ Small UI parts ---------------------------- */

// function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm ${
//         dark
//           ? "bg-white/[0.06] text-white/70 ring-1 ring-white/15"
//           : "bg-white/70 text-[#4B4A45] ring-1 ring-black/10"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
//       {children}
//     </span>
//   );
// }

// function Underline() {
//   return (
//     <svg
//       className="absolute -bottom-2 left-0 w-full"
//       height="8"
//       viewBox="0 0 200 8"
//       preserveAspectRatio="none"
//       aria-hidden
//     >
//       <path d="M0 4 C 50 0, 150 8, 200 4" stroke={GOLD} strokeWidth="2.5" fill="none" />
//     </svg>
//   );
// }

// const ArrowUpRight = ({ className = "h-4 w-4" }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     aria-hidden="true"
//   >
//     <path d="M7 17 17 7M8 7h9v9" />
//   </svg>
// );

// const XIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
//     <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H2l8.1-9.3L1.5 2h7l4.9 6.4L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
//   </svg>
// );
// const LinkedInIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
//     <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z" />
//   </svg>
// );
// const GitHubIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
//     <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
//   </svg>
// );

// function Socials({ m, dark }: { m: Member; dark?: boolean }) {
//   const items = [
//     m.linkedin && { href: m.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
//     m.github && { href: m.github, label: "GitHub", icon: <GitHubIcon /> },
//     m.x && { href: m.x, label: "X", icon: <XIcon /> },
//   ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

//   return (
//     <div className="flex items-center gap-2">
//       {items.map((s) => (
//         <a
//           key={s.label}
//           href={s.href}
//           aria-label={`${m.name} on ${s.label}`}
//           className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
//             dark
//               ? "border border-white/15 text-white/60 hover:border-[#C9A56A]/60 hover:text-[#C9A56A]"
//               : "border border-black/10 text-[#57564F] hover:border-[#8A6B32] hover:text-[#8A6B32]"
//           }`}
//         >
//           {s.icon}
//         </a>
//       ))}
//     </div>
//   );
// }

// /** Photo with graceful fallback (gradient + initials). Fills its parent. */
// function Avatar({ m, className = "" }: { m: Member; className?: string }) {
//   const [failed, setFailed] = useState(false);
//   const initials = m.name
//     .split(" ")
//     .map((w) => w[0])
//     .slice(0, 2)
//     .join("");

//   if (!m.photo || failed) {
//     return (
//       <div
//         className={`absolute inset-0 flex items-center justify-center text-5xl font-semibold text-white ${className}`}
//         style={{ background: `linear-gradient(135deg, ${m.accent}, #141414)` }}
//       >
//         {initials}
//       </div>
//     );
//   }

//   return (
//     // eslint-disable-next-line @next/next/no-img-element
//     <img
//       src={m.photo}
//       alt={m.name}
//       loading="lazy"
//       onError={() => setFailed(true)}
//       className={`absolute inset-0 h-full w-full object-cover ${className}`}
//     />
//   );
// }

// /* ---------------------------------- Page ---------------------------------- */

// export default function LeadershipPage() {
//   return (
//     <div className="overflow-x-clip">
//       <style>{`
//         @keyframes ld-marquee {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         .ld-marquee-track { animation: ld-marquee 30s linear infinite; }
//         @keyframes ld-float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .ld-float { animation: ld-float 5s ease-in-out infinite; }
//         @media (prefers-reduced-motion: reduce) {
//           .ld-marquee-track, .ld-float { animation: none; }
//         }
//       `}</style>

//       <ScrollProgress />
//       <Navbar />

//       {/* NO background on <main> — it would cover the fixed footer */}
//       <main className="relative z-20 text-[#141414]">
//         <PageRevealWrapper>
//           {/* ============================== HERO ============================== */}
//           <section className="relative bg-[#F4F1E9] px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
//             <div className="pointer-events-none absolute inset-0 overflow-hidden">
//               <Parallax speed={0.18} className="absolute -left-40 top-0">
//                 <div className="h-96 w-96 rounded-full bg-[#C9A56A]/25 blur-[120px]" />
//               </Parallax>
//               <Parallax speed={-0.12} className="absolute -right-32 bottom-0">
//                 <div className="h-96 w-96 rounded-full bg-[#C9A56A]/20 blur-[130px]" />
//               </Parallax>
//               <div
//                 aria-hidden
//                 className="absolute inset-0 opacity-[0.05]"
//                 style={{
//                   backgroundImage: "radial-gradient(#141414 1px, transparent 1px)",
//                   backgroundSize: "26px 26px",
//                 }}
//               />
//             </div>

//             <div className="relative mx-auto max-w-6xl text-center">
//               <Reveal>
//                 <Eyebrow>Leadership &amp; team</Eyebrow>
//               </Reveal>

//               <Reveal delay={100}>
//                 <h1 className="mx-auto mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[1.03] tracking-tight">
//                   The people behind
//                   <br />
//                   <span className="relative font-serif font-normal italic">
//                     every build.
//                     <Underline />
//                   </span>
//                 </h1>
//               </Reveal>

//               <Reveal delay={200}>
//                 <p className="mx-auto mt-9 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]">
//                   Meet the founder, the leads and the engineers who turn ideas into websites,
//                   apps, intelligent software and machines that fly.
//                 </p>
//               </Reveal>

//               <Reveal delay={300} className="mt-12 flex flex-col items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[#8A8980]">
//                 Scroll
//                 <span className="ld-float h-10 w-px bg-gradient-to-b from-[#C9A56A] to-transparent" />
//               </Reveal>
//             </div>
//           </section>

//           {/* ============================ MARQUEE ============================= */}
//           <div className="overflow-hidden border-y border-white/10 bg-[#0B0A08] py-4">
//             <div className="ld-marquee-track flex w-max whitespace-nowrap">
//               {[0, 1].map((k) => (
//                 <div key={k} className="flex items-center">
//                   {[...MARQUEE, ...MARQUEE].map((w, i) => (
//                     <span
//                       key={`${k}-${i}`}
//                       className="flex items-center gap-6 px-6 font-serif text-[22px] italic text-white/70"
//                     >
//                       {w}
//                       <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
//                     </span>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ============================ FOUNDER ============================= */}
//           <section className="relative bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
//             <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
//               {/* sticky photo */}
//               <div className="lg:sticky lg:top-28 lg:self-start">
//                 <Reveal dir="left">
//                   <div className="relative mx-auto max-w-md">
//                     <div
//                       className="absolute -inset-4 rounded-[40px] opacity-60 blur-2xl"
//                       style={{ background: `linear-gradient(135deg, ${GOLD}55, transparent)` }}
//                     />
//                     <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#EDE8DC] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
//                       {/* <Parallax speed={0.06} className="absolute inset-[-8%]">
//                         <div className="relative h-[116%] w-full">
//                           <Avatar m={FOUNDER} />
//                         </div>
//                       </Parallax> */}
//                        <Parallax speed={0.06} className="absolute inset-[-8%]">
//     <div className="relative h-[116%] w-full">
//       <img
//         src="https://previews.123rf.com/images/edhar/edhar1901/edhar190102436/115368333-portrait-of-a-handsome-ceo-smiling.jpg"
//         alt="Professional male CEO portrait"
//         className="h-full w-full object-cover object-center"
//         loading="lazy"
//       />
//     </div>
//   </Parallax>
//                       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                     </div>

//                     <div className="ld-float absolute -bottom-5 -right-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] sm:-right-6">
//                       <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8980]">
//                         Founder &amp; CEO
//                       </p>
//                       <p className="font-serif text-[18px] italic">{FOUNDER.name}</p>
//                     </div>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* text */}
//               <div className="lg:pt-6">
//                 <Reveal dir="right">
//                   <Eyebrow>Founder &amp; CEO</Eyebrow>
//                 </Reveal>

//                 <Reveal dir="right" delay={80}>
//                   <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
//                     {FOUNDER.name.split(" ")[0]}{" "}
//                     <span className="relative font-serif font-normal italic">
//                       {FOUNDER.name.split(" ").slice(1).join(" ")}
//                       <Underline />
//                     </span>
//                   </h2>
//                 </Reveal>

//                 <Reveal dir="right" delay={160}>
//                   <blockquote className="mt-10 border-l-2 pl-6 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] italic leading-snug text-[#2a2924]" style={{ borderColor: GOLD }}>
//                     &ldquo;We built AKORA so that no client ever has to chase five vendors to ship
//                     one product.&rdquo;
//                   </blockquote>
//                 </Reveal>

//                 <Reveal delay={220}>
//                   <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-[#6B6A63]">
//                     {FOUNDER.bio}
//                   </p>
//                 </Reveal>

//                 <div className="mt-10 space-y-3">
//                   {PRINCIPLES.map((p, i) => (
//                     <Reveal key={p.t} delay={i * 100} dir="right">
//                       <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.3)]">
//                         <span
//                           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-white"
//                           style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})` }}
//                         >
//                           0{i + 1}
//                         </span>
//                         <div>
//                           <p className="font-medium">{p.t}</p>
//                           <p className="mt-0.5 text-[14px] text-[#6B6A63]">{p.d}</p>
//                         </div>
//                       </div>
//                     </Reveal>
//                   ))}
//                 </div>

//                 <Reveal delay={150} className="mt-10 flex flex-wrap items-center gap-5">
//                   <Socials m={FOUNDER} />
//                   <div className="flex flex-wrap gap-2">
//                     {FOUNDER.skills?.map((s) => (
//                       <span
//                         key={s}
//                         className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[12px] text-[#57564F] ring-1 ring-black/[0.05]"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 </Reveal>
//               </div>
//             </div>
//           </section>

//           {/* ============================ LEADERSHIP ========================== */}
//           <section className="relative bg-[#0B0A08] px-6 py-24 text-white md:px-12 md:py-32">
//             <div className="pointer-events-none absolute inset-0 overflow-hidden">
//               <Parallax speed={0.15} className="absolute left-1/2 top-0 -translate-x-1/2">
//                 <div className="h-80 w-[36rem] rounded-full bg-[#C9A56A]/15 blur-[120px]" />
//               </Parallax>
//             </div>

//             <div className="relative mx-auto max-w-6xl">
//               <Reveal className="mx-auto max-w-2xl text-center">
//                 <Eyebrow dark>Leadership team</Eyebrow>
//                 <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
//                   Leads who{" "}
//                   <span className="relative font-serif font-normal italic" style={{ color: GOLD }}>
//                     own the outcome.
//                   </span>
//                 </h2>
//               </Reveal>

//               <div className="mt-16 grid gap-6 md:grid-cols-3">
//                 {LEADS.map((m, i) => (
//                   <Reveal key={m.id} delay={i * 140} dir={i === 0 ? "left" : i === 2 ? "right" : "up"}>
//                     <Tilt className="h-full">
//                       <article className="group relative h-full overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.07]">
//                         <div className="relative aspect-[4/4.2] overflow-hidden">
//                           <Avatar
//                             m={m}
//                             className="transition-transform duration-700 group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/10 to-transparent" />
//                           <span
//                             className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur"
//                             style={{ background: `${m.accent}99` }}
//                           >
//                             Lead
//                           </span>
//                         </div>
//                         <div className="p-6">
//                           <h3 className="font-serif text-[22px]">{m.name}</h3>
//                           <p className="mt-1 text-[13px] uppercase tracking-[0.1em]" style={{ color: GOLD }}>
//                             {m.role}
//                           </p>
//                           <p className="mt-4 text-[14px] leading-relaxed text-white/60">{m.bio}</p>
//                           <div className="mt-5">
//                             <Socials m={m} dark />
//                           </div>
//                         </div>
//                       </article>
//                     </Tilt>
//                   </Reveal>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* ============================ DEVELOPERS ========================== */}
//           <section className="relative bg-[#EDE8DC] px-6 py-24 md:px-12 md:py-32">
//             <div className="mx-auto max-w-6xl">
//               <Reveal className="max-w-2xl">
//                 <Eyebrow>Engineers &amp; designers</Eyebrow>
//                 <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
//                   The hands that{" "}
//                   <span className="relative font-serif font-normal italic">
//                     build it all.
//                     <Underline />
//                   </span>
//                 </h2>
//                 <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-[#6B6A63]">
//                   A cross-disciplinary crew — from pixel-perfect interfaces to flight firmware —
//                   working in the same stand-up.
//                 </p>
//               </Reveal>

//               <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                 {DEVELOPERS.map((m, i) => (
//                   <Reveal key={m.id} delay={(i % 4) * 110} dir="scale">
//                     <Tilt className="h-full">
//                       <article className="group h-full overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.06] transition-shadow duration-300 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.4)]">
//                         <div className="relative aspect-[4/4.4] overflow-hidden bg-[#F4F1E9]">
//                           <Avatar
//                             m={m}
//                             className="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
//                           />
//                           <span
//                             className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
//                             style={{ background: m.accent }}
//                           />
//                         </div>
//                         <div className="p-5">
//                           <h3 className="font-serif text-[19px] leading-snug">{m.name}</h3>
//                           <p className="mt-1 text-[13px] text-[#8A6B32]">{m.role}</p>
//                           <div className="mt-4 flex flex-wrap gap-1.5">
//                             {m.skills?.map((s) => (
//                               <span
//                                 key={s}
//                                 className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-[#57564F]"
//                               >
//                                 {s}
//                               </span>
//                             ))}
//                           </div>
//                           <div className="mt-5">
//                             <Socials m={m} />
//                           </div>
//                         </div>
//                       </article>
//                     </Tilt>
//                   </Reveal>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* ============================== STATS ============================= */}
//           <section className="bg-[#F4F1E9] px-6 py-24 md:px-12">
//             <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               {[
//                 { to: 60, s: "+", l: "Projects shipped" },
//                 { to: 6, s: "", l: "Core disciplines" },
//                 { to: 12, s: " days", l: "Avg. launch time" },
//                 { to: 98, s: "%", l: "Client satisfaction" },
//               ].map((s, i) => (
//                 <Reveal key={s.l} delay={i * 90} dir="scale">
//                   <div className="rounded-[24px] bg-white p-7 text-center ring-1 ring-black/[0.06]">
//                     <p className="font-serif text-[48px] italic leading-none">
//                       <CountUp to={s.to} suffix={s.s} />
//                     </p>
//                     <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-[#8A8980]">
//                       {s.l}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </section>

//           {/* ================================ CTA ============================= */}
//           <section className="bg-[#F4F1E9] px-6 pb-24 md:px-12 md:pb-32">
//             <Reveal dir="scale">
//               <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#0B0A08] px-8 py-16 text-center text-white sm:px-16 sm:py-20">
//                 <Parallax speed={0.1} className="pointer-events-none absolute -right-20 -top-24">
//                   <div className="h-72 w-72 rounded-full bg-[#C9A56A]/25 blur-[90px]" />
//                 </Parallax>
//                 <div className="relative">
//                   <Eyebrow dark>Work with us</Eyebrow>
//                   <h2 className="mx-auto mt-6 max-w-2xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1]">
//                     Want this team{" "}
//                     <span className="italic" style={{ color: GOLD }}>
//                       on your project?
//                     </span>
//                   </h2>
//                   <a
//                     href={CONTACT_HREF}
//                     className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
//                   >
//                     Start a project
//                     <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//                   </a>
//                 </div>
//               </div>
//             </Reveal>
//           </section>
//         </PageRevealWrapper>
//       </main>

//       {/* Footer is OUTSIDE <main>; it is revealed as the page scrolls up */}
//       <Footer />
//     </div>
//   );
// }






"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — LEADERSHIP PAGE
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/company/leadership/page.tsx  (route: /company/leadership)
 *
 * TEAM PHOTOS
 *  - The photos below are free STOCK placeholder portraits (randomuser.me),
 *    not real people from your team. Replace them with your own photos:
 *      1. put images in  frontend/public/team/   (e.g. public/team/founder.jpg)
 *      2. set  photo: "/team/founder.jpg"
 *  - If an image fails to load, a gradient avatar with initials is shown.
 *
 * TEAM NAMES
 *  - Names / bios below are SAMPLE text. Replace with your real team.
 *
 * ANIMATIONS (no extra libraries): scroll progress bar, parallax, sticky founder
 * photo, directional reveals, staggered grid, count-up numbers, 3D tilt cards,
 * marquee strip.
 *
 * FOOTER: content is inside <PageRevealWrapper>, <Footer /> is outside <main>,
 * and <main> has no background -> the fixed footer is revealed correctly.
 * ==========================================================================*/

const CONTACT_HREF = "/home-page/contact"; // change to "/contact" if you move that page

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";

type Member = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  skills?: string[];
  accent: string;
  linkedin?: string;
  github?: string;
  x?: string;
};

const portrait = (g: "men" | "women", n: number) =>
  `https://randomuser.me/api/portraits/${g}/${n}.jpg`;

/* ---------------------------- REPLACE WITH REAL --------------------------- */

const FOUNDER: Member = {
  id: "founder",
  name: "Aarav Khanna",
  role: "Founder & CEO",
  bio: "Aarav started AKORA with one belief: a business should never have to chase five different vendors to ship one product. He leads strategy, client partnerships and the overall direction of the company.",
  photo: portrait("men", 32),
  skills: ["Strategy", "Product", "Client success"],
  accent: GOLD,
  linkedin: "#",
  github: "#",
  x: "#",
};

const LEADS: Member[] = [
  {
    id: "l1",
    name: "Rohan Sharma",
    role: "Head of Engineering",
    bio: "Owns architecture, code quality and delivery across web and mobile.",
    photo: portrait("men", 44),
    accent: "#3178C6",
    linkedin: "#",
    github: "#",
  },
  {
    id: "l2",
    name: "Meera Joshi",
    role: "Growth & SEO Lead",
    bio: "Plans search, content and analytics alongside every build.",
    photo: portrait("women", 44),
    accent: "#2FA84A",
    linkedin: "#",
    x: "#",
  },
  {
    id: "l3",
    name: "Pranav Nair",
    role: "R&D Lead — AI, Robotics & Drones",
    bio: "Leads applied AI and our robotics and drone engineering lab.",
    photo: portrait("men", 65),
    accent: "#635BFF",
    linkedin: "#",
    github: "#",
  },
];

const DEVELOPERS: Member[] = [
  {
    id: "d1",
    name: "Kabir Verma",
    role: "Senior Full-Stack Developer",
    photo: portrait("men", 75),
    skills: ["Next.js", "Node.js", "MongoDB"],
    accent: "#3178C6",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d2",
    name: "Ananya Rao",
    role: "Frontend Developer",
    photo: portrait("women", 68),
    skills: ["React", "TypeScript", "Tailwind"],
    accent: "#61DAFB",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d3",
    name: "Vikram Singh",
    role: "Backend Developer",
    photo: portrait("men", 12),
    skills: ["Node.js", "Express", "APIs"],
    accent: "#339933",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d4",
    name: "Isha Patel",
    role: "Mobile App Developer",
    photo: portrait("women", 26),
    skills: ["React Native", "Firebase"],
    accent: "#E8645F",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d5",
    name: "Dev Malhotra",
    role: "UI/UX Designer",
    photo: portrait("men", 52),
    skills: ["Figma", "Design systems"],
    accent: "#F24E1E",
    linkedin: "#",
    x: "#",
  },
  {
    id: "d6",
    name: "Sneha Iyer",
    role: "AI / ML Engineer",
    photo: portrait("women", 12),
    skills: ["Python", "Computer vision"],
    accent: "#FFB020",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d7",
    name: "Arnav Gupta",
    role: "Robotics & Drone Engineer",
    photo: portrait("men", 22),
    skills: ["ROS", "Embedded", "Flight firmware"],
    accent: "#38BDF8",
    linkedin: "#",
    github: "#",
  },
  {
    id: "d8",
    name: "Tara Menon",
    role: "DevOps & QA Engineer",
    photo: portrait("women", 33),
    skills: ["Docker", "CI/CD", "Testing"],
    accent: "#2496ED",
    linkedin: "#",
    github: "#",
  },
];

const PRINCIPLES = [
  { t: "Specifications first", d: "Clear scope before a single line of code." },
  { t: "One accountable team", d: "No lossy hand-offs between separate vendors." },
  { t: "Measured outcomes", d: "Every project ends with numbers that matter." },
];

const MARQUEE = [
  "Engineers",
  "Designers",
  "Builders",
  "Problem solvers",
  "Researchers",
  "Flight testers",
];

/* ------------------------------ Scroll helpers ---------------------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      const p = Math.min(1, Math.max(0, h.scrollTop / max));
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

/** Moves its children vertically at a different speed than the page scroll. */
function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!outer.current || !inner.current) return;
      const r = outer.current.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      inner.current.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
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
  }, [speed]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
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
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      if (prefersReducedMotion()) {
        setVal(to);
        return;
      }
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
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

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H2l8.1-9.3L1.5 2h7l4.9 6.4L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

function Socials({ m, dark }: { m: Member; dark?: boolean }) {
  const items = [
    m.linkedin && { href: m.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    m.github && { href: m.github, label: "GitHub", icon: <GitHubIcon /> },
    m.x && { href: m.x, label: "X", icon: <XIcon /> },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  return (
    <div className="flex items-center gap-2">
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={`${m.name} on ${s.label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
            dark
              ? "border border-white/15 text-white/60 hover:border-[#C9A56A]/60 hover:text-[#C9A56A]"
              : "border border-black/10 text-[#57564F] hover:border-[#8A6B32] hover:text-[#8A6B32]"
          }`}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/** Photo with graceful fallback (gradient + initials). Fills its parent. */
function Avatar({ m, className = "" }: { m: Member; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = m.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (!m.photo || failed) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center text-5xl font-semibold text-white ${className}`}
        style={{ background: `linear-gradient(135deg, ${m.accent}, #141414)` }}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={m.photo}
      alt={m.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

/* ------------------------------- Orbit hero ------------------------------- */

const ORBITS = [
  {
    pct: 100,
    dur: 100,
    reverse: false,
    size: "h-11 w-11 sm:h-14 sm:w-14",
    members: DEVELOPERS.slice(0, 5),
  },
  {
    pct: 76,
    dur: 80,
    reverse: true,
    size: "h-12 w-12 sm:h-16 sm:w-16",
    members: [...LEADS, DEVELOPERS[5]],
  },
  {
    pct: 54,
    dur: 60,
    reverse: false,
    size: "h-12 w-12 sm:h-[72px] sm:w-[72px]",
    members: [FOUNDER, DEVELOPERS[6], DEVELOPERS[7]],
  },
];

const ALL_MEMBERS = [FOUNDER, ...LEADS, ...DEVELOPERS];

function LeadershipHero() {
  const root = useRef<HTMLElement>(null);

  // cursor spotlight + mouse parallax + scroll progress, all via CSS variables
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    let raf = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const sp = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      el.style.setProperty("--sp", sp.toFixed(3));
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
      mx = (x / r.width - 0.5) * 2;
      my = (y / r.height - 0.5) * 2;
      queue();
    };

    apply();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    if (!reduce) el.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const dotGrid = "radial-gradient(#141414 1px, transparent 1px)";
  const goldDots = "radial-gradient(#C9A56A 1.6px, transparent 1.8px)";
  const spotMask = "radial-gradient(280px circle at var(--px) var(--py), #000 0%, transparent 70%)";

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center bg-[#F4F1E9] px-6 pb-24 pt-28 md:px-12"
      style={{ "--px": "50%", "--py": "42%", "--mx": 0, "--my": 0, "--sp": 0 } as CSSProperties}
    >
      {/* ------------------------------ background ------------------------------ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* faint base grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: dotGrid, backgroundSize: "26px 26px" }}
        />
        {/* gold dots that light up around the cursor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: goldDots,
            backgroundSize: "26px 26px",
            WebkitMaskImage: spotMask,
            maskImage: spotMask,
          }}
        />
        {/* soft light following the cursor */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px circle at var(--px) var(--py), rgba(201,165,106,0.20), transparent 62%)",
          }}
        />

        {/* orbit stage — mouse parallax + scale/fade on scroll */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[min(150vw,1180px)] -translate-x-1/2 -translate-y-1/2">
          <div
            className="ld-stage relative h-full w-full"
            style={{
              transform:
                "translate3d(calc(var(--mx) * -16px), calc(var(--my) * -16px), 0) scale(calc(1 + var(--sp) * 0.3))",
              opacity: "calc(1 - var(--sp) * 0.85)",
            }}
          >
            {ORBITS.map((ring, ri) => {
              const inset = (100 - ring.pct) / 2;
              const dir = ring.reverse ? "reverse" : "normal";
              return (
                <div
                  key={ri}
                  className="ld-spin absolute rounded-full border border-dashed border-black/15"
                  style={{
                    left: `${inset}%`,
                    top: `${inset}%`,
                    width: `${ring.pct}%`,
                    height: `${ring.pct}%`,
                    animationDuration: `${ring.dur}s`,
                    animationDirection: dir,
                  }}
                >
                  {/* glowing "planet" riding the ring */}
                  <span
                    className="absolute h-2 w-2 rounded-full bg-[#C9A56A] shadow-[0_0_14px_4px_rgba(201,165,106,0.8)]"
                    style={{ left: "50%", top: "0%", transform: "translate(-50%, -50%)" }}
                  />

                  {ring.members.map((m, i) => {
                    const a = (i / ring.members.length) * Math.PI * 2 + ri * 0.9;
                    const left = 50 + 50 * Math.cos(a);
                    const top = 50 + 50 * Math.sin(a);
                    const isFounder = m.id === "founder";
                    return (
                      <div
                        key={m.id}
                        className="absolute"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* counter-rotation keeps every face upright */}
                        <div
                          className="ld-counter"
                          style={{
                            animationDuration: `${ring.dur}s`,
                            animationDirection: dir,
                          }}
                        >
                          <div
                            className={`ld-avatar group pointer-events-auto relative cursor-pointer rounded-full transition-transform duration-300 hover:z-20 hover:scale-125 ${ring.size}`}
                          >
                            <div
                              className={`absolute inset-0 overflow-hidden rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${
                                isFounder
                                  ? "ring-[3px] ring-[#C9A56A]"
                                  : "ring-2 ring-white"
                              }`}
                            >
                              <Avatar m={m} />
                            </div>
                            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#141414] px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                              {m.name}
                              <span className="ml-1.5 text-white/50">{m.role.split(" ")[0]}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* -------------------------------- content -------------------------------- */}
      <div
        className="pointer-events-none relative z-10 mx-auto max-w-4xl text-center"
        style={{
          transform: "translate3d(0, calc(var(--sp) * 90px), 0)",
          opacity: "calc(1 - var(--sp) * 1.25)",
        }}
      >
        {/* cream glow so text stays readable over the orbit */}
        <div className="absolute -inset-x-[12%] -inset-y-[18%] -z-10 bg-[radial-gradient(closest-side,rgba(244,241,233,0.95),rgba(244,241,233,0))]" />

        <div className="ld-fade" style={{ animationDelay: "50ms" }}>
          <Eyebrow>Leadership &amp; team</Eyebrow>
        </div>

        <h1 className="mt-7 text-[clamp(2.8rem,8vw,6.4rem)] font-semibold leading-[1.02] tracking-tight">
          {["The", "people", "behind"].map((w, i) => (
            <span key={w} className="ld-mask mr-[0.22em]">
              <span className="ld-rise" style={{ animationDelay: `${200 + i * 110}ms` }}>
                {w}
              </span>
            </span>
          ))}
          <br />
          <span className="relative inline-block">
            {["every", "build."].map((w, i) => (
              <span
                key={w}
                className="ld-mask mr-[0.22em] font-serif font-normal italic last:mr-0"
              >
                <span className="ld-rise" style={{ animationDelay: `${560 + i * 130}ms` }}>
                  <span className="ld-shine">{w}</span>
                </span>
              </span>
            ))}
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="10"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                className="ld-draw"
                pathLength={1}
                d="M2 6 C 50 1, 150 10, 198 4"
                stroke={GOLD}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        <p
          className="ld-fade mx-auto mt-9 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]"
          style={{ animationDelay: "1000ms" }}
        >
          Meet the founder, the leads and the engineers who turn ideas into websites, apps,
          intelligent software and machines that fly.
        </p>

        {/* avatar stack + count + button */}
        <div
          className="ld-fade mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
          style={{ animationDelay: "1150ms" }}
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/80 py-2 pl-2 pr-5 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] backdrop-blur">
            <div className="flex -space-x-3">
              {ALL_MEMBERS.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Avatar m={m} />
                </div>
              ))}
            </div>
            <span className="text-[13.5px] text-[#3a3932]">
              <span className="font-semibold">{ALL_MEMBERS.length} people</span>, one accountable team
            </span>
          </div>

          <a
            href="#founder"
            className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
          >
            Meet the founder
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ------------------------------- scroll cue ------------------------------- */}
      <div
        className="ld-fade pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8A8980]"
        style={{ animationDelay: "1500ms" }}
      >
        Scroll
        <span className="flex h-9 w-[22px] justify-center rounded-full border border-black/25 pt-2">
          <span className="ld-wheel h-1.5 w-[3px] rounded-full bg-[#8A6B32]" />
        </span>
      </div>
    </section>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function LeadershipPage() {
  return (
    <div className="overflow-x-clip">
      <style>{`
        @keyframes ld-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ld-marquee-track { animation: ld-marquee 30s linear infinite; }
        @keyframes ld-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .ld-float { animation: ld-float 5s ease-in-out infinite; }
        /* ---- orbit hero ---- */
        @keyframes ld-spin { to { transform: rotate(360deg); } }
        @keyframes ld-spin-rev { to { transform: rotate(-360deg); } }
        .ld-spin { animation: ld-spin linear infinite; will-change: transform; }
        .ld-counter { animation: ld-spin-rev linear infinite; will-change: transform; }
        .ld-stage:has(.ld-avatar:hover) .ld-spin,
        .ld-stage:has(.ld-avatar:hover) .ld-counter { animation-play-state: paused; }

        .ld-mask { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.08em 0.14em; margin-bottom: -0.14em; }
        @keyframes ld-rise { from { transform: translateY(118%); } to { transform: translateY(0); } }
        .ld-rise { display: inline-block; transform: translateY(118%); animation: ld-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes ld-shine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        .ld-shine {
          display: inline-block;
          background: linear-gradient(100deg, #141414 0%, #8a6b32 30%, #e7d6b6 50%, #8a6b32 70%, #141414 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: ld-shine 6s linear infinite;
        }

        @keyframes ld-draw { to { stroke-dashoffset: 0; } }
        .ld-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ld-draw 1.3s 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes ld-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .ld-fade { opacity: 0; animation: ld-fade 0.9s ease forwards; }

        @keyframes ld-wheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        .ld-wheel { animation: ld-wheel 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ld-marquee-track, .ld-float, .ld-spin, .ld-counter, .ld-shine, .ld-wheel { animation: none; }
          .ld-rise { animation: none; transform: none; }
          .ld-fade { animation: none; opacity: 1; }
          .ld-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* NO background on <main> — it would cover the fixed footer */}
      <main className="relative z-20 text-[#141414]">
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <LeadershipHero />

          {/* ============================ MARQUEE ============================= */}
          <div className="overflow-hidden border-y border-white/10 bg-[#0B0A08] py-4">
            <div className="ld-marquee-track flex w-max whitespace-nowrap">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-center">
                  {[...MARQUEE, ...MARQUEE].map((w, i) => (
                    <span
                      key={`${k}-${i}`}
                      className="flex items-center gap-6 px-6 font-serif text-[22px] italic text-white/70"
                    >
                      {w}
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ============================ FOUNDER ============================= */}
          <section id="founder" className="relative scroll-mt-20 bg-[#F4F1E9] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              {/* sticky photo */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal dir="left">
                  <div className="relative mx-auto max-w-md">
                    <div
                      className="absolute -inset-4 rounded-[40px] opacity-60 blur-2xl"
                      style={{ background: `linear-gradient(135deg, ${GOLD}55, transparent)` }}
                    />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#EDE8DC] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
                      {/* <Parallax speed={0.06} className="absolute inset-[-8%]">
                        <div className="relative h-[116%] w-full">
                          <Avatar m={FOUNDER} />
                        </div>
                      </Parallax> */}
                       <Parallax speed={0.06} className="absolute inset-[-8%]">
    <div className="relative h-[116%] w-full">
      <img
        src="https://previews.123rf.com/images/edhar/edhar1901/edhar190102436/115368333-portrait-of-a-handsome-ceo-smiling.jpg"
        alt="Professional male CEO portrait"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    </div>
  </Parallax>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="ld-float absolute -bottom-5 -right-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] sm:-right-6">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A8980]">
                        Founder &amp; CEO
                      </p>
                      <p className="font-serif text-[18px] italic">{FOUNDER.name}</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* text */}
              <div className="lg:pt-6">
                <Reveal dir="right">
                  <Eyebrow>Founder &amp; CEO</Eyebrow>
                </Reveal>

                <Reveal dir="right" delay={80}>
                  <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
                    {FOUNDER.name.split(" ")[0]}{" "}
                    <span className="relative font-serif font-normal italic">
                      {FOUNDER.name.split(" ").slice(1).join(" ")}
                      <Underline />
                    </span>
                  </h2>
                </Reveal>

                <Reveal dir="right" delay={160}>
                  <blockquote className="mt-10 border-l-2 pl-6 font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] italic leading-snug text-[#2a2924]" style={{ borderColor: GOLD }}>
                    &ldquo;We built AKORA so that no client ever has to chase five vendors to ship
                    one product.&rdquo;
                  </blockquote>
                </Reveal>

                <Reveal delay={220}>
                  <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-[#6B6A63]">
                    {FOUNDER.bio}
                  </p>
                </Reveal>

                <div className="mt-10 space-y-3">
                  {PRINCIPLES.map((p, i) => (
                    <Reveal key={p.t} delay={i * 100} dir="right">
                      <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.3)]">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-white"
                          style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})` }}
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <p className="font-medium">{p.t}</p>
                          <p className="mt-0.5 text-[14px] text-[#6B6A63]">{p.d}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={150} className="mt-10 flex flex-wrap items-center gap-5">
                  <Socials m={FOUNDER} />
                  <div className="flex flex-wrap gap-2">
                    {FOUNDER.skills?.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[12px] text-[#57564F] ring-1 ring-black/[0.05]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ LEADERSHIP ========================== */}
          <section className="relative bg-[#0B0A08] px-6 py-24 text-white md:px-12 md:py-32">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <Parallax speed={0.15} className="absolute left-1/2 top-0 -translate-x-1/2">
                <div className="h-80 w-[36rem] rounded-full bg-[#C9A56A]/15 blur-[120px]" />
              </Parallax>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <Reveal className="mx-auto max-w-2xl text-center">
                <Eyebrow dark>Leadership team</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  Leads who{" "}
                  <span className="relative font-serif font-normal italic" style={{ color: GOLD }}>
                    own the outcome.
                  </span>
                </h2>
              </Reveal>

              <div className="mt-16 grid gap-6 md:grid-cols-3">
                {LEADS.map((m, i) => (
                  <Reveal key={m.id} delay={i * 140} dir={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                    <Tilt className="h-full">
                      <article className="group relative h-full overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.07]">
                        <div className="relative aspect-[4/4.2] overflow-hidden">
                          <Avatar
                            m={m}
                            className="transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/10 to-transparent" />
                          <span
                            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur"
                            style={{ background: `${m.accent}99` }}
                          >
                            Lead
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-[22px]">{m.name}</h3>
                          <p className="mt-1 text-[13px] uppercase tracking-[0.1em]" style={{ color: GOLD }}>
                            {m.role}
                          </p>
                          <p className="mt-4 text-[14px] leading-relaxed text-white/60">{m.bio}</p>
                          <div className="mt-5">
                            <Socials m={m} dark />
                          </div>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================ DEVELOPERS ========================== */}
          <section className="relative bg-[#EDE8DC] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <Reveal className="max-w-2xl">
                <Eyebrow>Engineers &amp; designers</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  The hands that{" "}
                  <span className="relative font-serif font-normal italic">
                    build it all.
                    <Underline />
                  </span>
                </h2>
                <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-[#6B6A63]">
                  A cross-disciplinary crew — from pixel-perfect interfaces to flight firmware —
                  working in the same stand-up.
                </p>
              </Reveal>

              <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {DEVELOPERS.map((m, i) => (
                  <Reveal key={m.id} delay={(i % 4) * 110} dir="scale">
                    <Tilt className="h-full">
                      <article className="group h-full overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.06] transition-shadow duration-300 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.4)]">
                        <div className="relative aspect-[4/4.4] overflow-hidden bg-[#F4F1E9]">
                          <Avatar
                            m={m}
                            className="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                          <span
                            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                            style={{ background: m.accent }}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-[19px] leading-snug">{m.name}</h3>
                          <p className="mt-1 text-[13px] text-[#8A6B32]">{m.role}</p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {m.skills?.map((s) => (
                              <span
                                key={s}
                                className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-[#57564F]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5">
                            <Socials m={m} />
                          </div>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============================== STATS ============================= */}
          <section className="bg-[#F4F1E9] px-6 py-24 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { to: 60, s: "+", l: "Projects shipped" },
                { to: 6, s: "", l: "Core disciplines" },
                { to: 12, s: " days", l: "Avg. launch time" },
                { to: 98, s: "%", l: "Client satisfaction" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 90} dir="scale">
                  <div className="rounded-[24px] bg-white p-7 text-center ring-1 ring-black/[0.06]">
                    <p className="font-serif text-[48px] italic leading-none">
                      <CountUp to={s.to} suffix={s.s} />
                    </p>
                    <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-[#8A8980]">
                      {s.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ================================ CTA ============================= */}
          <section className="bg-[#F4F1E9] px-6 pb-24 md:px-12 md:pb-32">
            <Reveal dir="scale">
              <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#0B0A08] px-8 py-16 text-center text-white sm:px-16 sm:py-20">
                <Parallax speed={0.1} className="pointer-events-none absolute -right-20 -top-24">
                  <div className="h-72 w-72 rounded-full bg-[#C9A56A]/25 blur-[90px]" />
                </Parallax>
                <div className="relative">
                  <Eyebrow dark>Work with us</Eyebrow>
                  <h2 className="mx-auto mt-6 max-w-2xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1]">
                    Want this team{" "}
                    <span className="italic" style={{ color: GOLD }}>
                      on your project?
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

      {/* Footer is OUTSIDE <main>; it is revealed as the page scrolls up */}
      <Footer />
    </div>
  );
}