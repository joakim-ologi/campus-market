import { e as useNavigate, j as jsxRuntimeExports, b as Category, C as CATEGORY_META } from "./index-DD_660LP.js";
function CategoriesPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 pt-6 pb-6",
      "data-ocid": "categories.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-5", children: "Browse Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.values(Category).map((cat) => {
          const meta = CATEGORY_META[cat];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/", search: { category: cat } }),
              className: `flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-smooth text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${meta.bgColor}`,
              "data-ocid": `categories.item.${cat.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": "true", children: meta.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold text-sm ${meta.color}`, children: meta.label })
              ]
            },
            cat
          );
        }) })
      ]
    }
  );
}
export {
  CategoriesPage as default
};
