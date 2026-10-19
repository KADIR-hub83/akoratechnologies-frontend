// "use client";

// import { useEffect, useRef, useState } from "react";
// import type { FormEvent, ReactNode } from "react";
// import Footer, { PageRevealWrapper } from "../../../../components/Footer";
// import Navbar from "@/app/components/Navbar";

// /* ============================================================================
//  * AKORA — CONTACT PAGE
//  * ----------------------------------------------------------------------------
//  * File location:  frontend/src/app/contact/page.tsx   ->  route: /contact
//  * (Footer import path assumes that location. If you keep the file inside
//  *  src/app/home-page/contact/, change the import to "../../../../components/Footer"
//  *  and your route will be /home-page/contact.)
//  *
//  * - Calendly is embedded INLINE (visitors book without leaving your site)
//  * - Call / WhatsApp / Email open the dialer / WhatsApp / mail app directly
//  * - Project form sends the message to WhatsApp or Email (no backend needed)
//  * ==========================================================================*/

// const CONFIG = {
//   email: "akoratechnologies@gmail.com",
//   phoneDisplay: "+91 77601 72353",
//   phoneHref: "tel:+917760172353",
//   whatsappDisplay: "+91 72258 78057",
//   whatsappNumber: "917225878057",
//   calendlyUrl: "https://calendly.com/akoratechnologies",
// } as const;

// const SERVICES = [
//   "Website Development",
//   "Mobile App Development",
//   "SEO & Growth",
//   "AI & Automation",
//   "Robotics & Drones",
//   "UI/UX Design",
//   "Something else",
// ];

// /* ------------------------------- Brand icons ------------------------------ */

// const PhoneIcon = () => (
//   <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
//     <path
//       fill="#fff"
//       d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"
//     />
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
//     <path
//       fill="#fff"
//       d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.89.9-3-.2-.31a8.2 8.2 0 1 1 6.88 3.75Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
//     />
//   </svg>
// );

// const MailIcon = () => (
//   <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
//     <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.8" />
//     <path
//       d="m3.5 7 8.5 6.5L20.5 7"
//       stroke="#fff"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ArrowIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     aria-hidden="true"
//   >
//     <path d="M5 12h14M13 6l6 6-6 6" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="h-4 w-4"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     aria-hidden="true"
//   >
//     <rect x="3" y="5" width="18" height="16" rx="3" />
//     <path d="M3 10h18M8 3v4M16 3v4" />
//   </svg>
// );

// /* ------------------------------ Contact row ------------------------------- */

// function ContactRow({
//   href,
//   label,
//   value,
//   icon,
//   tile,
//   external,
// }: {
//   href: string;
//   label: string;
//   value: string;
//   icon: ReactNode;
//   tile: string;
//   external?: boolean;
// }) {
//   return (

//     <a
//       href={href}
//       {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
//       className="group flex items-center gap-4 rounded-2xl bg-white p-3.5 ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A56A]"
//     >
//       <span
//         className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-md ring-1 ring-black/10 ${tile}`}
//       >
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-white/0"
//         />
//         <span className="relative">{icon}</span>
//       </span>
//       <span className="min-w-0 flex-1">
//         <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A8980]">
//           {label}
//         </span>
//         <span className="mt-0.5 block truncate text-[16px] font-medium text-[#141414]">
//           {value}
//         </span>
//       </span>
//       <span className="text-[#9a998f] transition-colors duration-300 group-hover:text-[#8A6B32]">
//         <ArrowIcon />
//       </span>
//     </a>
//   );
// }

// /* ----------------------------- Calendly embed ----------------------------- */

// declare global {
//   interface Window {
//     Calendly?: {
//       initInlineWidget: (opts: {
//         url: string;
//         parentElement: HTMLElement;
//         prefill?: Record<string, unknown>;
//         utm?: Record<string, string>;
//       }) => void;
//     };
//   }
// }

// const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

// function CalendlyEmbed({ url }: { url: string }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const init = () => {
//       if (!window.Calendly || !el) return;
//       el.innerHTML = "";
//       window.Calendly.initInlineWidget({
//         url: `${url}?hide_gdpr_banner=1&primary_color=8a6b32`,
//         parentElement: el,
//       });
//       setReady(true);
//     };

