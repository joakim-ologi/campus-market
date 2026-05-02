import { Category } from "@/backend";
// Re-export backend Category so the whole app uses a single source of truth
export { Category } from "@/backend";

export interface SellerInfo {
  name: string;
  phone: string;
  avatarInitials: string;
  isVerified?: boolean;
}

export interface ItemSummary {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  seller: SellerInfo;
  location: string;
  postedAt: string;
  isSold?: boolean;
}

export interface FilterState {
  query: string;
  category: Category | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: "newest" | "price_asc" | "price_desc";
}

export const CATEGORY_META: Record<
  Category,
  { label: string; emoji: string; color: string; bgColor: string }
> = {
  [Category.Electronics]: {
    label: "Tech",
    emoji: "⚡",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  [Category.Books]: {
    label: "Books",
    emoji: "📚",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  [Category.BedsAndMattresses]: {
    label: "Beds & Mattresses",
    emoji: "🛏️",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  [Category.Clothes]: {
    label: "Clothes",
    emoji: "👕",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  [Category.HouseItems]: {
    label: "House Items",
    emoji: "🏠",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
};

export const CAMPUS_NAME = "JKUAT";
export const CAMPUS_LOCATION = "Juja";

export const WHATSAPP_BASE_URL = "https://wa.me";

export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return `${WHATSAPP_BASE_URL}/${cleaned}?text=${encodeURIComponent(message)}`;
}
