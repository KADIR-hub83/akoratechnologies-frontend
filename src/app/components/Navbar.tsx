
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type NavChild = {
  title: string;
  href: string;
  desc?: string;
};

type NavItem = {
  label: string;
  layout: "grid" | "list";
  children: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    layout: "grid",
    children: [
      {
        title: "Cloud & DevOps",
        desc: "Provision, deploy, and scale infrastructure",
        href: "/solutions/cloud-devops",
      },
      {
        title: "AI & Machine Learning",
        desc: "Models and pipelines built for production",
        href: "/solutions/ai-ml",
      },
      {
        title: "Cybersecurity",
        desc: "Threat detection, audits, and compliance",
        href: "/solutions/cybersecurity",
      },
      {
        title: "Data Engineering",
        desc: "Pipelines, warehouses, and analytics",
        href: "/solutions/data-engineering",
      },
      {
        title: "Enterprise Software",
        desc: "Custom platforms for complex operations",
        href: "/solutions/enterprise-software",
      },
      {
        title: "Product Design",
        desc: "Interfaces people actually enjoy using",
        href: "/solutions/product-design",
      },
    ],
  },
  {
    label: "Industries",
    layout: "list",
    children: [
      {
        title: "FinTech",
        href: "/industries/fintech",
      },
      {
        title: "Healthcare",
        href: "/industries/healthcare",
      },
      {
        title: "Retail & E-commerce",
        href: "/industries/retail-ecommerce",
      },
      {
        title: "Logistics & Supply Chain",
        href: "/industries/logistics",
      },
      {
        title: "EdTech",
        href: "/industries/edtech",
      },
    ],
  },
  {
    label: "Company",
    layout: "list",
    children: [
      {
        title: "About Us",
        href: "/company/about",
      },
      {
        title: "Leadership",
        href: "/company/leadership",
      },
      {
        title: "Careers",
        href: "/company/careers",
      },
      {
        title: "Case Studies",
        href: "/company/case-studies",
      },
    ],
  },
  {
    label: "Resources",
    layout: "list",
    children: [
      {
        title: "Blog",
        href: "/resources/blog",
      },
      {
        title: "Whitepapers",
        href: "/resources/whitepapers",
      },
      {
        title: "Webinars",
        href: "/resources/webinars",
      },
      {
        title: "Documentation",
        href: "/resources/docs",
      },
    ],
  },
];

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

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    setT({
      x: relX * 0.22,
      y: relY * 0.3,
    });
  }

  function onLeave() {
    setT({ x: 0, y: 0 });
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform 0.15s ease",
      }}
    >
      {children}
    </a>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="M5 7l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Existing navbar design behavior
      setScrolled(currentScrollY > 60);

      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      /*
        Footer / last section se approx 1 screen pehle
        navbar hide hona start ho jayega.
      */
      const hidePoint = documentHeight - windowHeight * 3;

      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Scroll UP = navbar immediately show
      if (isScrollingUp) {
        setNavVisible(true);
      }

      // Second-last screen/section reach + scrolling DOWN = hide
      else if (isScrollingDown && currentScrollY >= hidePoint) {
        setNavVisible(false);
      }

      // Us point se upar navbar visible
      else if (currentScrollY < hidePoint) {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkColor = scrolled ? "text-ink" : "text-black/90";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center text-black
        transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
        ${
          navVisible || mobileOpen
            ? "translate-y-0"
            : "-translate-y-[150%]"
        }
      `}
    >
      <div
        className={[
          "w-full flex items-center justify-between transition-all duration-500 ease-out",
          scrolled
            ? "mt-3 mx-3 md:mx-6 max-w-[1200px] rounded-full bg-white/95 backdrop-blur-xl border border-black/5 shadow-xl shadow-black/10 px-6 md:px-8 py-3"
            : "max-w-[1400px] px-6 md:px-10 py-5 bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/akoralogopngfinal.png"
            alt="AKORA Technologies Logo"
            width={38}
            height={38}
            className="w-12 h-12 object-contain"
          />

 <span
  className={`font-display relative hidden lg:inline-flex font-bold text-lg transition-colors ${
    scrolled ? "text-ink" : "text-black"
  }`}
>
  AKORA Technologies

    <svg
      viewBox="0 0 420 18"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 w-full h-[16px] pointer-events-none"
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
</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group relative">
              <button
                type="button"
                className={`nav-underline flex items-center gap-1 text-sm font-medium transition-colors ${linkColor}`}
              >
                {item.label}

                <ChevronIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel */}
              <div
                className={[
                  "absolute left-1/2 -translate-x-1/2 top-full pt-5",
                  "opacity-0 invisible -translate-y-2",
                  "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                  "transition-all duration-200 ease-out",
                  item.layout === "grid" ? "w-[640px]" : "w-64",
                ].join(" ")}
              >
                <div
                  className={[
                    "bg-white backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/40",
                    item.layout === "grid"
                      ? "grid grid-cols-2 gap-1"
                      : "flex flex-col gap-1",
                  ].join(" ")}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.href}
                      className="p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <p className="text-black text-sm font-medium">
                        {child.title}
                      </p>

                      {child.desc && (
                        <p className="text-slate-400 text-xs mt-1">
                          {child.desc}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <a
            href="/home-page/contact"
            className={`nav-underline text-sm font-medium transition-colors ${linkColor}`}
          >
            Contact
          </a>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href="/home-page/contact"
            className={[
              "hidden lg:inline-flex rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(14,14,16,0.18)]",
              scrolled
                ? "bg-[#0E0E10]"
                : "bg-[#0E0E10] text-ink hover:bg-[#0E0E10]",
            ].join(" ")}
          >
            Start a Project
          </MagneticButton>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors ${
              scrolled ? "text-ink" : "text-black"
            }`}
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}

