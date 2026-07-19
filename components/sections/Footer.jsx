
import FooterVideoBackground from "./footer/FooterVideoBackground";
import SocialLinks from "./footer/SocialLinks";


const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      "Overview",
      "Solutions",
      "Process",
      "Platform Preview",
      "Pricing",
      "Request Demo",
    ],
  },
  {
    title: "Company & Resources",
    links: ["Terms of Service", "Privacy Policy", "FAQs"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[30px] mx-3 mb-3 text-white">
      <FooterVideoBackground />


      <div className="relative z-10 mx-auto w-[calc(85%-2rem)] max-w-[1320px] py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4 md:gap-x-20">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-lg font-medium text-white">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-md text-white/70 transition-colors hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-lg font-medium text-white">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-2 text-md text-white/70">
                <LocationIcon />
                USA
              </li>
              <li>
                <a
                  href="tel:+971515473625"
                  className="flex items-center gap-2 text-md text-white/70 transition-colors hover:text-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <PhoneIcon />
                  +971 51 547 3625
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white">Connect</h3>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 text-right md:mt-20">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Lorem.app. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.5 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.5 0 1 .4 1 1v3.3c0 .6-.5 1-1 1C10.4 20.5 3.5 13.6 3.5 5c0-.6.4-1 1-1H8c.5 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 2.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
