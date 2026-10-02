import React, { useState } from "react";
import {
  Heart, MessageCircle, Send, Bookmark, Sparkles,
  Share2, PlusCircle, ArrowRight, UserCheck, Video, Play,
  Tag
} from "lucide-react";
import { money } from "../data/mockData";

export default function SocialFeedView({
  posts,
  onLikePost,
  onSavePost,
  onAddComment,
  onOpenCreatePost,
  onOpenStudio,
  onSelectBeauticianById
}) {
  const [activeFeedTab, setActiveFeedTab] = useState("all");
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const feedTabs = [
    { id: "all", label: "✨ For You" },
    { id: "video", label: "🎬 Video Reels" },
    { id: "hair", label: "👑 Braids & Hair" },
    { id: "bridal", label: "💍 Bridal Looks" },
    { id: "makeup", label: "💄 Glam & Editorial" },
    { id: "nails", label: "💅 Nail Art" }
  ];

  const filteredPosts = posts.filter((p) => {
    if (activeFeedTab === "all") return true;
    if (activeFeedTab === "video") return p.mediaType === "video" || !!p.videoUrl;
    return p.category?.toLowerCase() === activeFeedTab.toLowerCase();
  });

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, {
      id: "c_" + Date.now(),
      user: "Grace K.",
      text,
      time: "Just now"
    });
    setCommentInputs({ ...commentInputs, [postId]: "" });
    setExpandedComments({ ...expandedComments, [postId]: true });
  };

  const toggleComments = (postId) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId]
    });
  };

  return (
    <div className="page">
      <div className="social-feed-container">
        {/* Header Bar */}
        <div className="section-title" style={{ marginTop: 0 }}>
          <div>
            <h2>Glow Social Lookbook & Reels</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              Explore hairstyle tutorials, real salon transformations, and trending bridal looks
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn-primary btn-small" onClick={onOpenStudio}>
              <Video size={14} /> Record / Snap Reel
            </button>
          </div>
        </div>

        {/* Quick Post Prompt Bar */}
        <div className="create-post-trigger" onClick={onOpenStudio} style={{ cursor: "pointer" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--pink), #b40e53)",
              color: "white",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: "13px"
            }}
          >
            GK
          </div>
          <input
            type="text"
            readOnly
            placeholder="Record a video reel or take a photo of your latest look..."
          />
          <button className="btn-outline-pink btn-small">
            <Sparkles size={14} /> Studio
          </button>
        </div>

        {/* Feed Category Filters */}
        <div className="filters-container">
          {feedTabs.map((tab) => (
            <button
              key={tab.id}
              className={`filter-btn ${activeFeedTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveFeedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <Sparkles size={42} />
            <h3>No looks found in this category</h3>
            <p>Be the first beautician or beauty lover to share an inspiration look or reel!</p>
            <button className="btn-primary" style={{ marginTop: "14px" }} onClick={onOpenStudio}>
              Record the First Video / Look
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isVideo = post.mediaType === "video" || !!post.videoUrl;

            return (
              <article key={post.id} className="post-card">
                {/* Post Header */}
                <div className="post-header">
                  <img
                    src={post.userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                    alt={post.user}
                    className="post-avatar"
                  />
                  <div className="post-user-info" style={{ flex: 1 }}>
                    <b>
                      {post.user}
                      <span className="badge-verified">✓</span>
                    </b>
                    <small>{post.location} · {post.timeAgo}</small>
                  </div>

                  {post.beauticianId && (
                    <button
                      className="btn-outline-pink btn-small"
                      onClick={() => onSelectBeauticianById(post.beauticianId)}
                    >
                      Book Look <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                {/* Post Media: Video Player or Photo */}
                <div className="post-image-wrapper">
                  {isVideo ? (
                    <div style={{ position: "relative", width: "100%", maxHeight: "550px", background: "#000" }}>
                      <video
                        src={post.videoUrl}
                        poster={post.image}
                        controls
                        playsInline
                        loop
                        style={{ width: "100%", maxHeight: "550px", objectFit: "cover", display: "block" }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: "rgba(247, 37, 120, 0.9)",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "14px",
                          fontSize: "11px",
                          fontWeight: 800,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        <Video size={12} /> Video Reel
                      </span>
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <img
                        src={post.image}
                        alt={post.text}
                        className="post-image"
                        onDoubleClick={() => onLikePost(post.id)}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: "rgba(20, 15, 22, 0.75)",
                          backdropFilter: "blur(6px)",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "14px",
                          fontSize: "11px",
                          fontWeight: 700
                        }}
                      >
                        {post.category || "Look"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Service Tag Bar (if post has service info) */}
                {post.serviceName && (
                  <div
                    style={{
                      background: "#fff6fa",
                      borderBottom: "1px solid var(--border-light)",
                      padding: "8px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12.5px"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-main)", fontWeight: 700 }}>
                      <Tag size={13} color="var(--pink)" />
                      {post.serviceName}
                    </span>
                    {post.servicePrice && (
                      <span style={{ color: "var(--pink)", fontWeight: 800 }}>
                        {money(post.servicePrice)}
                      </span>
                    )}
                  </div>
                )}

                {/* Post Actions Bar */}
                <div className="post-actions-bar">
                  <button
                    className={`post-act-btn ${post.likedByMe ? "liked" : ""}`}
                    onClick={() => onLikePost(post.id)}
                  >
                    <Heart
                      size={22}
                      fill={post.likedByMe ? "var(--pink)" : "none"}
                      color={post.likedByMe ? "var(--pink)" : "currentColor"}
                    />
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    className="post-act-btn"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle size={22} />
                    <span>{post.comments?.length || 0}</span>
                  </button>

                  <button
                    className="post-act-btn"
                    onClick={() => {
                      navigator.clipboard?.writeText?.(window.location.href);
                      alert("Look link copied to clipboard!");
                    }}
                  >
                    <Send size={20} />
                  </button>

                  <button
                    className={`post-act-btn save-btn ${post.savedByMe ? "saved" : ""}`}
                    onClick={() => onSavePost(post.id)}
                    title={post.savedByMe ? "Saved to profile" : "Save look"}
                  >
                    <Bookmark
                      size={22}
                      fill={post.savedByMe ? "var(--pink)" : "none"}
                      color={post.savedByMe ? "var(--pink)" : "currentColor"}
                    />
                  </button>
                </div>

                {/* Post Details */}
                <div className="post-content">
                  <div className="post-likes-label">
                    {post.likesCount} likes
                  </div>
                  <p className="post-caption">
                    <b>{post.user}</b> {post.text}
                  </p>

                  {post.tags && (
                    <div className="post-tags">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="post-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Comment Counter / Toggle */}
                  {post.comments && post.comments.length > 0 && (
                    <button
                      className="post-comments-summary"
                      onClick={() => toggleComments(post.id)}
                    >
                      {expandedComments[post.id]
                        ? "Hide comments"
                        : `View all ${post.comments.length} comments`}
                    </button>
                  )}

                  {/* Expanded Comments List */}
                  {expandedComments[post.id] && post.comments && (
                    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {post.comments.map((c) => (
                        <div key={c.id} style={{ fontSize: "13px", lineHeight: "1.4" }}>
                          <b>{c.user}</b> <span style={{ color: "var(--text-main)" }}>{c.text}</span>
                          <span style={{ color: "var(--muted)", fontSize: "11px", marginLeft: "8px" }}>{c.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Comment Field */}
                <form
                  onSubmit={(e) => handleCommentSubmit(post.id, e)}
                  className="post-add-comment"
                >
                  <input
                    type="text"
                    placeholder="Add a comment or ask for technique tips..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    disabled={!commentInputs[post.id]?.trim()}
                    style={{
                      color: commentInputs[post.id]?.trim() ? "var(--pink)" : "var(--muted-light)",
                      fontWeight: 800,
                      fontSize: "13px"
                    }}
                  >
                    Post
                  </button>
                </form>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
