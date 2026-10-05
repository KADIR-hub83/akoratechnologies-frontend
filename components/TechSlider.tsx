"use client";

/**
 * TechStackSlider — v2
 * ------------------------------------------------------------
 * Redesigned to fix two issues from v1:
 *  1) Grayscale-by-default logos read as "cheap" — brand logos
 *     are now shown in full color at all times, in larger,
 *     bolder tinted chips (matching how premium sites like
 *     Stripe/Linear/HYI present tech logos).
 *  2) Hover-to-pause silently failed: the previous version set
 *     the `animation` shorthand via inline style, which beats
 *     a Tailwind `hover:` class in CSS specificity, so pausing
 *     on hover never actually worked. The animation now lives
 *     entirely in a stylesheet class; only the `--duration`
 *     custom property is passed inline, so the real hover rule
 *     can take over play-state cleanly.
 * ------------------------------------------------------------
 */

type Tech = {
  name: string;
  slug: string; // simple-icons slug (https://cdn.simpleicons.org/<slug>)
  color: string; // brand color, used for the tinted chip + hover glow
};

const ROW_1: Tech[] = [
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000" },
  { name: "Node.js", slug: "nodedotjs", color: "#339933" },
  { name: "Express", slug: "express", color: "#3a3a40" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
];

const ROW_2: Tech[] = [
  { name: "Firebase", slug: "firebase", color: "#FFCA28" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#38BDF8" },
  { name: "Vercel", slug: "vercel", color: "#000000" },
//   { name: "AWS", slug: "amazonaws", color: "#FF9900" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "Stripe", slug: "stripe", color: "#635BFF" },
];

function LogoCard({ tech }: { tech: Tech }) {
  return (
<div className="group/card relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-[#FBFAF6] transition-all duration-500 hover:-translate-y-1">      {/* soft glow that only appears on hover */}
      <div
        className="pointer-events-none absolute inset-2 rounded-[18px] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-40"
        style={{ background: tech.color }}
      />

      {/* icon chip — always full color, large and bold */}
      <div
        className="relative flex h-[48px] w-[48px] items-center justify-center rounded-2xl shadow-[0_1px_2px_rgba(14,14,16,0.04)] ring-1 ring-inset ring-black/[0.04] transition-transform duration-500 group-hover/card:scale-[1.08]"
        style={{ background: `${tech.color}17` }}
      >
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}`}
          alt={tech.name}
          width={34}
          height={34}
          loading="lazy"
          className="h-[34px] w-[34px] object-contain"
        />
      </div>

      {/* <span className="relative text-[13px] font-medium text-[#3a3a40] transition-colors duration-500 group-hover/card:text-[#0E0E10]">
        {tech.name}
      </span> */}
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
}: {
  items: Tech[];
  direction?: "left" | "right";
  duration?: number;
}) {
  // triple the row so the seam never shows, even on wide screens
const looped = Array.from({ length: 10 }, () => items).flat();

  return (
    <div className="relative overflow-hidden">
      {/* edge fade — matches the actual section background exactly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

      <div
        className={`akora-marquee-track flex w-max gap- ${
          direction === "left" ? "akora-dir-left" : "akora-dir-right"
        }`}
        style={{ ["--akora-duration" as string]: `${duration}s` }}
      >
        {looped.map((tech, i) => (
          <LogoCard key={`${tech.slug}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackSlider() {
  return (
    <section className="relative overflow-hidden bg-white px-2">
      {/* <div className="mb-14 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#E7E4DC] bg-[#FBFAF6] px-4 py-1.5 font-[var(--font-mono,ui-monospace)] text-[11px] uppercase tracking-[0.16em] text-[#9C7A3C]">
          Our Stack
        </span>
        <h2 className="font-[var(--font-display,inherit)] text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tight text-[#0E0E10]">
          Built on a modern,
          <br className="hidden sm:block" /> production-grade stack.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[15.5px] leading-relaxed text-[#6B6B74]">
          Every project we ship runs on the same battle-tested tools used by
          the world&apos;s fastest-growing products.
        </p>
      </div> */}

      <div className="flex flex-col gap-">
        <MarqueeRow items={ROW_1} direction="left" duration={34} />
        <MarqueeRow items={ROW_2} direction="right" duration={38} />
      </div>

      <style jsx global>{`
        .akora-marquee-track {
          animation-duration: var(--akora-duration, 30s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .akora-marquee-track:hover {
          animation-play-state: paused;
        }
        .akora-dir-left {
          animation-name: akora-slide-left;
        }
        .akora-dir-right {
          animation-name: akora-slide-right;
        }
        @keyframes akora-slide-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @keyframes akora-slide-right {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}