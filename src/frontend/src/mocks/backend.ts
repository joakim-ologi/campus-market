import type { backendInterface, Category, ItemStatus, SortOrder, BrowseFilter, CreateItemInput, UpdateItemInput, ItemId, UserId, RegisterInput, UpdateProfileInput, PageResult, ItemView, ProfileView, Variant_ok_notFound_unauthorized } from "../backend.d";

const mockPrincipal = { toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(29), compareTo: () => 0 as const, isAnonymous: () => false, _isPrincipal: true as const };

const mockItems: ItemView[] = [
  {
    id: BigInt(1),
    status: "active" as unknown as ItemStatus,
    title: "HP Laptop 15.6\" Core i5",
    sellerWhatsapp: "+254712345678",
    imageRefs: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"],
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    description: "Barely used HP laptop, perfect for assignments and research. Battery lasts 6 hours.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
    category: "Electronics" as unknown as Category,
    priceKES: BigInt(35000),
  },
  {
    id: BigInt(2),
    status: "active" as unknown as ItemStatus,
    title: "Single Bed + Mattress",
    sellerWhatsapp: "+254723456789",
    imageRefs: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
    createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    description: "Moving out of campus. Good condition foam mattress and bed frame. Free delivery within campus.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    category: "BedsAndMattresses" as unknown as Category,
    priceKES: BigInt(8500),
  },
  {
    id: BigInt(3),
    status: "active" as unknown as ItemStatus,
    title: "Engineering Textbooks Bundle",
    sellerWhatsapp: "+254734567890",
    imageRefs: ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400"],
    createdAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    description: "3rd year engineering textbooks: Calculus, Physics, Electronics. All in excellent condition.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    category: "Books" as unknown as Category,
    priceKES: BigInt(2200),
  },
  {
    id: BigInt(4),
    status: "active" as unknown as ItemStatus,
    title: "Nike Air Force 1 Size 42",
    sellerWhatsapp: "+254745678901",
    imageRefs: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
    createdAt: BigInt(Date.now() - 259200000) * BigInt(1000000),
    description: "White Nike AF1s. Worn twice, still clean. Comes with original box.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now() - 259200000) * BigInt(1000000),
    category: "Clothes" as unknown as Category,
    priceKES: BigInt(4500),
  },
  {
    id: BigInt(5),
    status: "active" as unknown as ItemStatus,
    title: "Electric Kettle + Cooking Pot",
    sellerWhatsapp: "+254756789012",
    imageRefs: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    createdAt: BigInt(Date.now() - 345600000) * BigInt(1000000),
    description: "1.5L kettle and 2L pot. Both work perfectly. Selling because I'm graduating.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now() - 345600000) * BigInt(1000000),
    category: "HouseItems" as unknown as Category,
    priceKES: BigInt(1800),
  },
  {
    id: BigInt(6),
    status: "active" as unknown as ItemStatus,
    title: "Scientific Calculator Casio FX-991",
    sellerWhatsapp: "+254767890123",
    imageRefs: ["https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400"],
    createdAt: BigInt(Date.now() - 432000000) * BigInt(1000000),
    description: "Casio FX-991EX Classwiz. Perfect for engineering and science courses. No scratches.",
    seller: mockPrincipal as unknown as UserId,
    updatedAt: BigInt(Date.now() - 432000000) * BigInt(1000000),
    category: "Electronics" as unknown as Category,
    priceKES: BigInt(3200),
  },
];

export const mockBackend: backendInterface = {
  browseItems: async (_filter: BrowseFilter, offset: bigint, limit: bigint): Promise<PageResult> => {
    const start = Number(offset);
    const end = start + Number(limit);
    return {
      total: BigInt(mockItems.length),
      offset,
      limit,
      items: mockItems.slice(start, end),
    };
  },

  createItem: async (_input: CreateItemInput) => ({
    __kind__: "ok" as const,
    ok: mockItems[0],
  }),

  deleteItem: async (_itemId: ItemId): Promise<Variant_ok_notFound_unauthorized> =>
    "ok" as unknown as Variant_ok_notFound_unauthorized,

  getItem: async (itemId: ItemId): Promise<ItemView | null> =>
    mockItems.find((i) => i.id === itemId) ?? null,

  getMyListings: async (): Promise<ItemView[]> => [mockItems[0]],

  getMyProfile: async (): Promise<ProfileView | null> => ({
    id: mockPrincipal as unknown as UserId,
    name: "Wanjiku Kamau",
    createdAt: BigInt(Date.now() - 2592000000) * BigInt(1000000),
    campus: "JKUAT",
    registrationMethod: { __kind__: "phone", phone: "+254712345678" },
    whatsappPhone: "+254712345678",
  }),

  getProfile: async (_userId: UserId): Promise<ProfileView | null> => ({
    id: mockPrincipal as unknown as UserId,
    name: "Brian Ochieng",
    createdAt: BigInt(Date.now() - 5184000000) * BigInt(1000000),
    campus: "JKUAT",
    registrationMethod: { __kind__: "phone", phone: "+254723456789" },
    whatsappPhone: "+254723456789",
  }),

  markSold: async (_itemId: ItemId): Promise<Variant_ok_notFound_unauthorized> =>
    "ok" as unknown as Variant_ok_notFound_unauthorized,

  register: async (_input: RegisterInput) => ({
    __kind__: "ok" as const,
    ok: {
      id: mockPrincipal as unknown as UserId,
      name: _input.name,
      createdAt: BigInt(Date.now()) * BigInt(1000000),
      campus: _input.campus,
      registrationMethod: _input.registrationMethod,
      whatsappPhone: _input.whatsappPhone,
    },
  }),

  updateItem: async (_itemId: ItemId, _input: UpdateItemInput): Promise<Variant_ok_notFound_unauthorized> =>
    "ok" as unknown as Variant_ok_notFound_unauthorized,

  updateProfile: async (_input: UpdateProfileInput) => ({
    __kind__: "ok" as const,
    ok: {
      id: mockPrincipal as unknown as UserId,
      name: _input.name,
      createdAt: BigInt(Date.now() - 2592000000) * BigInt(1000000),
      campus: "JKUAT",
      registrationMethod: { __kind__: "phone", phone: _input.whatsappPhone },
      whatsappPhone: _input.whatsappPhone,
    },
  }),
};
