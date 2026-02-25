"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Fade-in on scroll ─────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────── */
const IconPhone = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.26.2 2.47.57 3.58.11.35.03.74-.23 1.01L6.6 10.8z"/>
  </svg>
);
const IconPin = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
  </svg>
);
const IconMenu = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10"/>
  </svg>
);
const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);
const IconCalendar = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>
);
const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

/* ─── Logo ───────────────────────────────────────────────────────────── */
function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const t1 = size === "sm" ? "text-[8px]" : size === "lg" ? "text-sm" : "text-[10px]";
  const t2 = size === "sm" ? "text-[6px]" : size === "lg" ? "text-xs" : "text-[8px]";
  return (
    <div className={`${dim} bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-0 flex-shrink-0`}>
      <span className={`text-yellow-400 ${t1} font-black leading-none tracking-wider`}>JOM</span>
      <span className={`text-white ${t2} font-semibold leading-none tracking-widest`}>AUTO</span>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Startseite", "Über uns", "Leistungen", "Kontakt"];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400 leading-none">Kfz-Werkstatt</p>
              <p className="text-sm font-bold text-gray-900 leading-tight">JOM Auto</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  i === 1
                    ? "bg-yellow-400 text-gray-900 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search — desktop */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48 lg:w-60">
              <IconSearch />
              <span className="text-gray-400 text-sm">Was suchen Sie?</span>
            </div>
            {/* Location */}
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <IconPin />
            </button>
            {/* Language */}
            <div className="flex items-center border border-gray-200 rounded-full px-2.5 py-1 gap-1 cursor-pointer hover:border-gray-400 transition-colors">
              <span className="text-sm">🇩🇪</span>
              <span className="text-xs font-bold text-gray-700">DE</span>
            </div>
            {/* Hamburger — mobile */}
            <button
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <IconMenu />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <IconSearch />
            <span className="text-gray-400 text-sm">Was suchen Sie?</span>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-2 pb-4">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  i === 1
                    ? "bg-yellow-400 text-gray-900 font-bold my-1"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${i * 14.28}%` }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <span className="inline-block bg-yellow-400/20 text-yellow-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Über uns
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                Qualität, der<br />
                <span className="text-yellow-400">Sie vertrauen</span><br />
                können.
              </h1>
              <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Seit unserer Gründung stehen wir für{" "}
                <strong className="text-white">Professionalität, Qualität</strong> und{" "}
                <strong className="text-white">Vertrauen</strong>. Unser erfahrenes Team aus qualifizierten
                Fachkräften arbeitet täglich daran, alle Aufträge schnell, präzise und termingerecht auszuführen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                  <IconCalendar />
                  Termin vereinbaren
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-6 py-3 rounded-2xl hover:bg-white/20 transition-colors backdrop-blur">
                  <IconPhone />
                  Jetzt anrufen
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Team illustration */}
          <FadeIn delay={150} className="flex-shrink-0">
            <div className="relative flex items-end justify-center gap-3 px-4">
              {[
                { h: 180, offset: 10, shade: "from-blue-700 to-blue-800" },
                { h: 210, offset: 0,  shade: "from-blue-600 to-blue-700" },
                { h: 180, offset: 10, shade: "from-blue-700 to-blue-800" },
              ].map((p, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-b ${p.shade} rounded-t-3xl flex flex-col items-center pt-4 shadow-xl`}
                  style={{ width: 90, height: p.h, marginBottom: p.offset }}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-200/90 mb-2 shadow" />
                  <div className="bg-blue-500/60 backdrop-blur text-white text-[8px] font-bold px-2 py-1 rounded-lg text-center leading-tight">
                    JOM AUTO<br />Team
                  </div>
                  {/* Wrench icon for middle */}
                  {i === 1 && (
                    <div className="mt-auto mb-6 text-white/30">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
                    </div>
                  )}
                </div>
              ))}
              {/* Floating badge */}
              <div className="absolute -top-4 -right-2 bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg rotate-3">
                ✓ Zertifiziert
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Contact buttons floating right */}
      <div className="absolute right-4 bottom-6 flex flex-col gap-2 lg:hidden">
        {[<IconPhone key="p"/>, <IconPin key="l"/>].map((icon, i) => (
          <button key={i} className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl text-gray-900 hover:bg-yellow-300 transition-colors active:scale-95">
            {icon}
          </button>
        ))}
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