//     if (window.Calendly) {
//       init();
//       return;
//     }

//     let script = document.querySelector<HTMLScriptElement>(
//       `script[src="${CALENDLY_SCRIPT}"]`
//     );
//     if (!script) {
//       script = document.createElement("script");
//       script.src = CALENDLY_SCRIPT;
//       script.async = true;
//       document.body.appendChild(script);
//     }
//     script.addEventListener("load", init);
//     return () => script?.removeEventListener("load", init);
//   }, [url]);

//   return (
//     <div className="relative h-[700px] w-full bg-white sm:h-[720px]">
//       {!ready && (
//         <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-[#8A8980]">
//           <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A56A]/30 border-t-[#C9A56A] motion-reduce:animate-none" />
//           Loading calendar…
//         </div>
//       )}
//       <div ref={ref} className="h-full w-full" />
//     </div>
//   );
// }

// /* -------------------------------- Page form ------------------------------- */

// function ProjectForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [service, setService] = useState(SERVICES[0]);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const compose = () =>
//     `Hi AKORA Technologies, I'm ${name.trim()}.\n\nProject: ${service}\n${message.trim()}` +
//     (email.trim() ? `\n\nReply to: ${email.trim()}` : "");

//   const validate = () => {
//     if (!name.trim() || !message.trim()) {
//       setError("Please add your name and a short message.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const sendWhatsApp = (e: FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;
//     window.open(
//       `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(compose())}`,
//       "_blank",
//       "noopener,noreferrer"
//     );
//   };

//   const sendEmail = () => {
//     if (!validate()) return;
//     window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
//       `New project enquiry — ${service}`
//     )}&body=${encodeURIComponent(compose())}`;
//   };

//   const field =
//     "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#141414] placeholder:text-[#a5a49a] outline-none transition focus:border-[#C9A56A] focus:ring-4 focus:ring-[#C9A56A]/15";

//   return (
//     <form onSubmit={sendWhatsApp} className="space-y-4" noValidate>
//       <div className="grid gap-4 sm:grid-cols-2">
//         <label className="block">
//           <span className="mb-1.5 block text-[12px] font-medium text-[#57564F]">
//             Your name
//           </span>
//           <input
//             className={field}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="John Doe"
//             autoComplete="name"
//           />
//         </label>
//         <label className="block">
//           <span className="mb-1.5 block text-[12px] font-medium text-[#57564F]">
//             Email (optional)
//           </span>
//           <input
//             type="email"
//             className={field}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@company.com"
//             autoComplete="email"
//           />
//         </label>
//       </div>

//       <label className="block">
//         <span className="mb-1.5 block text-[12px] font-medium text-[#57564F]">
//           What do you need?
//         </span>
//         <select
//           className={field}
//           value={service}
//           onChange={(e) => setService(e.target.value)}
//         >
//           {SERVICES.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="block">
//         <span className="mb-1.5 block text-[12px] font-medium text-[#57564F]">
//           Tell us about your project
//         </span>
//         <textarea
//           rows={4}
//           className={`${field} resize-none`}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="A website, an app, a growth plan, a drone prototype…"
//         />
//       </label>

//       {error && (
//         <p role="alert" className="text-[13px] text-[#B4432F]">
//           {error}
//         </p>
//       )}

//       <div className="flex flex-wrap gap-3 pt-1">
//         <button
//           type="submit"
//           className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-6 py-3.5 text-[14.5px] font-medium text-white shadow-[0_12px_30px_-12px_rgba(138,107,50,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(138,107,50,0.8)]"
//         >
//           Send on WhatsApp
//           <span aria-hidden="true">→</span>
//         </button>
//         <button
//           type="button"
//           onClick={sendEmail}
//           className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-medium text-[#141414] ring-1 ring-black/10 transition-all duration-300 hover:ring-black/25"
//         >
//           Send by email
//         </button>
//       </div>
//     </form>
//   );
// }

// /* ---------------------------------- Page ---------------------------------- */

