import { g as createLucideIcon, j as jsxRuntimeExports, h as cn, e as useNavigate, i as useAuth, k as useSearch, r as reactExports, B as Button, b as Category, l as ue, V as Variant_ok_notFound_unauthorized, m as createActor } from "./index-DD_660LP.js";
import { X, I as Input } from "./input-HP2J-S6y.js";
import { L as Label } from "./label-B5zcNORp.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BkZoAaWz.js";
import { u as useActor } from "./useActor-Cv05IIqZ.js";
import { A as ArrowLeft } from "./arrow-left-EZHEu2G6.js";
import "./Combination-BhwMBdMf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const CATEGORY_OPTIONS = [
  { value: Category.Electronics, label: "Electronics", emoji: "⚡" },
  {
    value: Category.BedsAndMattresses,
    label: "Beds & Mattresses",
    emoji: "🛏️"
  },
  { value: Category.Clothes, label: "Clothes", emoji: "👕" },
  { value: Category.Books, label: "Books", emoji: "📚" },
  { value: Category.HouseItems, label: "House Items", emoji: "🏠" }
];
const MAX_PHOTOS = 5;
function PostItemPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const search = useSearch({ strict: false });
  const isEditMode = Boolean(search == null ? void 0 : search.itemId);
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [photos, setPhotos] = reactExports.useState([]);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const fileInputRef = reactExports.useRef(null);
  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    const priceNum = Number(price);
    if (!price || Number.isNaN(priceNum) || priceNum <= 0)
      newErrors.price = "Enter a valid price greater than 0";
    if (photos.length === 0) newErrors.photos = "Add at least one photo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_PHOTOS - photos.length;
    const toAdd = files.slice(0, remaining);
    const newEntries = toAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      file,
      progress: 0,
      uploaded: false
    }));
    setPhotos((prev) => [...prev, ...newEntries]);
    setErrors((prev) => ({ ...prev, photos: void 0 }));
    e.target.value = "";
  };
  const removePhoto = (id) => {
    setPhotos((prev) => {
      const entry = prev.find((p) => p.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter((p) => p.id !== id);
    });
  };
  const convertToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const uploadPhotos = async () => {
    const results = [];
    const updated = [...photos];
    for (let i = 0; i < updated.length; i++) {
      const entry = updated[i];
      if (entry.uploaded && entry.dataURL) {
        results.push(entry.dataURL);
        continue;
      }
      setPhotos(
        (prev) => prev.map((p) => p.id === entry.id ? { ...p, progress: 50 } : p)
      );
      const dataURL = await convertToDataURL(entry.file);
      updated[i] = { ...entry, dataURL, uploaded: true, progress: 100 };
      results.push(dataURL);
      setPhotos([...updated]);
    }
    return results;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) {
      ue.error("Not connected. Please log in.");
      return;
    }
    setIsSubmitting(true);
    try {
      let imageRefs;
      try {
        imageRefs = await uploadPhotos();
      } catch {
        ue.error("Photo processing failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      const priceKES = BigInt(Math.round(Number(price)));
      if (isEditMode && search.itemId) {
        const input = {
          title: title.trim(),
          description: description.trim(),
          priceKES,
          category,
          imageRefs
        };
        const result = await actor.updateItem(BigInt(search.itemId), input);
        if (result === Variant_ok_notFound_unauthorized.ok) {
          ue.success("Listing updated!");
          navigate({ to: `/item/${search.itemId}` });
        } else {
          ue.error("Update failed. You may not have permission.");
        }
      } else {
        const input = {
          title: title.trim(),
          description: description.trim(),
          priceKES,
          category,
          imageRefs
        };
        const result = await actor.createItem(input);
        if (result.__kind__ === "ok") {
          ue.success("Item posted! Buyers can now find your listing.");
          navigate({ to: `/item/${result.ok.id.toString()}` });
        } else {
          ue.error(`Could not post item: ${result.err}`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const canAddMore = photos.length < MAX_PHOTOS;
  const overallProgress = photos.length > 0 ? Math.round(
    photos.reduce((sum, p) => sum + p.progress, 0) / photos.length
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-lg mx-auto px-4 pt-4 pb-24",
      "data-ocid": "post_item.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => navigate({ to: "/" }),
              "aria-label": "Go back",
              "data-ocid": "post_item.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: isEditMode ? "Edit Listing" : "Post an Item" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "space-y-5",
            "data-ocid": "post_item.form",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Photos",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                    "(",
                    photos.length,
                    "/",
                    MAX_PHOTOS,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
                  photos.map((photo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative aspect-square rounded-xl overflow-hidden bg-muted border border-border",
                      "data-ocid": `post_item.photo.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: photo.preview,
                            alt: `Upload ${idx + 1}`,
                            className: "w-full h-full object-cover"
                          }
                        ),
                        isSubmitting && !photo.uploaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground", children: [
                            photo.progress,
                            "%"
                          ] })
                        ] }),
                        isSubmitting && photo.uploaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-xs font-bold", children: "✓" }) }) }),
                        !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removePhoto(photo.id),
                            className: "absolute top-1 right-1 h-6 w-6 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-destructive transition-colors",
                            "aria-label": "Remove photo",
                            "data-ocid": `post_item.remove_photo_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                          }
                        )
                      ]
                    },
                    photo.id
                  )),
                  canAddMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      className: "aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer",
                      "aria-label": "Add photo",
                      "data-ocid": "post_item.upload_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-muted-foreground" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: photos.length === 0 ? "Add photos" : "Add more" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "sr-only",
                    onChange: handleFileChange
                  }
                ),
                errors.photos && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "post_item.photos_field_error",
                    children: errors.photos
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
                  "Title ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "title",
                    value: title,
                    onChange: (e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((p) => ({ ...p, title: void 0 }));
                    },
                    onBlur: () => {
                      if (!title.trim())
                        setErrors((p) => ({ ...p, title: "Title is required" }));
                    },
                    placeholder: "e.g. HP Laptop Charger 65W",
                    maxLength: 80,
                    "aria-invalid": Boolean(errors.title),
                    "data-ocid": "post_item.title_input"
                  }
                ),
                errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "post_item.title_field_error",
                    children: errors.title
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "category", children: [
                  "Category ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    onValueChange: (v) => {
                      setCategory(v);
                      if (errors.category)
                        setErrors((p) => ({ ...p, category: void 0 }));
                    },
                    value: category,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "category",
                          "aria-invalid": Boolean(errors.category),
                          "data-ocid": "post_item.category_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a category" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label })
                      ] }) }, opt.value)) })
                    ]
                  }
                ),
                errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "post_item.category_field_error",
                    children: errors.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
                  "Price (KES) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground select-none", children: "KES" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "price",
                      type: "number",
                      min: 1,
                      step: 50,
                      value: price,
                      onChange: (e) => {
                        setPrice(e.target.value);
                        if (errors.price)
                          setErrors((p) => ({ ...p, price: void 0 }));
                      },
                      onBlur: () => {
                        const n = Number(price);
                        if (!price || Number.isNaN(n) || n <= 0)
                          setErrors((p) => ({
                            ...p,
                            price: "Enter a valid price greater than 0"
                          }));
                      },
                      placeholder: "0",
                      className: "pl-14",
                      "aria-invalid": Boolean(errors.price),
                      "data-ocid": "post_item.price_input"
                    }
                  )
                ] }),
                errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "post_item.price_field_error",
                    children: errors.price
                  }
                ),
                price && Number(price) > 0 && !errors.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "KES ",
                  Number(price).toLocaleString("en-KE")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "description",
                    value: description,
                    onChange: (e) => setDescription(e.target.value),
                    placeholder: "Condition, size, model number, reason for selling…",
                    rows: 4,
                    maxLength: 500,
                    "data-ocid": "post_item.description_textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                  description.length,
                  "/500"
                ] })
              ] }),
              isSubmitting && photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "post_item.loading_state", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Processing photos…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    overallProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full transition-all duration-300",
                    style: { width: `${overallProgress}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "w-full h-12 text-base font-semibold",
                  "data-ocid": "post_item.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                    isEditMode ? "Saving changes…" : "Posting listing…"
                  ] }) : isEditMode ? "Save Changes" : "Post Listing"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  PostItemPage as default
};
