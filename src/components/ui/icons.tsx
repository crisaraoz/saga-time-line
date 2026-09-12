type IconProps = { className?: string };

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m15 6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.52 6.96a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM21.6 7.2c-.05-1.05-.23-1.77-.49-2.4a4.85 4.85 0 0 0-1.11-1.76 4.85 4.85 0 0 0-1.76-1.11c-.63-.26-1.35-.44-2.4-.49C14.78 1.39 14.45 1.37 12 1.37s-2.78.02-3.84.07c-1.05.05-1.77.23-2.4.49a4.85 4.85 0 0 0-1.76 1.11 4.85 4.85 0 0 0-1.11 1.76c-.26.63-.44 1.35-.49 2.4C1.39 9.22 1.37 9.55 1.37 12s.02 2.78.07 3.84c.05 1.05.23 1.77.49 2.4a4.85 4.85 0 0 0 1.11 1.76 4.85 4.85 0 0 0 1.76 1.11c.63.26 1.35.44 2.4.49 1.06.05 1.39.07 3.84.07s2.78-.02 3.84-.07c1.05-.05 1.77-.23 2.4-.49a4.85 4.85 0 0 0 1.76-1.11 4.85 4.85 0 0 0 1.11-1.76c.26-.63.44-1.35.49-2.4.05-1.06.07-1.39.07-3.84s-.02-2.78-.07-3.84Zm-1.69 7.56a5.37 5.37 0 0 1-.3 1.62 3.16 3.16 0 0 1-.74 1.16 3.16 3.16 0 0 1-1.16.74 5.37 5.37 0 0 1-1.62.3c-1.04.05-1.35.06-3.73.06s-2.69-.01-3.73-.06a5.37 5.37 0 0 1-1.62-.3 3.16 3.16 0 0 1-1.16-.74 3.16 3.16 0 0 1-.74-1.16 5.37 5.37 0 0 1-.3-1.62c-.05-1.04-.06-1.35-.06-3.73s.01-2.69.06-3.73a5.37 5.37 0 0 1 .3-1.62 3.16 3.16 0 0 1 .74-1.16 3.16 3.16 0 0 1 1.16-.74 5.37 5.37 0 0 1 1.62-.3c1.04-.05 1.35-.06 3.73-.06s2.69.01 3.73.06a5.37 5.37 0 0 1 1.62.3 3.16 3.16 0 0 1 1.16.74 3.16 3.16 0 0 1 .74 1.16 5.37 5.37 0 0 1 .3 1.62c.05 1.04.06 1.35.06 3.73s-.01 2.69-.06 3.73Z" />
    </svg>
  );
}