// export default function ContactPage() {
//   return (
//     <div className="overflow-x-hidden">
//       <style>{`
//         @keyframes ct-fade-up {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .ct-fade { opacity: 0; animation: ct-fade-up .8s cubic-bezier(.16,1,.3,1) forwards; }
//         .ct-d1 { animation-delay: .08s; }
//         .ct-d2 { animation-delay: .16s; }
//         .ct-d3 { animation-delay: .24s; }
//         @media (prefers-reduced-motion: reduce) {
//           .ct-fade { animation: none; opacity: 1; }
//         }
//       `}</style>
//        <Navbar/>

//       <main className="relative z-20">
       
//         <PageRevealWrapper>
//           <section className="relative overflow-hidden bg-[#F4F1E9] px-6 pb-24 pt-36 md:px-12 md:pt-44">
//             {/* soft glows + dot grid */}
//             <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#C9A56A]/20 blur-[120px]" />
//             <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[130px]" />
//             <div
//               aria-hidden
//               className="pointer-events-none absolute inset-0 opacity-[0.05]"
//               style={{
//                 backgroundImage:
//                   "radial-gradient(#141414 1px, transparent 1px)",
//                 backgroundSize: "26px 26px",
//               }}
//             />

//             <div className="relative mx-auto max-w-6xl">
//               {/* ---------- heading ---------- */}
//               <div className="max-w-3xl">
//                 <span className="ct-fade inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4B4A45] ring-1 ring-black/10 backdrop-blur-sm">
//                   <span className="h-1.5 w-1.5 rounded-full bg-[#C9A56A]" />
//                   Contact AKORA
//                 </span>

//                 <h1 className="ct-fade ct-d1 mt-6 text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-[#141414]">
//                   Let&apos;s build something
//                   <br />
//                   <span className="relative font-serif font-normal italic">
//                     unforgettable.
//                     <svg
//                       className="absolute -bottom-2 left-0 w-full"
//                       height="8"
//                       viewBox="0 0 200 8"
//                       preserveAspectRatio="none"
//                       aria-hidden
//                     >
//                       <path
//                         d="M0 4 C 50 0, 150 8, 200 4"
//                         stroke="#C9A56A"
//                         strokeWidth="2.5"
//                         fill="none"
//                       />
//                     </svg>
//                   </span>
//                 </h1>

//                 <p className="ct-fade ct-d2 mt-8 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]">
//                   Book a free 30-minute call, drop us a message, or reach out
//                   the way you like. We&apos;ll tell you exactly which of our
//                   teams your project needs.
//                 </p>

//                 <div className="ct-fade ct-d3 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#57564F]">
//                   <span className="inline-flex items-center gap-2">
//                     <span className="relative flex h-2 w-2">
//                       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
//                       <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
//                     </span>
//                     Available for new projects
//                   </span>
//                   <span>Reply within a few hours</span>
//                   <span>Free consultation</span>
//                 </div>
//               </div>

//               {/* ---------- main grid ---------- */}
//               <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
//                 {/* left column */}
//                 <div className="ct-fade ct-d2 space-y-8">
//                   <div className="space-y-3">
//                     <ContactRow
//                       href={CONFIG.phoneHref}
//                       label="Call us"
//                       value={CONFIG.phoneDisplay}
//                       icon={<PhoneIcon />}
//                       tile="bg-gradient-to-br from-sky-400 to-blue-700"
//                     />
//                     <ContactRow
//                       href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
//                         "Hello AKORA Technologies, I have a project in mind and would like to discuss it."
//                       )}`}
//                       label="WhatsApp"
//                       value={CONFIG.whatsappDisplay}
//                       icon={<WhatsAppIcon />}
//                       tile="bg-gradient-to-br from-[#5BD66B] to-[#2FA84A]"
//                       external
//                     />
//                     <ContactRow
//                       href={`mailto:${CONFIG.email}`}
//                       label="Email"
//                       value={CONFIG.email}
//                       icon={<MailIcon />}
//                       tile="bg-gradient-to-br from-[#E8645F] to-[#C33B3B]"
//                     />
//                   </div>

