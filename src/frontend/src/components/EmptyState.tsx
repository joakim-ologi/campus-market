import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  headline: string;
  subtext: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({
  icon,
  headline,
  subtext,
  ctaLabel,
  onCta,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      data-ocid="empty_state"
    >
      <div className="text-5xl mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{headline}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">{subtext}</p>
      {ctaLabel && onCta && (
        <Button
          onClick={onCta}
          data-ocid="empty_state.primary_button"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
