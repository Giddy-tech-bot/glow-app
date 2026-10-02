import React from "react";
import { User, Scissors, Store, Check, X, ShieldCheck } from "lucide-react";

export default function RoleSwitcherModal({
  currentRole,
  onSelectRole,
  onClose
}) {
  const roles = [
    {
      id: "customer",
      title: "Customer (Client)",
      name: "Grace K.",
      icon: <User size={22} />,
      badge: "Shopper & Booking Client",
      desc: "Browse looks, book appointments (pay 20% deposit), order beauty products, and view your personal appointments & delivery tracking.",
      color: "var(--pink)"
    },
    {
      id: "beautician",
      title: "Beautician / Stylist (Pro)",
      name: "Njeri Beauty",
      icon: <Scissors size={22} />,
      badge: "Service Provider",
      desc: "Manage your client appointments, view what hair or beauty style clients need, check times and client notes, and snap/record video reels.",
      color: "#168657"
    },
    {
      id: "shop_owner",
      title: "Beauty Shop Owner (Vendor)",
      name: "Nairobi Glam Beauty Supplies",
      icon: <Store size={22} />,
      badge: "Merchant & Cosmetics Seller",
      desc: "List your hair extensions, makeup, and beauty tools for sale on Glow, set prices and stock, and fulfill customer product orders.",
      color: "#7e22ce"
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "540px", padding: "26px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <ShieldCheck size={22} color="var(--pink)" />
          <h2 style={{ fontSize: "22px", fontWeight: 800 }}>Account & Role Switcher</h2>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "13.5px", marginBottom: "20px" }}>
          Choose how you want to experience Glow: as a Customer, Beautician, or Beauty Shop Owner.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => {
                  onSelectRole(r.id);
                  onClose();
                }}
                style={{
                  border: isActive ? `2px solid ${r.color}` : "1.5px solid var(--border)",
                  borderRadius: "16px",
                  padding: "16px",
                  background: isActive ? "#fffbfd" : "white",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  boxShadow: isActive ? "0 4px 16px rgba(247, 37, 120, 0.1)" : "none"
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: isActive ? r.color : "var(--pink-light)",
                    color: isActive ? "white" : r.color,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0
                  }}
                >
                  {r.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <b style={{ fontSize: "16px", color: "var(--text-main)" }}>{r.title}</b>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          background: "#f2edf1",
                          color: "var(--muted)",
                          marginLeft: "8px"
                        }}
                      >
                        {r.name}
                      </span>
                    </div>

                    {isActive && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          fontSize: "12px",
                          color: r.color,
                          fontWeight: 800
                        }}
                      >
                        <Check size={14} /> Active
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "6px", lineHeight: "1.4" }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="btn-secondary btn-full btn-small" onClick={onClose}>
            Continue as {roles.find((r) => r.id === currentRole)?.name}
          </button>
        </div>
      </div>
    </div>
  );
}
