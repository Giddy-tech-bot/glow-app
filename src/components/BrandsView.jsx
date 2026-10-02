import React, { useState } from "react";
import { ShoppingBag, ChevronRight, Sparkles, Check, Tag, PlusCircle, Star, Truck } from "lucide-react";
import { money } from "../data/mockData";

export default function BrandsView({
  brands,
  products,
  onBuyProduct,
  onOpenShopPortal
}) {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [brandName, setBrandName] = useState("");
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "Hair Care", label: "Hair & Braids" },
    { id: "Makeup", label: "Makeup & Glam" },
    { id: "Nails", label: "Nails & Kits" },
    { id: "Skincare", label: "Skincare & Serums" }
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerModalOpen(false);
      setBrandName("");
    }, 2000);
  };

  return (
    <div className="page">
      {/* Brand & Products Marketplace Hero */}
      <section className="brand-hero">
        <div>
          <span className="pill">
            <ShoppingBag size={13} /> Glow Marketplace
          </span>
          <h1>
            Shop certified beauty products & salon essentials.
          </h1>
          <p>
            Order raw human hair extensions, longwear setting sprays, BIAB nail kits, and dermatologist skincare directly from verified Kenyan beauty shops.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
            <button
              className="btn-primary"
              onClick={() => {
                const el = document.getElementById("shop-products-grid");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop Listed Products <ChevronRight size={16} />
            </button>
            <button
              className="btn-secondary"
              onClick={onOpenShopPortal}
            >
              List Products (Shop Owners) <PlusCircle size={15} />
            </button>
          </div>
        </div>

        <img
          src={brands[0].image}
          alt="Beauty Products"
          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "20px" }}
        />
      </section>

      {/* Live Listed Products from Beauty Shops */}
      <div id="shop-products-grid" style={{ paddingTop: "10px" }}>
        <div className="section-title">
          <div>
            <h2>Verified Beauty Shop Products</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              100% genuine beauty supplies with doorstep delivery across Kenya
            </p>
          </div>
          <button className="btn-primary btn-small" onClick={onOpenShopPortal}>
            <PlusCircle size={14} /> Sell Your Products
          </button>
        </div>

        {/* Category Filters */}
        <div className="filters-container">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-btn ${selectedCategory === c.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="brand-grid" style={{ marginBottom: "40px" }}>
          {filteredProducts.map((p) => (
            <article key={p.id} className="brand-card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative" }}>
                <img src={p.image} alt={p.title} style={{ height: "200px" }} />
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
                    left: "10px",
                    background: "rgba(255,255,255,0.9)",
                    color: "var(--text-main)",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 700
                  }}
                >
                  Shop: {p.shopName?.split(" ")[0]}
                </span>
              </div>

              <div className="brand-card-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--gold)", fontSize: "12px", marginBottom: "4px" }}>
                  <Star size={13} fill="currentColor" /> {p.rating} ({p.salesCount || 10} sold)
                </div>

                <h3 style={{ fontSize: "16px", fontWeight: 800, lineHeight: "1.3" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "12.5px", margin: "4px 0 12px", flex: 1 }}>
                  {p.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border-light)"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>Price</span>
                    <strong style={{ fontSize: "17px", color: "var(--pink)" }}>
                      {money(p.price)}
                    </strong>
                  </div>

                  <button
                    className="btn-primary btn-small"
                    onClick={() => onBuyProduct(p)}
                  >
                    Buy Product
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Featured Brand Partners */}
      <div className="section-title">
        <div>
          <h2>Featured Brand Partners</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Official brand discounts for Glow salon community
          </p>
        </div>
      </div>

      <div className="brand-grid">
        {brands.map((b) => (
          <article key={b.name} className="brand-card">
            <img src={b.image} alt={b.name} />
            <div className="brand-card-content">
              <span className="brand-discount-tag">
                <Tag size={12} style={{ display: "inline", verticalAlign: "middle" }} /> {b.discount}
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 800 }}>{b.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: "13px", margin: "4px 0 10px" }}>
                {b.tagline}
              </p>
              <div style={{ fontSize: "12px", color: "var(--text-main)", marginBottom: "14px", fontWeight: 600 }}>
                Featured: {b.featuredProduct}
              </div>
              <button
                className="btn-outline-pink btn-small btn-full"
                onClick={() => alert(`Promo code GLOW20 copied for ${b.name}!`)}
              >
                Claim Brand Promo Code
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Partner Box for Beauty Brands */}
      <div className="partner-box">
        <Sparkles size={32} color="var(--pink)" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "20px", fontWeight: 800 }}>Are you a beauty brand or distributor?</h3>
          <p style={{ color: "#c8bcc7", fontSize: "14px", marginTop: "4px" }}>
            List your skincare or makeup line on Glow to reach 10,000+ active beauticians and beauty clients.
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={() => setPartnerModalOpen(true)}
        >
          Partner with Glow
        </button>
      </div>

      {/* Partner Inquiry Modal */}
      {partnerModalOpen && (
        <div className="modal-overlay" onClick={() => setPartnerModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setPartnerModalOpen(false)}>
              ✕
            </button>
            <h3 style={{ fontSize: "20px", fontWeight: 800 }}>Join Glow Marketplace</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px", margin: "6px 0 16px" }}>
              Reach verified salons, freelance makeup artists, and beauty clients.
            </p>

            {partnerSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Check size={48} color="var(--success)" style={{ margin: "0 auto 10px" }} />
                <h4>Application Received!</h4>
                <p style={{ color: "var(--muted)", fontSize: "13px" }}>
                  Our brand partnership lead will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit}>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fenty Beauty, CeraVe"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partnerships@brand.com"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                  />
                </div>
                <button type="submit" className="btn-primary btn-full">
                  Submit Partnership Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
