import React, { useState } from "react";
import {
  Search, Bell, Menu, X, Home, Compass, CalendarDays,
  ShoppingBag, UserRound, Sparkles, Camera, Briefcase,
  Store, UserCheck, ShieldCheck
} from "lucide-react";

export default function TopBar({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenStudio,
  onOpenRoleSwitcher,
  currentRole = "customer",
  activeBookingsCount = 3,
  activeShopOrdersCount = 1,
  notificationCount = 2,
  userInitials = "GK"
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setShowNotifications(false);
  };

  const getRoleBadge = () => {
    if (currentRole === "beautician") {
      return {
        label: "Beautician: Njeri MUA",
        color: "#168657",
        bg: "#e6f8ee",
        portalPage: "pro-dashboard",
        portalName: "Pro Portal",
        badgeCount: activeBookingsCount
      };
    }
    if (currentRole === "shop_owner") {
      return {
        label: "Shop: Nairobi Glam",
        color: "#7e22ce",
        bg: "#f5f0ff",
        portalPage: "shop-portal",
        portalName: "Shop Portal",
        badgeCount: activeShopOrdersCount
      };
    }
    return {
      label: "Customer: Grace K.",
      color: "var(--pink)",
      bg: "#fff0f6",
      portalPage: "customer-dashboard",
      portalName: "My Hub",
      badgeCount: null
    };
  };

  const roleInfo = getRoleBadge();

  return (
    <header className="topbar">
      <button className="logo" onClick={() => handleNav("home")}>
        Glow<span>✦</span>
      </button>

      {/* Main Navigation Links */}
      <nav className="desktop-nav-links">
        <button
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
          onClick={() => handleNav("home")}
        >
          <Home size={16} /> Home
        </button>

        <button
          className={`nav-link ${currentPage === "discover" || currentPage === "profile" ? "active" : ""}`}
          onClick={() => handleNav("discover")}
        >
          <Compass size={16} /> Beauticians
        </button>

        <button
          className={`nav-link ${currentPage === "brands" ? "active" : ""}`}
          onClick={() => handleNav("brands")}
        >
          <ShoppingBag size={16} /> Products Shop
        </button>

        <button
          className={`nav-link ${currentPage === "social" ? "active" : ""}`}
          onClick={() => handleNav("social")}
        >
          <Sparkles size={16} /> Looks & Reels
        </button>

        {/* Customer specific direct link */}
        {currentRole === "customer" && (
          <button
            className={`nav-link ${currentPage === "customer-dashboard" ? "active" : ""}`}
            onClick={() => handleNav("customer-dashboard")}
          >
            <CalendarDays size={16} /> My Appointments & Orders
          </button>
        )}

        {/* Beautician specific direct link */}
        {currentRole === "beautician" && (
          <button
            className={`nav-link ${currentPage === "pro-dashboard" ? "active" : ""}`}
            onClick={() => handleNav("pro-dashboard")}
            style={{ color: "#168657" }}
          >
            <Briefcase size={16} /> Appointments Schedule ({activeBookingsCount})
          </button>
        )}

        {/* Shop Owner specific direct link */}
        {currentRole === "shop_owner" && (
          <button
            className={`nav-link ${currentPage === "shop-portal" ? "active" : ""}`}
            onClick={() => handleNav("shop-portal")}
            style={{ color: "#7e22ce" }}
          >
            <Store size={16} /> Shop Portal & Orders ({activeShopOrdersCount})
          </button>
        )}
      </nav>

      {/* Search Input */}
      <div className="search-box">
        <Search size={17} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search beauticians, hairstyles, nail sets, products..."
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            style={{ color: "var(--muted)", padding: "2px" }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="top-actions">
        {/* Role Switcher Button */}
        <button
          onClick={onOpenRoleSwitcher}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "20px",
            background: roleInfo.bg,
            color: roleInfo.color,
            fontWeight: 800,
            fontSize: "12px",
            border: `1.5px solid ${roleInfo.color}30`,
            transition: "all 0.15s ease"
          }}
          title="Switch between Customer, Beautician, and Shop Owner"
        >
          <ShieldCheck size={14} />
          <span>{roleInfo.label}</span>
          <span style={{ opacity: 0.6, fontSize: "10px" }}>▼</span>
        </button>

        {/* Camera Studio Trigger */}
        <button
          className="action-icon-btn"
          onClick={onOpenStudio}
          title="Record Reel or Snap Look"
          style={{ background: "var(--pink)", color: "white" }}
        >
          <Camera size={18} />
        </button>

        {/* Notifications */}
        <button
          className="action-icon-btn"
          aria-label="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} />
          {notificationCount > 0 && <span className="badge-dot" />}
        </button>

        {showNotifications && (
          <div
            style={{
              position: "absolute",
              top: "70px",
              right: "60px",
              width: "320px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "var(--shadow-lg)",
              zIndex: 60
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <b style={{ fontSize: "14px" }}>Notifications</b>
              <span style={{ fontSize: "12px", color: "var(--pink)", fontWeight: "700" }}>Mark read</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12.5px" }}>
              <div style={{ padding: "8px", background: "var(--pink-light)", borderRadius: "10px" }}>
                <b>Appointment Deposit Confirmed!</b> 20% deposit locked for Full Red Carpet Glam.
              </div>
              <div style={{ padding: "8px", background: "#f5f0ff", borderRadius: "10px" }}>
                <b>Product Dispatched:</b> Setting spray is out for delivery (Tracking: GLOW-EXP-9102).
              </div>
            </div>
          </div>
        )}

        {/* Account Shortcut */}
        <button
          className="user-btn"
          onClick={() => {
            if (currentRole === "customer") handleNav("customer-dashboard");
            else if (currentRole === "beautician") handleNav("pro-dashboard");
            else handleNav("shop-portal");
          }}
          title="My Dashboard"
          style={{
            background: currentRole === "beautician" ? "#168657" : (currentRole === "shop_owner" ? "#7e22ce" : "linear-gradient(135deg, var(--pink), #b40e53)")
          }}
        >
          {currentRole === "beautician" ? "NJ" : (currentRole === "shop_owner" ? "SH" : "GK")}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <div
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRoleSwitcher();
            }}
            style={{
              padding: "10px 14px",
              background: roleInfo.bg,
              color: roleInfo.color,
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "13px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <span>Current Role: {roleInfo.label}</span>
            <span>Switch ⇋</span>
          </div>

          <button className={currentPage === "home" ? "active" : ""} onClick={() => handleNav("home")}>
            <Home size={18} /> Home
          </button>
          <button className={currentPage === "discover" ? "active" : ""} onClick={() => handleNav("discover")}>
            <Compass size={18} /> Discover Beauticians
          </button>
          <button className={currentPage === "brands" ? "active" : ""} onClick={() => handleNav("brands")}>
            <ShoppingBag size={18} /> Shop Beauty Products
          </button>
          <button className={currentPage === "social" ? "active" : ""} onClick={() => handleNav("social")}>
            <Sparkles size={18} /> Social Looks & Reels
          </button>

          {currentRole === "customer" && (
            <button className={currentPage === "customer-dashboard" ? "active" : ""} onClick={() => handleNav("customer-dashboard")}>
              <CalendarDays size={18} /> My Appointments & Orders
            </button>
          )}

          {currentRole === "beautician" && (
            <button className={currentPage === "pro-dashboard" ? "active" : ""} onClick={() => handleNav("pro-dashboard")} style={{ color: "#168657" }}>
              <Briefcase size={18} /> Beautician Schedule ({activeBookingsCount})
            </button>
          )}

          {currentRole === "shop_owner" && (
            <button className={currentPage === "shop-portal" ? "active" : ""} onClick={() => handleNav("shop-portal")} style={{ color: "#7e22ce" }}>
              <Store size={18} /> Shop Products & Orders ({activeShopOrdersCount})
            </button>
          )}

          <button onClick={() => { setMobileMenuOpen(false); onOpenStudio(); }}>
            <Camera size={18} /> Snap Look / Record Reel
          </button>
        </div>
      )}
    </header>
  );
}
