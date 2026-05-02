import { createActor } from "@/backend";
import type { ItemView } from "@/backend";
import {
  Category as BackendCategory,
  ItemStatus,
  Variant_ok_notFound_unauthorized,
} from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { buildWhatsAppUrl, formatKES } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit,
  MessageCircle,
  Package,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Category display map (backend enum → display) ─────────────────────────────
const BACKEND_CATEGORY_META: Record<
  BackendCategory,
  { label: string; emoji: string; color: string; bg: string }
> = {
  [BackendCategory.Electronics]: {
    label: "Electronics",
    emoji: "⚡",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  [BackendCategory.Books]: {
    label: "Books",
    emoji: "📚",
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  [BackendCategory.Clothes]: {
    label: "Clothes",
    emoji: "👕",
    color: "text-purple-700",
    bg: "bg-purple-100",
  },
  [BackendCategory.HouseItems]: {
    label: "House Items",
    emoji: "🏠",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  [BackendCategory.BedsAndMattresses]: {
    label: "Beds & Mattresses",
    emoji: "🛏️",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
};

// ── Relative time from ICP nanosecond bigint ──────────────────────────────────
function relativeTime(nsBigint: bigint): string {
  const ms = Number(nsBigint / 1_000_000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString("en-KE", {
    month: "short",
    day: "numeric",
  });
}

// ── Image Gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ refs, title }: { refs: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const images = refs.length > 0 ? refs.slice(0, 5) : [];

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted flex items-center justify-center text-7xl">
        🛍️
      </div>
    );
  }

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="relative" data-ocid="item_detail.gallery">
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={images[active]}
          alt={`${title} ${active + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            data-ocid="item_detail.gallery_prev"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-card transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            data-ocid="item_detail.gallery_next"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-card transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-foreground" aria-hidden />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View ${i + 1}`}
                data-ocid={`item_detail.gallery_dot.${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === active ? "bg-card" : "bg-card/50"
                }`}
              />
            ))}
          </div>

          {/* Counter badge */}
          <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-medium text-foreground">
            {active + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

// ── Seller actions (owner only) ───────────────────────────────────────────────
function SellerActions({
  item,
  onDelete,
  onMarkSold,
  isDeleting,
  isMarking,
}: {
  item: ItemView;
  onDelete: () => void;
  onMarkSold: () => void;
  isDeleting: boolean;
  isMarking: boolean;
}) {
  const navigate = useNavigate();
  const isSold = item.status === ItemStatus.sold;

  return (
    <div
      className="border border-border rounded-xl p-4 space-y-3"
      data-ocid="item_detail.seller_actions"
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Seller Actions
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/post" })}
          title="Edit listing (coming soon)"
          className="flex-1 gap-1.5"
          data-ocid="item_detail.edit_button"
        >
          <Edit className="h-3.5 w-3.5" aria-hidden />
          Edit
        </Button>

        {!isSold && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onMarkSold}
            disabled={isMarking}
            className="flex-1 gap-1.5"
            data-ocid="item_detail.mark_sold_button"
          >
            <Package className="h-3.5 w-3.5" aria-hidden />
            {isMarking ? "Marking…" : "Mark as Sold"}
          </Button>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 gap-1.5"
              data-ocid="item_detail.delete_button"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="item_detail.delete_dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove the listing. Buyers will no longer
                be able to find it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="item_detail.delete_cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="item_detail.delete_confirm_button"
              >
                {isDeleting ? "Deleting…" : "Delete listing"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="max-w-lg mx-auto" data-ocid="item_detail.loading_state">
      <div className="flex items-center gap-3 px-4 py-3">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="aspect-square w-full" />
      <div className="px-4 py-5 space-y-4">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ItemDetailPage() {
  const { id } = useParams({ from: "/item/$id" });
  const navigate = useNavigate();
  const { identity, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { actor, isFetching: isActorFetching } = useActor(createActor);

  const numericId = BigInt(id);

  // Fetch item
  const {
    data: item,
    isLoading,
    error,
  } = useQuery<ItemView | null>({
    queryKey: ["item", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getItem(numericId);
    },
    enabled: !!actor && !isActorFetching,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteItem(numericId);
    },
    onSuccess: (result) => {
      if (result === Variant_ok_notFound_unauthorized.ok) {
        toast.success("Listing deleted.");
        queryClient.invalidateQueries({ queryKey: ["items"] });
        navigate({ to: "/" });
      } else if (result === Variant_ok_notFound_unauthorized.unauthorized) {
        toast.error("You are not authorised to delete this listing.");
      } else {
        toast.error("Listing not found.");
      }
    },
    onError: () => toast.error("Failed to delete. Please try again."),
  });

  // Mark sold mutation
  const markSoldMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.markSold(numericId);
    },
    onSuccess: (result) => {
      if (result === Variant_ok_notFound_unauthorized.ok) {
        toast.success("Marked as sold! 🎉");
        queryClient.invalidateQueries({ queryKey: ["item", id] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      } else {
        toast.error("Could not mark as sold.");
      }
    },
    onError: () => toast.error("Failed to update. Please try again."),
  });

  // Determine ownership
  const myPrincipal = identity?.getPrincipal().toString() ?? null;
  const isSeller =
    isAuthenticated &&
    myPrincipal !== null &&
    item != null &&
    item.seller.toString() === myPrincipal;

  if (isLoading || isActorFetching) return <DetailSkeleton />;

  if (error || item == null) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center gap-4 text-center"
        data-ocid="item_detail.error_state"
      >
        <span className="text-5xl">😕</span>
        <h2 className="font-display text-lg font-bold text-foreground">
          Listing not found
        </h2>
        <p className="text-sm text-muted-foreground">
          This item may have been removed or the link is incorrect.
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          data-ocid="item_detail.back_button"
        >
          Browse listings
        </Button>
      </div>
    );
  }

  const catMeta =
    BACKEND_CATEGORY_META[item.category] ??
    ({
      label: item.category,
      emoji: "🏷️",
      color: "text-muted-foreground",
      bg: "bg-muted",
    } as const);

  const isSold = item.status === ItemStatus.sold;
  const whatsappMsg = `Hi! I saw your listing on CampusCart — *${item.title}* for ${formatKES(Number(item.priceKES))}. Is it still available?`;
  const whatsappUrl = buildWhatsAppUrl(item.sellerWhatsapp, whatsappMsg);

  return (
    <div className="max-w-lg mx-auto" data-ocid="item_detail.page">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
          aria-label="Go back to listings"
          data-ocid="item_detail.back_button"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-foreground truncate min-w-0 flex-1">
          {item.title}
        </span>
        {isSold && (
          <Badge variant="secondary" className="shrink-0 text-xs">
            SOLD
          </Badge>
        )}
      </div>

      {/* Gallery */}
      <div className="relative">
        <ImageGallery refs={item.imageRefs} title={item.title} />
        {isSold && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center pointer-events-none">
            <span className="bg-card text-foreground font-bold text-lg px-4 py-1.5 rounded-full shadow">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-4 py-5 space-y-4">
        {/* Category + Title + Price */}
        <div>
          <span
            className={`inline-flex items-center gap-1 rounded-full text-xs px-2.5 py-1 font-medium ${catMeta.bg} ${catMeta.color}`}
          >
            <span aria-hidden>{catMeta.emoji}</span>
            {catMeta.label}
          </span>
          <h1 className="font-display text-xl font-bold text-foreground mt-2 leading-snug">
            {item.title}
          </h1>
          <p className="text-2xl font-bold text-primary mt-1">
            {formatKES(Number(item.priceKES))}
          </p>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-foreground leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Seller card */}
        <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {item.seller.toString().slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm text-foreground truncate">
                Campus Seller
              </span>
              <CheckCircle2
                className="h-3.5 w-3.5 text-primary shrink-0"
                aria-hidden
              />
            </div>
            <p className="text-xs text-muted-foreground">
              JKUAT · {relativeTime(item.createdAt)}
            </p>
          </div>
        </div>

        {/* Seller actions (owner only) */}
        {isSeller && (
          <SellerActions
            item={item}
            onDelete={() => deleteMutation.mutate()}
            onMarkSold={() => markSoldMutation.mutate()}
            isDeleting={deleteMutation.isPending}
            isMarking={markSoldMutation.isPending}
          />
        )}

        {/* WhatsApp CTA (buyers only — or always visible since sellers may share) */}
        {!isSold && item.sellerWhatsapp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="item_detail.whatsapp_button"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#20BD5A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Contact Seller via WhatsApp
          </a>
        )}

        {isSold && (
          <div
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-muted text-muted-foreground font-semibold text-base"
            data-ocid="item_detail.sold_banner"
          >
            This item has been sold
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Meet on campus · Pay via M-Pesa or cash
        </p>
      </div>
    </div>
  );
}