{/* AKORA Technologies — Cream & Gold Mobile Navigation */}

{/* AKORA Technologies — Unified Mobile Navigation */}
<div
  className={[
    "lg:hidden fixed inset-x-3 top-[76px] z-50",
    "origin-top transition-all duration-300 ease-out",
    mobileOpen
      ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
      : "-translate-y-2 scale-[0.99] opacity-0 pointer-events-none",
  ].join(" ")}
  aria-hidden={!mobileOpen}
>
  <div className="relative overflow-hidden rounded-b-[22px] rounded-t-[4px] border border-t-0 border-[#D9C5A0] bg-[#F8F5EF] shadow-[0_18px_40px_-18px_rgba(70,52,27,0.22)]">

    {/* Subtle gold divider matching the main header */}
    <div className="h-[2px] w-full bg-gradient-to-r from-[#E9D8B6] via-[#B18A45] to-[#E9D8B6]" />

    {/* Section heading */}
    <div className="flex items-center justify-between px-5 pb-2 pt-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7A60]">
        Navigation
      </p>

      <span className="text-[10px] font-medium tracking-wide text-[#A38A61]">
        AKORA TECHNOLOGIES
      </span>
    </div>

    {/* Main menu */}
    <nav aria-label="Mobile navigation" className="px-3 pb-2">
      {NAV_ITEMS.map((item, index) => {
        const isOpen = openMobileGroup === item.label;
        const panelId = `akora-mobile-group-${index}`;

        return (
          <div
            key={item.label}
            className="border-b border-[#E7DED0] last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenMobileGroup(isOpen ? null : item.label)
              }
              className={[
                "group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B18A45]",
                isOpen
                  ? "bg-[#EEE5D7]"
                  : "bg-transparent hover:bg-[#F0E9DE]",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  "text-[10px] font-semibold transition-colors duration-200",
                  isOpen
                    ? "bg-[#B18A45] text-white"
                    : "border border-[#E5D6BD] bg-white text-[#967442]",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={[
                  "flex-1 text-sm font-medium",
                  isOpen ? "text-[#9B7639]" : "text-[#292720]",
                ].join(" ")}
              >
                {item.label}
              </span>

              <span
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full",
                  "transition-all duration-200",
                  isOpen
                    ? "rotate-180 text-[#A47B39]"
                    : "text-[#81786B]",
                ].join(" ")}
              >
                <ChevronIcon className="h-4 w-4" />
              </span>
            </button>

            {/* Expandable submenu */}
            <div
              id={panelId}
              aria-hidden={!isOpen}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="ml-11 space-y-1 pb-3 pr-2">
                  {item.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.href}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenMobileGroup(null);
                      }}
                      className="group/link flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#625A4F] transition-colors hover:bg-white hover:text-[#9B7639] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B18A45]"
                    >
                      <span>{child.title}</span>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-4 w-4 shrink-0 text-[#B18A45] opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14m-6-6 6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Contact */}
      <a
        href="/home-page/contact"
        onClick={() => {
          setMobileOpen(false);
          setOpenMobileGroup(null);
        }}
        className="group flex items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-[#F0E9DE]"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E5D6BD] bg-white text-[#967442]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8A8.5 8.5 0 1 1 21 11.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <span className="flex-1 text-sm font-medium text-[#292720]">
          Contact
        </span>

        <span className="text-sm text-[#A47B39] transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>
    </nav>

    {/* CTA */}
    <div className="border-t border-[#E7DED0] p-4">
      <a
        href="/home-page/contact"
        onClick={() => {
          setMobileOpen(false);
          setOpenMobileGroup(null);
        }}
        className="group flex min-h-[54px] w-full items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#A47B39] to-[#C3A064] px-5 py-3 text-white shadow-[0_5px_14px_rgba(156,117,53,0.16)] transition-all duration-200 hover:shadow-[0_8px_20px_rgba(156,117,53,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B18A45] focus-visible:ring-offset-2"
      >
        <span className="text-sm font-semibold">
          Start a Project
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  </div>
</div>


    </header>
  );
}

