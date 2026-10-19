// "use client";

// import { useEffect, useRef, useState } from "react";

// /**
//  * AKORA — Dark bento "showcase" section, inspired by the HYI.ai layout:
//  * one tall card + two stacked cards, gradient glow backgrounds, floating
//  * UI mockups. Restyled to AKORA's black / cream / gold identity.
//  * Fully flow-based (no fragile absolute overlays), so it never breaks
//  * on smaller screens.
//  */

// function useReveal<T extends HTMLElement>(delayMs = 0) {
//   const ref = useRef<T | null>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           const t = setTimeout(() => setVisible(true), delayMs);
//           observer.disconnect();
//           return () => clearTimeout(t);
//         }
//       },
//       { threshold: 0.2 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [delayMs]);

//   return { ref, visible };
// }

// const avatars = [
//   { initials: "AK", bg: "#C9A56A" },
//   { initials: "RS", bg: "#8A6A45" },
//   { initials: "MJ", bg: "#5C4630" },
//   { initials: "PN", bg: "#C9A56A" },
// ];

// const tasks = [
//   { label: "Wireframes approved", status: "Done", color: "#4E7A5B" },
//   { label: "Homepage build", status: "In Progress", color: "#C9A56A" },
//   { label: "Copy & content pass", status: "In Progress", color: "#C9A56A" },
//   { label: "QA & cross-device test", status: "Todo", color: "#6B6558" },
// ];

// function RevealCard({
//   children,
//   delay = 0,
//   className = "",
// }: {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
// }) {
//   const { ref, visible } = useReveal(delay);
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${
//         visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// export default function ShowcaseSection() {
//   const { ref: headRef, visible: headVisible } = useReveal();

//   return (
//     <section className="relative w-full overflow-hidden bg-[#0B0A08] px-6 py-8 sm:px-10 md:px-16 ">
//       {/* ambient gold glows */}
//       <div className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#C9A56A]/20 blur-[130px]" />
//       <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C9A56A]/10 blur-[120px]" />

//       <div className="relative mx-auto max-w-6xl">
//         {/* header */}
//         <div
//           ref={headRef}
//           className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
//             headVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
//           }`}
//         >
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A56A]/25 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#C9A56A]">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#C9A56A]" />
//             How We Work
//           </div>

//           <h2 className="font-serif text-4xl italic leading-[1.15] text-white sm:text-5xl">
//             Every project, <span className="not-italic font-sans">one command center.</span>
//           </h2>

//           <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
//             AKORA keeps your team, our engineers and every update in one
//             place — so nothing gets lost between the brief and the launch.
//           </p>
//         </div>

//         {/* bento grid */}
//         <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {/* LEFT — tall card */}
//           <RevealCard delay={0} className="lg:row-span-2">
//             <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-b from-[#171310] to-[#0B0A08] p-8">
//               <h3 className="text-xl font-semibold text-white">
//                 Real-time visibility, no status meetings
//               </h3>
//               <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/50">
//                 Every project runs on a shared dashboard with live updates
//                 and direct messaging, so your whole team stays on the same
//                 page in real time — no chasing anyone for an update.
//               </p>

//               {/* mockup panel */}
//               <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#100D0A]">
//                 <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
//                   <span className="text-xs font-medium text-white/60">Updates</span>
//                   <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/40">
//                     Unread only
//                   </span>
//                 </div>

//                 <div className="space-y-3 p-5">
//                   <div className="rounded-xl border border-[#C9A56A]/15 bg-[#C9A56A]/[0.06] p-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium text-white">
//                         Website Redesign
//                       </span>
//                       <span className="rounded-full bg-[#4E7A5B]/20 px-2.5 py-1 text-[10px] font-medium text-[#8FC49E]">
//                         On track
//                       </span>
//                     </div>
//                     <div className="mt-3 flex items-center gap-2">
//                       <span
//                         className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-black"
//                         style={{ background: "#C9A56A" }}
//                       >
//                         AK
//                       </span>
//                       <span className="text-xs text-white/40">Aisha · 2h ago</span>
//                     </div>
//                     <p className="mt-2 text-[13px] leading-relaxed text-white/55">
//                       Keep every project on track with clear goals and
//                       real-time progress.
//                     </p>
//                   </div>

