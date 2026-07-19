"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import OrbitBadge from "@/components/ui/OrbitBadge";


const BADGES = [
  { id: "compliance", lines: ["Compliance &", "Mobility Teams"], icon: "/icons/icon1.svg" },
  { id: "immigration", lines: ["Immigration", "Law Firms"], icon: "/icons/icon5.svg" },
  { id: "financial", lines: ["Financial", "Institutions"], icon: "/icons/icon4.svg" },
  { id: "universities", lines: ["Universities & Training", "Institutes"], icon: "/icons/icon3.svg" },
  { id: "hr", lines: ["HR & Recruitment", "Firms"], icon: "/icons/icon2.svg" },
];


const START_ANGLE_DEG = -150;
const ANGLE_STEP_DEG = 360 / BADGES.length; 


const ORBIT_ROTATION_DEG = 130;


const RADIUS_START = 0.78;
const RADIUS_END = 0.62;

const BASE_ANGLES_RAD = BADGES.map(
  (_, i) => ((START_ANGLE_DEG + i * ANGLE_STEP_DEG) * Math.PI) / 180
);

export default function WhoItsFor() {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    
    let cx = 0;
    let cy = 0;

    const measure = () => {
      const { width, height } = ring.getBoundingClientRect();
      cx = width / 2;
      cy = height / 2;
    };

    
    const render = (progress) => {
      const sweep = (ORBIT_ROTATION_DEG * progress * Math.PI) / 180;
      const scale = RADIUS_START + (RADIUS_END - RADIUS_START) * progress;
      const rx = cx * scale;
      const ry = cy * scale;

      for (let i = 0; i < BADGES.length; i++) {
        const el = badgeRefs.current[i];
        if (!el) continue;
        const angle = BASE_ANGLES_RAD[i] + sweep;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isAnimated: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isStatic: "(min-width: 768px) and (prefers-reduced-motion: reduce)",
      },
      (context) => {
        measure();

        
        if (!context.conditions.isAnimated) {
          render(0);
          return;
        }

        let progress = 0;
        render(progress);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            render(progress);
          },
          onUpdate: (self) => {
            progress = self.progress;
            render(progress);
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      aria-labelledby="who-its-for-heading"
      className="relative overflow-hidden bg-background px-4 py-20 md:py-28"
    >
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(248,233,210,0.85)_0%,rgba(248,233,210,0)_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wide text-amber">
            • Who It&apos;s For
          </p>
          <h2
            id="who-its-for-heading"
            className="mt-3 font-outfit text-3xl font-medium text-ink md:text-5xl"
          >
            Built for workflows where trust is non-negotiable.
          </h2>
          <p className="mt-4 text-base text-ink/60 md:text-lg">
            Wherever credentials matter, Lorem handles the verification
          </p>
        </div>

        
        <div
          ref={ringRef}
          className="relative mx-auto mt-16 hidden aspect-[5/4] w-full max-w-[720px] md:block md:max-w-[860px]"
        >
          
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-[32%] border border-white shadow-[0_0_40px_16px_rgba(255,255,255,1.85)]" />

         
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-[32%] border border-white/70 shadow-[0_0_20px_10px_rgba(255,255,255,1.6)]" />

          
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[29%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30%] bg-[radial-gradient(circle_at_50%_42%,#FBE3B4_0%,#F6DFB6_38%,#F8E9D2_70%,#FCF4E6_100%)] shadow-[0_18px_60px_rgba(232,143,0,0.18)]" />

          
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] bg-white shadow-[0_10px_34px_rgba(232,143,0,0.32)] md:h-20 md:w-20">
            <Image
              src="/images/logo.png"
              alt="Lorem"
              width={105}
              height={108}
              className="h-7 w-auto md:h-9"
            />
          </div>

          
          {BADGES.map((badge, i) => (
            <OrbitBadge
              key={badge.id}
              ref={(el) => (badgeRefs.current[i] = el)}
              icon={badge.icon}
              lines={badge.lines}
            />
          ))}
        </div>

       
        <div className="mt-12 flex flex-col items-center gap-8 md:hidden">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[28%] bg-[radial-gradient(circle_at_50%_42%,#FBE3B4_0%,#F8E9D2_70%,#FCF4E6_100%)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-[28%] bg-white shadow-[0_10px_34px_rgba(232,143,0,0.32)]">
              <Image
                src="/images/logo.png"
                alt="Lorem"
                width={105}
                height={108}
                className="h-7 w-auto"
              />
            </div>
          </div>
          <ul className="grid w-full max-w-md grid-cols-1 gap-3">
            {BADGES.map((badge) => (
              <li
                key={badge.id}
                className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-[0_8px_28px_rgba(10,25,47,0.08)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <Image
                    src={badge.icon}
                    alt=""
                    aria-hidden="true"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="text-[20px] font-light">
                  {badge.lines.join(" ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
