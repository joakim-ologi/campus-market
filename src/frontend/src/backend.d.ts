import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface UpdateItemInput {
    title: string;
    imageRefs: Array<string>;
    description: string;
    category: Category;
    priceKES: bigint;
}
export interface CreateItemInput {
    title: string;
    imageRefs: Array<string>;
    description: string;
    category: Category;
    priceKES: bigint;
}
export type RegistrationMethod = {
    __kind__: "email";
    email: string;
} | {
    __kind__: "phone";
    phone: string;
};
export interface ProfileView {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    campus: Campus;
    registrationMethod: RegistrationMethod;
    whatsappPhone: string;
}
export type UserId = Principal;
export interface UpdateProfileInput {
    name: string;
    whatsappPhone: string;
}
export type ItemId = bigint;
export interface RegisterInput {
    name: string;
    campus: Campus;
    registrationMethod: RegistrationMethod;
    whatsappPhone: string;
}
export interface ItemView {
    id: ItemId;
    status: ItemStatus;
    title: string;
    sellerWhatsapp: string;
    imageRefs: Array<string>;
    createdAt: Timestamp;
    description: string;
    seller: UserId;
    updatedAt: Timestamp;
    category: Category;
    priceKES: bigint;
}
export interface BrowseFilter {
    minPriceKES?: bigint;
    sortOrder: SortOrder;
    maxPriceKES?: bigint;
    category?: Category;
    keyword?: string;
}
export interface PageResult {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<ItemView>;
}
export type Campus = string;
export enum Category {
    HouseItems = "HouseItems",
    Clothes = "Clothes",
    Books = "Books",
    Electronics = "Electronics",
    BedsAndMattresses = "BedsAndMattresses"
}
export enum ItemStatus {
    active = "active",
    sold = "sold"
}
export enum SortOrder {
    newest = "newest",
    priceDesc = "priceDesc",
    priceAsc = "priceAsc"
}
export enum Variant_ok_notFound_unauthorized {
    ok = "ok",
    notFound = "notFound",
    unauthorized = "unauthorized"
}
export interface backendInterface {
    browseItems(filter: BrowseFilter, offset: bigint, limit: bigint): Promise<PageResult>;
    createItem(input: CreateItemInput): Promise<{
        __kind__: "ok";
        ok: ItemView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteItem(itemId: ItemId): Promise<Variant_ok_notFound_unauthorized>;
    getItem(itemId: ItemId): Promise<ItemView | null>;
    getMyListings(): Promise<Array<ItemView>>;
    getMyProfile(): Promise<ProfileView | null>;
    getProfile(userId: UserId): Promise<ProfileView | null>;
    markSold(itemId: ItemId): Promise<Variant_ok_notFound_unauthorized>;
    register(input: RegisterInput): Promise<{
        __kind__: "ok";
        ok: ProfileView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateItem(itemId: ItemId, input: UpdateItemInput): Promise<Variant_ok_notFound_unauthorized>;
    updateProfile(input: UpdateProfileInput): Promise<{
        __kind__: "ok";
        ok: ProfileView;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
