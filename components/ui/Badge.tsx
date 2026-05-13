import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "shimmer" | "success";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full";

  if (variant === "shimmer") {
    return (
      <span
        className={`${base} text-[--text-soft] border border-transparent ${className}`}
        style={{
          background:
            "linear-gradient(var(--bg), var(--bg)) padding-box, linear-gradient(135deg, #8b5cf6, #c4b5fd, #8b5cf6) border-box",
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
        }}
      >
        {children}
      </span>
    );
  }

  if (variant === "success") {
    return (
      <span
        className={`${base} text-[--success] bg-[--success]/10 border border-[--success]/20 ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`${base} text-[--text-soft] bg-[--primary-bg] border border-[--primary]/20 ${className}`}
    >
      {children}
    </span>
  );
}
