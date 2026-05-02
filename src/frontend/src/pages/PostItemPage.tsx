import {
  Category as BackendCategory,
  Variant_ok_notFound_unauthorized,
  createActor,
} from "@/backend";
import type { CreateItemInput, UpdateItemInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS: {
  value: BackendCategory;
  label: string;
  emoji: string;
}[] = [
  { value: BackendCategory.Electronics, label: "Electronics", emoji: "⚡" },
  {
    value: BackendCategory.BedsAndMattresses,
    label: "Beds & Mattresses",
    emoji: "🛏️",
  },
  { value: BackendCategory.Clothes, label: "Clothes", emoji: "👕" },
  { value: BackendCategory.Books, label: "Books", emoji: "📚" },
  { value: BackendCategory.HouseItems, label: "House Items", emoji: "🏠" },
];

const MAX_PHOTOS = 5;

interface PhotoEntry {
  id: string;
  preview: string;
  file: File;
  progress: number;
  dataURL?: string;
  uploaded: boolean;
}

interface FormErrors {
  title?: string;
  category?: string;
  price?: string;
  photos?: string;
}

export default function PostItemPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);

  // Edit mode: ?itemId=123 in query string
  const search = useSearch({ strict: false }) as { itemId?: string };
  const isEditMode = Boolean(search?.itemId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<BackendCategory | "">("");
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth guard — after all hooks
  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    const priceNum = Number(price);
    if (!price || Number.isNaN(priceNum) || priceNum <= 0)
      newErrors.price = "Enter a valid price greater than 0";
    if (photos.length === 0) newErrors.photos = "Add at least one photo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_PHOTOS - photos.length;
    const toAdd = files.slice(0, remaining);
    const newEntries: PhotoEntry[] = toAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      file,
      progress: 0,
      uploaded: false,
    }));
    setPhotos((prev) => [...prev, ...newEntries]);
    setErrors((prev) => ({ ...prev, photos: undefined }));
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const entry = prev.find((p) => p.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const convertToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const results: string[] = [];
    const updated = [...photos];
    for (let i = 0; i < updated.length; i++) {
      const entry = updated[i];
      if (entry.uploaded && entry.dataURL) {
        results.push(entry.dataURL);
        continue;
      }
      setPhotos((prev) =>
        prev.map((p) => (p.id === entry.id ? { ...p, progress: 50 } : p)),
      );
      const dataURL = await convertToDataURL(entry.file);
      updated[i] = { ...entry, dataURL, uploaded: true, progress: 100 };
      results.push(dataURL);
      setPhotos([...updated]);
    }
    return results;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) {
      toast.error("Not connected. Please log in.");
      return;
    }
    setIsSubmitting(true);
    try {
      let imageRefs: string[];
      try {
        imageRefs = await uploadPhotos();
      } catch {
        toast.error("Photo processing failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const priceKES = BigInt(Math.round(Number(price)));

      if (isEditMode && search.itemId) {
        const input: UpdateItemInput = {
          title: title.trim(),
          description: description.trim(),
          priceKES,
          category: category as BackendCategory,
          imageRefs,
        };
        const result = await actor.updateItem(BigInt(search.itemId), input);
        if (result === Variant_ok_notFound_unauthorized.ok) {
          toast.success("Listing updated!");
          navigate({ to: `/item/${search.itemId}` });
        } else {
          toast.error("Update failed. You may not have permission.");
        }
      } else {
        const input: CreateItemInput = {
          title: title.trim(),
          description: description.trim(),
          priceKES,
          category: category as BackendCategory,
          imageRefs,
        };
        const result = await actor.createItem(input);
        if (result.__kind__ === "ok") {
          toast.success("Item posted! Buyers can now find your listing.");
          navigate({ to: `/item/${result.ok.id.toString()}` });
        } else {
          toast.error(`Could not post item: ${result.err}`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canAddMore = photos.length < MAX_PHOTOS;
  const overallProgress =
    photos.length > 0
      ? Math.round(
          photos.reduce((sum, p) => sum + p.progress, 0) / photos.length,
        )
      : 0;

  return (
    <div
      className="max-w-lg mx-auto px-4 pt-4 pb-24"
      data-ocid="post_item.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
          aria-label="Go back"
          data-ocid="post_item.back_button"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-display text-xl font-bold text-foreground">
          {isEditMode ? "Edit Listing" : "Post an Item"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="post_item.form"
        noValidate
      >
        {/* Photo Upload */}
        <div className="space-y-2">
          <Label>
            Photos{" "}
            <span className="text-muted-foreground font-normal">
              ({photos.length}/{MAX_PHOTOS})
            </span>
            <span className="text-destructive ml-1">*</span>
          </Label>

          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border"
                data-ocid={`post_item.photo.${idx + 1}`}
              >
                <img
                  src={photo.preview}
                  alt={`Upload ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Upload progress overlay */}
                {isSubmitting && !photo.uploaded && (
                  <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-1">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {photo.progress}%
                    </span>
                  </div>
                )}
                {isSubmitting && photo.uploaded && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                )}
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-destructive transition-colors"
                    aria-label="Remove photo"
                    data-ocid={`post_item.remove_photo_button.${idx + 1}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}

            {/* Add more button */}
            {canAddMore && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                aria-label="Add photo"
                data-ocid="post_item.upload_button"
              >
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">
                  {photos.length === 0 ? "Add photos" : "Add more"}
                </span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleFileChange}
          />

          {errors.photos && (
            <p
              className="text-xs text-destructive"
              data-ocid="post_item.photos_field_error"
            >
              {errors.photos}
            </p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
            }}
            onBlur={() => {
              if (!title.trim())
                setErrors((p) => ({ ...p, title: "Title is required" }));
            }}
            placeholder="e.g. HP Laptop Charger 65W"
            maxLength={80}
            aria-invalid={Boolean(errors.title)}
            data-ocid="post_item.title_input"
          />
          {errors.title && (
            <p
              className="text-xs text-destructive"
              data-ocid="post_item.title_field_error"
            >
              {errors.title}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            onValueChange={(v) => {
              setCategory(v as BackendCategory);
              if (errors.category)
                setErrors((p) => ({ ...p, category: undefined }));
            }}
            value={category}
          >
            <SelectTrigger
              id="category"
              aria-invalid={Boolean(errors.category)}
              data-ocid="post_item.category_select"
            >
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <span className="flex items-center gap-2">
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p
              className="text-xs text-destructive"
              data-ocid="post_item.category_field_error"
            >
              {errors.category}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <Label htmlFor="price">
            Price (KES) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground select-none">
              KES
            </span>
            <Input
              id="price"
              type="number"
              min={1}
              step={50}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price)
                  setErrors((p) => ({ ...p, price: undefined }));
              }}
              onBlur={() => {
                const n = Number(price);
                if (!price || Number.isNaN(n) || n <= 0)
                  setErrors((p) => ({
                    ...p,
                    price: "Enter a valid price greater than 0",
                  }));
              }}
              placeholder="0"
              className="pl-14"
              aria-invalid={Boolean(errors.price)}
              data-ocid="post_item.price_input"
            />
          </div>
          {errors.price && (
            <p
              className="text-xs text-destructive"
              data-ocid="post_item.price_field_error"
            >
              {errors.price}
            </p>
          )}
          {price && Number(price) > 0 && !errors.price && (
            <p className="text-xs text-muted-foreground">
              KES {Number(price).toLocaleString("en-KE")}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Condition, size, model number, reason for selling…"
            rows={4}
            maxLength={500}
            data-ocid="post_item.description_textarea"
          />
          <p className="text-xs text-muted-foreground text-right">
            {description.length}/500
          </p>
        </div>

        {/* Upload progress bar (visible while submitting) */}
        {isSubmitting && photos.length > 0 && (
          <div className="space-y-1" data-ocid="post_item.loading_state">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Processing photos…</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold"
          data-ocid="post_item.submit_button"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditMode ? "Saving changes…" : "Posting listing…"}
            </span>
          ) : isEditMode ? (
            "Save Changes"
          ) : (
            "Post Listing"
          )}
        </Button>
      </form>
    </div>
  );
}
