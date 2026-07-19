"use client";

import Image from "next/image";
import { forwardRef } from "react";


const OrbitBadge = forwardRef(function OrbitBadge({ icon, lines, style }, ref) {
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 flex border-2 border-white items-center gap-3 rounded-full bg-[] px-5 py-2.5 shadow-[0_8px_28px_rgba(10,25,47,0.08)] will-change-transform"
      style={style}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
        <Image
          src={icon}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="text-[17px] leading-tight text-ink">
        {lines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
    </div>
  );
});

export default OrbitBadge;
