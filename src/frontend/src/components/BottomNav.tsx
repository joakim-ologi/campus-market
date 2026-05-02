import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import { Grid3x3, Home, MessageCircle, Plus, User } from "lucide-react";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  ocid: string;
  authRequired?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", icon: Home, label: "Home", ocid: "bottom_nav.home_tab" },
  {
    to: "/categories",
    icon: Grid3x3,
    label: "Categories",
    ocid: "bottom_nav.categories_tab",
  },
  {
    to: "/messages",
    icon: MessageCircle,
    label: "Messages",
    ocid: "bottom_nav.messages_tab",
    authRequired: true,
  },
  {
    to: "/profile",
    icon: User,
    label: "Profile",
    ocid: "bottom_nav.profile_tab",
    authRequired: true,
  },
];

export function BottomNav() {
  const { isAuthenticated } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-safe md:hidden"
      aria-label="Main navigation"
      data-ocid="bottom_nav"
    >
      <div className="grid grid-cols-5 h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.to;
          const Icon = item.icon;
          const to = item.authRequired && !isAuthenticated ? "/login" : item.to;

          return (
            <Link
              key={item.to}
              to={to}
              className={`flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={item.ocid}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* FAB-style Post button in center */}
        <Link
          to={isAuthenticated ? "/post" : "/login"}
          className="flex flex-col items-center justify-center gap-0.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="bottom_nav.post_tab"
          aria-label="Post an item"
        >
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center -mt-4 shadow-lg">
            <Plus
              className="h-5 w-5 text-primary-foreground"
              aria-hidden="true"
            />
          </div>
          <span className="mt-0.5">Post</span>
        </Link>
      </div>
    </nav>
  );
}