//                   {/* form card */}
//                   <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-black/[0.06] backdrop-blur-sm sm:p-8">
//                     <h2 className="font-serif text-2xl text-[#141414]">
//                       Prefer to <span className="italic">write to us?</span>
//                     </h2>
//                     <p className="mb-6 mt-2 text-[14.5px] text-[#6B6A63]">
//                       Share a few details and we&apos;ll pick it up from there.
//                     </p>
//                     <ProjectForm />
//                   </div>
//                 </div>

//                 {/* right column — Calendly */}
//                 <div className="ct-fade ct-d3 lg:sticky lg:top-28">
//                   <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]">
//                     {/* window chrome, same language as the homepage hero mock */}
//                     <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#FBFAF6] px-5 py-3.5">
//                       <span className="flex gap-1.5">
//                         <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
//                         <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
//                         <span className="h-3 w-3 rounded-full bg-[#28C840]" />
//                       </span>
//                       <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] text-[#6B6A63] ring-1 ring-black/[0.06]">
//                         <CalendarIcon />
//                         Book a free 30-min call
//                       </span>
//                     </div>

//                     <CalendlyEmbed url={CONFIG.calendlyUrl} />
//                   </div>

//                   <p className="mt-4 text-center text-[12.5px] text-[#8A8980]">
//                     Calendar not loading?{" "}
//                     <a
//                       href={CONFIG.calendlyUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-medium text-[#8A6B32] underline underline-offset-4"
//                     >
//                       Open it in a new tab
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </PageRevealWrapper>
//       </main>

//       <Footer />
//     </div>
//   );
// }


















"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Footer, { PageRevealWrapper } from "../../../../components/Footer";
import Navbar from "@/app/components/Navbar";

/* ============================================================================
 * AKORA — CONTACT PAGE
 * ----------------------------------------------------------------------------
 * Location: frontend/src/app/home-page/contact/page.tsx   (route: /home-page/contact)
 *           Move to frontend/src/app/contact/page.tsx for the route /contact
 *           (then change the Footer import to "../../../components/Footer").
 *
 * FOOTER FIX: all page content lives inside <PageRevealWrapper> (exactly like
 * your home page). That wrapper adds the bottom margin equal to the footer's
 * height, so the fixed footer is uncovered instead of hidden behind <main>.
 * ==========================================================================*/

const CONFIG = {
  email: "akoratechnologies@gmail.com",
  phoneDisplay: "+91 77601 72353",
  phoneHref: "tel:+917760172353",
  phoneCopy: "+917760172353",
  whatsappDisplay: "+91 72258 78057",
  whatsappNumber: "917225878057",
  calendlyUrl: "https://calendly.com/akoratechnologies",
} as const;

const GOLD = "#C9A56A";
const GOLD_DARK = "#8A6B32";

const SERVICES = [
  "Website",
  "Mobile App",
  "SEO & Growth",
  "AI & Automation",
  "Robotics & Drones",
  "UI/UX Design",
  "Something else",
];

const BUDGETS = [
  "Under ₹25k",
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L – ₹3L",
  "₹3L+",
  "Not sure yet",
];

const STEPS = [
  {
    n: "01",
    title: "Tell us your idea",
    text: "Send the form, message us, or just call. A rough idea is enough.",
  },
  {
    n: "02",
    title: "Discovery call",
    text: "A free 30-minute chat to understand goals, scope and timeline.",
  },
  {
    n: "03",
    title: "Plan & proposal",
    text: "You get a clear plan, the right team, and a transparent quote.",
  },
];

const FAQS = [
  {
    q: "How quickly will you respond?",
    a: "We aim to reply to every inquiry within one business day. For anything urgent, call or WhatsApp us directly.",
  },
  {
    q: "Do I need a detailed brief to get started?",
    a: "No. A few lines about what you want to achieve is plenty — we help shape the rest on the discovery call.",
  },
  {
    q: "Can I book a call without filling the form?",
    a: "Yes. Pick any open slot in the calendar below and the call is confirmed instantly.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work remote-first with clients across India and internationally.",
  },
];

/* --------------------------------- Icons ---------------------------------- */

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
    <path
      fill="#fff"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
    <path
      fill="#fff"
      d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.89.9-3-.2-.31a8.2 8.2 0 1 1 6.88 3.75Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.8" />
    <path
      d="m3.5 7 8.5 6.5L20.5 7"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
