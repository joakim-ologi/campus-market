import { a1 as useInternetIdentity, e as useNavigate, r as reactExports, j as jsxRuntimeExports, M as MessageCircle } from "./index-DD_660LP.js";
import { E as EmptyState } from "./EmptyState-BycNS7sV.js";
function MessagesPage() {
  const { isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", "data-ocid": "messages.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Chats with buyers & sellers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-12 w-12 text-muted-foreground" }),
        headline: "No messages yet",
        subtext: "WhatsApp is the contact method for this version. In-app messaging is coming soon — for now, tap 'Contact Seller' on any listing to chat directly on WhatsApp.",
        ctaLabel: "Browse Listings",
        onCta: () => navigate({ to: "/" })
      }
    )
  ] });
}
export {
  MessagesPage as default
};
