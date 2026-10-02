import React from "react";
import { ChevronRight, Calendar, Bookmark, CreditCard, MessageCircle, Settings, HelpCircle, Heart, Star } from "lucide-react";

export default function UserProfileView({
  bookingsCount,
  savedPosts,
  onNavigate,
  onOpenBooking
}) {
  return (
    <div className="page narrow">
      {/* Profile Card */}
      <section className="profile-card">
        <div className="profile-avatar-large">GK</div>
        <h1 style={{ fontSize: "24px", fontWeight: 800 }}>Grace K.</h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "2px" }}>
          Beauty Enthusiast · Nairobi, Kenya
        </p>

        <div className="profile-stats">
          <div className="profile-stats-item" style={{ cursor: "pointer" }} onClick={() => onNavigate("bookings")}>
            <b>{bookingsCount}</b>
            <span>Bookings</span>
          </div>
          <div className="profile-stats-item">
            <b>{savedPosts.length}</b>
            <span>Saved Looks</span>
          </div>
          <div className="profile-stats-item">
            <b>3</b>
            <span>Followed MUAs</span>
          </div>
        </div>
      </section>

      {/* Saved Looks Inspiration */}
      {savedPosts.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800 }}>Saved Looks Inspiration</h3>
            <span style={{ fontSize: "12px", color: "var(--pink)", fontWeight: 700 }}>
              {savedPosts.length} looks
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {savedPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  height: "120px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <img
                  src={post.image}
                  alt={post.text}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "4px 8px",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {post.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu List */}
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden", padding: "8px 16px" }}>
        <button className="menu-list-btn" onClick={() => onNavigate("bookings")}>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Calendar size={18} color="var(--pink)" /> My Appointments & Receipts
          </span>
          <ChevronRight size={18} color="var(--muted-light)" />
        </button>

        <button className="menu-list-btn" onClick={() => onNavigate("social")}>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Bookmark size={18} color="var(--pink)" /> Saved Looks & Bookmarks
          </span>
          <ChevronRight size={18} color="var(--muted-light)" />
        </button>

        <button className="menu-list-btn" onClick={() => alert("M-Pesa Express & Visa cards are active.")}>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CreditCard size={18} color="var(--pink)" /> M-Pesa & Payment Methods
          </span>
          <ChevronRight size={18} color="var(--muted-light)" />
        </button>

        <button className="menu-list-btn" onClick={() => alert("Glow Settings: Notifications enabled, currency set to KSh.")}>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Settings size={18} color="var(--pink)" /> Settings & Preferences
          </span>
          <ChevronRight size={18} color="var(--muted-light)" />
        </button>

        <button className="menu-list-btn" onClick={() => alert("Customer Support: Call +254 700 000 000 or WhatsApp support.")}>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <HelpCircle size={18} color="var(--pink)" /> Help & Support
          </span>
          <ChevronRight size={18} color="var(--muted-light)" />
        </button>
      </div>
    </div>
  );
}
