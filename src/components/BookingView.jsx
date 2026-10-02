import React, { useState } from "react";
import { ArrowLeft, Clock3, Star, ChevronRight, AlertCircle, Calendar } from "lucide-react";
import { money } from "../data/mockData";

export default function BookingView({
  beautician,
  service,
  onConfirmBooking,
  onBack
}) {
  const b = beautician;

  // Generate real upcoming dates for booking selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayNum = d.getDate();
      const monthName = d.toLocaleString("default", { month: "short" });
      const weekday = d.toLocaleString("default", { weekday: "short" });
      const fullString = `${dayNum} ${monthName} ${d.getFullYear()}`;
      dates.push({ dayNum, monthName, weekday, fullString });
    }
    return dates;
  };

  const availableDates = generateDates();
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [clientNotes, setClientNotes] = useState("");
  const [clientName, setClientName] = useState("Grace K.");
  const [clientPhone, setClientPhone] = useState("0712 345 678");

  const timeSlots = [
    "9:00 AM",
    "11:00 AM",
    "1:30 PM",
    "3:30 PM",
    "5:30 PM"
  ];

  const deposit = service.price * 0.2;
  const balance = service.price * 0.8;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBooking({
      id: "BK-" + Math.floor(10000 + Math.random() * 90000),
      beauticianId: b.id,
      beauticianName: b.name,
      beauticianImage: b.image,
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      deposit,
      remaining: balance,
      date: selectedDate.fullString,
      time: selectedTime,
      clientName,
      clientPhone,
      notes: clientNotes,
      location: b.area || `${b.city}, Kenya`,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="page narrow">
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to {b.name}
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>
        Book Appointment
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px" }}>
        Reserve your session with verified beautician {b.name}
      </p>

      {/* Booking Summary Box */}
      <div className="booking-summary-banner">
        <img src={b.image} alt={b.name} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: "16px" }}>{b.name}</b>
          <p style={{ fontSize: "13px", color: "var(--pink)", fontWeight: 700 }}>
            {service.name} · {money(service.price)}
          </p>
          <div style={{ fontSize: "12px", color: "var(--muted)", display: "flex", gap: "10px", marginTop: "4px" }}>
            <span><Clock3 size={12} style={{ display: "inline", verticalAlign: "middle" }} /> {service.duration}</span>
            <span>★ {b.rating} ({b.reviewsCount} reviews)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-container">
        {/* Step 1: Date Selection */}
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, fontSize: "15px" }}>
            <Calendar size={18} color="var(--pink)" /> 1. Select Date
          </label>
          <div className="dates-grid">
            {availableDates.map((item, idx) => {
              const isChosen = selectedDate.fullString === item.fullString;
              return (
                <button
                  type="button"
                  key={idx}
                  className={`date-pill ${isChosen ? "chosen" : ""}`}
                  onClick={() => setSelectedDate(item)}
                >
                  <small>{item.weekday}</small>
                  <b>{item.dayNum}</b>
                  <small>{item.monthName}</small>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Time Slot */}
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, fontSize: "15px" }}>
            <Clock3 size={18} color="var(--pink)" /> 2. Select Time Slot
          </label>
          <div className="slots-grid">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={`slot-btn ${selectedTime === slot ? "chosen" : ""}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Contact & Special Notes */}
        <div style={{ marginTop: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  outline: "none"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Phone Number (for SMS confirmation)
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
              Special Notes / Skin Preferences (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Sensitive skin, bridal theme colors, allergies..."
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Pricing & Deposit Breakdown */}
        <div className="deposit-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              <b style={{ color: "var(--text-main)" }}>20% Commitment Deposit:</b>
            </span>
            <strong>{money(deposit)}</strong>
          </div>
          <small>
            Total service price is {money(service.price)}. The remaining balance of {money(balance)} is payable at the salon during your appointment.
          </small>
        </div>

        <button type="submit" className="btn-primary btn-full">
          Continue to Payment ({money(deposit)}) <ChevronRight size={18} />
        </button>
      </form>
    </div>
  );
}
