import React, { useState } from "react";
import {
  Calendar, Clock3, User, Phone, MessageSquare, CheckCircle,
  AlertCircle, Camera, Video, Sparkles, Filter, ChevronRight,
  MapPin, CheckCheck, RefreshCw, Smartphone
} from "lucide-react";
import { money } from "../data/mockData";

export default function ProDashboardView({
  beauticians,
  activeBeautician,
  onSelectBeautician,
  bookings,
  onUpdateBookingStatus,
  onOpenStudio,
  onNavigate
}) {
  const [filterTab, setFilterTab] = useState("all");
  const [selectedBookingForModal, setSelectedBookingForModal] = useState(null);

  // Filter bookings belonging to the currently selected beautician
  const myBookings = bookings.filter((b) => b.beauticianId === activeBeautician.id);

  const displayedBookings = myBookings.filter((b) => {
    if (filterTab === "today") return b.date.toLowerCase().includes("today");
    if (filterTab === "confirmed") return b.status === "Confirmed";
    if (filterTab === "completed") return b.status === "Completed";
    return true;
  });

  // Analytics
  const totalRevenue = myBookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const totalDeposits = myBookings.reduce((sum, b) => sum + (b.deposit || 0), 0);
  const completedCount = myBookings.filter((b) => b.status === "Completed").length;

  return (
    <div className="page">
      {/* Header with Switcher & Capture Action */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={activeBeautician.image}
            alt={activeBeautician.name}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid var(--pink)"
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 800 }}>{activeBeautician.name}</h1>
              <span className="pill" style={{ background: "#e8f7ee", color: "#13884f", fontSize: "11px" }}>
                Pro Salon Portal
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>Switch Artist:</span>
              <select
                value={activeBeautician.id}
                onChange={(e) => {
                  const found = beauticians.find((b) => b.id === Number(e.target.value));
                  if (found) onSelectBeautician(found);
                }}
                style={{
                  padding: "4px 8px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                  fontWeight: 600,
                  outline: "none",
                  background: "white"
                }}
              >
                {beauticians.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.specialty})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Studio Trigger */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" onClick={onOpenStudio}>
            <Camera size={16} /> Snap Look / Record Video <Sparkles size={14} />
          </button>
        </div>
      </div>

      {/* Financial & Schedule Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "14px",
          marginBottom: "28px"
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "12.5px", color: "var(--muted)", display: "block" }}>
            Total Bookings
          </span>
          <b style={{ fontSize: "26px", color: "var(--text-main)", display: "block", margin: "4px 0" }}>
            {myBookings.length}
          </b>
          <small style={{ color: "var(--success)", fontSize: "11px", fontWeight: 700 }}>
            ● {myBookings.filter((b) => b.status === "Confirmed").length} Active
          </small>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "12.5px", color: "var(--muted)", display: "block" }}>
            M-Pesa Deposits Collected
          </span>
          <b style={{ fontSize: "26px", color: "var(--pink)", display: "block", margin: "4px 0" }}>
            {money(totalDeposits)}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "11px" }}>
            20% Upfront Guarantee
          </small>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "12.5px", color: "var(--muted)", display: "block" }}>
            Total Pipeline Value
          </span>
          <b style={{ fontSize: "26px", color: "var(--text-main)", display: "block", margin: "4px 0" }}>
            {money(totalRevenue)}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "11px" }}>
            Including in-salon balance
          </small>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "12.5px", color: "var(--muted)", display: "block" }}>
            Completed Sessions
          </span>
          <b style={{ fontSize: "26px", color: "#168657", display: "block", margin: "4px 0" }}>
            {completedCount}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "11px" }}>
            ★ {activeBeautician.rating} Satisfaction
          </small>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="section-title" style={{ margin: "0 0 16px" }}>
        <div>
          <h2>Client Appointments & Beauty Requests</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            View who booked, their scheduled time, and the exact hairstyle or beauty service they need
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="filters-container">
        <button
          className={`filter-btn ${filterTab === "all" ? "active" : ""}`}
          onClick={() => setFilterTab("all")}
        >
          All Client Bookings ({myBookings.length})
        </button>
        <button
          className={`filter-btn ${filterTab === "today" ? "active" : ""}`}
          onClick={() => setFilterTab("today")}
        >
          ⚡ Today's Sessions
        </button>
        <button
          className={`filter-btn ${filterTab === "confirmed" ? "active" : ""}`}
          onClick={() => setFilterTab("confirmed")}
        >
          Confirmed Appointments
        </button>
        <button
          className={`filter-btn ${filterTab === "completed" ? "active" : ""}`}
          onClick={() => setFilterTab("completed")}
        >
          Completed
        </button>
      </div>

      {displayedBookings.length === 0 ? (
        <div className="empty-state">
          <Calendar size={48} />
          <h3>No bookings in this filter</h3>
          <p>Clients who book {activeBeautician.name} will appear here with their time and requested look.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {displayedBookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "white",
                border: "1.5px solid var(--border)",
                borderRadius: "20px",
                padding: "22px",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease"
              }}
            >
              {/* Top Row: Client & Status */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "10px",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "14px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "var(--pink-light)",
                      color: "var(--pink)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      fontSize: "15px"
                    }}
                  >
                    {b.clientName ? b.clientName[0] : "C"}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800 }}>
                      {b.clientName || "Client"}
                    </h3>
                    <div style={{ fontSize: "13px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Phone size={12} /> {b.clientPhone || "+254 700 000 000"}
                      <span>·</span>
                      <span style={{ fontFamily: "monospace", fontSize: "11px" }}>{b.id}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    className="status-badge"
                    style={{
                      background: b.status === "Completed" ? "#eff1f5" : "#e6f9f0",
                      color: b.status === "Completed" ? "#5d6778" : "#158b57"
                    }}
                  >
                    {b.status}
                  </span>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--pink)" }}>
                    {money(b.price)}
                  </div>
                </div>
              </div>

              {/* Middle Section: Time & Requested Style */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "16px",
                  margin: "16px 0"
                }}
              >
                {/* Appointment Schedule */}
                <div
                  style={{
                    background: "#fff8fb",
                    border: "1px solid #ffd8e8",
                    borderRadius: "14px",
                    padding: "14px"
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--pink)", fontWeight: 700, textTransform: "uppercase" }}>
                    Scheduled Time
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <Clock3 size={18} color="var(--pink)" />
                    <b style={{ fontSize: "17px" }}>{b.date} · {b.time}</b>
                  </div>
                  <small style={{ color: "var(--muted)", display: "block", marginTop: "4px" }}>
                    Duration: {b.duration || "1h 30m"} · {b.location}
                  </small>
                </div>

                {/* Requested Hair or Beauty Thing */}
                <div
                  style={{
                    background: "#f9f7fa",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "14px"
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Requested Beauty / Hair Service
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <Sparkles size={18} color="var(--gold)" />
                    <b style={{ fontSize: "17px", color: "var(--text-main)" }}>{b.serviceName}</b>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "4px" }}>
                    Deposit paid: <strong style={{ color: "var(--success)" }}>{money(b.deposit)}</strong> · Balance due on arrival: <strong style={{ color: "var(--pink)" }}>{money(b.remaining)}</strong>
                  </div>
                </div>
              </div>

              {/* Client Notes & Preferences */}
              {b.notes && (
                <div
                  style={{
                    background: "#fbf6f9",
                    borderLeft: "3px solid var(--pink)",
                    borderRadius: "0 10px 10px 0",
                    padding: "10px 14px",
                    marginBottom: "16px",
                    fontSize: "13.5px"
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--pink)", display: "block", fontSize: "12px" }}>
                    Client's Preferences & Custom Notes:
                  </span>
                  <p style={{ color: "var(--text-main)", marginTop: "2px" }}>
                    "{b.notes}"
                  </p>
                </div>
              )}

              {/* Actions Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-light)"
                }}
              >
                {/* Direct Contact Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <a
                    href={`https://wa.me/${(b.clientPhone || "254712345678").replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(b.clientName || "there")},%20this%20is%20${encodeURIComponent(activeBeautician.name)}%20confirming%20your%20appointment%20for%20${encodeURIComponent(b.serviceName)}%20at%20${encodeURIComponent(b.time)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary btn-small"
                    style={{ background: "#e8f7ee", color: "#13884f", borderColor: "#c4ebcf" }}
                  >
                    <Smartphone size={13} /> WhatsApp Client
                  </a>

                  <a
                    href={`tel:${b.clientPhone || "+254712345678"}`}
                    className="btn-secondary btn-small"
                  >
                    <Phone size={13} /> Call
                  </a>
                </div>

                {/* Status Update Actions */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {b.status !== "Completed" && (
                    <button
                      className="btn-primary btn-small"
                      onClick={() => onUpdateBookingStatus(b.id, "Completed")}
                    >
                      <CheckCheck size={14} /> Mark as Done & Collect {money(b.remaining)}
                    </button>
                  )}

                  {b.status === "Confirmed" && (
                    <button
                      className="btn-secondary btn-small"
                      onClick={() => {
                        onOpenStudio();
                      }}
                      title="Photograph the completed look"
                    >
                      <Camera size={13} /> Snap Before/After Look
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