//                   <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 opacity-60">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium text-white">
//                         Mobile App — MVP
//                       </span>
//                       <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/50">
//                         In review
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </RevealCard>

//           {/* RIGHT TOP */}
//           <RevealCard delay={120}>
//             <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-br from-[#C9A56A]/15 via-[#171310] to-[#0B0A08] p-8">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-white">
//                     From kickoff to launch, fast
//                   </h3>
//                   <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/50">
//                     A scoped brief and a dedicated team means work starts
//                     within days, not weeks — with a real proof of concept
//                     early, not just a proposal deck.
//                   </p>
//                 </div>
//                 <a
//                   href="#contact"
//                   className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0B0A08] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
//                 >
//                   Start a project
//                 </a>
//               </div>

//               <div className="mt-8 flex items-center">
//                 <div className="flex -space-x-3">
//                   {avatars.map((a, i) => (
//                     <span
//                       key={i}
//                       className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B0A08] text-[11px] font-semibold text-black"
//                       style={{ background: a.bg }}
//                     >
//                       {a.initials}
//                     </span>
//                   ))}
//                 </div>
//                 <span className="ml-3 text-xs text-white/40">
//                   Engineers on standby for your stack
//                 </span>
//               </div>

//               <a
//                 href="#contact"
//                 className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0B0A08] sm:hidden"
//               >
//                 Start a project
//               </a>
//             </div>
//           </RevealCard>

//           {/* RIGHT BOTTOM */}
//           <RevealCard delay={220}>
//             <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-b from-[#171310] to-[#0B0A08] p-8">
//               <h3 className="text-xl font-semibold text-white">
//                 One dedicated project lead, always
//               </h3>
//               <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/50">
//                 A single point of contact owns scheduling, monitoring and
//                 delivery for your project, so you always know exactly who
//                 to ask and where things stand.
//               </p>

//               <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#100D0A]">
//                 <div className="border-b border-white/[0.06] px-5 py-3 text-xs font-medium text-white/60">
//                   This month
//                 </div>
//                 <ul className="divide-y divide-white/[0.05]">
//                   {tasks.map((t) => (
//                     <li
//                       key={t.label}
//                       className="flex items-center justify-between px-5 py-3"
//                     >
//                       <span className="text-[13px] text-white/70">{t.label}</span>
//                       <span
//                         className="rounded-full px-2.5 py-1 text-[10px] font-medium"
//                         style={{
//                           color: t.color,
//                           background: `${t.color}22`,
//                         }}
//                       >
//                         {t.status}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </RevealCard>
//         </div>
//       </div>
//     </section>
//   );
// }













"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AKORA — Dark bento "showcase" section, inspired by the HYI.ai layout:
 * one tall card + two stacked cards, gradient glow backgrounds, floating
 * UI mockups. Restyled to AKORA's black / cream / gold identity.
 * Fully flow-based (no fragile absolute overlays), so it never breaks
 * on smaller screens.
 */

function useReveal(delayMs = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        timer = setTimeout(() => {
          setVisible(true);
        }, delayMs);

        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [delayMs]);

  return { ref, visible };
}

const avatars = [
  { initials: "AK", bg: "#C9A56A" },
  { initials: "RS", bg: "#8A6A45" },
  { initials: "MJ", bg: "#5C4630" },
  { initials: "PN", bg: "#C9A56A" },
];

const tasks = [
  {
    label: "Wireframes approved",
    status: "Done",
    color: "#4E7A5B",
  },
  {
    label: "Homepage build",
    status: "In Progress",
    color: "#C9A56A",
  },
  {
    label: "Copy & content pass",
    status: "In Progress",
    color: "#C9A56A",
  },
  {
    label: "QA & cross-device test",
    status: "Todo",
    color: "#6B6558",
  },
];

function RevealCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal(delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ShowcaseSection() {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0A08] px-6 py-8 sm:px-10 md:px-16">
      {/* Ambient gold glows */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#C9A56A]/20 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C9A56A]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            headVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A56A]/25 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#C9A56A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A56A]" />
            How We Work
          </div>

          <h2 className="font-serif text-4xl italic leading-[1.15] text-white sm:text-5xl">
            Every project,{" "}
            <span className="not-italic font-sans">
              one command center.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
            AKORA keeps your team, our engineers and every update in one
            place — so nothing gets lost between the brief and the launch.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT — Tall Card */}
          <RevealCard
            delay={0}
            className="lg:row-span-2"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-b from-[#171310] to-[#0B0A08] p-8">
              <h3 className="text-xl font-semibold text-white">
                Real-time visibility, no status meetings
              </h3>

              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/50">
                Every project runs on a shared dashboard with live updates
                and direct messaging, so your whole team stays on the same
                page in real time — no chasing anyone for an update.
              </p>

              {/* Mockup Panel */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#100D0A]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                  <span className="text-xs font-medium text-white/60">
                    Updates
                  </span>

                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/40">
                    Unread only
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  {/* Update 1 */}
                  <div className="rounded-xl border border-[#C9A56A]/15 bg-[#C9A56A]/[0.06] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        Website Redesign
                      </span>

                      <span className="rounded-full bg-[#4E7A5B]/20 px-2.5 py-1 text-[10px] font-medium text-[#8FC49E]">
                        On track
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-black"
                        style={{
                          background: "#C9A56A",
                        }}
                      >
                        AK
                      </span>

                      <span className="text-xs text-white/40">
                        Aisha · 2h ago
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                      Keep every project on track with clear goals and
                      real-time progress.
                    </p>
                  </div>

                  {/* Update 2 */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 opacity-60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        Mobile App — MVP
                      </span>

                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/50">
                        In review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealCard>

          {/* RIGHT TOP */}
          <RevealCard delay={120}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-br from-[#C9A56A]/15 via-[#171310] to-[#0B0A08] p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    From kickoff to launch, fast
                  </h3>

                  <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/50">
                    A scoped brief and a dedicated team means work starts
                    within days, not weeks — with a real proof of concept
                    early, not just a proposal deck.
                  </p>
                </div>

                <a
                  href="/home-page/contact"
                  className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0B0A08] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
                >
                  Start a project
                </a>
              </div>

              <div className="mt-8 flex items-center">
                <div className="flex -space-x-3">
                  {avatars.map((avatar, index) => (
                    <span
                      key={index}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B0A08] text-[11px] font-semibold text-black"
                      style={{
                        background: avatar.bg,
                      }}
                    >
                      {avatar.initials}
                    </span>
                  ))}
                </div>

                <span className="ml-3 text-xs text-white/40">
                  Engineers on standby for your stack
                </span>
              </div>

              <a
                href="/home-page/contact"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0B0A08] sm:hidden"
              >
                Start a project
              </a>
            </div>
          </RevealCard>

          {/* RIGHT BOTTOM */}
          <RevealCard delay={220}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-b from-[#171310] to-[#0B0A08] p-8">
              <h3 className="text-xl font-semibold text-white">
                One dedicated project lead, always
              </h3>

              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/50">
                A single point of contact owns scheduling, monitoring and
                delivery for your project, so you always know exactly who
                to ask and where things stand.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#100D0A]">
                <div className="border-b border-white/[0.06] px-5 py-3 text-xs font-medium text-white/60">
                  This month
                </div>

                <ul className="divide-y divide-white/[0.05]">
                  {tasks.map((task) => (
                    <li
                      key={task.label}
                      className="flex items-center justify-between px-5 py-3"
                    >
                      <span className="text-[13px] text-white/70">
                        {task.label}
                      </span>

                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                        style={{
                          color: task.color,
                          background: `${task.color}22`,
                        }}
                      >
                        {task.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}