import React from "react";
import { CheckCircle2, Calendar, MapPin, MessageCircle, ArrowRight, Home } from "lucide-react";
import { money } from "../data/mockData";

export default function ConfirmationView({
  beautician,
  service,
  booking,
  onGoHome,
  onGoBookings
}) {
  const b = beautician;

  return (
    <div className="page narrow center">
      <div className="success-card">
        <CheckCircle2 size={74} className="success-icon" />
        <h1 style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "-0.5px" }}>
          Booking Confirmed!
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "6px" }}>
          Your appointment with <b>{b.name}</b> has been booked and locked in.
        </p>

        {/* Confirmation Details Card */}
        <div className="confirmation-details-box">
          <div>
            <span>Booking Ref</span>
            <b>{booking?.id || "BK-78901"}</b>
          </div>
          <div>
            <span>Status</span>
            <b style={{ color: "var(--success)" }}>Confirmed & Deposit Paid</b>
          </div>
          <div>
            <span>Service</span>
            <b>{service.name}</b>
          </div>
          <div>
            <span>Beautician</span>
            <b>{b.name}</b>
          </div>
          <div>
            <span>Date & Time</span>
            <b>{booking?.date} · {booking?.time}</b>
          </div>
          <div>
            <span>Salon Location</span>
            <b>{booking?.location || b.area || b.city}</b>
          </div>
          <div>
            <span>Deposit Paid (20%)</span>
            <b style={{ color: "var(--pink)" }}>{money(booking?.deposit || service.price * 0.2)}</b>
          </div>
          <div>
            <span>Balance Due on Arrival</span>
            <b>{money(booking?.remaining || service.price * 0.8)}</b>
          </div>
        </div>

        {/* SMS / WhatsApp Notification Simulation Notice */}
        <div className="reminder-box">
          <MessageCircle size={22} style={{ flexShrink: 0 }} />
          <div>
            <b>Instant Confirmation Sent!</b>
            <div style={{ fontSize: "12.5px", marginTop: "2px" }}>
              We've dispatched an SMS & WhatsApp confirmation with directions to <b>{booking?.clientPhone || "+254 712 345 678"}</b>. You'll receive a reminder 2 hours prior to your session.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="btn-primary" onClick={onGoBookings}>
            <Calendar size={16} /> View in My Bookings
          </button>
          <button className="btn-secondary" onClick={onGoHome}>
            <Home size={16} /> Back to Glow Home
          </button>
        </div>
      </div>
    </div>
  );
}
