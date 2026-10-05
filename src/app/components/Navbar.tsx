
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
            className={`font-display hidden lg:inline-flex font-bold text-lg transition-colors ${
              scrolled ? "text-ink" : "text-black"
            }`}
          >
            AKORA Technologies
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
            href="/contact"
            className={`nav-underline text-sm font-medium transition-colors ${linkColor}`}
          >
            Contact
          </a>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href="/contact"
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
      <div
        className={[
          "lg:hidden fixed inset-x-3 top-[76px] z-40 transition-all duration-300 ease-out origin-top",
          mobileOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-panel/98 backdrop-blur-xl border border-white/10 rounded-3xl p-4 max-h-[75vh] overflow-y-auto shadow-2xl shadow-black/50">
          {NAV_ITEMS.map((item) => {
            const isOpen = openMobileGroup === item.label;

            return (
              <div
                key={item.label}
                className="border-b border-white/5 last:border-none"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileGroup(isOpen ? null : item.label)
                  }
                  className="w-full flex items-center justify-between py-4 text-black font-medium text-sm"
                >
                  {item.label}

                  <ChevronIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-3" : "max-h-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.title}
                      href={child.href}
                      className="block py-2.5 px-3 rounded-xl text-slate-300 text-sm hover:bg-white/5"
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          <a
            href="/contact"
            className="block py-4 text-black font-medium text-sm"
          >
            Contact
          </a>

          <a
            href="/contact"
            className="mt-2 flex items-center justify-center w-full py-3 rounded-full bg-white text-ink text-sm font-semibold"
          >
            Start a Project
          </a>
        </div>
      </div>
    </header>
  );
}

