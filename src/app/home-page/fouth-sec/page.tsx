"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AKORA — "AI Robotics & Drone Technologies" section
 * Left: a CSS-3D robot + autonomous drone scene. The drone glides to
 * random points within the scene (never leaves it — clamped + clipped),
 * the robot's head tilts up/down to track the drone's height, its eyes
 * glance toward the drone, and a glowing tracking beam connects them.
 * Built entirely with CSS 3D transforms — no three.js, no extra installs.
 * Right: premium copy, scroll-revealed.
 */

const features = [
  {
    title: "Autonomous Navigation",
    desc: "Real-time path planning that adapts to a changing environment without a human at the stick.",
  },
  {
    title: "Computer Vision",
    desc: "On-device object detection and tracking, tuned for low-latency decisions in the field.",
  },
  {
    title: "Custom Firmware",
    desc: "Purpose-built embedded systems for robotics and drone hardware, not off-the-shelf SDK glue.",
  },
];

function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delayMs);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return { ref, visible };
}

// clamped so the drone always stays comfortably inside the scene
const DRONE_X_MIN = 12;
const DRONE_X_MAX = 88;
const DRONE_Y_MIN = 8;
const DRONE_Y_MAX = 52;
const MOVE_DURATION = 2600; // ms

function randomPoint() {
  return {
    x: DRONE_X_MIN + Math.random() * (DRONE_X_MAX - DRONE_X_MIN),
    y: DRONE_Y_MIN + Math.random() * (DRONE_Y_MAX - DRONE_Y_MIN),
  };
}

function RobotDroneScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [dronePos, setDronePos] = useState(() => randomPoint());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setDronePos(randomPoint());
    }, MOVE_DURATION + 700);
    return () => clearInterval(interval);
  }, []);

  // eye anchor as a fraction of the scene (robot sits bottom-center)
  const eyeXFrac = 0.5;
  const eyeYFrac = 0.62;

  const eyeX = dims.w * eyeXFrac;
  const eyeY = dims.h * eyeYFrac;
  const droneX = (dronePos.x / 100) * dims.w;
  const droneY = (dronePos.y / 100) * dims.h;

  const dx = droneX - eyeX;
  const dy = droneY - eyeY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  // head tilts on the vertical axis only, based on drone height
  const headTilt = Math.max(
    -22,
    Math.min(22, ((dronePos.y - 30) / 30) * 22)
  );
  // subtle horizontal eye glance toward the drone
  const eyeShift = Math.max(-5, Math.min(5, (dronePos.x - 50) / 8));

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-[radial-gradient(ellipse_at_50%_20%,#1a1510_0%,#0B0A08_70%)] sm:h-[480px] lg:h-[520px]"
      style={{ perspective: "1400px" }}
    >
      {/* radar grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A56A 1px, transparent 1px), linear-gradient(90deg, #C9A56A 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* pulsing radar rings */}
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-2 w-2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inline-flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#C9A56A]/20" />
        <span className="absolute inline-flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-[#C9A56A]/10 [animation-delay:600ms]" />
      </div>

      {/* tracking beam from robot eyes to drone */}
      {dims.w > 0 && (
        <div
          className="pointer-events-none absolute left-0 top-0 h-px origin-left bg-gradient-to-r from-[#C9A56A]/70 via-[#C9A56A]/30 to-transparent transition-all ease-in-out"
          style={{
            width: `${distance}px`,
            transform: `translate(${eyeX}px, ${eyeY}px) rotate(${angleDeg}deg)`,
            transitionDuration: `${MOVE_DURATION}ms`,
          }}
        />
      )}

      {/* DRONE */}
      <div
        className="absolute z-20 transition-all ease-in-out"
        style={{
          left: `${dronePos.x}%`,
          top: `${dronePos.y}%`,
          transitionDuration: `${MOVE_DURATION}ms`,
        }}
      >
        <div className="drone-bob relative -translate-x-1/2 -translate-y-1/2">
          {/* rotors */}
          <div className="absolute -left-5 -top-5 h-3 w-3 animate-spin rounded-full border-2 border-dashed border-[#C9A56A]/70" />
          <div className="absolute -right-5 -top-5 h-3 w-3 animate-spin rounded-full border-2 border-dashed border-[#C9A56A]/70" />
          <div className="absolute -left-5 -bottom-5 h-3 w-3 animate-spin rounded-full border-2 border-dashed border-[#C9A56A]/70" />
          <div className="absolute -right-5 -bottom-5 h-3 w-3 animate-spin rounded-full border-2 border-dashed border-[#C9A56A]/70" />
          {/* arms */}
          <div className="absolute left-1/2 top-1/2 h-px w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/20" />
          <div className="absolute left-1/2 top-1/2 h-px w-14 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/20" />
          {/* body */}
          <div className="relative flex h-5 w-8 items-center justify-center rounded-md bg-gradient-to-b from-[#EDE7DA] to-[#B8935B] shadow-[0_0_18px_rgba(201,165,106,0.5)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8FC49E]" />
          </div>
        </div>
      </div>

      {/* ROBOT */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="robot-bob flex flex-col items-center">
          {/* antenna */}
          <div className="relative flex flex-col items-center">
            <span className="mb-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A56A]" />
            <span className="h-3 w-px bg-[#C9A56A]/60" />
          </div>

          {/* head — tilts up/down to track drone height */}
          <div
            className="mt-0.5 flex h-11 w-16 items-center justify-center rounded-xl border border-[#C9A56A]/30 bg-gradient-to-b from-[#2b2318] to-[#14110D] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform ease-in-out"
            style={{
              transform: `rotateX(${headTilt}deg)`,
              transitionDuration: `${MOVE_DURATION}ms`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* visor */}
            <div className="flex h-4 w-11 items-center justify-center gap-2 rounded-md bg-[#0B0A08]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#C9A56A] shadow-[0_0_6px_#C9A56A] transition-transform ease-in-out"
                style={{
                  transform: `translateX(${eyeShift}px)`,
                  transitionDuration: `${MOVE_DURATION}ms`,
                }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#C9A56A] shadow-[0_0_6px_#C9A56A] transition-transform ease-in-out"
                style={{
                  transform: `translateX(${eyeShift}px)`,
                  transitionDuration: `${MOVE_DURATION}ms`,
                }}
              />
            </div>
          </div>

          {/* neck */}
          <span className="h-1.5 w-3 bg-[#14110D]" />

          {/* torso */}
          <div className="relative flex h-24 w-24 items-start justify-center rounded-2xl border border-[#C9A56A]/20 bg-gradient-to-b from-[#1c1710] to-[#0B0A08] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="mt-4 h-8 w-8 rounded-full border border-[#C9A56A]/40 bg-[#0B0A08]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#C9A56A]/80" />
              </div>
            </div>
            {/* shoulders / arms */}
            <div className="absolute -left-3 top-4 h-10 w-3 rounded-full bg-gradient-to-b from-[#2b2318] to-[#14110D]" />
            <div className="absolute -right-3 top-4 h-10 w-3 rounded-full bg-gradient-to-b from-[#2b2318] to-[#14110D]" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drone-bob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
        .drone-bob { animation: drone-bob 2.4s ease-in-out infinite; }

        @keyframes robot-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .robot-bob { animation: robot-bob 3.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default function RoboticsDroneSection() {
  const { ref: badgeRef, visible: badgeVisible } = useReveal(0);
  const { ref: headRef, visible: headVisible } = useReveal(100);
  const { ref: paraRef, visible: paraVisible } = useReveal(200);
  const { ref: featRef, visible: featVisible } = useReveal(300);
  const { ref: ctaRef, visible: ctaVisible } = useReveal(420);
  const { ref: sceneRef, visible: sceneVisible } = useReveal(0);

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0A08] px-6 py-8 sm:px-10 md:px-16 ">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#C9A56A]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#C9A56A]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT — 3D scene */}
        <div
          ref={sceneRef}
          className={`transition-all duration-700 ease-out ${
            sceneVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <RobotDroneScene />
        </div>

        {/* RIGHT — copy */}
        <div>
          <div
            ref={badgeRef}
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A56A]/25 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#C9A56A] transition-all duration-700 ease-out ${
              badgeVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A56A]" />
            AI Robotics & Drone Technology
          </div>

          <h2
            ref={headRef}
            className={`font-serif text-4xl italic leading-[1.15] text-white transition-all duration-700 ease-out sm:text-5xl ${
              headVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            Where robotics
            <br />
            <span className="not-italic font-sans font-normal">meets real intelligence.</span>
          </h2>

          <p
            ref={paraRef}
            className={`mt-6 max-w-md text-[15px] leading-relaxed text-white/50 transition-all duration-700 ease-out ${
              paraVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Our robotics division is building autonomous systems that see,
            track and react in real time — from AI-driven robots to drones
            that navigate on their own. It's early, active R&D, and it's
            core to where AKORA is headed next.
          </p>

          <div
            className={`mt-6 inline-flex items-center gap-2 rounded-full border border-[#C9A56A]/20 bg-[#C9A56A]/[0.06] px-4 py-1.5 text-xs font-medium text-[#C9A56A] transition-all duration-700 ease-out ${
              paraVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            🚧 Currently in active R&D
          </div>

          <div ref={featRef} className="mt-10 space-y-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                style={{ transitionDelay: featVisible ? `${i * 100}ms` : "0ms" }}
                className={`border-l-2 border-[#C9A56A]/30 pl-5 transition-all duration-700 ease-out ${
                  featVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={ctaRef}
            className={`mt-10 transition-all duration-700 ease-out ${
              ctaVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href="/home-page/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0B0A08] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Talk to Our R&D Team
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}