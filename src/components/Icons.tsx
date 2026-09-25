import type { CategoryIcon } from "@/data/skills";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...base}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function NicknameIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...base}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...base}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function GradCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...base}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export function CategoryBadgeIcon({ name }: { name: CategoryIcon }) {
  if (name === "design") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg
      viewBox="1573 25 30 30"
      width="22"
      height="22"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1588 51.25C1594.21 51.25 1599.25 46.2132 1599.25 40C1599.25 33.7868 1594.21 28.75 1588 28.75C1581.79 28.75 1576.75 33.7868 1576.75 40C1576.75 46.2132 1581.79 51.25 1588 51.25Z" />
      <path d="M1592.69 40C1592.69 47.5 1588 51.25 1588 51.25C1588 51.25 1583.31 47.5 1583.31 40C1583.31 32.5 1588 28.75 1588 28.75C1588 28.75 1592.69 32.5 1592.69 40Z" />
      <path d="M1577.39 36.25H1598.61" />
      <path d="M1577.39 43.75H1598.61" />
    </svg>
  );
}
  
export function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" {...base}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}