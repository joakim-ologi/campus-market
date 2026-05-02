interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary ${sizeMap[size]} ${className}`}
      aria-label="Loading"
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      data-ocid="loading_state"
    >
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((key) => (
        <div
          key={key}
          className="rounded-xl bg-muted animate-pulse overflow-hidden"
        >
          <div className="aspect-square bg-muted" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
            <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
            <div className="h-4 bg-muted-foreground/20 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
