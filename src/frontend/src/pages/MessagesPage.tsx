import { EmptyState } from "@/components/EmptyState";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function MessagesPage() {
  const { isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-lg mx-auto" data-ocid="messages.page">
      <div className="px-4 py-5 border-b border-border">
        <h1 className="font-display text-xl font-bold text-foreground">
          Messages
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Chats with buyers &amp; sellers
        </p>
      </div>
      <EmptyState
        icon={<MessageCircle className="h-12 w-12 text-muted-foreground" />}
        headline="No messages yet"
        subtext="WhatsApp is the contact method for this version. In-app messaging is coming soon — for now, tap 'Contact Seller' on any listing to chat directly on WhatsApp."
        ctaLabel="Browse Listings"
        onCta={() => navigate({ to: "/" })}
      />
    </div>
  );
}
