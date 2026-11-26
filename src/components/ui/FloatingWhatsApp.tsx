import Link from "next/link";
import { contactInfo } from "@/data/contact";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
    </svg>
  );
}

const PRE_FILLED_MESSAGE =
  "Hello Square Feet team, I would like to inquire about an architectural design project.";

export function FloatingWhatsApp() {
  const rawNumber = contactInfo.whatsapp || "";
  const digitsOnly = rawNumber.replace(/\D/g, "");

  // A valid international WhatsApp number must contain only digits (10-15 digits including country code)
  const isValidWhatsAppNumber =
    digitsOnly.length >= 10 && digitsOnly.length <= 15;

  const content = (
    <>
      <WhatsAppIcon className="shrink-0 text-white" />
      
      {/* Label: completely hidden when not hovering, smoothly expands into view */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[180px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-3 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:ml-3 font-sans text-xs uppercase tracking-wider font-semibold text-white">
        Discuss a Project
      </span>
    </>
  );

  // Perfect circle when not hovered (w-14 h-14), expands smoothly on hover (group-hover:w-auto group-hover:px-5)
  const sharedClasses =
    "group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:w-auto hover:px-5 hover:bg-[#20ba5a] hover:shadow-2xl hover:shadow-[#25D366]/40 focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:transform-none";

  if (isValidWhatsAppNumber) {
    const encodedMessage = encodeURIComponent(PRE_FILLED_MESSAGE);
    const whatsappUrl = `https://wa.me/${digitsOnly}?text=${encodedMessage}`;

    return (
      <aside aria-label="Quick Consultation">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Square Feet Architect on WhatsApp for a consultation"
          className={sharedClasses}
        >
          {content}
        </a>
      </aside>
    );
  }

  // Graceful fallback: navigate to the /contact page when no number is configured or invalid
  return (
    <aside aria-label="Quick Consultation">
      <Link
        href="/contact"
        aria-label="Contact Square Feet Architect to discuss an architectural project"
        className={sharedClasses}
      >
        {content}
      </Link>
    </aside>
  );
}
