import { CATEGORY_META, type Category } from "@/types";

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const meta = CATEGORY_META[category];
  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${meta.bgColor} ${meta.color}`}
    >
      <span aria-hidden="true">{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
