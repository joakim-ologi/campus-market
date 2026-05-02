import { g as createLucideIcon, r as reactExports, j as jsxRuntimeExports, h as cn, p as useQueryClient, m as createActor, i as useAuth, e as useNavigate, I as ItemStatus, q as CAMPUS_NAME, B as Button, s as LoadingSpinner, P as Plus, l as ue, f as formatKES } from "./index-DD_660LP.js";
import { E as EmptyState } from "./EmptyState-BycNS7sV.js";
import { u as useMutation, S as Skeleton, P as Package, B as Badge, T as Trash2 } from "./skeleton-2aRTTTsQ.js";
import { I as Input, X } from "./input-HP2J-S6y.js";
import { P as Primitive, L as Label } from "./label-B5zcNORp.js";
import { u as useActor, a as useQuery } from "./useActor-Cv05IIqZ.js";
import { C as CircleCheck } from "./circle-check-D1CyQ9_K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyListings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyListings();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateProfile(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    }
  });
}
function useDeleteItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteItem(itemId);
      if (result !== "ok") throw new Error(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myListings"] });
      qc.invalidateQueries({ queryKey: ["browseItems"] });
    }
  });
}
function useMarkSold() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markSold(itemId);
      if (result !== "ok") throw new Error(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myListings"] });
      qc.invalidateQueries({ queryKey: ["browseItems"] });
    }
  });
}
function ProfilePage() {
  var _a;
  const { isAuthenticated, avatarInitials, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("profile");
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editPhone, setEditPhone] = reactExports.useState("");
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: listings, isLoading: listingsLoading } = useMyListings();
  const updateProfile = useUpdateProfile();
  const deleteItem = useDeleteItem();
  const markSold = useMarkSold();
  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }
  const activeListings = (listings == null ? void 0 : listings.filter((l) => l.status === ItemStatus.active)) ?? [];
  const totalListings = (listings == null ? void 0 : listings.length) ?? 0;
  function startEdit() {
    setEditName((profile == null ? void 0 : profile.name) ?? "");
    setEditPhone((profile == null ? void 0 : profile.whatsappPhone) ?? "");
    setIsEditing(true);
  }
  async function handleSaveProfile() {
    try {
      await updateProfile.mutateAsync({
        name: editName.trim(),
        whatsappPhone: editPhone.trim()
      });
      setIsEditing(false);
      ue.success("Profile updated!");
    } catch {
      ue.error("Failed to update profile. Please try again.");
    }
  }
  async function handleDelete(itemId) {
    try {
      await deleteItem.mutateAsync(itemId);
      setConfirmDeleteId(null);
      ue.success("Listing deleted.");
    } catch {
      ue.error("Failed to delete listing.");
    }
  }
  async function handleMarkSold(itemId) {
    try {
      await markSold.mutateAsync(itemId);
      ue.success("Marked as sold!");
    } catch {
      ue.error("Failed to mark as sold.");
    }
  }
  const displayName = (profile == null ? void 0 : profile.name) || "Student";
  const regMethod = profile == null ? void 0 : profile.registrationMethod;
  const regLabel = (regMethod == null ? void 0 : regMethod.__kind__) === "email" ? regMethod.email : (regMethod == null ? void 0 : regMethod.__kind__) === "phone" ? regMethod.phone : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 pt-6 pb-24", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl select-none", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full" }) : ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.slice(0, 2).toUpperCase()) ?? avatarInitials }),
      profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 mx-auto" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: displayName }),
        regLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: regLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 justify-center mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapPin,
            {
              className: "h-3.5 w-3.5 text-muted-foreground",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: CAMPUS_NAME })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShoppingBag,
          {
            className: "h-5 w-5 text-primary mx-auto mb-1",
            "aria-hidden": "true"
          }
        ),
        listingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: activeListings.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Package,
          {
            className: "h-5 w-5 text-accent mx-auto mb-1",
            "aria-hidden": "true"
          }
        ),
        listingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: totalListings }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Listed" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex bg-muted rounded-lg p-1 mb-5",
        role: "tablist",
        "aria-label": "Profile sections",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": tab === "profile",
              className: `flex-1 py-2 text-sm font-medium rounded-md transition-colors ${tab === "profile" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => setTab("profile"),
              "data-ocid": "profile.profile_tab",
              children: "My Profile"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": tab === "listings",
              className: `flex-1 py-2 text-sm font-medium rounded-md transition-colors ${tab === "listings" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => setTab("listings"),
              "data-ocid": "profile.listings_tab",
              children: [
                "My Listings",
                totalListings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full px-1.5 py-0.5", children: totalListings })
              ]
            }
          )
        ]
      }
    ),
    tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "Name",
              value: (profile == null ? void 0 : profile.name) ?? "—",
              loading: profileLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "WhatsApp",
              value: (profile == null ? void 0 : profile.whatsappPhone) || "Not set",
              loading: profileLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              label: "Campus",
              value: CAMPUS_NAME,
              loading: profileLoading
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full h-11",
            onClick: startEdit,
            "data-ocid": "profile.edit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }),
              "Edit Profile"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            handleSaveProfile();
          },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Display Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-name",
                    value: editName,
                    onChange: (e) => setEditName(e.target.value),
                    placeholder: "Your name",
                    maxLength: 60,
                    required: true,
                    "data-ocid": "profile.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-phone", children: "WhatsApp Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-phone",
                    value: editPhone,
                    onChange: (e) => setEditPhone(e.target.value),
                    placeholder: "+254 7XX XXX XXX",
                    type: "tel",
                    maxLength: 20,
                    "data-ocid": "profile.phone_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Buyers will use this to contact you on WhatsApp" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "flex-1 h-11",
                  disabled: updateProfile.isPending || !editName.trim(),
                  "data-ocid": "profile.save_button",
                  children: [
                    updateProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", className: "mr-2" }) : null,
                    "Save Changes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "h-11 px-4",
                  onClick: () => setIsEditing(false),
                  "data-ocid": "profile.cancel_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", "aria-hidden": "true" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full h-11 text-destructive border-destructive/30 hover:bg-destructive/10",
          onClick: handleLogout,
          "data-ocid": "profile.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }),
            "Sign Out"
          ]
        }
      )
    ] }),
    tab === "listings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          activeListings.length,
          " active · ",
          totalListings,
          " total"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => navigate({ to: "/post" }),
            "data-ocid": "profile.post_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1", "aria-hidden": "true" }),
              "Post Item"
            ]
          }
        )
      ] }),
      listingsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "space-y-3",
          "data-ocid": "profile.listings_loading_state",
          children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i))
        }
      ),
      !listingsLoading && totalListings === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "🛍️",
          headline: "No listings yet",
          subtext: "Post your first item and start selling to fellow students.",
          ctaLabel: "Post an Item",
          onCta: () => navigate({ to: "/post" })
        }
      ),
      !listingsLoading && (listings == null ? void 0 : listings.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MyListingCard,
        {
          item,
          index: idx + 1,
          confirmingDelete: confirmDeleteId === item.id,
          onEdit: () => navigate({
            to: "/post",
            search: { itemId: item.id.toString() }
          }),
          onRequestDelete: () => setConfirmDeleteId(item.id),
          onCancelDelete: () => setConfirmDeleteId(null),
          onConfirmDelete: () => handleDelete(item.id),
          onMarkSold: () => handleMarkSold(item.id),
          isDeleting: deleteItem.isPending && confirmDeleteId === item.id,
          isMarkingSold: markSold.isPending
        },
        item.id.toString()
      )))
    ] })
  ] });
}
function InfoRow({
  label,
  value,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: label }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium text-right truncate", children: value })
  ] });
}
function MyListingCard({
  item,
  index,
  confirmingDelete,
  onEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onMarkSold,
  isDeleting,
  isMarkingSold
}) {
  const isSold = item.status === ItemStatus.sold;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-3 flex gap-3 items-start",
      "data-ocid": `profile.listings.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-lg bg-muted shrink-0 overflow-hidden", children: item.imageRefs[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.imageRefs[0],
            alt: item.title,
            className: "h-full w-full object-cover",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center text-2xl", children: "🛍️" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground line-clamp-1 min-w-0 flex-1", children: item.title }),
            isSold ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "shrink-0 text-xs", children: "Sold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "shrink-0 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/10", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-primary mt-0.5", children: formatKES(Number(item.priceKES)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.category }),
          !confirmingDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-2 flex-wrap", children: [
            !isSold && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs px-2",
                onClick: onMarkSold,
                disabled: isMarkingSold,
                "data-ocid": `profile.listings.mark_sold_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1", "aria-hidden": "true" }),
                  "Mark Sold"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs px-2",
                onClick: onEdit,
                "data-ocid": `profile.listings.edit_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3 mr-1", "aria-hidden": "true" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs px-2 text-destructive border-destructive/30 hover:bg-destructive/10",
                onClick: onRequestDelete,
                "data-ocid": `profile.listings.delete_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-1", "aria-hidden": "true" }),
                  "Delete"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium", children: "Delete this listing?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "destructive",
                className: "h-7 text-xs px-2",
                onClick: onConfirmDelete,
                disabled: isDeleting,
                "data-ocid": `profile.listings.confirm_button.${index}`,
                children: [
                  isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", className: "mr-1" }) : null,
                  "Confirm"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs px-2",
                onClick: onCancelDelete,
                "data-ocid": `profile.listings.cancel_button.${index}`,
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProfilePage as default
};
