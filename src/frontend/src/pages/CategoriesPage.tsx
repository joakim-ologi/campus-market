import { Category } from "@/backend";
import { CATEGORY_META } from "@/types";
import { useNavigate } from "@tanstack/react-router";

export default function CategoriesPage() {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-2xl mx-auto px-4 pt-6 pb-6"
      data-ocid="categories.page"
    >
      <h1 className="font-display text-2xl font-bold text-foreground mb-5">
        Browse Categories
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(Category).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <button
              type="button"
              key={cat}
              onClick={() => navigate({ to: "/", search: { category: cat } })}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-smooth text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${meta.bgColor}`}
              data-ocid={`categories.item.${cat.toLowerCase()}`}
            >
              <span className="text-4xl" aria-hidden="true">
                {meta.emoji}
              </span>
              <span className={`font-semibold text-sm ${meta.color}`}>
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
