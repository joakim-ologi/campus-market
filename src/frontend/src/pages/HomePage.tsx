import { Category } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { ItemCard } from "@/components/ItemCard";
import { LoadingGrid } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearch } from "@/hooks/useSearch";
import { CATEGORY_META, type FilterState, type ItemSummary } from "@/types";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Realistic JKUAT campus seed listings
const SEED_ITEMS: ItemSummary[] = [
  {
    id: "1",
    title: "Calculus Textbook (Stewart 8th Ed.)",
    description:
      "Good condition, minor highlights. Perfect for Engineering students.",
    price: 3500,
    category: Category.Books,
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    seller: {
      name: "Erick K.",
      phone: "254712345678",
      avatarInitials: "EK",
      isVerified: true,
    },
    location: "Juja",
    postedAt: "2h ago",
  },
  {
    id: "2",
    title: "HP Laptop Charger 65W",
    description: "Compatible with HP Pavilion, Envy, EliteBook. Original.",
    price: 1200,
    category: Category.Electronics,
    imageUrl:
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop",
    seller: { name: "Jane M.", phone: "254723456789", avatarInitials: "JM" },
    location: "Juja",
    postedAt: "2h ago",
  },
  {
    id: "3",
    title: 'Single Bed Mattress 3.5" foam',
    description: "Barely used, moving out of hostel. Self-collect from Hall 7.",
    price: 6000,
    category: Category.BedsAndMattresses,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    seller: {
      name: "Sam O.",
      phone: "254734567890",
      avatarInitials: "SO",
      isVerified: true,
    },
    location: "Juja",
    postedAt: "3h ago",
  },
  {
    id: "4",
    title: "Lab Coat (Size M) — unused",
    description: "White lab coat, bought wrong size. Still in packaging.",
    price: 1500,
    category: Category.HouseItems,
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop",
    seller: { name: "Amina L.", phone: "254745678901", avatarInitials: "AL" },
    location: "Juja",
    postedAt: "5h ago",
  },
  {
    id: "5",
    title: "Casio fx-991EX Scientific Calculator",
    description: "Used one semester. All functions working perfectly.",
    price: 2800,
    category: Category.Electronics,
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
    seller: {
      name: "Brian N.",
      phone: "254756789012",
      avatarInitials: "BN",
      isVerified: true,
    },
    location: "Juja",
    postedAt: "1d ago",
  },
  {
    id: "6",
    title: "Engineering Drawing Set — Rotring",
    description:
      "Complete set: compass, set squares, protractor. Excellent condition.",
    price: 900,
    category: Category.HouseItems,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
    seller: { name: "Grace W.", phone: "254767890123", avatarInitials: "GW" },
    location: "Juja",
    postedAt: "1d ago",
  },
  {
    id: "7",
    title: "Second-Year Chemistry Notes (Compiled)",
    description: "Comprehensive typed notes for CHEM 201 & 202. Very helpful.",
    price: 400,
    category: Category.Books,
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop",
    seller: { name: "Peter A.", phone: "254778901234", avatarInitials: "PA" },
    location: "Juja",
    postedAt: "2d ago",
  },
  {
    id: "8",
    title: "Desk Lamp with USB Charging Port",
    description: "LED lamp, adjustable brightness. Great for night studies.",
    price: 1800,
    category: Category.HouseItems,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    seller: { name: "Cynthia R.", phone: "254789012345", avatarInitials: "CR" },
    location: "Juja",
    postedAt: "2d ago",
  },
  {
    id: "9",
    title: "University Hoodie (Size L) — JKUAT branded",
    description: "Official campus hoodie. Warm, good for cold mornings.",
    price: 2200,
    category: Category.Clothes,
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
    seller: {
      name: "Kipchoge M.",
      phone: "254790123456",
      avatarInitials: "KM",
    },
    location: "Juja",
    postedAt: "3d ago",
  },
  {
    id: "10",
    title: "Structural Analysis Textbook",
    description:
      "Hibbeler 10th edition. Minor pencil notes inside. Good condition.",
    price: 4200,
    category: Category.Books,
    imageUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop",
    seller: {
      name: "Nancy W.",
      phone: "254701234567",
      avatarInitials: "NW",
      isVerified: true,
    },
    location: "Juja",
    postedAt: "4d ago",
  },
  {
    id: "11",
    title: "Portable Power Bank 20000mAh",
    description: "Anker brand, fast charge. Works perfectly.",
    price: 3200,
    category: Category.Electronics,
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    seller: { name: "Daniel O.", phone: "254712348765", avatarInitials: "DO" },
    location: "Juja",
    postedAt: "5d ago",
  },
  {
    id: "12",
    title: "Wall-Mount Shelf Set (3 shelves)",
    description:
      "Brown wooden floating shelves. Easy to install. Nails included.",
    price: 1400,
    category: Category.BedsAndMattresses,
    imageUrl:
      "https://images.unsplash.com/photo-1594224457860-88f75a36cbc5?w=400&h=400&fit=crop",
    seller: { name: "Lilian A.", phone: "254723478901", avatarInitials: "LA" },
    location: "Juja",
    postedAt: "6d ago",
  },
];

