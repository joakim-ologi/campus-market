import { ItemStatus } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteItem,
  useMarkSold,
  useMyListings,
  useMyProfile,
  useUpdateProfile,
} from "@/hooks/useQueries";
import { CAMPUS_NAME, formatKES } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Edit2,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { isAuthenticated, avatarInitials, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"profile" | "listings">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<bigint | null>(null);

  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: listings, isLoading: listingsLoading } = useMyListings();
  const updateProfile = useUpdateProfile();
  const deleteItem = useDeleteItem();
  const markSold = useMarkSold();

  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }

  const activeListings =
    listings?.filter((l) => l.status === ItemStatus.active) ?? [];
  const totalListings = listings?.length ?? 0;

  function startEdit() {
    setEditName(profile?.name ?? "");
    setEditPhone(profile?.whatsappPhone ?? "");
    setIsEditing(true);
  }

  async function handleSaveProfile() {
    try {
      await updateProfile.mutateAsync({
        name: editName.trim(),
        whatsappPhone: editPhone.trim(),
      });
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  }

  async function handleDelete(itemId: bigint) {
    try {
      await deleteItem.mutateAsync(itemId);
      setConfirmDeleteId(null);
      toast.success("Listing deleted.");
    } catch {
      toast.error("Failed to delete listing.");
    }
  }

  async function handleMarkSold(itemId: bigint) {
    try {
      await markSold.mutateAsync(itemId);
      toast.success("Marked as sold!");
    } catch {
      toast.error("Failed to mark as sold.");
    }
  }

  const displayName = profile?.name || "Student";
  const regMethod = profile?.registrationMethod;
  const regLabel =
    regMethod?.__kind__ === "email"
      ? regMethod.email
      : regMethod?.__kind__ === "phone"
        ? regMethod.phone
        : "";

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-24" data-ocid="profile.page">
      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl select-none">
          {profileLoading ? (
            <Skeleton className="h-20 w-20 rounded-full" />
          ) : (
            (profile?.name?.slice(0, 2).toUpperCase() ?? avatarInitials)
          )}
        </div>
        {profileLoading ? (
          <div className="space-y-1.5 text-center">
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-3 w-24 mx-auto" />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="font-display text-xl font-bold text-foreground">
              {displayName}
            </h1>
            {regLabel && (
              <p className="text-xs text-muted-foreground mt-0.5">{regLabel}</p>
            )}
            <div className="flex items-center gap-1.5 justify-center mt-1.5">
              <MapPin
                className="h-3.5 w-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-xs text-muted-foreground">
                {CAMPUS_NAME}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <ShoppingBag
            className="h-5 w-5 text-primary mx-auto mb-1"
            aria-hidden="true"
          />
          {listingsLoading ? (
            <Skeleton className="h-7 w-10 mx-auto mb-1" />
          ) : (
            <p className="text-2xl font-bold text-foreground">
              {activeListings.length}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Active Listings</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Package
            className="h-5 w-5 text-accent mx-auto mb-1"
            aria-hidden="true"
          />
          {listingsLoading ? (
            <Skeleton className="h-7 w-10 mx-auto mb-1" />
          ) : (
            <p className="text-2xl font-bold text-foreground">
              {totalListings}
            </p>
          )}
          <p className="text-xs text-muted-foreground">Total Listed</p>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex bg-muted rounded-lg p-1 mb-5"
        role="tablist"
        aria-label="Profile sections"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "profile"}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "profile"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTab("profile")}
          data-ocid="profile.profile_tab"
        >
          My Profile
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "listings"}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === "listings"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTab("listings")}
          data-ocid="profile.listings_tab"
        >
          My Listings
          {totalListings > 0 && (
            <span className="ml-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full px-1.5 py-0.5">
              {totalListings}
            </span>
          )}
        </button>
      </div>

      {/* Profile tab */}
      {tab === "profile" && (
        <div className="space-y-4">
          {!isEditing ? (
            <>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <InfoRow
                  label="Name"
                  value={profile?.name ?? "—"}
                  loading={profileLoading}
                />
                <InfoRow
                  label="WhatsApp"
                  value={profile?.whatsappPhone || "Not set"}
                  loading={profileLoading}
                />
                <InfoRow
                  label="Campus"
                  value={CAMPUS_NAME}
                  loading={profileLoading}
                />
              </div>
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={startEdit}
                data-ocid="profile.edit_button"
              >
                <Edit2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Edit Profile
              </Button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile();
              }}
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-xl p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-name">Display Name</Label>
                  <Input
                    id="edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                    maxLength={60}
                    required
                    data-ocid="profile.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-phone">WhatsApp Number</Label>
                  <Input
                    id="edit-phone"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    type="tel"
                    maxLength={20}
                    data-ocid="profile.phone_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Buyers will use this to contact you on WhatsApp
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 h-11"
                  disabled={updateProfile.isPending || !editName.trim()}
                  data-ocid="profile.save_button"
                >
                  {updateProfile.isPending ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-4"
                  onClick={() => setIsEditing(false)}
                  data-ocid="profile.cancel_button"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          )}

          <Separator />

          <Button
            variant="outline"
            className="w-full h-11 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={handleLogout}
            data-ocid="profile.logout_button"
          >
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Sign Out
          </Button>
        </div>
      )}

      {/* Listings tab */}
      {tab === "listings" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {activeListings.length} active · {totalListings} total
            </p>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/post" })}
              data-ocid="profile.post_button"
            >
              <Plus className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              Post Item
            </Button>
          </div>

          {listingsLoading && (
            <div
              className="space-y-3"
              data-ocid="profile.listings_loading_state"
            >
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          )}

          {!listingsLoading && totalListings === 0 && (
            <EmptyState
              icon="🛍️"
              headline="No listings yet"
              subtext="Post your first item and start selling to fellow students."
              ctaLabel="Post an Item"
              onCta={() => navigate({ to: "/post" })}
            />
          )}

          {!listingsLoading &&
            listings?.map((item, idx) => (
              <MyListingCard
                key={item.id.toString()}
                item={item}
                index={idx + 1}
                confirmingDelete={confirmDeleteId === item.id}
                onEdit={() =>
                  navigate({
                    to: "/post",
                    search: { itemId: item.id.toString() },
                  })
                }
                onRequestDelete={() => setConfirmDeleteId(item.id)}
                onCancelDelete={() => setConfirmDeleteId(null)}
                onConfirmDelete={() => handleDelete(item.id)}
                onMarkSold={() => handleMarkSold(item.id)}
                isDeleting={deleteItem.isPending && confirmDeleteId === item.id}
                isMarkingSold={markSold.isPending}
              />
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  loading,
}: {
  label: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      {loading ? (
        <Skeleton className="h-4 w-32" />
      ) : (
        <span className="text-sm text-foreground font-medium text-right truncate">
          {value}
        </span>
      )}
    </div>
  );
}

interface MyListingCardProps {
  item: import("@/backend").ItemView;
  index: number;
  confirmingDelete: boolean;
  onEdit: () => void;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onMarkSold: () => void;
  isDeleting: boolean;
  isMarkingSold: boolean;
}

function MyListingCard({
  item,
  index,
  confirmingDelete,
  onEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onMarkSold,
  isDeleting,
  isMarkingSold,
}: MyListingCardProps) {
  const isSold = item.status === ItemStatus.sold;

  return (
    <div
      className="bg-card border border-border rounded-xl p-3 flex gap-3 items-start"
      data-ocid={`profile.listings.item.${index}`}
    >
      {/* Thumbnail */}
      <div className="h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden">
        {item.imageRefs[0] ? (
          <img
            src={item.imageRefs[0]}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-2xl">
            🛍️
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-foreground line-clamp-1 min-w-0 flex-1">
            {item.title}
          </p>
          {isSold ? (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Sold
            </Badge>
          ) : (
            <Badge className="shrink-0 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
              Active
            </Badge>
          )}
        </div>
        <p className="text-base font-bold text-primary mt-0.5">
          {formatKES(Number(item.priceKES))}
        </p>
        <p className="text-xs text-muted-foreground">{item.category}</p>

        {/* Actions */}
        {!confirmingDelete ? (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {!isSold && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs px-2"
                onClick={onMarkSold}
                disabled={isMarkingSold}
                data-ocid={`profile.listings.mark_sold_button.${index}`}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                Mark Sold
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-2"
              onClick={onEdit}
              data-ocid={`profile.listings.edit_button.${index}`}
            >
              <Edit2 className="h-3 w-3 mr-1" aria-hidden="true" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={onRequestDelete}
              data-ocid={`profile.listings.delete_button.${index}`}
            >
              <Trash2 className="h-3 w-3 mr-1" aria-hidden="true" />
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 mt-2 items-center">
            <p className="text-xs text-destructive font-medium">
              Delete this listing?
            </p>
            <Button
              size="sm"
              variant="destructive"
              className="h-7 text-xs px-2"
              onClick={onConfirmDelete}
              disabled={isDeleting}
              data-ocid={`profile.listings.confirm_button.${index}`}
            >
              {isDeleting ? (
                <LoadingSpinner size="sm" className="mr-1" />
              ) : null}
              Confirm
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs px-2"
              onClick={onCancelDelete}
              data-ocid={`profile.listings.cancel_button.${index}`}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
