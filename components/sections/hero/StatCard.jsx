"use client";

export default function StatCard({
  icon,
  value,
  label,
  className = "",
}) {
  return (
    <div
      className={`
        flex items-center gap-5
        rounded-[28px]
        border border-white/30
        bg-white/15
        px-6 py-5
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(255,255,255,0.18),0_12px_40px_rgba(0,0,0,0.08)]
        before:absolute
        before:inset-0
        before:rounded-[28px]
        before:bg-gradient-to-br
        before:from-white/35
        before:to-white/5
        before:pointer-events-none
        relative
        overflow-hidden

          w-[170px]
          sm:w-[210px]
          md:w-[240px]
          lg:w-[270px]

          p-3
          sm:p-4
          md:p-5
        ${className}
      `}
    >
      <div className="relative z-10">
        {icon}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-semibold text-gray-900 leading-none">
          {value}
        </h3>

        <p className="mt-2 text-sm leading-5 text-gray-700">
          {label}
        </p>
      </div>
    </div>
  );
}

export function AvatarStack() {
   const users = [
    "/avatar/avatar1.png",
    "/avatar/avatar2.png",
    "/avatar/avatar3.png",
  ];

  return (
    <div
      className="flex flex-col -space-y-2"
      aria-hidden="true"
    >
      {users.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
         className="
                h-8 w-8
                sm:h-5 sm:w-5
                md:h-7 md:w-7
                rounded-full
                border-2 border-white
              "
        />
      ))}
    </div>
  );
}


export function VerifiedIcon() {
  return (
    <div
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/40
        bg-white/20
        backdrop-blur-xl
        shadow-lg
      "
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3L19 6V11C19 15.5 16 19 12 21C8 19 5 15.5 5 11V6L12 3Z"
          stroke="#F5A623"
          strokeWidth="1.8"
        />

        <path
          d="M9.2 12L11.2 14L15.3 10"
          stroke="#F5A623"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
