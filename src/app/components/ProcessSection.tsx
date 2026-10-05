"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";

/**
 * AKORA — "How We Build" process section (v2)
 * Cream/ink base identity kept, but each step now carries its own rich
 * accent color for contrast, with glowing gradient borders, watermark
 * numerals and a sequential progress line. No fragile split-layout —
 * plain responsive grid, so nothing overlaps at any breakpoint.
 */

type Step = {
  index: string;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  icon: ReactElement;
};

const steps: Step[] = [
  {
    index: "01",
    title: "Discovery & Strategy",
    description:
      "We study your business, your competitors and your customers before a single pixel is placed — so every decision has a reason behind it.",
    accent: "#B8935B",
    accentSoft: "184,147,91",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14.5 9.5 12 12l-2.5 2.5L12 12l2.5-2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Design & Prototyping",
    description:
      "Custom interfaces built around your real content, refined in interactive prototype form until it feels inevitable, not designed.",
    accent: "#1F5F55",
    accentSoft: "31,95,85",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M4 20l1.2-4.2L15.8 5.2a1.5 1.5 0 0 1 2.1 0l1 1a1.5 1.5 0 0 1 0 2.1L8.3 18.8 4 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Engineering & Build",
    description:
      "Production-grade code, clean architecture and performance budgets from day one — built to hold up the way a seven-figure brand needs it to.",
    accent: "#8A3B3B",
    accentSoft: "138,59,59",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M9 7 4 12l5 5M15 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Launch & Growth",
    description:
      "We ship, monitor real user data and keep refining post-launch, staying close to the numbers so the site keeps earning its place.",
    accent: "#233B6B",
    accentSoft: "35,59,107",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M12 3c2.5 2.5 4 6 4 9.5S14.5 19 12 21c-2.5-2-4-5-4-8.5S9.5 5.5 12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="11"
          r="1.6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => {
            setVisible(true);
          }, delayMs);

          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [delayMs]);

  return {
    ref,
    visible,
  };
}

function StepCard({
  step,
  i,
}: {
  step: Step;
  i: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(i * 130);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${i * 60}ms` : "0ms",
      }}
      className={`group relative transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      {/* Animated glow ring on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.4rem] opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${step.accent}, transparent 60%)`,
        }}
      />

      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border bg-[#FCFAF4] p-7 shadow-[0_18px_40px_-24px_rgba(20,17,13,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-2"
        style={{
          borderColor: `rgba(${step.accentSoft},0.25)`,
        }}
      >
        {/* Watermark numeral */}
        <span
          className="pointer-events-none absolute -right-3 -top-6 select-none font-serif text-[7rem] italic leading-none opacity-[0.07]"
          style={{
            color: step.accent,
          }}
          aria-hidden="true"
        >
          {step.index}
        </span>

        {/* Top accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
          style={{
            background: `linear-gradient(90deg, ${step.accent}, transparent)`,
          }}
        />

        {/* Icon */}
        <div
          className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md"
          style={{
            background: step.accent,
          }}
        >
          {step.icon}
        </div>

        {/* Step number */}
        <span
          className="relative z-10 mb-2 text-xs font-semibold tracking-[0.2em]"
          style={{
            color: step.accent,
          }}
        >
          STEP {step.index}
        </span>

        {/* Title */}
        <h3 className="relative z-10 text-lg font-semibold text-[#14110D]">
          {step.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 mt-3 text-[14px] leading-relaxed text-[#14110D]/60">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const {
    ref: headRef,
    visible: headVisible,
  } = useReveal<HTMLDivElement>();

  const {
    ref: lineRef,
    visible: lineVisible,
  } = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F1E8] px-6 py-8 sm:px-10 md:px-16">
      {/* Rich ambient color washes */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#B8935B]/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#233B6B]/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-1/3 top-1/2 h-72 w-72 rounded-full bg-[#8A3B3B]/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow + headline */}
        <div
          ref={headRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            headVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8935B]/30 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#14110D]/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B8935B]" />
            Our Process
          </div>

          <h2 className="font-serif text-4xl italic leading-[1.15] text-[#14110D] sm:text-5xl">
            We don&apos;t just build websites.
            <br />

            <span className="not-italic font-sans font-normal">
              We build{" "}

              <span className="relative italic font-serif">
                inevitabilities.

                <span
                  className={`absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#B8935B] via-[#8A3B3B] to-[#233B6B] transition-transform duration-700 ease-out delay-300 ${
                    headVisible
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#14110D]/55">
            AKORA TECHNOLOGIES follows one disciplined process on every
            engagement — no shortcuts, no templates, no surprises.
          </p>
        </div>

        {/* Sequential progress line */}
        <div
          ref={lineRef}
          className="relative mx-auto mt-14 hidden max-w-4xl md:block"
        >
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#14110D]/8">
            <div
              className={`h-full origin-left rounded-full bg-gradient-to-r from-[#B8935B] via-[#8A3B3B] to-[#233B6B] transition-transform duration-[1400ms] ease-out ${
                lineVisible
                  ? "scale-x-100"
                  : "scale-x-0"
              }`}
            />
          </div>
        </div>

        {/* Step grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard
              key={step.index}
              step={step}
              i={i}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-[#14110D]/50">
            Same process. Every project. No exceptions.
          </p>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#14110D] px-8 py-3.5 text-sm font-medium text-[#F5F1E8] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#B8935B] via-[#8A3B3B] to-[#233B6B] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />

            <span className="relative">
              Start Your Project
            </span>

            <span className="relative transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

