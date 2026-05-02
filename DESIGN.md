# Campus Marketplace Design

## Tone
Vibrant, approachable, energetic yet functional. Built for young students seeking quick, straightforward item discovery and transactions.

## Differentiation
Mobile-first grid browsing with instant item discovery, integrated WhatsApp CTA for buyer-seller contact, category-driven discovery, prominent pricing.

## Color Palette

| Usage | Light OKLCH | Dark OKLCH | Semantic |
|-------|-----------|-----------|----------|
| Primary (Action, CTAs) | 0.55 0.18 180 | 0.65 0.20 180 | Warm teal/blue — decisive, trustworthy |
| Secondary (Supporting, highlights) | 0.88 0.08 41 | 0.25 0.04 280 | Warm amber — price highlights, badges |
| Accent (Interactive focus) | 0.60 0.20 40 | 0.70 0.22 40 | Saturated warm — WhatsApp CTA, active states |
| Background | 0.98 0.01 280 | 0.12 0.02 280 | Off-white to near-black |
| Card | 0.99 0.01 280 | 0.16 0.02 280 | Minimal lift on background |
| Foreground | 0.15 0.02 280 | 0.95 0.02 280 | Near-black to near-white |
| Muted | 0.92 0.02 280 | 0.25 0.02 280 | Secondary text, borders |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Red for warnings, delete actions |

## Typography

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Display | General Sans | 24–32px | 600–700 | Page titles, category names, item highlights |
| Body | Figtree | 14–16px | 400–500 | Item descriptions, labels, prices, listings |
| Mono | JetBrains Mono | 12–14px | 400 | Price tags, tags, technical labels |

## Elevation & Depth

- **Base**: `bg-background` (off-white light / near-black dark)  
- **Raised**: `bg-card` with `shadow-sm` (subtle, 1–2px offset)  
- **Header**: `bg-card` with `border-b` for clarity  
- **Listing cards**: `bg-card` with `shadow-sm`, `rounded-lg` (8px)  

## Structural Zones

| Zone | Light Mode | Dark Mode | Purpose |
|------|-----------|-----------|----------|
| Header/Navigation | `bg-card` + `border-b` | `bg-card` + `border-b` | App identity, search, user menu |
| Main content (listings) | `bg-background` | `bg-background` | Grid container for marketplace items |
| Item card | `bg-card` + `shadow-sm` | `bg-card` + `shadow-sm` | Individual listing with image, title, price, category |
| Category pills | `bg-secondary` + `text-secondary-foreground` | `bg-secondary` + `text-secondary-foreground` | Warm highlights for category, price, availability |
| CTA (WhatsApp) | `bg-accent` + `text-accent-foreground` | `bg-accent` + `text-accent-foreground` | Bold, warm green for buyer-seller contact |
| Footer | `bg-muted/30` + `border-t` | `bg-muted/30` + `border-t` | Navigation, legal, support links |

## Spacing & Rhythm

- **Card gap**: 16px (mobile), 20px (tablet+)  
- **Content padding**: 16px (mobile), 24px (desktop)  
- **Baseline unit**: 4px; multiples of 4 throughout  
- **Mobile**: Single-column or 2-column grid  
- **Tablet**: 2–3 column grid  
- **Desktop**: 3–4 column grid (responsive via Tailwind)  

## Component Patterns

- **Item card**: Image (4:3 or 3:2 ratio) → title → category badge (pill, small) → price (bold, mono) → seller info (small text) → CTA button (WhatsApp)  
- **Category filter**: Horizontal scroll or dropdown; selected state uses `bg-primary` + `text-primary-foreground`  
- **Search bar**: Full-width on mobile, icon-search on desktop; subtle border, `bg-input`  
- **Price display**: Bold mono font, `text-foreground` on light, warm `text-secondary` highlight for promo/listed prices  

## Motion

- **Transition default**: `transition-smooth` (0.3s cubic-bezier) for all interactive state changes  
- **Hover**: Subtle lift on cards (shadow increase) + scale(1.02)  
- **Button press**: Scale(0.98) + color shift  
- **Page transitions**: Fade-in on load, no disruptive animations  

## Constraints

- No full-page gradients or decorative overlays  
- No generic shadows; use `shadow-sm` for cards only  
- No multiple accent colors; warm teal + warm amber + red only  
- Mobile-first responsive design (no desktop-first assumptions)  
- WhatsApp green as accent for CTA to reinforce integration  
- High contrast for prices and CTAs (accessibility first)  

## Signature Detail

Warm amber category badges and price highlights on listing cards create a visual anchor point — students immediately recognize the most relevant item info (what, category, how much). This, combined with the WhatsApp CTA button, makes the action path (discover → learn → contact → transact) visually obvious.
