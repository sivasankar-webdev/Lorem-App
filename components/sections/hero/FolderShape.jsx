// FolderShape.jsx
"use client";
import React from "react";

export default function FolderShape({ shapeRef, layer = "all" }) {
  const showBack = layer === "all" || layer === "back";
  const showFront = layer === "all" || layer === "front";


  const folderPath = `
    M 30 500
    L 30 150
    Q 50 105 125 95
    L 682 95
    C 720 95 740 105 760 115
    S 810 135 850 135
    L 1260 135
    Q 1325 135 1365 150
    L 1365 500`;

  const innerPath = `
    M 40 500
    L 40 160
    Q 50 105 140 105
    L 675 105
    C 710 105 725 115 745 125
    S 795 145 835 145
    L 1255 145
    Q 1315 145 1355 160
    L 1355 500`;

  return (
    <svg
      ref={shapeRef}
      viewBox="0 0 1365 500"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Back layer gradient - lighter */}
        <linearGradient id="back-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDF6EB" />
          <stop offset="30%" stopColor="#F8EAD5" />
          <stop offset="60%" stopColor="#F8EAD3" />
          <stop offset="100%" stopColor="#F8EAD3" />
        </linearGradient>

        {/* Front layer gradient - warmer gold */}
        <linearGradient id="front-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FBF0DD" />
          <stop offset="35%" stopColor="#E3DDD3" />
          <stop offset="65%" stopColor="#F8EAD3" />
        </linearGradient>

        {/* Inner pocket gradient */}
        <linearGradient id="inner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8EAD5" />
          <stop offset="50%" stopColor="#F0D5B5" />
          <stop offset="100%" stopColor="#E0B890" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="rgba(0,0,0,0.1)" />
        </filter>

        {/* Glow/shine effect */}
        <radialGradient id="shine" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {showBack && (
        <>
          <path
            d={folderPath}
            fill="rgba(0,0,0,0.06)"
            filter="url(#shadow)"
            transform="translate(0, 8)"
          />

          <path d={folderPath} fill="url(#back-gradient)" />

          <path
            d={folderPath}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path d={innerPath} fill="url(#inner-gradient)" opacity="0.5" />
        </>
      )}

      {showFront && (
        <>
          <path
            d={folderPath}
            fill="url(#front-gradient)"
            transform="translate(0, 12)"
          />

          <path
            d={folderPath}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, 12)"
          />

          <path
            d={folderPath}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, 16)"
          />

          <ellipse cx="640" cy="180" rx="420" ry="170" fill="url(#shine)" />

          <path
            d={innerPath}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="6 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, 8)"
          />

          <path
            d={folderPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            transform="translate(0, -2)"
          />
        </>
      )}
    </svg>
  );
}
