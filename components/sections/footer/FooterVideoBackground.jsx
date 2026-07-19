

"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";


export default function FooterVideoBackground() {
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [mountTriggerRef, shouldMount] = useInView({
    rootMargin: "200px 0px",
    once: true,
  });
  const [visibilityTriggerRef, isCurrentlyVisible] = useInView({
    rootMargin: "0px",
    once: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCurrentlyVisible) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isCurrentlyVisible, shouldMount]);

  
  const setRefs = (node) => {
    mountTriggerRef.current = node;
    visibilityTriggerRef.current = node;
  };

  return (
    <div ref={setRefs} className="absolute inset-0 z-0 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-black" />

      {shouldMount && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-100 mix-blend-screen"
          src="/vid/footer_video.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ) : null}

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-navy/50" />
    </div>
  );
}
