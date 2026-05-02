import { CategoryBadge } from "@/components/CategoryBadge";
import { CAMPUS_LOCATION, type ItemSummary, formatKES } from "@/types";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

interface ItemCardProps {
  item: ItemSummary;
  index: number;
}

export function ItemCard({ item, index }: ItemCardProps) {
  return (
    <Link
      to="/item/$id"
      params={{ id: item.id }}
      className="group block rounded-xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid={`items.item.${index}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🛍️
          </div>
        )}
        {item.seller.isVerified && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-primary">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
            Verified
          </div>
        )}
        {item.isSold && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-card text-foreground text-xs font-bold px-3 py-1 rounded-full">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <CategoryBadge category={item.category} size="sm" />
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 min-w-0">
          {item.title}
        </h3>
        <p className="text-base font-bold text-primary">
          {formatKES(item.price)}
        </p>
        <p className="text-xs text-muted-foreground">
          {CAMPUS_LOCATION} · {item.postedAt}
        </p>
      </div>
    </Link>
  );
}
