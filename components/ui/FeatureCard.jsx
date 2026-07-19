"use client";

import { forwardRef } from "react";

const FeatureCard = forwardRef(function FeatureCard(
  { icon, value, label, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(10,25,47,0.12)] backdrop-blur-sm will-change-transform ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-amber">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block font-outfit text-lg font-semibold text-ink">
          {value}
        </span>
        <span className="block text-xs text-ink/60">{label}</span>
      </span>
    </div>
  );
});

export default FeatureCard;
