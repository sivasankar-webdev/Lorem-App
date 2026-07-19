"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";


export default function MobileMenu({ id, isOpen, onClose, links, activeId }) {
  const containerRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleTabKey(event) {
      if (event.key !== "Tab" || !containerRef.current) return;

      const focusable = containerRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  return (
    <motion.div
      id={id}
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-x-4 top-[5.5rem] z-40 rounded-3xl bg-white p-6 shadow-2xl md:hidden"
    >
      <ul className="flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={link.id}>
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={onClose}
              aria-current={activeId === link.id ? "page" : undefined}
              className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                activeId === link.id
                  ? "bg-amber-50 text-amber-600"
                  : "text-ink/70 hover:bg-black/[0.03] hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#sign-in"
        onClick={onClose}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-navy px-5 py-3 text-base font-medium text-white transition-colors hover:bg-deepBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        Sign In
        <ArrowIcon />
      </a>
    </motion.div>
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
