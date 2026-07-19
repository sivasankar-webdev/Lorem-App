"use client";

export default function ProblemText({ textRef }) {
  return (
    <p
      ref={textRef}
      tabIndex={0}
      className="group max-w-5xl text-2xl font-medium leading-snug focus:outline-none sm:text-4xl md:text-6xl md:leading-tight"
    >
      <span className="text-ink">
        PDFs get forged. Emails get lost. Manual checks create liability.
      </span>
      <br />
      <span className="text-ink/40 transition-colors duration-300 ease-out group-hover:text-ink group-focus:text-ink motion-reduce:transition-none">
        Lorem replaces static documents with cryptographically signed
        credentials issued directly from the source, with a full audit
        trail.
      </span>
    </p>
  );
}