import { BottomNav } from "@/components/BottomNav";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  /** Hides bottom nav on pages like Login */
  hideBottomNav?: boolean;
  /** Hides top nav on full-screen pages */
  hideNav?: boolean;
}

export function Layout({
  children,
  hideBottomNav = false,
  hideNav = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && <NavBar />}

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      {!hideBottomNav && <BottomNav />}

      <footer className="hidden md:block bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm">
              <span className="text-primary">Campus</span>
              <span className="text-foreground">Cart</span>
            </span>
            <span className="text-muted-foreground text-xs">
              · Your campus marketplace
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster richColors position="top-center" />
    </div>
  );
}
