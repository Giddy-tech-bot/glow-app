import React, { useState } from "react";
import { X, Smartphone, CreditCard, ShieldCheck, MapPin, Truck, CheckCircle2, Loader2 } from "lucide-react";
import { money } from "../data/mockData";

export default function ProductCheckoutModal({
  product,
  onClose,
  onOrderSuccess,
  currentCustomer
}) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // 'delivery' | 'pickup'
  const [deliveryAddress, setDeliveryAddress] = useState("Kilimani, Argwings Kodhek Rd, Nairobi");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStkPrompt, setShowStkPrompt] = useState(false);
  const [pin, setPin] = useState("");

  const itemTotal = (product?.price || 0) * quantity;
  const deliveryFee = deliveryMethod === "delivery" ? 250 : 0;
  const grandTotal = itemTotal + deliveryFee;

  const handlePayClick = () => {
    if (paymentMethod === "mpesa") {
      setShowStkPrompt(true);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        completeOrder(`Card Payment (•••• 4242)`);
      }, 1500);
    }
  };

  const handleStkSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowStkPrompt(false);
      completeOrder(`M-Pesa Buy Goods Till (${phone})`);
    }, 1500);
  };

  const completeOrder = (methodUsed) => {
    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      type: "product_order",
      shopId: product.shopId || "shop-1",
      shopName: product.shopName || "Nairobi Glam Beauty Supplies",
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      quantity,
      itemPrice: product.price,
      deliveryFee,
      totalPaid: grandTotal, // 100% full product payment
      paymentMethod: methodUsed,
      customerName: currentCustomer?.name || "Grace K.",
      customerPhone: phone,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : "In-Shop Pickup",
      orderDate: "Just now",
      status: "Processing",
      trackingCode: "GLOW-EXP-" + Math.floor(10000 + Math.random() * 90000)
    };

    onOrderSuccess(newOrder);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "520px", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <h2 style={{ fontSize: "22px", fontWeight: 800 }}>Buy Beauty Product</h2>
        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px" }}>
          Sold & Dispatched by <b>{product?.shopName || "Glow Verified Shop"}</b>
        </p>

        {/* Product Card */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            padding: "12px",
            background: "#faf5f8",
            borderRadius: "14px",
            marginBottom: "16px",
            border: "1px solid var(--border)"
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "65px", height: "65px", borderRadius: "10px", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: "14.5px", display: "block", lineHeight: "1.3" }}>
              {product.title}
            </b>
            <span style={{ fontSize: "14px", color: "var(--pink)", fontWeight: 800 }}>
              {money(product.price)} each
            </span>
          </div>

          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", padding: "4px 8px", borderRadius: "10px", border: "1px solid var(--border)" }}>
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ fontWeight: 800, fontSize: "16px", width: "22px" }}
            >
              -
            </button>
            <b style={{ fontSize: "14px" }}>{quantity}</b>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              style={{ fontWeight: 800, fontSize: "16px", width: "22px" }}
            >
              +
            </button>
          </div>
        </div>

        {/* Delivery vs Pickup */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px" }}>
            Delivery Option
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              type="button"
              className={`filter-btn ${deliveryMethod === "delivery" ? "active" : ""}`}
              onClick={() => setDeliveryMethod("delivery")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Truck size={14} /> Doorstep Delivery (+KSh 250)
            </button>
            <button
              type="button"
              className={`filter-btn ${deliveryMethod === "pickup" ? "active" : ""}`}
              onClick={() => setDeliveryMethod("pickup")}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <MapPin size={14} /> Salon Pickup (Free)
            </button>
          </div>
        </div>

        {/* Delivery Address & Contact */}
        {deliveryMethod === "delivery" && (
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
              Delivery Address & Apartment
            </label>
            <input
              type="text"
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", fontSize: "13px" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
            Contact Phone Number for Courier
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", fontSize: "13px" }}
          />
        </div>

        {/* Price Breakdown - 100% PRODUCT PAYMENT (SEPARATED FROM SERVICE DEPOSIT) */}
        <div
          style={{
            background: "#fdf8fa",
            border: "1px solid #ffd3e4",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "16px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--muted)", marginBottom: "4px" }}>
            <span>Items Subtotal ({quantity}x)</span>
            <b>{money(itemTotal)}</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--muted)", marginBottom: "8px" }}>
            <span>Courier Delivery Fee</span>
            <b>{deliveryFee > 0 ? money(deliveryFee) : "Free"}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              fontWeight: 800,
              paddingTop: "8px",
              borderTop: "1px solid #f2d1de"
            }}
          >
            <span>Total to Pay (100% Product Payment):</span>
            <span style={{ color: "var(--pink)" }}>{money(grandTotal)}</span>
          </div>
          <small style={{ color: "var(--muted)", fontSize: "11px", display: "block", marginTop: "4px" }}>
            Payment goes directly to {product?.shopName || "Seller"}. Fast same-day / next-day delivery across Kenya.
          </small>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px" }}>
            Payment Method
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              type="button"
              className={`pay-method-btn ${paymentMethod === "mpesa" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("mpesa")}
              style={{ padding: "10px 14px", margin: 0 }}
            >
              <Smartphone size={18} color="#158657" />
              <span style={{ fontSize: "13px" }}>M-Pesa Paybill</span>
            </button>
            <button
              type="button"
              className={`pay-method-btn ${paymentMethod === "card" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("card")}
              style={{ padding: "10px 14px", margin: 0 }}
            >
              <CreditCard size={18} color="var(--pink)" />
              <span style={{ fontSize: "13px" }}>Card / Visa</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary btn-full"
          disabled={isProcessing}
          onClick={handlePayClick}
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Authorizing Payment...
            </>
          ) : (
            `Pay ${money(grandTotal)} to ${product?.shopName || "Shop"}`
          )}
        </button>
      </div>

      {/* STK Push Prompt for Product Purchase */}
      {showStkPrompt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "400px", textAlign: "center" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800 }}>M-Pesa STK Prompt Sent</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px", margin: "6px 0 14px" }}>
              Authorize <b>{money(grandTotal)}</b> for <b>{product?.title}</b> to {product?.shopName}.
            </p>

            <form onSubmit={handleStkSubmit}>
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="PIN"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={{
                  width: "120px",
                  padding: "8px",
                  textAlign: "center",
                  letterSpacing: "6px",
                  fontSize: "20px",
                  borderRadius: "10px",
                  border: "2px solid var(--pink)",
                  outline: "none",
                  marginBottom: "16px"
                }}
              />
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
                  {isProcessing ? "Verifying..." : "Confirm & Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
