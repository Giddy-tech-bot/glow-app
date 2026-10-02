import React, { useState } from "react";
import {
  Star, MapPin, Clock3, MessageCircle, ChevronRight,
  Heart, ArrowLeft, Check, Sparkles, PlusCircle, Share2,
  Video, Play, Camera
} from "lucide-react";
import { money } from "../data/mockData";

export default function BeauticianProfileView({
  beautician,
  selectedService,
  onSelectService,
  onBook,
  onBack,
  onOpenChat,
  onAddReview,
  onOpenStudio
}) {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [previewLook, setPreviewLook] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const b = beautician;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    onAddReview(b.id, {
      id: "r_" + Date.now(),
      author: newReviewAuthor.trim() || "Glow Client",
      rating: newRating,
      date: "Just now",
      text: newReviewText.trim()
    });
    setNewReviewText("");
    setShowReviewModal(false);
  };

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Beauticians
        </button>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button
            className="btn-secondary btn-small"
            onClick={handleShare}
          >
            <Share2 size={14} /> {copiedLink ? "Copied Link!" : "Share Profile"}
          </button>
          <button
            className="btn-primary btn-small"
            onClick={onOpenStudio}
          >
            <Camera size={14} /> Add Look / Reel
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <section className="profile-head">
        <div className="profile-avatar-wrapper">
          <img className="profile-avatar" src={b.image} alt={b.name} />
        </div>

        <div style={{ flex: 1 }}>
          <div className="name-row">
            <h1 style={{ fontSize: "28px", fontWeight: 800 }}>{b.name}</h1>
            <span className="badge-verified" title="Verified Beautician">✓</span>
          </div>

          <p style={{ color: "var(--pink)", fontWeight: 700, fontSize: "14px", marginTop: "2px" }}>
            {b.specialty}
          </p>

          <div className="card-meta" style={{ margin: "6px 0 8px" }}>
            <MapPin size={15} /> {b.area || `${b.city}, Kenya`}
          </div>

          <div className="rating">
            <Star size={16} fill="currentColor" />
            {b.rating}
            <span>({b.reviewsCount} verified reviews)</span>
          </div>

          <p style={{ color: "var(--muted)", fontSize: "14px", margin: "10px 0 16px", maxWidth: "600px" }}>
            {b.bio}
          </p>

          <div className="profile-actions">
            <button
              className={`btn-primary ${isFollowing ? "btn-secondary" : ""}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <Check size={16} /> Following
                </>
              ) : (
                "Follow"
              )}
            </button>

            <button
              className="btn-secondary"
              onClick={() => onOpenChat(b)}
            >
              <MessageCircle size={16} /> Message
            </button>
          </div>
        </div>
      </section>

      {/* Profile Navigation Tabs */}
      <div className="profile-tabs">
        <button
          className={`profile-tab-btn ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          Looks & Video Reels ({b.work?.length || 0})
        </button>
        <button
          className={`profile-tab-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Services & Prices ({b.services?.length || 0})
        </button>
        <button
          className={`profile-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Client Reviews ({b.reviews?.length || 0})
        </button>
        <button
          className={`profile-tab-btn ${activeTab === "hours" ? "active" : ""}`}
          onClick={() => setActiveTab("hours")}
        >
          Hours & Location
        </button>
      </div>

      {/* Tab 1: Portfolio / Looks & Video Gallery */}
      {activeTab === "portfolio" && (
        <div>
          <div className="portfolio-grid">
            {b.work.map((item, idx) => {
              const imgUrl = typeof item === "string" ? item : (item.poster || item.url);
              const isVideo = item.mediaType === "video";
              const title = typeof item === "string" ? `Look #${idx + 1}` : item.title;
              const category = typeof item === "string" ? "Beauty Look" : item.category;

              return (
                <div
                  key={idx}
                  className="portfolio-item"
                  onClick={() => setPreviewLook({
                    url: item.url,
                    poster: item.poster || imgUrl,
                    isVideo,
                    title,
                    category
                  })}
                >
                  <img src={imgUrl} alt={title} />
                  {isVideo && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(247, 37, 120, 0.9)",
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <Play size={10} fill="currentColor" /> Reel
                    </div>
                  )}
                  <div className="portfolio-overlay">
                    <b>{title}</b>
                    <small>{category} · Tap to {isVideo ? "watch video" : "preview"}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Services & Pricing */}
      {activeTab === "services" && (
        <section className="service-box">
          <div className="section-title" style={{ margin: "0 0 16px" }}>
            <h2>Available Services & Packages</h2>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              20% deposit required to confirm slot
            </span>
          </div>

          {b.services.map((s) => {
            const isSelected = selectedService?.name === s.name;
            return (
              <button
                key={s.name}
                className={`service-card ${isSelected ? "selected" : ""}`}
                onClick={() => onSelectService(s)}
              >
                <div className="service-card-info">
                  <b>{s.name}</b>
                  {s.desc && <p>{s.desc}</p>}
                  <div className="service-card-meta">
                    <span>
                      <Clock3 size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {s.duration}
                    </span>
                    <span>· Deposit: {money(s.price * 0.2)}</span>
                  </div>
                </div>
                <strong>{money(s.price)}</strong>
                <ChevronRight size={18} style={{ color: isSelected ? "var(--pink)" : "var(--muted-light)" }} />
              </button>
            );
          })}

          <div style={{ marginTop: "24px", display: "flex", gap: "12px", alignItems: "center" }}>
            <button className="btn-primary btn-full" onClick={onBook}>
              Book Now with {b.name} · {money(selectedService?.price || b.services[0]?.price)}
            </button>
          </div>
        </section>
      )}

      {/* Tab 3: Reviews */}
      {activeTab === "reviews" && (
        <div className="reviews-section">
          <div className="section-title" style={{ margin: "0 0 16px" }}>
            <h2>Client Testimonials</h2>
            <button className="btn-primary btn-small" onClick={() => setShowReviewModal(true)}>
              <PlusCircle size={15} /> Write a Review
            </button>
          </div>

          {b.reviews && b.reviews.length > 0 ? (
            b.reviews.map((r) => (
              <div key={r.id} className="review-item">
                <div className="review-header">
                  <span className="review-author">
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "var(--pink-light)",
                        color: "var(--pink)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "12px"
                      }}
                    >
                      {r.author[0]}
                    </span>
                    {r.author}
                  </span>
                  <span className="review-date">{r.date}</span>
                </div>
                <div className="rating" style={{ marginBottom: "6px" }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <p style={{ color: "var(--text-main)", fontSize: "14px" }}>{r.text}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Sparkles size={36} />
              <p>No reviews yet. Be the first to review {b.name}!</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Hours & Location */}
      {activeTab === "hours" && (
        <section className="service-box">
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>Salon Hours & Studio</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "18px" }}>
            <MapPin size={16} style={{ verticalAlign: "middle", color: "var(--pink)" }} /> {b.area || b.city}, Kenya
          </p>

          <div className="hours-card">
            <div>
              Monday – Friday <strong>{b.hours?.weekday || "9:00 AM – 6:00 PM"}</strong>
            </div>
            <div>
              Saturday <strong>{b.hours?.saturday || "9:00 AM – 4:00 PM"}</strong>
            </div>
            <div>
              Sunday <strong>{b.hours?.sunday || "Closed"}</strong>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <button className="btn-primary btn-full" onClick={onBook}>
              Book an Appointment Slot
            </button>
          </div>
        </section>
      )}

      {/* Lightbox / Video Modal for Look Preview */}
      {previewLook && (
        <div className="modal-overlay" onClick={() => setPreviewLook(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: "600px", padding: "16px", textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setPreviewLook(null)}>
              ✕
            </button>

            {previewLook.isVideo ? (
              <video
                src={previewLook.url}
                poster={previewLook.poster}
                controls
                autoPlay
                playsInline
                loop
                style={{ width: "100%", maxHeight: "550px", objectFit: "cover", borderRadius: "16px" }}
              />
            ) : (
              <img
                src={previewLook.url}
                alt={previewLook.title}
                style={{ width: "100%", maxHeight: "550px", objectFit: "cover", borderRadius: "16px" }}
              />
            )}

            <div style={{ marginTop: "14px", textAlign: "left" }}>
              <h3 style={{ fontSize: "18px" }}>{previewLook.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "13px" }}>
                {previewLook.category} · Styled by {b.name}
              </p>
              <button
                className="btn-primary btn-small"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  setPreviewLook(null);
                  setActiveTab("services");
                }}
              >
                Book This Look / Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowReviewModal(false)}>
              ✕
            </button>
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>Review {b.name}</h3>
            <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px" }}>
              Share your experience with other Glow beauty lovers
            </p>

            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grace K."
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                  Rating
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      style={{ color: star <= newRating ? "var(--gold)" : "#ddd" }}
                    >
                      <Star size={24} fill={star <= newRating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                  Your Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How was the appointment, cleanliness, and styling?"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <button type="submit" className="btn-primary btn-full">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