/* ─── Stats strip ────────────────────────────────────────────────────── */
function Stats() {
  const items = [
    { value: "10+", label: "Jahre Erfahrung" },
    { value: "4.9★", label: "Kundenbewertung" },
    { value: "5000+", label: "Fahrzeuge gewartet" },
    { value: "100%", label: "Zufriedenheitsgarantie" },
  ];
  return (
    <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((s, i) => (
          <FadeIn key={s.label} delay={i * 60} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{s.value}</p>
            <p className="text-xs sm:text-sm text-gray-500">{s.label}</p>
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  );
}

/* ─── Feature card ───────────────────────────────────────────────────── */
function FeatureCard({
  dot, title, illustration, list, description, reverse = false, delay = 0,
}: {
  dot: string; title: string; illustration: React.ReactNode;
  list?: string[]; description: string; reverse?: boolean; delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Illustration half */}
        <div className="lg:w-1/2 xl:w-5/12 flex-shrink-0">
          {illustration}
        </div>
        {/* Content half */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h2>
          </div>
          {list && (
            <ul className="space-y-2 mb-5">
              {list.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                  <IconCheck />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">{description}</p>
          <button className="self-start inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
            Mehr erfahren <IconArrow />
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Wartebereich illustration ──────────────────────────────────────── */
function WaitingRoomIllustration() {
  return (
    <div className="relative bg-gradient-to-br from-stone-100 to-amber-50 overflow-hidden" style={{ minHeight: 260 }}>
      <div className="absolute inset-0 bg-stone-200/30" />
      {/* Clock */}
      <div className="absolute top-5 right-10 w-14 h-14 rounded-full bg-white border-2 border-stone-300 shadow-md flex items-center justify-center">
        <div className="relative w-9 h-9">
          <div className="absolute w-0.5 h-4 bg-gray-800 left-1/2 bottom-1/2 origin-bottom -translate-x-px" style={{ transform: "rotate(-25deg) translateX(-50%)" }} />
          <div className="absolute w-0.5 h-3.5 bg-gray-500 left-1/2 bottom-1/2 origin-bottom -translate-x-px" style={{ transform: "rotate(85deg) translateX(-50%)" }} />
          <div className="absolute inset-0 rounded-full border border-gray-200" />
        </div>
      </div>
      {/* JOM logo */}
      <div className="absolute top-5 right-28 bg-white rounded-xl px-2.5 py-1.5 shadow text-center">
        <p className="text-[9px] font-black text-gray-900 leading-none">JOM</p>
        <p className="text-[8px] font-bold text-yellow-500 leading-none">AUTO</p>
      </div>
      {/* TV */}
      <div className="absolute top-6 left-8 w-24 h-16 bg-gray-900 rounded-xl shadow-lg flex items-center justify-center">
        <div className="w-20 h-12 bg-sky-900/70 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-sky-300/50" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
        </div>
      </div>
      {/* WiFi */}
      <div className="absolute top-6 left-36 opacity-40">
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
      </div>
      {/* Long sofa */}
      <div className="absolute bottom-8 left-6" style={{ width: 160 }}>
        <div className="h-10 bg-stone-400 rounded-t-2xl relative shadow-md">
          <div className="absolute -left-3 top-0 w-5 h-12 bg-stone-500 rounded-l-2xl" />
          <div className="absolute -right-3 top-0 w-5 h-12 bg-stone-500 rounded-r-2xl" />
        </div>
        <div className="h-6 bg-stone-300 rounded-b-2xl" />
      </div>
      {/* Corner sofa */}
      <div className="absolute bottom-8 right-6" style={{ width: 90 }}>
        <div className="h-10 bg-stone-400 rounded-t-2xl relative shadow-md">
          <div className="absolute -right-3 top-0 w-5 h-12 bg-stone-500 rounded-r-2xl" />
        </div>
        <div className="h-6 bg-stone-300 rounded-b-2xl" />
      </div>
      {/* Coffee table */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-800/60 rounded-xl shadow" />
      {/* Coffee cup */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-sm shadow-sm border border-gray-200 flex items-center justify-center">
        <span className="text-[8px]">☕</span>
      </div>
    </div>
  );
}

/* ─── Driver illustration ────────────────────────────────────────────── */
function DriverIllustration() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-950" style={{ minHeight: 260 }}>
      {/* Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800 rounded-t-[3rem]" />
      <div className="absolute bottom-12 left-0 right-0 h-10 bg-gray-700/60 rounded-t-3xl" />
      {/* Steering wheel */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-[5px] border-gray-400/50 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border-2 border-gray-500/30" />
        <div className="absolute top-1/2 left-2 right-2 h-px bg-gray-400/40" />
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gray-400/40" />
        <div className="w-6 h-6 rounded-full bg-gray-600/50 border border-gray-400/30" />
      </div>
      {/* Driver */}
      <div className="absolute" style={{ top: 28, left: "50%", transform: "translateX(-50%)" }}>
        <div className="w-20 h-20 rounded-full bg-gray-500/70 mx-auto shadow-xl" />
        <div className="w-24 h-14 bg-gray-600/60 rounded-t-full -mt-3 mx-auto" />
        <div className="absolute -right-8 top-12 w-7 h-5 bg-white/60 rounded-full" />
        <div className="absolute -left-8 top-12 w-7 h-5 bg-white/60 rounded-full" />
      </div>
      {/* Badge */}
      <div className="absolute bottom-4 right-5 bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
        Hol- &amp; Bringservice
      </div>
    </div>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-yellow-400 rounded-3xl px-8 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-xl shadow-yellow-400/20">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-800 mb-1">Unser Versprechen</p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            JOM Service – Qualität,<br />
            <span className="text-gray-700">auf die Sie sich verlassen können.</span>
          </h3>
        </div>
        <div className="flex flex-col sm:flex-col gap-3 flex-shrink-0">
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-2xl hover:bg-gray-700 transition-colors whitespace-nowrap">
            <IconCalendar />
            Termin vereinbaren
          </button>
          <button className="inline-flex items-center gap-2 bg-white/60 text-gray-900 font-bold px-6 py-3 rounded-2xl hover:bg-white transition-colors whitespace-nowrap backdrop-blur">
            <IconPhone />
            Jetzt anrufen
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <p className="text-sm font-bold text-gray-900">JOM Auto</p>
              <p className="text-xs text-gray-400">Kfz-Werkstatt · Ihr Vertrauen ist unser Antrieb</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            {["Impressum", "Datenschutz", "AGB"].map((l) => (
              <a key={l} href="#" className="hover:text-gray-700 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />

      <main className="pt-12">
        <Stats />

        {/* Section title */}
        <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Was uns auszeichnet</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Wir bieten nicht nur exzellente Werkstatt-Leistungen – bei uns steht Ihr Komfort an erster Stelle.
            </p>
            <div className="w-12 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
        </FadeIn>

        <FeatureCard
          dot="yellow"
          title="Komfortabler Wartebereich"
          illustration={<WaitingRoomIllustration />}
          list={[
            "Gemütliche, weiche Sofas",
            "Fernseher zur Unterhaltung",
            "Kostenloses WLAN",
            "Kaffeeautomat",
          ]}
          description="Hier können Sie entspannt warten, während wir uns um Ihr Fahrzeug kümmern. Unser Wartebereich ist darauf ausgelegt, Ihren Aufenthalt so angenehm wie möglich zu gestalten."
          delay={80}
        />

        <FeatureCard
          dot="yellow"
          title="Komfortabler Lieferservice"
          illustration={<DriverIllustration />}
          description="Für Kunden, die keine Zeit haben zu warten, bieten wir zusätzlich einen bequemen Hol- und Bringservice an. Auf Wunsch holen wir Ihr Auto ab und bringen es nach der Fertigstellung wieder zu Ihnen nach Hause."
          reverse
          delay={100}
        />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
