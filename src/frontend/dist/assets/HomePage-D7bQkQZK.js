import { j as jsxRuntimeExports, C as CATEGORY_META, L as Link, f as formatKES, a as CAMPUS_LOCATION, u as useSearch, r as reactExports, b as Category, S as Search, B as Button, c as SlidersHorizontal, d as LoadingGrid } from "./index-DD_660LP.js";
import { E as EmptyState } from "./EmptyState-BycNS7sV.js";
import { C as CircleCheck } from "./circle-check-D1CyQ9_K.js";
import { I as Input, X } from "./input-HP2J-S6y.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronDown } from "./select-BkZoAaWz.js";
import "./Combination-BhwMBdMf.js";
function CategoryBadge({ category, size = "md" }) {
  const meta = CATEGORY_META[category];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${meta.bgColor} ${meta.color}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: meta.emoji }),
        meta.label
      ]
    }
  );
}
function ItemCard({ item, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/item/$id",
      params: { id: item.id },
      className: "group block rounded-xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "data-ocid": `items.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.imageUrl,
              alt: item.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-4xl", children: "🛍️" }),
          item.seller.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3", "aria-hidden": "true" }),
            "Verified"
          ] }),
          item.isSold && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card text-foreground text-xs font-bold px-3 py-1 rounded-full", children: "SOLD" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.category, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug line-clamp-2 min-w-0", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-primary", children: formatKES(item.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            CAMPUS_LOCATION,
            " · ",
            item.postedAt
          ] })
        ] })
      ]
    }
  );
}
const SEED_ITEMS = [
  {
    id: "1",
    title: "Calculus Textbook (Stewart 8th Ed.)",
    description: "Good condition, minor highlights. Perfect for Engineering students.",
    price: 3500,
    category: Category.Books,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    seller: {
      name: "Erick K.",
      phone: "254712345678",
      avatarInitials: "EK",
      isVerified: true
    },
    location: "Juja",
    postedAt: "2h ago"
  },
  {
    id: "2",
    title: "HP Laptop Charger 65W",
    description: "Compatible with HP Pavilion, Envy, EliteBook. Original.",
    price: 1200,
    category: Category.Electronics,
    imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop",
    seller: { name: "Jane M.", phone: "254723456789", avatarInitials: "JM" },
    location: "Juja",
    postedAt: "2h ago"
  },
  {
    id: "3",
    title: 'Single Bed Mattress 3.5" foam',
    description: "Barely used, moving out of hostel. Self-collect from Hall 7.",
    price: 6e3,
    category: Category.BedsAndMattresses,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    seller: {
      name: "Sam O.",
      phone: "254734567890",
      avatarInitials: "SO",
      isVerified: true
    },
    location: "Juja",
    postedAt: "3h ago"
  },
  {
    id: "4",
    title: "Lab Coat (Size M) — unused",
    description: "White lab coat, bought wrong size. Still in packaging.",
    price: 1500,
    category: Category.HouseItems,
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop",
    seller: { name: "Amina L.", phone: "254745678901", avatarInitials: "AL" },
    location: "Juja",
    postedAt: "5h ago"
  },
  {
    id: "5",
    title: "Casio fx-991EX Scientific Calculator",
    description: "Used one semester. All functions working perfectly.",
    price: 2800,
    category: Category.Electronics,
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
    seller: {
      name: "Brian N.",
      phone: "254756789012",
      avatarInitials: "BN",
      isVerified: true
    },
    location: "Juja",
    postedAt: "1d ago"
  },
  {
    id: "6",
    title: "Engineering Drawing Set — Rotring",
    description: "Complete set: compass, set squares, protractor. Excellent condition.",
    price: 900,
    category: Category.HouseItems,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
    seller: { name: "Grace W.", phone: "254767890123", avatarInitials: "GW" },
    location: "Juja",
    postedAt: "1d ago"
  },
  {
    id: "7",
    title: "Second-Year Chemistry Notes (Compiled)",
    description: "Comprehensive typed notes for CHEM 201 & 202. Very helpful.",
    price: 400,
    category: Category.Books,
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop",
    seller: { name: "Peter A.", phone: "254778901234", avatarInitials: "PA" },
    location: "Juja",
    postedAt: "2d ago"
  },
  {
    id: "8",
    title: "Desk Lamp with USB Charging Port",
    description: "LED lamp, adjustable brightness. Great for night studies.",
    price: 1800,
    category: Category.HouseItems,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    seller: { name: "Cynthia R.", phone: "254789012345", avatarInitials: "CR" },
    location: "Juja",
    postedAt: "2d ago"
  },
  {
    id: "9",
    title: "University Hoodie (Size L) — JKUAT branded",
    description: "Official campus hoodie. Warm, good for cold mornings.",
    price: 2200,
    category: Category.Clothes,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
    seller: {
      name: "Kipchoge M.",
      phone: "254790123456",
      avatarInitials: "KM"
    },
    location: "Juja",
    postedAt: "3d ago"
  },
  {
    id: "10",
    title: "Structural Analysis Textbook",
    description: "Hibbeler 10th edition. Minor pencil notes inside. Good condition.",
    price: 4200,
    category: Category.Books,
    imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop",
    seller: {
      name: "Nancy W.",
      phone: "254701234567",
      avatarInitials: "NW",
      isVerified: true
    },
    location: "Juja",
    postedAt: "4d ago"
  },
  {
    id: "11",
    title: "Portable Power Bank 20000mAh",
    description: "Anker brand, fast charge. Works perfectly.",
    price: 3200,
    category: Category.Electronics,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    seller: { name: "Daniel O.", phone: "254712348765", avatarInitials: "DO" },
    location: "Juja",
    postedAt: "5d ago"
  },
  {
    id: "12",
    title: "Wall-Mount Shelf Set (3 shelves)",
    description: "Brown wooden floating shelves. Easy to install. Nails included.",
    price: 1400,
    category: Category.BedsAndMattresses,
    imageUrl: "https://images.unsplash.com/photo-1594224457860-88f75a36cbc5?w=400&h=400&fit=crop",
    seller: { name: "Lilian A.", phone: "254723478901", avatarInitials: "LA" },
    location: "Juja",
    postedAt: "6d ago"
  }
];
const PAGE_SIZE = 8;
function useDebounce(value, delay) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
const DEFAULT_FILTERS = {
  query: "",
  category: null,
  minPrice: null,
  maxPrice: null,
  sortBy: "newest"
};
function HomePage() {
  const { query: navQuery, setQuery: setNavQuery } = useSearch();
  const [filters, setFilters] = reactExports.useState(DEFAULT_FILTERS);
  const [inputQuery, setInputQuery] = reactExports.useState("");
  const [minPriceInput, setMinPriceInput] = reactExports.useState("");
  const [maxPriceInput, setMaxPriceInput] = reactExports.useState("");
  const [visibleCount, setVisibleCount] = reactExports.useState(PAGE_SIZE);
  const [isLoading] = reactExports.useState(false);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const effectiveInputQuery = navQuery || inputQuery;
  const debouncedQuery = useDebounce(effectiveInputQuery, 300);
  const debouncedMin = useDebounce(minPriceInput, 400);
  const debouncedMax = useDebounce(maxPriceInput, 400);
  reactExports.useEffect(() => {
    setFilters((prev) => ({ ...prev, query: debouncedQuery }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedQuery]);
  reactExports.useEffect(() => {
    const min = debouncedMin ? Number(debouncedMin) : null;
    setFilters((prev) => ({ ...prev, minPrice: min }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedMin]);
  reactExports.useEffect(() => {
    const max = debouncedMax ? Number(debouncedMax) : null;
    setFilters((prev) => ({ ...prev, maxPrice: max }));
    setVisibleCount(PAGE_SIZE);
  }, [debouncedMax]);
  const handleCategorySelect = reactExports.useCallback((cat) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setVisibleCount(PAGE_SIZE);
  }, []);
  const handleSortChange = reactExports.useCallback((val) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: val
    }));
  }, []);
  const clearAllFilters = reactExports.useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setInputQuery("");
    setNavQuery("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setVisibleCount(PAGE_SIZE);
  }, [setNavQuery]);
  const hasActiveFilters = filters.query || filters.category || filters.minPrice !== null || filters.maxPrice !== null || filters.sortBy !== "newest";
  const filteredAndSorted = reactExports.useMemo(() => {
    let result = SEED_ITEMS.filter((item) => {
      if (item.isSold) return false;
      const q = filters.query.toLowerCase();
      if (q && !item.title.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q))
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
    return result;
  }, [filters]);
  const visibleItems = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;
  const categories = Object.values(Category);
  const priceInputRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 pt-4 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground leading-tight", children: "Find what you need, fast." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
        "Campus deals at JKUAT · ",
        SEED_ITEMS.length,
        "+ active listings"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: effectiveInputQuery,
            onChange: (e) => {
              setInputQuery(e.target.value);
              if (navQuery) setNavQuery("");
            },
            placeholder: "Search listings…",
            className: "pl-9 pr-8 h-10 text-sm",
            "data-ocid": "home.search_input",
            "aria-label": "Search listings"
          }
        ),
        effectiveInputQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setInputQuery("");
              setNavQuery("");
            },
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "Clear search",
            "data-ocid": "home.search_clear",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "icon",
          onClick: () => setShowFilters((v) => !v),
          className: "h-10 w-10 shrink-0 md:hidden relative",
          "aria-label": "Toggle filters",
          "data-ocid": "home.filter_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-52", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filters.sortBy, onValueChange: handleSortChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-10 text-sm",
            "data-ocid": "home.sort_select",
            "aria-label": "Sort listings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest first" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_asc", children: "Price: low → high" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_desc", children: "Price: high → low" })
        ] })
      ] }) })
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "md:hidden bg-card border border-border rounded-xl p-4 mb-4 space-y-3",
        "data-ocid": "home.filter_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                className: "text-xs font-medium text-muted-foreground mb-1.5 block",
                htmlFor: "sort-mobile",
                children: "Sort by"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filters.sortBy, onValueChange: handleSortChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "sort-mobile",
                  className: "h-9 text-sm",
                  "data-ocid": "home.sort_select_mobile",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_asc", children: "Price: low → high" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_desc", children: "Price: high → low" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1.5", children: "Price range (KES)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Min",
                  value: minPriceInput,
                  onChange: (e) => setMinPriceInput(e.target.value),
                  className: "h-9 text-sm",
                  min: 0,
                  "data-ocid": "home.price_min_input",
                  "aria-label": "Minimum price in KES"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Max",
                  value: maxPriceInput,
                  onChange: (e) => setMaxPriceInput(e.target.value),
                  className: "h-9 text-sm",
                  min: 0,
                  "data-ocid": "home.price_max_input",
                  "aria-label": "Maximum price in KES",
                  ref: priceInputRef
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground shrink-0", children: "Price (KES):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          placeholder: "Min",
          value: minPriceInput,
          onChange: (e) => setMinPriceInput(e.target.value),
          className: "h-8 text-sm w-28",
          min: 0,
          "data-ocid": "home.price_min_input_desktop",
          "aria-label": "Minimum price in KES"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          placeholder: "Max",
          value: maxPriceInput,
          onChange: (e) => setMaxPriceInput(e.target.value),
          className: "h-8 text-sm w-28",
          min: 0,
          "data-ocid": "home.price_max_input_desktop",
          "aria-label": "Maximum price in KES"
        }
      ),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: clearAllFilters,
          className: "ml-auto text-xs text-muted-foreground hover:text-foreground underline transition-colors",
          "data-ocid": "home.clear_filters",
          children: "Clear all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none",
        "data-ocid": "home.category_filter",
        "aria-label": "Filter by category",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategorySelect(null),
              className: `shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${filters.category === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
              "data-ocid": "home.category_all",
              "aria-pressed": filters.category === null,
              children: "All"
            }
          ),
          categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleCategorySelect(cat === filters.category ? null : cat),
              className: `shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${filters.category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
              "data-ocid": `home.category_${cat.toLowerCase()}`,
              "aria-pressed": filters.category === cat,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: CATEGORY_META[cat].emoji }),
                CATEGORY_META[cat].label
              ]
            },
            cat
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 min-h-[1.5rem]", children: [
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filteredAndSorted.length === 0 ? "No listings found" : `${filteredAndSorted.length} listing${filteredAndSorted.length !== 1 ? "s" : ""}`,
        hasActiveFilters ? " · " : "",
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearAllFilters,
            className: "text-primary hover:underline md:hidden",
            "data-ocid": "home.clear_filters_mobile",
            children: "Clear filters"
          }
        )
      ] }),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: clearAllFilters,
          className: "hidden md:flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted/70 transition-colors",
          "data-ocid": "home.clear_filters_desktop",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
            " Clear filters"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingGrid, {}) : filteredAndSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "🔍",
        headline: "Nothing found",
        subtext: filters.query ? `No listings match "${filters.query}". Try a different keyword or clear filters.` : "No listings match your current filters. Try adjusting category or price range.",
        ctaLabel: "Clear filters",
        onCta: clearAllFilters
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4",
          "data-ocid": "home.listings_grid",
          children: visibleItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemCard, { item, index: i + 1 }, item.id))
        }
      ),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => setVisibleCount((c) => c + PAGE_SIZE),
          className: "gap-2 px-8",
          "data-ocid": "home.load_more_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Show more (",
            filteredAndSorted.length - visibleCount,
            " remaining)"
          ]
        }
      ) })
    ] })
  ] });
}
export {
  HomePage as default
};
