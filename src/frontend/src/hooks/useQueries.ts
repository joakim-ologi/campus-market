import { createActor } from "@/backend";
import type {
  BrowseFilter,
  CreateItemInput,
  ItemView,
  ProfileView,
  UpdateItemInput,
  UpdateProfileInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProfileView | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyListings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ItemView[]>({
    queryKey: ["myListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBrowseItems(
  filter: BrowseFilter,
  offset: bigint,
  limit: bigint,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["browseItems", filter, offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) return { items: [], total: 0n, offset: 0n, limit };
      return actor.browseItems(filter, offset, limit);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetItem(itemId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ItemView | null>({
    queryKey: ["item", itemId?.toString()],
    queryFn: async () => {
      if (!actor || itemId === null) return null;
      return actor.getItem(itemId);
    },
    enabled: !!actor && !isFetching && itemId !== null,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useDeleteItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteItem(itemId);
      if (result !== "ok") throw new Error(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myListings"] });
      qc.invalidateQueries({ queryKey: ["browseItems"] });
    },
  });
}

export function useMarkSold() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markSold(itemId);
      if (result !== "ok") throw new Error(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myListings"] });
      qc.invalidateQueries({ queryKey: ["browseItems"] });
    },
  });
}

export function useCreateItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateItemInput) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createItem(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["browseItems"] });
      qc.invalidateQueries({ queryKey: ["myListings"] });
    },
  });
}

export function useUpdateItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      itemId,
      input,
    }: { itemId: bigint; input: UpdateItemInput }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateItem(itemId, input);
      if (result !== "ok") throw new Error(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myListings"] });
      qc.invalidateQueries({ queryKey: ["browseItems"] });
    },
  });
}
