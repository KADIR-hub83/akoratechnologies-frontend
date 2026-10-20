
"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useMemo, useState } from "react";

const roles = [
  {
    id: "web-developer",
    title: "Frontend Developer",
    team: "Engineering",
    type: "Full-time",
    mode: "Remote / Hybrid",
    level: "Entry–Mid level",
    number: "01",
    description:
      "Build polished, accessible, responsive digital experiences with attention to every pixel and interaction.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    team: "Engineering",
    type: "Full-time",
    mode: "Remote / Hybrid",
    level: "Mid level",
    number: "02",
    description:
      "Turn ambitious ideas into reliable products, from thoughtful interfaces to scalable backend systems.",
    tags: ["Node.js", "APIs", "Databases"],
  },
  {
    id: "ui-ux",
    title: "UI/UX Designer",
    team: "Design",
    type: "Full-time",
    mode: "Remote / Hybrid",
    level: "Entry–Mid level",
    number: "03",
    description:
      "Shape intuitive journeys, expressive interfaces, and visual systems that make complex things feel simple.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: "business-growth",
    title: "Business Development Associate",
    team: "Growth",
    type: "Full-time",
    mode: "Hybrid",
    level: "Entry level",
    number: "04",
    description:
      "Build relationships, understand business challenges, and help the right clients discover better digital solutions.",
    tags: ["Communication", "Research", "Strategy"],
  },
  {
    id: "content",
    title: "Creative Content Strategist",
    team: "Growth",
    type: "Contract",
    mode: "Remote",
    level: "Entry–Mid level",
    number: "05",
    description:
      "Turn ideas into clear stories, compelling campaigns, and useful content across digital touchpoints.",
    tags: ["Content", "Brand", "Social Media"],
  },
];

const values = [
  {
    number: "01",
    title: "Think with curiosity",
    description:
      "Ask better questions, challenge assumptions, and stay open to a smarter way of doing things.",
  },
  {
    number: "02",
    title: "Care about the craft",
    description:
      "Sweat the details. Whether it is code, design, or communication, quality is everyone's responsibility.",
  },
  {
    number: "03",
    title: "Own the outcome",
    description:
      "Take initiative, communicate clearly, and follow through on the work you commit to.",
  },
];

const benefits = [
  {
    symbol: "↗",
    title: "Meaningful work",
    description:
      "Solve real business problems through thoughtful technology and design.",
  },
  {
    symbol: "✳",
    title: "Room to grow",
    description:
      "Keep learning, experiment with ideas, and build skills through hands-on work.",
  },
  {
    symbol: "◎",
    title: "Work with purpose",
    description:
      "Connect your contribution to the outcomes our clients and their customers care about.",
  },
  {
    symbol: "◇",
    title: "A collaborative team",
    description:
      "Share ideas, exchange feedback, and make better decisions together.",
  },
];

const filters = [
  "All roles",
  "Engineering",
  "Design",
  "Growth",
];

