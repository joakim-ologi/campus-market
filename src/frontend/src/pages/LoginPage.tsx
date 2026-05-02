import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CAMPUS_NAME } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Shield, ShoppingCart, Smartphone, Users } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: <Shield className="h-5 w-5" />,
    label: "Campus-verified accounts",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    label: "Contact via WhatsApp instantly",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: `Only ${CAMPUS_NAME} students`,
  },
];

export default function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, handleLogin } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12"
      data-ocid="login.page"
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
          <ShoppingCart
            className="h-8 w-8 text-primary-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold">
            <span className="text-primary">Campus</span>
            <span className="text-foreground">Cart</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {CAMPUS_NAME}'s student marketplace
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-sm p-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Welcome back 👋
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Sign in to buy, sell, and connect with students on campus.
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {FEATURES.map((f) => (
            <li key={f.label} className="flex items-center gap-3">
              <span className="text-primary">{f.icon}</span>
              <span className="text-sm text-foreground">{f.label}</span>
            </li>
          ))}
        </ul>

        {/* Internet Identity Login */}
        <Button
          onClick={handleLogin}
          disabled={isInitializing || isLoggingIn}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 text-base"
          data-ocid="login.submit_button"
        >
          {isInitializing
            ? "Loading…"
            : isLoggingIn
              ? "Signing in…"
              : "Sign in with Internet Identity"}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Secure, private login — no password needed.
        </p>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-xs">
        CampusCart is exclusively for {CAMPUS_NAME} students. Your identity
        stays private and secure.
      </p>
    </div>
  );
}
