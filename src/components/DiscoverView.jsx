import React, { useState } from "react";
import { Search, MapPin, Star, Sparkles, Scissors, Gem, Heart, ArrowRight } from "lucide-react";
import { money } from "../data/mockData";

export default function DiscoverView({
  beauticians,
  onSelectBeautician,
  searchQuery,
  activeCategory,
  onCategoryChange
}) {
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const categories = [
    { id: "all", label: "All Pros" },
    { id: "makeup", label: "Makeup & Bridal" },
    { id: "hair", label: "Hair & Braids" },
    { id: "nails", label: "Nails & Art" },
    { id: "skincare", label: "Skincare & Facials" }
  ];

  // Filtering
  const filtered = beauticians.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.specialty.toLowerCase().includes(q) ||
      (b.area && b.area.toLowerCase().includes(q)) ||
      b.services.some((s) => s.name.toLowerCase().includes(q));

    const matchesCity =
      selectedCity === "all" ||
      b.city.toLowerCase() === selectedCity.toLowerCase();

    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "makeup" && b.specialty.toLowerCase().includes("makeup")) ||
      (activeCategory === "hair" && (b.specialty.toLowerCase().includes("braid") || b.specialty.toLowerCase().includes("hair"))) ||
      (activeCategory === "nails" && b.specialty.toLowerCase().includes("nail")) ||
      (activeCategory === "skincare" && b.specialty.toLowerCase().includes("skincare"));

    return matchesSearch && matchesCity && matchesCategory;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
    if (sortBy === "price_asc") {
      const minA = Math.min(...a.services.map((s) => s.price));
      const minB = Math.min(...b.services.map((s) => s.price));
      return minA - minB;
    }
    return 0;
  });

  return (
    <div className="page">
      <div className="section-title" style={{ marginTop: 0 }}>
        <div>
          <h2>Discover Beauty Professionals</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Showing {sorted.length} certified beauticians ready to accept bookings
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: "white",
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-main)",
              cursor: "pointer"
            }}
          >
            <option value="all">📍 All Cities</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: "white",
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-main)",
              cursor: "pointer"
            }}
          >
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
            <option value="price_asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="filters-container">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <Sparkles size={48} />
          <h3>No beauticians found</h3>
          <p>Try clearing your search query or choosing another category filter.</p>
          <button
            className="btn-primary"
            style={{ marginTop: "16px" }}
            onClick={() => {
              onCategoryChange("all");
              setSelectedCity("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="beautician-grid">
          {sorted.map((b) => {
            const minPrice = Math.min(...b.services.map((s) => s.price));
            return (
              <article
                key={b.id}
                className="beautician-card"
                onClick={() => onSelectBeautician(b)}
              >
                <div className="beautician-card-image-wrapper">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="beautician-card-image"
                  />
                  <span className="card-category-badge">{b.specialty}</span>
                </div>

                <div className="card-body">
                  <div className="name-row">
                    <h3>{b.name}</h3>
                    <span className="badge-verified">✓</span>
                  </div>

                  <div className="card-meta">
                    <MapPin size={14} /> {b.area || b.city}
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {b.bio}
                  </p>

                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    {b.rating}
                    <span>({b.reviewsCount} reviews)</span>
                  </div>

                  <div className="card-footer">
                    <div className="price-starting">
                      Starts from
                      <strong>{money(minPrice)}</strong>
                    </div>
                    <button className="btn-outline-pink btn-small">
                      View Profile <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
