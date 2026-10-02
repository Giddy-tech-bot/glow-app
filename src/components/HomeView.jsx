import React from "react";
import {
  Sparkles, ChevronRight, ShoppingBag, Scissors, Gem,
  Heart, MapPin, Star, ArrowRight, Instagram
} from "lucide-react";
import { money } from "../data/mockData";

export default function HomeView({
  beauticians,
  onSelectBeautician,
  onNavigate,
  searchQuery,
  onCategorySelect
}) {
  const filteredBeauticians = beauticians.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.specialty.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-glow-blob" />
        <div>
          <span className="pill">
            <Sparkles size={13} /> East Africa's Beauty Hub
          </span>
          <h1>
            Discover your look.<br />
            <em>Book your Glow.</em>
          </h1>
          <p>
            Connect with certified makeup artists, braid stylists, nail techs,
            and aesthetic clinics. Explore inspiring looks and book verified
            appointments in seconds.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onNavigate("discover")}>
              Explore Beauticians <ChevronRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("social")}>
              Trending Looks <Sparkles size={16} />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("brands")}>
              Shop Brands <ShoppingBag size={16} />
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
            alt="Beauty and Glamour"
          />
          <div className="hero-floating-card">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80" alt="MUA" />
              <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80" alt="MUA" />
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80" alt="MUA" />
            </div>
            <div>
              <small>500+ Verified Pros</small>
              <span>4.9★ Nairobi & Mombasa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Navigation */}
      <div className="quick-grid">
        <button className="quick-card" onClick={() => { onCategorySelect("makeup"); onNavigate("discover"); }}>
          <span className="quick-card-icon"><Scissors size={20} /></span>
          <b>Makeup</b>
        </button>
        <button className="quick-card" onClick={() => { onCategorySelect("hair"); onNavigate("discover"); }}>
          <span className="quick-card-icon"><Gem size={20} /></span>
          <b>Hair & Braids</b>
        </button>
        <button className="quick-card" onClick={() => { onCategorySelect("nails"); onNavigate("discover"); }}>
          <span className="quick-card-icon"><Sparkles size={20} /></span>
          <b>Nails & BIAB</b>
        </button>
        <button className="quick-card" onClick={() => { onCategorySelect("skincare"); onNavigate("discover"); }}>
          <span className="quick-card-icon"><Heart size={20} /></span>
          <b>Skincare</b>
        </button>
        <button className="quick-card" onClick={() => onNavigate("brands")}>
          <span className="quick-card-icon"><ShoppingBag size={20} /></span>
          <b>Beauty Brands</b>
        </button>
      </div>

      {/* Popular Beauticians Section */}
      <div className="section-title">
        <div>
          <h2>Popular Beauticians</h2>
          <p style={{ color: "var(--muted)", fontSize: "13px" }}>
            Top-rated beauty professionals verified for hygiene, skill & punctual service
          </p>
        </div>
        <button onClick={() => onNavigate("discover")}>
          See all ({beauticians.length}) <ChevronRight size={16} />
        </button>
      </div>

      <div className="beautician-grid">
        {filteredBeauticians.slice(0, 3).map((b) => {
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
                  <span className="badge-verified" title="Verified Artist">✓</span>
                </div>

                <div className="card-meta">
                  <MapPin size={14} /> {b.area || b.city}
                </div>

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
                    View Looks & Book <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Social Community Teaser Banner */}
      <section className="social-banner">
        <div>
          <span className="pill" style={{ background: "rgba(255, 37, 120, 0.2)", color: "#ff82b8" }}>
            Glow Social Lookbook
          </span>
          <h2>See real looks before booking.</h2>
          <p>
            Browse trending bridal makeup, creative nail art, and boho protective styles shared by our community. Save your favorites for your appointment.
          </p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate("social")}>
          Explore Social Looks <Instagram size={18} />
        </button>
      </section>
    </div>
  );
}
