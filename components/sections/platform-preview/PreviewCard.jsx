"use client";

import Image from "next/image";

export default function PreviewCard({ cardRef, title, description, index }) {
  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:absolute inset-x-0 top-0 flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl md:flex-row md:gap-12 md:p-10"
      style={{ 
        zIndex: index + 1,
        marginTop: index > 0 ? `${index * 8}px` : "0px" 
      }}
    >
      <div className="shrink-0 md:w-[30%]">
        <h3 className="text-xl font-medium leading-snug text-ink md:text-2xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-3 font-serif text-sm italic leading-relaxed text-ink/70 md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="relative h-[250px] sm:h-[320px] md:h-auto min-h-[220px] sm:min-h-[280px] md:min-h-[390px] flex-1 overflow-hidden rounded-2xl border border-black/5">
        <Image
          src="/dashboard-preview.png"
          alt="Verification platform dashboard"
          fill
          sizes="(min-width: 768px) 60vw, 90vw"
          className="object-cover object-left-top"
          priority={index === 0}
        />
      </div>
    </div>
  );
}