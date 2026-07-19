"use client";


const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "Email", href: "mailto:hello@example.com", Icon: EmailIcon },
];

export default function SocialLinks() {
  return (
    <ul className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            aria-label={name}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-amber-500 hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 8.5h3.2V19H4.5V8.5ZM6.1 4.5a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7ZM10.3 8.5h3.06v1.44h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.83 2.05 3.83 4.72V19h-3.2v-5.32c0-1.27-.02-2.9-1.8-2.9-1.8 0-2.08 1.36-2.08 2.8V19h-3.2V8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 7L12 13l7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
