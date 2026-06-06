import Link from "next/link";
import Image from "next/image";

/**
 * OphtaHealth brand mark.
 * The official logo (eye + wordmark) ships as a square asset with a white wordmark
 * on a teal background, so it is rendered inside its own rounded teal tile.
 */
export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="OphtaHealth — Accueil">
      <span className="overflow-hidden rounded-lg">
        <Image
          src="/brand/ophtahealth-logo.webp"
          alt="OphtaHealth"
          width={56}
          height={56}
          priority
          className="h-12 w-12 object-cover"
        />
      </span>
      {showText && (
        <span className="font-display text-[26px] font-bold leading-none text-primary-container">
          Ophta<span className="text-primary">Health</span>
        </span>
      )}
    </Link>
  );
}
