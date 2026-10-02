import React, { useState } from "react";
import {
  Store, PlusCircle, Package, ShoppingBag, Truck, Tag,
  CheckCircle, Trash2, Edit3, Image, AlertCircle, Sparkles,
  DollarSign
} from "lucide-react";
import { money } from "../data/mockData";

export default function ShopOwnerPortalView({
  products,
  productOrders,
  onAddNewProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'orders'
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Makeup");
  const [price, setPrice] = useState("2200");
  const [stock, setStock] = useState("20");
  const [desc, setDesc] = useState("");

  const samplePhotoPresets = [
    {
      label: "Cosmetics & Setting Spray",
      url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80"
    },
    {
      label: "Braiding Hair & Bundles",
      url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80"
    },
    {
      label: "Hyaluronic Serum & Skincare",
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
    },
    {
      label: "BIAB Nails & Polish Kit",
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80"
    }
  ];

  const [imageUrl, setImageUrl] = useState(samplePhotoPresets[0].url);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const newProd = {
      id: "prod-" + Date.now(),
      shopId: "shop-1",
      shopName: "Nairobi Glam Beauty Supplies",
      title: title.trim(),
      category,
      price: Number(price),
      stock: Number(stock) || 10,
      rating: 5.0,
      salesCount: 0,
      image: imageUrl,
      desc: desc.trim() || "Authentic salon-quality beauty product certified for quality."
    };

    onAddNewProduct(newProd);
    setTitle("");
    setPrice("2200");
    setStock("20");
    setDesc("");
    setShowAddModal(false);
  };

  const totalSalesRevenue = productOrders.reduce((sum, o) => sum + (o.totalPaid || 0), 0);

  return (
    <div className="page">
      {/* Shop Owner Header */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#7e22ce",
              color: "white",
              display: "grid",
              placeItems: "center"
            }}
          >
            <Store size={28} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 800 }}>Nairobi Glam Beauty Supplies</h1>
              <span className="badge-verified" title="Verified Merchant">✓</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "13.5px" }}>
              Official Beauty Store & Cosmetics Distributor · Merchant Portal
            </p>
          </div>
        </div>

        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={16} /> List New Product For Sale
        </button>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "26px"
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
            Active Listed Products
          </span>
          <b style={{ fontSize: "26px", color: "#7e22ce", display: "block", margin: "4px 0" }}>
            {products.length}
          </b>
          <small style={{ color: "var(--success)", fontSize: "11px", fontWeight: 700 }}>
            Live on Glow Marketplace
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
            Total Units in Stock
          </span>
          <b style={{ fontSize: "26px", color: "var(--text-main)", display: "block", margin: "4px 0" }}>
            {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "11px" }}>Across all catalog items</small>
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
            Customer Orders Received
          </span>
          <b style={{ fontSize: "26px", color: "var(--pink)", display: "block", margin: "4px 0" }}>
            {productOrders.length}
          </b>
          <small style={{ color: "var(--muted)", fontSize: "11px" }}>
            Direct customer deliveries
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
            Product Sales Revenue (100%)
          </span>
          <b style={{ fontSize: "26px", color: "#168657", display: "block", margin: "4px 0" }}>
            {money(totalSalesRevenue)}
          </b>
          <small style={{ color: "#168657", fontSize: "11px", fontWeight: 700 }}>
            Deposited via M-Pesa Merchant
          </small>
        </div>
      </div>

      {/* Tabs */}
      <div className="filters-container">
        <button
          className={`filter-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          <Package size={14} /> My Listed Products ({products.length})
        </button>
        <button
          className={`filter-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <Truck size={14} /> Customer Product Orders ({productOrders.length})
        </button>
      </div>

      {/* Tab 1: Product Catalog Management */}
      {activeTab === "products" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", height: "180px" }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 700
                  }}
                >
                  {p.category}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    background: p.stock > 0 ? "#168657" : "#d11a2a",
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 700
                  }}
                >
                  {p.stock > 0 ? `${p.stock} in Stock` : "Sold Out"}
                </span>
              </div>

              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, lineHeight: "1.3" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "12.5px", color: "var(--muted)", margin: "6px 0 12px", flex: 1 }}>
                  {p.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border-light)"
                  }}
                >
                  <strong style={{ fontSize: "18px", color: "var(--pink)" }}>
                    {money(p.price)}
                  </strong>

                  <button
                    className="btn-secondary btn-small"
                    style={{ color: "#d11a2a", borderColor: "#ffe0e0" }}
                    onClick={() => {
                      if (window.confirm(`Delete ${p.title}?`)) {
                        onDeleteProduct(p.id);
                      }
                    }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Customer Product Orders Feed */}
      {activeTab === "orders" && (
        <div>
          {productOrders.length === 0 ? (
            <div className="empty-state">
              <Truck size={48} />
              <h3>No product orders yet</h3>
              <p>When customers buy items from your store, their orders and delivery addresses will appear here.</p>
            </div>
          ) : (
            productOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                  borderRadius: "18px",
                  padding: "20px",
                  marginBottom: "16px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <img
                      src={ord.productImage}
                      alt={ord.productTitle}
                      style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          className="status-badge"
                          style={{
                            background: ord.status === "Delivered" ? "#e6f9f0" : "#f5f0ff",
                            color: ord.status === "Delivered" ? "#158b57" : "#7e22ce"
                          }}
                        >
                          {ord.status}
                        </span>
                        <b style={{ fontSize: "15px" }}>{ord.productTitle} (Qty: {ord.quantity})</b>
                      </div>
                      <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "3px" }}>
                        Order Ref: <span style={{ fontFamily: "monospace" }}>{ord.id}</span> · Paid via {ord.paymentMethod}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: "18px", color: "var(--pink)" }}>
                      {money(ord.totalPaid)}
                    </strong>
                    <span style={{ display: "block", fontSize: "11px", color: "var(--success)", fontWeight: 700 }}>
                      100% Collected (Goods + Courier)
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: "#fbf8fb",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    margin: "14px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "10px",
                    fontSize: "13px"
                  }}
                >
                  <div>
                    <span style={{ color: "var(--muted)", fontSize: "11px", display: "block", textTransform: "uppercase", fontWeight: 700 }}>
                      Customer Contact
                    </span>
                    <b>{ord.customerName}</b> ({ord.customerPhone})
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", fontSize: "11px", display: "block", textTransform: "uppercase", fontWeight: 700 }}>
                      Delivery Destination
                    </span>
                    <b>{ord.deliveryAddress}</b>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", fontSize: "11px", display: "block", textTransform: "uppercase", fontWeight: 700 }}>
                      Tracking Code
                    </span>
                    <b style={{ fontFamily: "monospace", color: "#7e22ce" }}>{ord.trackingCode}</b>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  {ord.status === "Processing" && (
                    <button
                      className="btn-primary btn-small"
                      onClick={() => onUpdateOrderStatus(ord.id, "Out for Delivery")}
                    >
                      <Truck size={14} /> Dispatch with Courier
                    </button>
                  )}
                  {ord.status === "Out for Delivery" && (
                    <button
                      className="btn-secondary btn-small"
                      style={{ background: "#e8f7ee", color: "#13884f", borderColor: "#b8ebcb" }}
                      onClick={() => onUpdateOrderStatus(ord.id, "Delivered")}
                    >
                      <CheckCircle size={14} /> Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: "560px", padding: "26px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
              ✕
            </button>

            <h2 style={{ fontSize: "22px", fontWeight: 800 }}>List Beauty Product for Sale</h2>
            <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "18px" }}>
              Publish cosmetic products, hair extensions, serums, or nail equipment to Glow shoppers.
            </p>

            <form onSubmit={handleAddSubmit}>
              {/* Image Picker */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "6px" }}>
                  1. Product Photo (Select Preset or Paste Image URL)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "10px" }}>
                  {samplePhotoPresets.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImageUrl(preset.url)}
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: imageUrl === preset.url ? "2px solid #7e22ce" : "1px solid var(--border)",
                        padding: "2px",
                        background: "white"
                      }}
                    >
                      <img src={preset.url} alt={preset.label} style={{ height: "55px", width: "100%", objectFit: "cover", borderRadius: "8px" }} />
                      <span style={{ fontSize: "10px", fontWeight: 600, display: "block", marginTop: "2px" }}>
                        {preset.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Or custom image URL (https://...)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border)", fontSize: "12.5px", outline: "none" }}
                />
              </div>

              {/* Title */}
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Product Title & Brand Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Raw Human Hair Bulk French Curls (3 Bundles)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                />
              </div>

              {/* Category, Price, Stock */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", background: "white" }}
                  >
                    <option value="Hair Care">Hair Care & Braids</option>
                    <option value="Makeup">Makeup & Cosmetics</option>
                    <option value="Nails">Nails & Tools</option>
                    <option value="Skincare">Skincare & Serums</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                    Price (KSh)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                    Stock Qty
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Product Highlights & Usage Directions
                </label>
                <textarea
                  rows={3}
                  placeholder="Ingredients, hair length, shades, recommended hair type..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", fontFamily: "inherit" }}
                />
              </div>

              <button type="submit" className="btn-primary btn-full" style={{ background: "#7e22ce" }}>
                <PlusCircle size={16} /> Publish Product to Glow Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
