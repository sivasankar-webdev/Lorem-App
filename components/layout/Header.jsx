"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "solution", label: "Solution", href: "#solution" },
  { id: "process", label: "Process", href: "#process" },
  { id: "industries", label: "Industries", href: "#industries" },
  { id: "platform", label: "Platform", href: "#platform" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);
const SCROLL_SHADOW_THRESHOLD = 80; 

export default function Header() {
  const pillRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const prefersReducedMotion = useReducedMotion();

  
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return undefined;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const scrolled = window.scrollY > SCROLL_SHADOW_THRESHOLD;
        gsap.to(pill, {
          boxShadow: scrolled
            ? "0 8px 30px rgba(10, 25, 47, 0.12)"
            : "0 1px 2px rgba(10, 25, 47, 0.04)",
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    return () => trigger.kill();
  }, [prefersReducedMotion]);

  
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-10 top-0 z-50">
      <div
        ref={pillRef}
        className="mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-[1320px] items-center justify-between rounded-full bg-white/95 px-4 py-3 backdrop-blur-sm md:mt-6 md:px-6 lg:px-8"
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
        >
          <Image
            src="/images/logo.png"
            alt="Lorem home"
            width={40}
            height={41}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 ${
                      isActive
                        ? "text-amber-600"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign in — desktop */}
        <a
          href="#sign-in"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#002966] to-[#0A192F] px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:inline-flex"
        >
          Sign In
          <ArrowIcon />
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:hidden"
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-30 bg-ink/20 md:hidden"
              aria-hidden="true"
            />
            <MobileMenu
              id="mobile-nav-menu"
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              links={NAV_LINKS}
              activeId={activeId}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <motion.path
        d="M3 5H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M3 10H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.path
        d="M3 15H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}
