"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * AKORA — Premium "reveal" footer (Sundown Studio style)
 * ------------------------------------------------------------------
 * HOW TO USE (important — 2 pieces work together):
 *
 *   import { PageRevealWrapper } from "@/components/Footer";
 *   import Footer from "@/components/Footer";
 *
 *   export default function Page() {
 *     return (
 *       <>
 *         <PageRevealWrapper>
 *           <Navbar />
 *           <HeroSection />
 *           <ProcessSection />
 *           ...every other section...
 *         </PageRevealWrapper>
 *         <Footer />
 *       </>
 *     );
 *   }
 *
 * PageRevealWrapper wraps EVERYTHING except the footer. It sits on top
 * (higher z-index, solid background) and gets pulled up by a negative
 * margin exactly equal to the footer's height — so as the user scrolls,
 * your page content visibly slides up and off, uncovering the footer
 * which stays pinned (`sticky bottom-0`) underneath it.
 *
 * The footer height is a single CSS variable (--footer-h) so the two
 * pieces can never fall out of sync, even across breakpoints.
 * No extra installs needed — plain React + Tailwind + CSS variables.
 */

export function PageRevealWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative z-[1] bg-[#FAF7F0]
        mb-0
        md:mb-[var(--footer-h)]
      "
    >
      {children}
    </div>
  );
}

const solutionsLinks = [
  "Web Development",
  "Mobile App Development",
  "AI Robotics & Drones",
  "UI/UX Design",
];

const companyLinks = ["About", "Careers", "Blog", "Contact"];
const resourceLinks = ["Case Studies", "Documentation", "FAQs"];


const socials = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H2l8.1-9.3L1.5 2h7l4.9 6.4L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group inline-flex items-center text-[14px] text-white/65 transition-colors duration-300 hover:text-white"
            >
              <span className="relative">
                {link}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A56A] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CONTACT = {
  email: "akoratechnologies@gmail.com",
  phone: "tel:+917760172353", // tap = direct dialer
  whatsapp:
    "https://wa.me/917225878057?text=" +
    encodeURIComponent(
      "Hello AKORA Technologies, I have a project in mind and would like to discuss it."
    ), // tap = direct WhatsApp chat
} as const;
 
/* ------------------------------- Brand icons ------------------------------ */
 
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
 
/* ------------------------------ Icon button ------------------------------- */
 
type IconLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  bg: string; // tailwind gradient classes
  external?: boolean;
};
 
function IconLink({ href, label, icon, bg, external }: IconLinkProps) {
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl shadow-md ring-1 ring-white/15 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A56A] motion-reduce:transition-none motion-reduce:hover:transform-none ${bg}`}
    >
      {/* glossy top highlight (like the reference icons) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-white/0"
      />
      <span className="relative">{icon}</span>
    </a>
  );
}




export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const year = new Date().getFullYear();

  useEffect(() => {
  const el = footerRef.current;
  if (!el) return;
  const update = () =>
    document.documentElement.style.setProperty("--footer-h", `${el.offsetHeight}px`);
  update();
  const ro = new ResizeObserver(update);
  ro.observe(el);
  return () => ro.disconnect();
}, []);

  return (
    <>
      {/* keeps the reveal height in sync across the whole page */}
      <style>{`
       :root { --footer-h: 640px; }

        @media (min-width: 640px) {
          :root { --footer-h: 760px; }
        }
        @media (min-width: 1024px) {
          :root { --footer-h: 640px; }
        }
        @keyframes akora-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .akora-marquee-track {
          animation: akora-marquee 22s linear infinite;
        }
      `}</style>

<footer
  ref={footerRef}
  className="
    relative z-0 flex flex-col bg-[#0B0A08] text-white
    min-h-[100svh]
    md:fixed md:inset-x-0 md:bottom-0 md:min-h-0
  "
>
        {/* ambient glow */}
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#C9A56A]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#C9A56A]/10 blur-[120px]" />

        {/* marquee strip */}
        <div className="relative overflow-hidden border-b border-white/[0.07] py-3">
          <div className="akora-marquee-track flex w-max whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 pr-3">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span
                    key={j}
                    className="flex items-center gap-3 px-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40"
                  >
                    Available for new projects
                    <span className="h-1 w-1 rounded-full bg-[#C9A56A]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* main content */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 py-10 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* left — big CTA */}
          <div>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A56A]">
        Let&apos;s talk
      </span>
 
      <h2 className="mt-4 font-serif text-3xl italic leading-[1.15] text-white sm:text-4xl lg:text-5xl">
        Got a project
        <br />
        <span className="font-sans font-normal not-italic">in mind?</span>
      </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
        Call, message or email us. We usually reply within a few hours.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <IconLink
          href={CONTACT.phone}
          label="Call us"
          bg="bg-gradient-to-br from-sky-400 to-blue-700"
          icon={<PhoneIcon />}
        />
        <IconLink
          href={CONTACT.whatsapp}
          label="Chat on WhatsApp"
          bg="bg-gradient-to-br from-[#5BD66B] to-[#2FA84A]"
          icon={<WhatsAppIcon />}
          external
        />
        <IconLink
          href={`mailto:${CONTACT.email}`}
          label="Send an email"
          bg="bg-gradient-to-br from-[#E8645F] to-[#C33B3B]"
          icon={<MailIcon />}
        />
      </div>
    </div>

            {/* right — link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <FooterLinkColumn title="Solutions" links={solutionsLinks} />
              <FooterLinkColumn title="Company" links={companyLinks} />
              <FooterLinkColumn title="Resources" links={resourceLinks} />
            </div>
          </div>

          {/* socials + bottom bar */}
          <div className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-6">
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A56A]/50 hover:text-[#C9A56A]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/40">
                <span>© {year} AKORA Technologies. All rights reserved.</span>
                <a href="#" className="transition-colors duration-300 hover:text-white/70">
                  Privacy Policy
                </a>
                <a href="#" className="transition-colors duration-300 hover:text-white/70">
                  Terms of Service
                </a>
              </div>
           

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A56A]/50 hover:text-[#C9A56A]"
                aria-label="Back to top"
              >
                ↑
              </button>
            </div>
          </div>
        </div>

        {/* giant bleeding wordmark */}
        {/* <div className="pointer-events-none relative -mb-6 select-none overflow-hidden text-center sm:-mb-10 lg:-mb-14">
          <span
            className="font-serif text-[22vw] font-bold italic leading-none text-transparent sm:text-[20vw]"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
          >
            AKORA Technologies
          </span>
        </div> */}
      </footer>
    </>
  );
}