export default function CareersClient() {
  const [activeFilter, setActiveFilter] = useState("All roles");
  const [search, setSearch] = useState("");

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesFilter =
        activeFilter === "All roles" || role.team === activeFilter;

      const matchesSearch =
        !query ||
        role.title.toLowerCase().includes(query) ||
        role.team.toLowerCase().includes(query) ||
        role.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F0] text-[#171717]">
        <Navbar/>
      {/* HERO */}
      <section className="relative px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-16 lg:pb-28 lg:pt-28">
        <div className="pointer-events-none absolute -right-32 top-8 h-96 w-96 rounded-full bg-[#D8C39A]/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-white/90 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B28A45]" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#826632]">
              Careers at AKORA
            </span>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <h1 className="max-w-4xl text-5xl font-medium leading-[0.99] tracking-[-0.065em] sm:text-7xl lg:text-[92px]">
                Your next chapter.
                <br />
                <span className="font-serif italic text-[#A68142]">
                  Your kind of
                </span>
                <br />
                impact.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#66645E] sm:text-lg">
                Great work starts with people who care. Bring your curiosity,
                your perspective, and your ambition. Let&apos;s create digital
                experiences that move businesses forward.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#open-roles"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#A68142]"
                >
                  Explore opportunities
                  <span className="transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <a
                  href="#our-culture"
                  className="inline-flex items-center gap-2 rounded-full border border-[#DDD7CA] px-7 py-4 text-sm font-semibold transition hover:border-[#A68142]"
                >
                  Meet our mindset
                  <span>↓</span>
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:pb-3">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#E5DFD3] bg-[#EDE7DA] p-6 sm:p-8">
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#C7AD7B]/50" />
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#C7AD7B]/60" />

                <div className="relative flex min-h-[280px] flex-col justify-between sm:min-h-[320px]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-[#C9B99A] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
                      The AKORA mindset
                    </span>
                    <span className="text-2xl text-[#A68142]">✳</span>
                  </div>

                  <div className="py-10">
                    <p className="font-serif text-4xl italic leading-tight tracking-tight sm:text-5xl">
                      Make ideas
                      <br />
                      <span className="text-[#A68142]">matter.</span>
                    </p>
                    <p className="mt-5 max-w-xs text-sm leading-6 text-[#686259]">
                      Technology is what we build.
                      <br />
                      Impact is why we build it.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#D5C8B0] pt-4">
                    <span className="text-xs text-[#6D675D]">
                      Curiosity. Craft. Ownership.
                    </span>
                    <span className="text-lg">↗</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 rounded-2xl border border-[#E7E0D4] bg-white px-5 py-4 shadow-[0_16px_45px_-25px_rgba(0,0,0,0.25)] sm:-left-6">
                <p className="text-xs text-[#77736B]">Built by people</p>
                <p className="mt-1 text-sm font-semibold">
                  Who care about the details.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 border-t border-[#E2DCCE] pt-7 sm:grid-cols-3 lg:mt-28">
            <div className="py-3 pr-4">
              <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                Build
              </p>
              <p className="mt-2 text-xs text-[#77736B] sm:text-sm">
                With intention
              </p>
            </div>
            <div className="border-l border-[#E2DCCE] px-5 py-3 sm:px-8">
              <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                Learn
              </p>
              <p className="mt-2 text-xs text-[#77736B] sm:text-sm">
                Every single day
              </p>
            </div>
            <div className="col-span-2 mt-4 border-t border-[#E2DCCE] py-5 sm:col-span-1 sm:mt-0 sm:border-l sm:border-t-0 sm:px-8 sm:py-3">
              <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                Create
              </p>
              <p className="mt-2 text-xs text-[#77736B] sm:text-sm">
                Work that matters
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section
        id="our-culture"
        className="bg-[#171717] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D2B57D]">
                How we think
              </p>
              <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-6xl">
                Good work.
                <br />
                <span className="font-serif italic text-[#D2B57D]">
                  Good people.
                </span>
                <br />
                Better outcomes.
              </h2>
              <p className="mt-7 max-w-md text-sm leading-7 text-white/60 sm:text-base">
                We believe the best digital solutions happen when people bring
                different strengths together, take responsibility, and stay
                focused on the problem worth solving.
              </p>
            </div>

            <div className="divide-y divide-white/15 border-y border-white/15">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="grid gap-4 py-7 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-9"
                >
                  <span className="font-mono text-xs text-[#D2B57D]">
                    / {value.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium sm:text-2xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92713B]">
                The experience
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-[-0.05em] sm:text-6xl">
                More than a job.
                <br />
                <span className="font-serif italic text-[#A68142]">
                  Space to become.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#716D65]">
              A good workplace gives you room to contribute, improve your craft,
              and take on challenges that stretch your thinking.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className={`group rounded-[1.5rem] border border-[#E6E0D5] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#BDA16C] hover:bg-white sm:p-7 ${
                  index === 1 ? "bg-[#EFE9DC]" : "bg-transparent"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8DFC9] text-2xl text-[#826632] transition group-hover:bg-[#D8C39A]">
                  {benefit.symbol}
                </div>
                <h3 className="mt-8 text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#77736B]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section
        id="open-roles"
        className="border-y border-[#E5DFD3] bg-[#F0EDE5] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#92713B]">
                Find your place
              </p>
              <h2 className="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">
                Opportunities
                <br />
                <span className="font-serif italic text-[#A68142]">
                  worth exploring.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#716D65]">
              Explore example role categories below. Please confirm current
              vacancies with AKORA Technologies before applying.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:mt-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                      isActive
                        ? "border-[#171717] bg-[#171717] text-white"
                        : "border-[#D9D2C5] bg-transparent text-[#615D55] hover:border-[#A68142]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <label className="flex min-h-12 items-center gap-3 rounded-full border border-[#D9D2C5] bg-[#F8F6F0] px-5 sm:min-w-[270px]">
              <span className="text-lg text-[#8A857A]" aria-hidden="true">
                ⌕
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search roles or skills"
                aria-label="Search roles or skills"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#928D83]"
              />
            </label>
          </div>

          <div className="mt-7 border-t border-[#DCD5C8]">
            {filteredRoles.map((role) => (
              <article
                key={role.id}
                className="group grid gap-5 border-b border-[#DCD5C8] py-7 transition sm:py-8 lg:grid-cols-[65px_1fr_auto] lg:items-center lg:gap-7"
              >
                <span className="font-mono text-xs text-[#9A8A6C]">
                  / {role.number}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-medium tracking-tight transition group-hover:text-[#8A6A32] sm:text-2xl">
                      {role.title}
                    </h3>
                    <span className="rounded-full border border-[#D5C9B2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#80683C]">
                      Example role
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#77736B]">
                    {role.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#E8E3D9] px-3 py-1.5 text-[11px] text-[#615D55]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#77736B]">
                    <span>{role.team}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                    <span>·</span>
                    <span>{role.mode}</span>
                    <span>·</span>
                    <span>{role.level}</span>
                  </div>
                </div>

                <Link
                  href="/home-page/contact"
                  className="inline-flex w-fit items-center gap-3 rounded-full border border-[#CFC6B6] px-5 py-3 text-sm font-semibold transition hover:border-[#171717] hover:bg-[#171717] hover:text-white"
                >
                  Express interest
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}

            {filteredRoles.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg font-medium">No matching roles found.</p>
                <p className="mt-2 text-sm text-[#77736B]">
                  Try a different search term or select another team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All roles");
                  }}
                  className="mt-5 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-xs leading-6 text-[#77736B]">
            Note: These are illustrative role examples, not verified live job
            listings. Confirm availability before publishing this page.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#DCD0B7] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#BBA77F]/70 sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-[#BBA77F]/70 sm:h-72 sm:w-72" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#80683C]">
                Your story could start here
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-6xl">
                Don&apos;t see your role?
                <br />
                <span className="font-serif italic text-[#80683C]">
                  Start a conversation.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#61594B] sm:text-base">
                Great people do not always fit neatly into a job description.
                Tell us what you do best and how you would like to make a
                difference.
              </p>
            </div>

            <Link
              href="/home-page/contact"
              className="group inline-flex w-fit items-center gap-5 rounded-full bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#38332B]"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5DFD3] px-5 py-7 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#77736B] sm:flex-row sm:items-center sm:justify-between">
          <p>AKORA Technologies</p>
          <p>Thoughtful technology. Meaningful work.</p>
          <Link
            href="/"
            className="font-medium text-[#171717] transition hover:text-[#A68142]"
          >
            Back to home ↑
          </Link>
        </div>
      </footer>
    </main>
  );
}
