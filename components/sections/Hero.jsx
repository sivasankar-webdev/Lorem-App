"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import StatCard, { AvatarStack, VerifiedIcon } from "./hero/StatCard";
import FolderShape from "./hero/FolderShape";
import ProblemText from "./hero/ProblemText";

const FOLDER_FADE_MASK = {
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
};


export default function Hero() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const phoneRef = useRef(null);
  const statLeftRef = useRef(null);
  const statRightRef = useRef(null);
  const problemTextRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.set([folderBackRef.current, folderFrontRef.current], { opacity: 1 });

    if (prefersReducedMotion) {
      gsap.set(phoneRef.current, { y: 0, opacity: 1 });
      gsap.set([statLeftRef.current, statRightRef.current], { y: 0 });
      gsap.set(problemTextRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Tablet and Desktop Layout Animation
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 40%",
            end: "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          phoneRef.current,
          { y: "8vh", opacity: 1 },
          { y: "-70vh", opacity: 1, ease: "power1.out", duration: 1 }
        )
          .fromTo(
            statLeftRef.current,
            { y: "15vh" },
            { y: "-8vh", ease: "power1.out", duration: 0.6 },
            0.2
          )
          .fromTo(
            statRightRef.current,
            { y: "20vh" },
            { y: "0vh", ease: "power1.out", duration: 0.6 },
            0.3
          );

        return () => tl.scrollTrigger?.kill();
      });

      // Mobile View Layout Animation Fix
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 60%", 
            end: "+=100%",
            scrub: 1,
            pin: true,       
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          phoneRef.current,
          { y: "1vh", opacity: 1 },
          { y: "-40vh", opacity: 1, ease: "power1.out", duration: 1 }
        )
          .fromTo(
            statLeftRef.current,
            { y: "18vh" },
            { y: "-4vh", ease: "power1.out", duration: 0.6 },
            0.1
          )
          .fromTo(
            statRightRef.current,
            { y: "22vh" },
            { y: "4vh", ease: "power1.out", duration: 0.6 },
            0.2
          );

        return () => tl.scrollTrigger?.kill();
      });

      // Unified baseline reveal trigger for the overlay problem text statement
      gsap.fromTo(
        problemTextRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: problemTextRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero"
      className="relative w-full bg-background"
    >
      {/* Top half: normal scrolling content stream */}
      <div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1320px] flex-col items-center justify-center pb-12 pt-28 text-center md:pt-36">
        <h1 className="text-4xl font-medium leading-[1.05] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
          Verification That
          <br />
          <span className="bg-gradient-to-r from-amber-600 from-0% via-amber-100 via-50% to-amber-600 to-100% bg-clip-text text-transparent">
            Starts At The Source.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-serif text-base text-ink/70 md:text-lg">
          Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
          <br className="hidden sm:block" /> lorem ipsum Lorem ipsum lorem ipsum
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#book-a-demo"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:text-base"
          >
            Book a Demo
            <PlayIcon />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 md:text-base"
          >
            See how it works
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>

     
      <div
        ref={triggerRef}
        className="relative flex w-full min-h-[65vh] md:min-h-[100vh] items-end justify-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[55%] w-[50%] md:h-[60%] md:w-[45%]"
        >
          <Image
            src="/images/hero-gradient.png"
            alt=""
            fill
            sizes="(min-width:768px) 45vw, 60vw"
            className="object-contain object-right-top"
          />
        </div>

        
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full"
          style={FOLDER_FADE_MASK}
        >
          <FolderShape shapeRef={folderBackRef} layer="back" />
        </div>

        <div className="relative z-10 flex h-full w-full max-w-[1320px] flex-col items-center justify-end gap-8 px-6 pb-8 md:gap-10 md:pb-10">
          {/* Phone + stat cards cluster */}
          <div className="relative z-10 mb-[-2px] w-fit">
           <div
                ref={statLeftRef}
                className="absolute top-[-30%] sm:top-[1%] right-full z-20 translate-x-4 sm:translate-x-10 md:translate-x-12 lg:translate-x-14 origin-top-right scale-50 sm:scale-100"
              >
              <StatCard
                icon={<AvatarStack />}
                value="250+"
                label="trusted organizations"
              />
            </div>

            <div
              ref={phoneRef}
              className="relative z-10 w-[180px] sm:w-[320px] md:w-[360px] lg:w-[440px] xl:w-[480px]"
            >
              <Image
                src="/images/iphone-mockup.png"
                alt="Verification app showing a signed Experience Certificate credential"
                width={1850}
                height={2454}
                priority
                className="h-auto w-full"
              />
            </div>

            <div
              ref={statRightRef}
              className="absolute top-[-30%] sm:top-[15%] left-full z-20 -translate-x-4 sm:-translate-x-10 md:-translate-x-12 lg:-translate-x-14 scale-75 sm:scale-100"
            >
              <StatCard
                icon={<VerifiedIcon />}
                value="10,000+"
                label="credentials verified securely"
              />
            </div>
          </div>
        </div>

        
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full"
          style={FOLDER_FADE_MASK}
        >
          <FolderShape shapeRef={folderFrontRef} layer="front" />
        </div>

       
        <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-6 pb-[14%] sm:pb-[12%] md:pb-[10%]">
          <div className="w-full max-w-[1320px] text-justify md:pl-10 lg:pl-14">
            <ProblemText textRef={problemTextRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 4.5L9.5 7L6 9.5V4.5Z" fill="currentColor" />
    </svg>
  );
}

function ArrowUpRightIcon() {
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