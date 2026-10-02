import React, { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { money } from "../data/mockData";

export default function PaymentView({
  beautician,
  service,
  booking,
  onPaymentSuccess,
  onBack
}) {
  const [method, setMethod] = useState("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState(booking?.clientPhone || "0712 345 678");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStkPrompt, setShowStkPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const b = beautician;
  const deposit = booking ? booking.deposit : service.price * 0.2;

  const handlePayClick = () => {
    if (method === "mpesa") {
      setShowStkPrompt(true);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess({
          paymentMethod: `Credit Card (Ending in ${cardNumber.slice(-4)})`,
          transactionId: "TX-" + Math.floor(100000 + Math.random() * 900000)
        });
      }, 1500);
    }
  };

  const handleSimulatedStkSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowStkPrompt(false);
      onPaymentSuccess({
        paymentMethod: `M-Pesa (${mpesaPhone})`,
        transactionId: "MPESA-" + Math.random().toString(36).substring(2, 9).toUpperCase()
      });
    }, 1600);
  };

  return (
    <div className="page narrow">
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Booking Details
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>
        Secure Checkout
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "4px" }}>
        Pay the 20% commitment deposit to instantly lock in your appointment slot.
      </p>

      <div className="payment-card" style={{ marginTop: "20px" }}>
        {/* Booking Summary */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
          <img
            src={b.image}
            alt={b.name}
            style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div>
            <b style={{ fontSize: "16px", display: "block" }}>{b.name}</b>
            <span style={{ fontSize: "14px", color: "var(--pink)", fontWeight: 700 }}>
              {service.name}
            </span>
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              {booking?.date} at {booking?.time}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="total-breakdown">
          <div className="breakdown-row">
            <span>Service Total</span>
            <b>{money(service.price)}</b>
          </div>
          <div className="breakdown-row">
            <span>Remaining at appointment</span>
            <span>{money(booking?.remaining || service.price * 0.8)}</span>
          </div>
          <div className="breakdown-row highlight">
            <span>Deposit Due Now (20%)</span>
            <strong>{money(deposit)}</strong>
          </div>
        </div>

        {/* Payment Method Select */}
        <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "8px" }}>
          Choose Payment Method
        </h3>

        <div className="payment-methods">
          <button
            type="button"
            className={`pay-method-btn ${method === "mpesa" ? "selected" : ""}`}
            onClick={() => setMethod("mpesa")}
          >
            <Smartphone size={22} color="#158657" />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>M-Pesa Express (Kenya)</div>
              <small style={{ color: "var(--muted)", fontSize: "12px" }}>
                Instant STK push notification to your phone
              </small>
            </div>
            <div className="pay-radio" />
          </button>

          {method === "mpesa" && (
            <div className="mpesa-input-group">
              <label>Safaricom M-Pesa Phone Number</label>
              <input
                type="tel"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                placeholder="0712 345 678"
              />
              <small style={{ color: "#44795b", display: "block", marginTop: "6px", fontSize: "12px" }}>
                An M-Pesa prompt will be sent to this number to authorize {money(deposit)}.
              </small>
            </div>
          )}

          <button
            type="button"
            className={`pay-method-btn ${method === "card" ? "selected" : ""}`}
            onClick={() => setMethod("card")}
          >
            <CreditCard size={22} color="var(--pink)" />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>Credit or Debit Card</div>
              <small style={{ color: "var(--muted)", fontSize: "12px" }}>
                Visa, Mastercard, American Express
              </small>
            </div>
            <div className="pay-radio" />
          </button>

          {method === "card" && (
            <div style={{ padding: "16px", background: "#faf5f8", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", fontSize: "12px", marginBottom: "16px" }}>
          <ShieldCheck size={16} color="var(--pink)" />
          <span>256-bit encrypted secure checkout. Guaranteed appointment protection.</span>
        </div>

        <button
          className="btn-primary btn-full"
          disabled={isProcessing}
          onClick={handlePayClick}
        >
          {isProcessing ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Processing Payment...
            </>
          ) : (
            `Pay Deposit · ${money(deposit)}`
          )}
        </button>
      </div>

      {/* M-Pesa STK Push Simulation Modal */}
      {showStkPrompt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "420px", textAlign: "center" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#e6f8ee",
                color: "#168657",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px"
              }}
            >
              <Smartphone size={32} />
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: 800 }}>M-Pesa STK Prompt Sent</h3>
            <p style={{ color: "var(--muted)", fontSize: "13.5px", margin: "8px 0 16px" }}>
              A prompt for <b>{money(deposit)}</b> was sent to <b>{mpesaPhone}</b>.
            </p>

            <div
              style={{
                background: "#f4f9f6",
                border: "1px solid #c9e4d5",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "left",
                fontSize: "13px",
                marginBottom: "20px"
              }}
            >
              <p style={{ color: "#1a6d45", fontWeight: 700, marginBottom: "4px" }}>
                SIMULATED PHONE NOTIFICATION:
              </p>
              <div style={{ color: "#333", fontFamily: "monospace" }}>
                Do you want to pay {money(deposit)} to Glow Beauty Services (Paybill 522522)?
              </div>
            </div>

            <form onSubmit={handleSimulatedStkSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                  Enter 4-Digit M-Pesa PIN (Demo simulation):
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  autoFocus
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  style={{
                    width: "140px",
                    padding: "10px",
                    textAlign: "center",
                    letterSpacing: "8px",
                    fontSize: "20px",
                    borderRadius: "10px",
                    border: "2px solid var(--pink)",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="btn-secondary btn-full"
                  onClick={() => setShowStkPrompt(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Confirming..." : "Authorize Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
