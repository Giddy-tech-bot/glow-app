import React, { useState } from "react";
import { Sparkles, Camera, Image, X } from "lucide-react";

export default function PostCreateModal({ onClose, onSubmitPost }) {
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Makeup");
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [tags, setTags] = useState("#GlowBeauty #NairobiGlam");

  const samplePresets = [
    {
      label: "Bronze Glow",
      url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Emerald Cut Crease",
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Glossy Natural Braids",
      url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Glazed Acrylic Nails",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [imageUrl, setImageUrl] = useState(samplePresets[0].url);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const formattedTags = tags
      .split(" ")
      .filter((t) => t.trim().length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    onSubmitPost({
      id: "p_" + Date.now(),
      user: "Grace K. (You)",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      location,
      timeAgo: "Just now",
      text: caption.trim(),
      image: imageUrl,
      category,
      likesCount: 1,
      likedByMe: true,
      savedByMe: false,
      tags: formattedTags,
      comments: []
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <h3 style={{ fontSize: "22px", fontWeight: 800 }}>Share Your Look</h3>
        <p style={{ color: "var(--muted)", fontSize: "13.5px", marginBottom: "16px" }}>
          Showcase your makeup artistry, nail set, or hair transformation to the Glow community!
        </p>

        <form onSubmit={handleSubmit}>
          {/* Quick Preset Selector */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>
              1. Choose a Photo (or enter custom image link):
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "10px" }}>
              {samplePresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(preset.url)}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: imageUrl === preset.url ? "2px solid var(--pink)" : "1px solid var(--border)",
                    padding: "2px",
                    background: "white"
                  }}
                >
                  <img src={preset.url} alt={preset.label} style={{ height: "60px", width: "100%", objectFit: "cover", borderRadius: "8px" }} />
                  <span style={{ fontSize: "10px", fontWeight: 600, display: "block", marginTop: "2px" }}>
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="url"
              placeholder="Or paste an image URL (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                outline: "none"
              }}
            />
          </div>

          {/* Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  outline: "none",
                  background: "white"
                }}
              >
                <option value="Makeup">Makeup & Glam</option>
                <option value="Bridal">Bridal Beauty</option>
                <option value="Nails">Nails & Acrylics</option>
                <option value="Hair">Hair & Braids</option>
                <option value="Skincare">Skincare</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Location / Salon
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

          {/* Caption */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
              Caption & Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe your look, techniques used, shades, or products used..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                outline: "none",
                fontFamily: "inherit",
                fontSize: "13.5px"
              }}
            />
          </div>

          {/* Hashtags */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
              Hashtags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="#BridalGlam #NairobiMUA #CleanGirl"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                outline: "none"
              }}
            />
          </div>

          <button type="submit" className="btn-primary btn-full">
            <Sparkles size={16} /> Publish Look to Glow Social
          </button>
        </form>
      </div>
    </div>
  );
}