const CopyIcon = () => (
  <Icon>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </Icon>
);
const CheckIcon = () => (
  <Icon>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
);
const ChevronIcon = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

/* ------------------------------ Scroll reveal ----------------------------- */

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

/* ----------------------------- Eyebrow / heading -------------------------- */

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

/* ----------------------------- Channel (3 cards) -------------------------- */

function ChannelCard({
  href,
  label,
  value,
  hint,
  icon,
  tile,
  glow,
  copyValue,
  external,
}: {
  href: string;
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
  tile: string;
  glow: string;
  copyValue: string;
  external?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.3)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: glow }}
      />

      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative block p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#C9A56A] sm:p-7"
      >
        <span
          className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 ${tile}`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-white/0"
          />
          <span className="relative">{icon}</span>
        </span>

        <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A8980]">
          {label}
        </p>
        <p className="mt-1.5 break-all text-[18px] font-medium text-[#141414]">{value}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-[#6B6A63]">
          {hint}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#F4F1E9] px-3 py-1.5 text-[11.5px] font-medium text-[#57564F] transition-colors hover:bg-[#EDE8DC]"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ---------------------------------- Chips --------------------------------- */

function ChipGroup({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(active ? "" : opt)}
            className={`rounded-full px-4 py-2 text-[13.5px] transition-all duration-200 ${
              active
                ? "bg-[#141414] text-white shadow-md"
                : "bg-[#F4F1E9] text-[#57564F] ring-1 ring-black/[0.06] hover:bg-[#EDE8DC]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Form ---------------------------------- */

type Errors = Partial<Record<"name" | "email" | "service" | "message", string>>;

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const validate = () => {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (!service) e.service = "Pick what you need.";
    if (message.trim().length < 10) e.message = "Add a few more details (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const compose = () =>
    [
      "Hi AKORA Technologies 👋",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Service: ${service}`,
      budget ? `Budget: ${budget}` : null,
      "",
      "About the project:",
      message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(compose())}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("Opening WhatsApp with your message…");
  };

  const sendEmail = () => {
    if (!validate()) return;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
      `New project inquiry — ${service} (${name.trim()})`
    )}&body=${encodeURIComponent(compose())}`;
    setStatus("Opening your email app…");
  };

  const input = (hasError?: string) =>
    `w-full rounded-xl border bg-[#FBFAF6] px-4 py-3.5 text-[15px] text-[#141414] placeholder:text-[#a5a49a] outline-none transition focus:bg-white focus:ring-4 ${
      hasError
        ? "border-[#D9705A] focus:border-[#D9705A] focus:ring-[#D9705A]/15"
        : "border-[#E7E3DB] focus:border-[#C9A56A] focus:ring-[#C9A56A]/15"
    }`;

  const Label = ({ children }: { children: ReactNode }) => (
    <span className="mb-2 block text-[13px] font-medium text-[#3a3932]">{children}</span>
  );
  const Err = ({ msg }: { msg?: string }) =>
    msg ? (
      <p role="alert" className="mt-1.5 text-[12.5px] text-[#B4432F]">
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={sendWhatsApp} noValidate className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <Label>Your name</Label>
          <input
            className={input(errors.name)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
          />
          <Err msg={errors.name} />
        </label>
        <label className="block">
          <Label>Email address</Label>
          <input
            type="email"
            className={input(errors.email)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
          />
          <Err msg={errors.email} />
        </label>
      </div>

      <div>
        <Label>What do you need?</Label>
        <ChipGroup label="Service" options={SERVICES} value={service} onChange={setService} />
        <Err msg={errors.service} />
      </div>

      <div>
        <Label>
          Estimated budget <span className="font-normal text-[#8A8980]">(optional)</span>
        </Label>
        <ChipGroup label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
      </div>

      <label className="block">
        <Label>Tell us about your project</Label>
        <textarea
          rows={5}
          className={`${input(errors.message)} resize-y leading-6`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you looking to build? Share your goals, timeline, or links…"
        />
        <Err msg={errors.message} />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8A6B32] to-[#C9A56A] px-7 py-4 text-[14.5px] font-medium text-white shadow-[0_14px_34px_-14px_rgba(138,107,50,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(138,107,50,0.9)]"
        >
          Send on WhatsApp
          <ArrowUpRight />
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-medium text-[#141414] ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-black/25"
        >
          Send by email
        </button>
      </div>

      <p aria-live="polite" className="min-h-[1.25rem] text-[12.5px] text-[#6B6A63]">
        {status || "Your message opens in WhatsApp or your email app, ready to send. Nothing is sent automatically."}
      </p>
    </form>
  );
}

/* ------------------------------ Calendly frame ---------------------------- */

function CalendlyFrame() {
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      embed_domain: window.location.hostname,
      embed_type: "Inline",
      hide_gdpr_banner: "1",
      background_color: "ffffff",
      text_color: "171717",
      primary_color: "b18a45",
    });
    setSrc(`${CONFIG.calendlyUrl}?${params.toString()}`);
  }, []);

  return (
    <div className="relative h-[720px] w-full bg-white">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-[#8A8980]">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A56A]/30 border-t-[#C9A56A] motion-reduce:animate-none" />
          Loading calendar…
        </div>
      )}
      {src && (
        <iframe
          title="Book a meeting with AKORA Technologies"
          src={src}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full border-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function ContactPage() {
  return (
    <>
      <Navbar />

       <main className="relative z-20 text-[#141414]">
        {/* Everything is wrapped in PageRevealWrapper so the footer can be revealed */}
        <PageRevealWrapper>
          {/* ============================== HERO ============================== */}
          <section className="relative overflow-hidden bg-[#F4F1E9] px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28">
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
          

              <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
                <div>
                  <Reveal delay={80}>
                    <h1 className="text-[clamp(2.6rem,5vw,5.4rem)] font-normal italic leading-[1.03] tracking-tight">
                      Let&apos;s build
                      <br />
                      something{" "}
                      <span className="relative font-serif font-normal italic">
                        exceptional.
                        <Underline />
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal delay={160}>
                    <p className="mt-9 max-w-xl text-[16.5px] leading-relaxed text-[#6B6A63]">
                      Websites, apps, search growth, AI and robotics — one accountable team.
                      Tell us what you&apos;re planning and we&apos;ll show you the clearest
                      path from idea to launch.
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={240}>
                  <div className="rounded-3xl bg-[#141414] p-6 text-white shadow-[0_30px_70px_-35px_rgba(0,0,0,0.6)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                      Prefer to talk?
                    </p>
                    <p className="mt-3 font-serif text-xl leading-snug">
                      Book a free <span className="italic">30-minute</span> discovery call.
                    </p>
                    <a
                      href="#book-meeting"
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#141414] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Pick a time
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================ CHANNELS ============================ */}
          <section className="bg-[#F4F1E9] px-6 pb-20 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              <Reveal>
                <ChannelCard
                  href={CONFIG.phoneHref}
                  label="Call us"
                  value={CONFIG.phoneDisplay}
                  hint="Tap to call directly"
                  icon={<PhoneIcon />}
                  tile="bg-gradient-to-br from-sky-400 to-blue-700"
                  glow="#4F8EF7"
                  copyValue={CONFIG.phoneCopy}
                />
              </Reveal>
              <Reveal delay={90}>
                <ChannelCard
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    "Hello AKORA Technologies, I have a project in mind and would like to discuss it."
                  )}`}
                  label="WhatsApp"
                  value={CONFIG.whatsappDisplay}
                  hint="Chat with us instantly"
                  icon={<WhatsAppIcon />}
                  tile="bg-gradient-to-br from-[#5BD66B] to-[#2FA84A]"
                  glow="#25D366"
                  copyValue={`+${CONFIG.whatsappNumber}`}
                  external
                />
              </Reveal>
              <Reveal delay={180}>
                <ChannelCard
                  href={`mailto:${CONFIG.email}`}
                  label="Email"
                  value={CONFIG.email}
                  hint="Send us your brief"
                  icon={<MailIcon />}
                  tile="bg-gradient-to-br from-[#E8645F] to-[#C33B3B]"
                  glow="#EA4335"
                  copyValue={CONFIG.email}
                />
              </Reveal>
            </div>
          </section>

          {/* ======================== PROJECT INQUIRY ========================= */}
          <section
            id="project-inquiry"
            className="scroll-mt-28 bg-[#EDE8DC] px-6 py-20 md:px-12 md:py-24"
          >
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              {/* dark panel + steps */}
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[#0B0A08] p-8 text-white sm:p-10 lg:sticky lg:top-28">
                  <div
                    className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full blur-[90px]"
                    style={{ background: "rgba(201,165,106,0.22)" }}
                  />
                  <div className="relative">
                    <Eyebrow dark>How it works</Eyebrow>
                    <h2 className="mt-6 font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.12]">
                      Great work begins with{" "}
                      <span className="italic" style={{ color: GOLD }}>
                        a conversation.
                      </span>
                    </h2>

                    <ol className="mt-10 space-y-7">
                      {STEPS.map((s) => (
                        <li key={s.n} className="flex gap-4">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium ring-1 ring-white/15"
                            style={{ color: GOLD, background: "rgba(255,255,255,0.05)" }}
                          >
                            {s.n}
                          </span>
                          <div>
                            <p className="font-medium">{s.title}</p>
                            <p className="mt-1 text-[14px] leading-relaxed text-white/55">
                              {s.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <a
                      href={`mailto:${CONFIG.email}`}
                      className="mt-10 inline-flex items-center gap-2 text-[14px] text-[#E0C28D] transition-colors hover:text-white"
                    >
                      Prefer email? Write to us <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* form */}
              <Reveal delay={100}>
                <div className="rounded-[32px] bg-white p-7 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] sm:p-10">
                  <Eyebrow>Project inquiry</Eyebrow>
                  <h2 className="mt-5 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">
                    Tell us what you <span className="italic">have in mind.</span>
                  </h2>
                  <p className="mb-8 mt-3 text-[14.5px] leading-relaxed text-[#6B6A63]">
                    A few details help us understand your needs before we connect.
                  </p>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================ CALENDLY ============================ */}
          <section id="book-meeting" className="scroll-mt-24 bg-[#F4F1E9] px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mx-auto mb-12 max-w-2xl text-center">
                <Eyebrow>Schedule a conversation</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
                  Your next idea.
                  <br />
                  <span className="relative font-serif font-normal italic">
                    Our next conversation.
                    <Underline />
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-lg text-[15.5px] leading-relaxed text-[#6B6A63]">
                  Choose a time that suits you — it lands straight in our calendar and you get
                  an instant confirmation.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]">
                  <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] bg-[#FBFAF6] px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="hidden gap-1.5 sm:flex">
                        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] text-[#6B6A63] ring-1 ring-black/[0.06]">
                        <CalendarIcon />
                        Free 30-min discovery call
                      </span>
                    </div>
                    <a
                      href={CONFIG.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium underline-offset-4 hover:underline"
                      style={{ color: GOLD_DARK }}
                    >
                      Open in new tab <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <CalendlyFrame />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ============================== FAQ =============================== */}
          <section className="bg-[#EDE8DC] px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-6 max-w-sm font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-tight">
                  Questions we get <span className="italic">before kickoff.</span>
                </h2>
                <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-[#6B6A63]">
                  Can&apos;t find your answer? Message us on WhatsApp and we&apos;ll reply
                  personally.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="divide-y divide-black/10 border-y border-black/10">
                  {FAQS.map((f, i) => (
                    <details key={f.q} className="group" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                        <span className="font-serif text-[18px]">{f.q}</span>
                        <ChevronIcon className="h-5 w-5 shrink-0 text-[#8A8980] transition-transform duration-300 group-open:rotate-180 group-open:text-[#8A6B32]" />
                      </summary>
                      <p className="max-w-lg pb-6 text-[14.5px] leading-relaxed text-[#6B6A63]">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </PageRevealWrapper>
      </main>

      {/* Footer sits OUTSIDE <main>; it is revealed as the page scrolls up */}
      <Footer />
    </>
  );
}