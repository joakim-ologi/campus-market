import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Search, ShoppingCart, SlidersHorizontal } from "lucide-react";

export function NavBar() {
  const { isAuthenticated, identity } = useInternetIdentity();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const initials = identity
    ? identity.getPrincipal().toString().slice(0, 2).toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          data-ocid="nav.logo_link"
        >
          <ShoppingCart className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-display font-bold text-base">
            <span className="text-primary">Campus</span>
            <span className="text-foreground">Cart</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search textbooks, electronics…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            data-ocid="nav.search_input"
            aria-label="Search items"
          />
        </div>

        {/* Filter */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Open filters"
          data-ocid="nav.filter_button"
          onClick={() => navigate({ to: "/" })}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        {/* Post / Avatar */}
        {isAuthenticated ? (
          <Link
            to="/post"
            data-ocid="nav.post_button"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Plus
                className="h-4 w-4 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            data-ocid="nav.login_link"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
              {initials || "?"}
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
