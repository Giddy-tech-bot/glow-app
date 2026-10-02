import React, { useState } from "react";
import {
  CalendarDays, ShoppingBag, Bookmark, Clock3, MapPin,
  CheckCircle2, Truck, Package, MessageCircle, ArrowRight,
  ChevronRight, Sparkles, Phone
} from "lucide-react";
import { money } from "../data/mockData";

export default function CustomerDashboardView({
  bookings,
  productOrders,
  savedPosts,
  onNavigate,
  onOpenChatWithBeautician
}) {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="page">
      {/* Customer Header */}
      <section className="profile-card" style={{ marginBottom: "20px" }}>
        <div className="profile-avatar-large">GK</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800 }}>Grace K.</h1>
          <span className="badge-verified" title="Verified Customer">✓</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "2px" }}>
          Client & Beauty Lover · Nairobi, Kenya
        </p>

        <div className="profile-stats">
          <div
            className="profile-stats-item"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("appointments")}
          >
            <b>{bookings.length}</b>
            <span>Appointments</span>
          </div>
          <div
            className="profile-stats-item"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("orders")}
          >
            <b style={{ color: "#7e22ce" }}>{productOrders.length}</b>
            <span>Product Orders</span>
          </div>
          <div
            className="profile-stats-item"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("saved")}
          >
            <b>{savedPosts.length}</b>
            <span>Saved Looks</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="filters-container" style={{ marginBottom: "20px" }}>
        <button
          className={`filter-btn ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          <CalendarDays size={15} /> My Service Appointments ({bookings.length})
        </button>
        <button
          className={`filter-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingBag size={15} /> My Product Orders ({productOrders.length})
        </button>
        <button
          className={`filter-btn ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={15} /> Saved Looks Inspiration ({savedPosts.length})
        </button>
      </div>

      {/* Tab 1: Service Appointments (20% Deposit Paid, 80% Balance at Salon) */}
      {activeTab === "appointments" && (
        <div>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <CalendarDays size={48} />
              <h3>No appointment bookings yet</h3>
              <p>Explore top makeup artists, braid stylists, and nail salons to book your look!</p>
              <button className="btn-primary" style={{ marginTop: "14px" }} onClick={() => onNavigate("discover")}>
                Find a Beautician
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="booking-item-card">
                <img
                  src={b.beauticianImage || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80"}
                  alt={b.beauticianName}
                  className="booking-item-thumb"
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <span className={`status-badge ${b.status?.toLowerCase()}`}>
                        {b.status}
                      </span>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, marginTop: "4px" }}>
                        {b.beauticianName}
                      </h3>
                      <p style={{ color: "var(--pink)", fontWeight: 700, fontSize: "14.5px" }}>
                        {b.serviceName}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <strong style={{ fontSize: "18px", color: "var(--text-main)", display: "block" }}>
                        {money(b.price)}
                      </strong>
                      <span style={{ fontSize: "12px", color: "var(--success)", fontWeight: 700 }}>
                        ✓ {money(b.deposit)} Deposit Paid
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "14px",
                      marginTop: "10px",
                      fontSize: "13px",
                      color: "var(--muted)"
                    }}
                  >
                    <span>
                      <Clock3 size={13} style={{ display: "inline", verticalAlign: "middle" }} /> <b>{b.date}</b> at <b>{b.time}</b> ({b.duration || "1h 30m"})
                    </span>
                    <span>
                      <MapPin size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {b.location}
                    </span>
                  </div>

                  {/* Payment Breakdown Notice */}
                  <div
                    style={{
                      background: "#fff6fa",
                      border: "1px solid #ffd8e8",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      marginTop: "10px",
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span>
                      <b>Deposit Paid (20%):</b> {money(b.deposit)} via {b.paymentMethod || "M-Pesa"}
                    </span>
                    <span style={{ color: "var(--pink)", fontWeight: 800 }}>
                      Remaining Balance Due at Salon: {money(b.remaining)}
                    </span>
                  </div>

                  {b.notes && (
                    <p style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "8px", fontStyle: "italic" }}>
                      Your Special Request: "{b.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Product Orders (100% Full Marketplace Payment) */}
      {activeTab === "orders" && (
        <div>
          {productOrders.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={48} />
              <h3>No product orders yet</h3>
              <p>Browse cosmetics, human hair bundles, setting sprays, and nail kits from verified shops.</p>
              <button className="btn-primary" style={{ marginTop: "14px" }} onClick={() => onNavigate("brands")}>
                Browse Beauty Products
              </button>
            </div>
          ) : (
            productOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: "18px",
                  padding: "18px",
                  marginBottom: "14px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <img
                  src={ord.productImage}
                  alt={ord.productTitle}
                  style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover" }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span
                        className="status-badge"
                        style={{
                          background: ord.status === "Delivered" ? "#e6f9f0" : "#f5f0ff",
                          color: ord.status === "Delivered" ? "#158b57" : "#7e22ce"
                        }}
                      >
                        <Truck size={12} style={{ display: "inline", marginRight: "4px" }} />
                        {ord.status}
                      </span>
                      <h3 style={{ fontSize: "16px", fontWeight: 800, marginTop: "4px" }}>
                        {ord.productTitle}
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--muted)" }}>
                        Seller: <b>{ord.shopName}</b> · Qty: <b>{ord.quantity}</b>
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <strong style={{ fontSize: "17px", color: "var(--text-main)" }}>
                        {money(ord.totalPaid)}
                      </strong>
                      <small style={{ display: "block", color: "var(--success)", fontSize: "11px", fontWeight: 700 }}>
                        100% Paid Upfront
                      </small>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "8px", fontSize: "12.5px", color: "var(--muted)" }}>
                    <span>Tracking: <b style={{ fontFamily: "monospace", color: "var(--pink)" }}>{ord.trackingCode}</b></span>
                    <span>Destination: <b>{ord.deliveryAddress}</b></span>
                    <span>Ordered: {ord.orderDate}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Saved Looks Inspiration */}
      {activeTab === "saved" && (
        <div>
          {savedPosts.length === 0 ? (
            <div className="empty-state">
              <Bookmark size={48} />
              <h3>No saved looks</h3>
              <p>When you see hairstyles or makeup looks you love in the Social Feed, tap the bookmark icon to save them here for your next salon visit!</p>
              <button className="btn-primary" style={{ marginTop: "14px" }} onClick={() => onNavigate("social")}>
                Explore Social Looks
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {savedPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.text}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "12px" }}>
                    <b style={{ fontSize: "13px", display: "block", color: "var(--text-main)" }}>
                      {post.user}
                    </b>
                    <p style={{ fontSize: "12px", color: "var(--muted)", margin: "4px 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.text}
                    </p>
                    <button
                      className="btn-outline-pink btn-small btn-full"
                      onClick={() => onNavigate("discover")}
                    >
                      Book Similar Look
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
