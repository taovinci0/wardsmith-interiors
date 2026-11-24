import { Link } from 'react-router-dom'

/** Quiet text link — uppercase label + arrow, for secondary destinations where a pill would shout. */
export function ArrowLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary underline decoration-primary/35 decoration-1 underline-offset-[6px] transition-colors hover:text-accent-600 hover:decoration-accent-600/60 ${className}`}
    >
      <span>{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  )
}
