import { j as jsxRuntimeExports, B as Button } from "./index-DD_660LP.js";
function EmptyState({
  icon,
  headline,
  subtext,
  ctaLabel,
  onCta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 px-6 text-center",
      "data-ocid": "empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: subtext }),
        ctaLabel && onCta && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onCta,
            "data-ocid": "empty_state.primary_button",
            className: "bg-primary text-primary-foreground hover:bg-primary/90",
            children: ctaLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
