import React, { useState } from "react";
import { CalendarDays, MapPin, Clock3, CheckCircle, AlertCircle, Trash2, Calendar, Phone } from "lucide-react";
import { money } from "../data/mockData";

export default function BookingsView({
  bookings,
  onCancelBooking,
  onBookNew
}) {
  const [filterTab, setFilterTab] = useState("all");
  const [activeModalBooking, setActiveModalBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "confirmed") return b.status === "Confirmed";
    if (filterTab === "completed") return b.status === "Completed";
    return true;
  });

  return (
    <div className="page">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>My Appointments</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Track and manage your upcoming salon visits and glam sessions
          </p>
        </div>
        <button className="btn-primary btn-small" onClick={onBookNew}>
          + Book New Appointment
        </button>
      </div>

      <div className="filters-container">
        <button
          className={`filter-btn ${filterTab === "all" ? "active" : ""}`}
          onClick={() => setFilterTab("all")}
        >
          All Appointments ({bookings.length})
        </button>
        <button
          className={`filter-btn ${filterTab === "confirmed" ? "active" : ""}`}
          onClick={() => setFilterTab("confirmed")}
        >
          Upcoming & Confirmed
        </button>
        <button
          className={`filter-btn ${filterTab === "completed" ? "active" : ""}`}
          onClick={() => setFilterTab("completed")}
        >
          Past / Completed
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <CalendarDays size={52} />
          <h3 style={{ fontSize: "20px", margin: "10px 0 6px" }}>No appointments found</h3>
          <p>You don't have any appointments scheduled in this section.</p>
          <button className="btn-primary" style={{ marginTop: "18px" }} onClick={onBookNew}>
            Find a Beautician & Book Now
          </button>
        </div>
      ) : (
        <div>
          {filteredBookings.map((b) => (
            <div key={b.id} className="booking-item-card">
              <img
                src={b.beauticianImage || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80"}
                alt={b.beauticianName}
                className="booking-item-thumb"
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, marginTop: "4px" }}>
                      {b.beauticianName}
                    </h3>
                    <p style={{ color: "var(--pink)", fontWeight: 700, fontSize: "14px" }}>
                      {b.serviceName}
                    </p>
                  </div>
                  <strong style={{ fontSize: "17px", color: "var(--text-main)" }}>
                    {money(b.price)}
                  </strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "var(--muted)"
                  }}
                >
                  <span>
                    <Calendar size={13} style={{ display: "inline", verticalAlign: "middle" }} /> <b>{b.date}</b> at <b>{b.time}</b>
                  </span>
                  <span>
                    <MapPin size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {b.location}
                  </span>
                  <span>
                    Deposit: <b style={{ color: "var(--success)" }}>{money(b.deposit)} (Paid)</b>
                  </span>
                  <span>
                    Balance: <b>{money(b.remaining)}</b>
                  </span>
                </div>

                {b.notes && (
                  <p style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "6px", fontStyle: "italic" }}>
                    Note: "{b.notes}"
                  </p>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                  <button
                    className="btn-secondary btn-small"
                    onClick={() => setActiveModalBooking(b)}
                  >
                    View Receipt / Details
                  </button>

                  {b.status === "Confirmed" && (
                    <button
                      className="btn-secondary btn-small"
                      style={{ color: "#d11a2a", borderColor: "#ffd5d5" }}
                      onClick={() => onCancelBooking(b.id)}
                    >
                      <Trash2 size={13} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {activeModalBooking && (
        <div className="modal-overlay" onClick={() => setActiveModalBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModalBooking(null)}>
              ✕
            </button>
            <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>Appointment Receipt</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "18px" }}>
              Reference ID: {activeModalBooking.id}
            </p>

            <div className="confirmation-details-box" style={{ margin: "0 0 20px" }}>
              <div>
                <span>Beautician</span>
                <b>{activeModalBooking.beauticianName}</b>
              </div>
              <div>
                <span>Status</span>
                <b style={{ color: "var(--success)" }}>{activeModalBooking.status}</b>
              </div>
              <div>
                <span>Service</span>
                <b>{activeModalBooking.serviceName}</b>
              </div>
              <div>
                <span>Appointment Date</span>
                <b>{activeModalBooking.date}</b>
              </div>
              <div>
                <span>Time Slot</span>
                <b>{activeModalBooking.time}</b>
              </div>
              <div>
                <span>Location</span>
                <b>{activeModalBooking.location}</b>
              </div>
              <div>
                <span>Total Amount</span>
                <b>{money(activeModalBooking.price)}</b>
              </div>
              <div>
                <span>Deposit Paid</span>
                <b style={{ color: "var(--pink)" }}>{money(activeModalBooking.deposit)}</b>
              </div>
              <div>
                <span>Remaining Due</span>
                <b>{money(activeModalBooking.remaining)}</b>
              </div>
              <div>
                <span>Payment Method</span>
                <b>{activeModalBooking.paymentMethod || "M-Pesa Express"}</b>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn-primary btn-full"
                onClick={() => {
                  alert("Receipt saved to device!");
                  setActiveModalBooking(null);
                }}
              >
                Download Receipt PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
