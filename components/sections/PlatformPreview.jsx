"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import PreviewCard from "./platform-preview/PreviewCard";

const PLATFORM_CARDS = [
  {
    id: "create-cases",
    title: "Create verification cases instantly",
    description:
      "Add the applicant and issuer. Hit send. Lorem notifies everyone and tracks every step.",
  },
  {
    id: "track-status",
    title: "Track real-time verification status",
    description: null,
  },
  {
    id: "approval-activity",
    title: "View applicant approval activity",
    description:
      "Know the moment an applicant consents. Every action is logged, timestamped, and auditable.",
  },
  {
    id: "issuer-verified-docs",
    title: "Access issuer-verified documents",
    description:
      "Signed at source. Delivered to your dashboard. Ready to reference whenever you need it.",
  },
  {
    id: "card-five-placeholder",
    title: "Manage team access and permissions",
    description:
      "Control who can request, approve, or view credentials across your organization.",
  },
];

const PEEK_OFFSET_PX = 120; 
const PIN_DISTANCE_PER_CARD_VH = 90; 

export default function PlatformPreview() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop Stack Animation Flow
      mm.add("(min-width: 768px)", () => {
        
        gsap.set(cards, { clearProps: "transform,top,position" });
        gsap.set(cards[0], { y: 0, scale: 1, opacity: 1 });
        gsap.set(cards.slice(1), { y: "100%", opacity: 0.85, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${(cards.length - 1) * PIN_DISTANCE_PER_CARD_VH}%`,
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return; 

          const position = index - 1; 

          tl.to(
            cards.slice(0, index),
            {
              y: `-=${PEEK_OFFSET_PX}`,
              duration: 1,
              ease: "power1.inOut",
            },
            position
          );

          tl.fromTo(
            card,
            { y: "100%", opacity: 0.85 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
            position
          );
        });

        return () => tl.scrollTrigger?.kill();
      });

      // Mobile View Stack Animation Flow
      mm.add("(max-width: 767px)", () => {
        
        gsap.set(cards, { position: "sticky", clearProps: "y,opacity" });

        cards.forEach((card, index) => {
          
          const calculatedTop = 80 + index * 44;
          gsap.set(card, { top: `${calculatedTop}px` });

          gsap.fromTo(
            card,
            { scale: 0.96, opacity: 0.85 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        return () => ScrollTrigger.getAll().forEach((st) => st.kill());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="platform"
      ref={sectionRef}
      aria-labelledby="platform-preview-heading"
      className="bg-background py-24 md:py-32"
    >
      <div className="mx-auto w-[calc(90%-1rem)] md:w-[calc(85%-5rem)] max-w-[1320px]">
        <p className="flex items-center gap-2 text-sm font-medium text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-600" aria-hidden="true" />
          Platform Preview
        </p>

        <div className="mt-4 flex flex-col gap-7 md:flex-row md:items-end md:justify-around">
          <h2
            id="platform-preview-heading"
            className="max-w-2xl text-3xl font-medium leading-tight text-ink md:text-6xl"
          >
            Verify documents from a single dashboard.
          </h2>
          <p className="max-w-sm text-lg text-ink/70 md:text-base">
            One dashboard to request, track, and receive verified
            credentials, from anywhere in the world.
          </p>
        </div>

       
        <div
          ref={stageRef}
          className="relative mt-16 flex flex-col gap-8 md:block md:h-[480px]"
        >
          {PLATFORM_CARDS.map((card, index) => (
            <PreviewCard
              key={card.id}
              cardRef={(el) => (cardRefs.current[index] = el)}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}