const PAGE_SIZE = 8;

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const DEFAULT_FILTERS: FilterState = {
  query: "",
  category: null,
  minPrice: null,
  maxPrice: null,
  sortBy: "newest",
};

export default function HomePage() {
  const { query: navQuery, setQuery: setNavQuery } = useSearch();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [inputQuery, setInputQuery] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Merge NavBar search context (takes priority when non-empty) with local search
  const effectiveInputQuery = navQuery || inputQuery;
  const debouncedQuery = useDebounce(effectiveInputQuery, 300);
  const debouncedMin = useDebounce(minPriceInput, 400);
  const debouncedMax = useDebounce(maxPriceInput, 400);

  // Sync debounced values into filters
  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: debouncedQuery }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedQuery]);

  useEffect(() => {
    const min = debouncedMin ? Number(debouncedMin) : null;
    setFilters((prev) => ({ ...prev, minPrice: min }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedMin]);

  useEffect(() => {
    const max = debouncedMax ? Number(debouncedMax) : null;
    setFilters((prev) => ({ ...prev, maxPrice: max }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedMax]);

  const handleCategorySelect = useCallback((cat: Category | null) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSortChange = useCallback((val: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: val as FilterState["sortBy"],
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setInputQuery("");
    setNavQuery("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setVisibleCount(PAGE_SIZE);
  }, [setNavQuery]);

  const hasActiveFilters =
    filters.query ||
    filters.category ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.sortBy !== "newest";

  const filteredAndSorted = useMemo(() => {
    let result = SEED_ITEMS.filter((item) => {
      if (item.isSold) return false;
      const q = filters.query.toLowerCase();
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q)
      )
        return false;
      if (filters.category && item.category !== filters.category) return false;
      if (filters.minPrice !== null && item.price < filters.minPrice)
        return false;
      if (filters.maxPrice !== null && item.price > filters.maxPrice)
        return false;
      return true;
    });

    if (filters.sortBy === "price_asc")
      result.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price_desc")
      result.sort((a, b) => b.price - a.price);
    // newest: SEED_ITEMS order is already newest-first

    return result;
  }, [filters]);

  const visibleItems = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;
  const categories = Object.values(Category);

  const priceInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-10">
      {/* Hero bar */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
          Find what you need, fast.
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Campus deals at JKUAT · {SEED_ITEMS.length}+ active listings
        </p>
      </div>

      {/* Search + Filter toggle row */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            value={effectiveInputQuery}
            onChange={(e) => {
              setInputQuery(e.target.value);
              if (navQuery) setNavQuery("");
            }}
            placeholder="Search listings…"
            className="pl-9 pr-8 h-10 text-sm"
            data-ocid="home.search_input"
            aria-label="Search listings"
          />
          {effectiveInputQuery && (
            <button
              type="button"
              onClick={() => {
                setInputQuery("");
                setNavQuery("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
              data-ocid="home.search_clear"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter toggle (mobile) */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowFilters((v) => !v)}
          className="h-10 w-10 shrink-0 md:hidden relative"
          aria-label="Toggle filters"
          data-ocid="home.filter_toggle"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {hasActiveFilters && (
            <span
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
          )}
        </Button>

        {/* Sort select — always visible on md+ */}
        <div className="hidden md:block w-52">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger
              className="h-10 text-sm"
              data-ocid="home.sort_select"
              aria-label="Sort listings"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: low → high</SelectItem>
              <SelectItem value="price_desc">Price: high → low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile expanded filter panel */}
      {showFilters && (
        <div
          className="md:hidden bg-card border border-border rounded-xl p-4 mb-4 space-y-3"
          data-ocid="home.filter_panel"
        >
          {/* Sort */}
          <div>
            <label
              className="text-xs font-medium text-muted-foreground mb-1.5 block"
              htmlFor="sort-mobile"
            >
              Sort by
            </label>
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger
                id="sort-mobile"
                className="h-9 text-sm"
                data-ocid="home.sort_select_mobile"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="price_asc">Price: low → high</SelectItem>
                <SelectItem value="price_desc">Price: high → low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Price range */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Price range (KES)
            </p>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="h-9 text-sm"
                min={0}
                data-ocid="home.price_min_input"
                aria-label="Minimum price in KES"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="h-9 text-sm"
                min={0}
                data-ocid="home.price_max_input"
                aria-label="Maximum price in KES"
                ref={priceInputRef}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop filter row: price range */}
      <div className="hidden md:flex items-center gap-3 mb-4">
        <span className="text-xs font-medium text-muted-foreground shrink-0">
          Price (KES):
        </span>
        <Input
          type="number"
          placeholder="Min"
          value={minPriceInput}
          onChange={(e) => setMinPriceInput(e.target.value)}
          className="h-8 text-sm w-28"
          min={0}
          data-ocid="home.price_min_input_desktop"
          aria-label="Minimum price in KES"
        />
        <span className="text-muted-foreground text-xs">–</span>
        <Input
          type="number"
          placeholder="Max"
          value={maxPriceInput}
          onChange={(e) => setMaxPriceInput(e.target.value)}
          className="h-8 text-sm w-28"
          min={0}
          data-ocid="home.price_max_input_desktop"
          aria-label="Maximum price in KES"
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            data-ocid="home.clear_filters"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none"
        data-ocid="home.category_filter"
        aria-label="Filter by category"
      >
        <button
          type="button"
          onClick={() => handleCategorySelect(null)}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filters.category === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          data-ocid="home.category_all"
          aria-pressed={filters.category === null}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() =>
              handleCategorySelect(cat === filters.category ? null : cat)
            }
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filters.category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            data-ocid={`home.category_${cat.toLowerCase()}`}
            aria-pressed={filters.category === cat}
          >
            <span aria-hidden="true">{CATEGORY_META[cat].emoji}</span>
            {CATEGORY_META[cat].label}
          </button>
        ))}
      </div>

      {/* Results summary row */}
      <div className="flex items-center justify-between mb-3 min-h-[1.5rem]">
        {!isLoading && (
          <p className="text-xs text-muted-foreground">
            {filteredAndSorted.length === 0
              ? "No listings found"
              : `${filteredAndSorted.length} listing${filteredAndSorted.length !== 1 ? "s" : ""}`}
            {hasActiveFilters ? " · " : ""}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-primary hover:underline md:hidden"
                data-ocid="home.clear_filters_mobile"
              >
                Clear filters
              </button>
            )}
          </p>
        )}
        {/* Desktop clear-all pill if active filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="hidden md:flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted/70 transition-colors"
            data-ocid="home.clear_filters_desktop"
          >
            <X className="h-3 w-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingGrid />
      ) : filteredAndSorted.length === 0 ? (
        <EmptyState
          icon="🔍"
          headline="Nothing found"
          subtext={
            filters.query
              ? `No listings match "${filters.query}". Try a different keyword or clear filters.`
              : "No listings match your current filters. Try adjusting category or price range."
          }
          ctaLabel="Clear filters"
          onCta={clearAllFilters}
        />
      ) : (
        <>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            data-ocid="home.listings_grid"
          >
            {visibleItems.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i + 1} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="gap-2 px-8"
                data-ocid="home.load_more_button"
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                Show more ({filteredAndSorted.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
