import React, { useState, useRef, useEffect } from "react";
import {
  Camera, Video, Sparkles, X, RotateCcw, Check,
  Upload, Play, Pause, AlertCircle, Scissors, Gem, Heart
} from "lucide-react";

export default function GlowStudioModal({
  onClose,
  onSubmitMediaPost,
  currentBeautician
}) {
  const [mode, setMode] = useState("camera"); // 'camera' | 'upload'
  const [mediaType, setMediaType] = useState("photo"); // 'photo' | 'video'
  const [facingMode, setFacingMode] = useState("user"); // 'user' | 'environment'
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Live recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  // Captured media result
  const [capturedMedia, setCapturedMedia] = useState(null); // { type: 'image'|'video', url: string, blob: Blob }

  // Post meta
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Hair");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("4500");
  const [clientTag, setClientTag] = useState("");
  const [tags, setTags] = useState("#GlowLook #NairobiBeauty #ViralStyle");

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: mediaType === "video"
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera access failed or unavailable:", err);
      setCameraError("Camera unavailable or permission denied. You can easily upload from your device gallery!");
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (mode === "camera" && !capturedMedia) {
      startCamera();
    }
    return () => {
      stopCamera();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [mode, facingMode, mediaType, capturedMedia]);

  // Flip Camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // 1. Take Snapshot Photo
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    stopCamera();
    setCapturedMedia({
      type: "image",
      url: dataUrl
    });
  };

  // 2. Start Video Recording
  const startVideoRecording = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];
    try {
      const recorder = new MediaRecorder(mediaStreamRef.current);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/mp4" });
        const videoUrl = URL.createObjectURL(blob);
        stopCamera();
        setCapturedMedia({
          type: "video",
          url: videoUrl,
          blob
        });
      };

      recorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch (e) {
      alert("Media recording is not supported in this browser. Please use file upload.");
    }
  };

  // Stop Video Recording
  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  // 3. File Input Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const url = URL.createObjectURL(file);
    stopCamera();
    setCapturedMedia({
      type: isVideo ? "video" : "image",
      url,
      file
    });
  };

  // Retake / Clear
  const handleRetake = () => {
    setCapturedMedia(null);
    setIsRecording(false);
    setRecordSeconds(0);
  };

  // Submit Post
  const handlePublish = (e) => {
    e.preventDefault();
    if (!capturedMedia) return;

    const formattedTags = tags
      .split(" ")
      .filter((t) => t.trim().length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newPost = {
      id: "p_" + Date.now(),
      user: currentBeautician?.name || "Njeri Beauty (Pro)",
      userAvatar: currentBeautician?.image || "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
      beauticianId: currentBeautician?.id || 1,
      location: currentBeautician?.area || "Kilimani, Nairobi",
      timeAgo: "Just now",
      text: caption.trim() || `Fresh styling session! ${clientTag ? `Styled for ${clientTag}` : ""}`,
      mediaType: capturedMedia.type,
      image: capturedMedia.type === "image" ? capturedMedia.url : (currentBeautician?.work[0]?.url || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80"),
      videoUrl: capturedMedia.type === "video" ? capturedMedia.url : null,
      category,
      serviceName: serviceName.trim() || `${category} Styling`,
      servicePrice: Number(servicePrice) || 3500,
      clientTag: clientTag.trim(),
      likesCount: 1,
      likedByMe: true,
      savedByMe: false,
      tags: formattedTags,
      comments: []
    };

    onSubmitMediaPost(newPost);
    onClose();
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "580px", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <Sparkles size={20} color="var(--pink)" />
          <h2 style={{ fontSize: "22px", fontWeight: 800 }}>Glow Media Studio</h2>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "13.5px", marginBottom: "18px" }}>
          Capture live pictures, record reels, or upload transformations directly to your feed & portfolio.
        </p>

        {/* Step 1: Capture or Upload Screen */}
        {!capturedMedia ? (
          <div>
            {/* Mode Switcher */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
              <button
                type="button"
                className={`filter-btn ${mode === "camera" ? "active" : ""}`}
                onClick={() => setMode("camera")}
              >
                <Camera size={15} /> In-App Camera
              </button>
              <button
                type="button"
                className={`filter-btn ${mode === "upload" ? "active" : ""}`}
                onClick={() => {
                  setMode("upload");
                  stopCamera();
                  fileInputRef.current?.click();
                }}
              >
                <Upload size={15} /> Upload Photo / Video
              </button>
            </div>

            {/* In-App Camera Viewfinder */}
            {mode === "camera" && (
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", background: "#120e14", height: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cameraError ? (
                  <div style={{ padding: "20px", textAlign: "center", color: "white" }}>
                    <AlertCircle size={40} color="var(--pink)" style={{ margin: "0 auto 10px" }} />
                    <p style={{ fontSize: "14px", marginBottom: "16px" }}>{cameraError}</p>
                    <button
                      className="btn-primary btn-small"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={14} /> Pick Photo or Video from Device
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />

                    {/* Top Viewfinder Controls */}
                    <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {/* Photo vs Video Switch */}
                      <div style={{ display: "flex", background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "3px" }}>
                        <button
                          type="button"
                          onClick={() => setMediaType("photo")}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: mediaType === "photo" ? "#fff" : "#ccc",
                            background: mediaType === "photo" ? "var(--pink)" : "transparent"
                          }}
                        >
                          Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setMediaType("video")}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: mediaType === "video" ? "#fff" : "#ccc",
                            background: mediaType === "video" ? "var(--pink)" : "transparent"
                          }}
                        >
                          Video Reel
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={toggleFacingMode}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          display: "grid",
                          placeItems: "center"
                        }}
                        title="Flip Camera"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>

                    {/* Recording Timer Badge */}
                    {isRecording && (
                      <div
                        style={{
                          position: "absolute",
                          top: "55px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "rgba(220, 20, 60, 0.9)",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white", animation: "pulse 1s infinite" }} />
                        REC {formatTimer(recordSeconds)}
                      </div>
                    )}

                    {/* Bottom Trigger Controls */}
                    <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                      {mediaType === "photo" ? (
                        <button
                          type="button"
                          onClick={takeSnapshot}
                          style={{
                            width: "65px",
                            height: "65px",
                            borderRadius: "50%",
                            background: "white",
                            border: "4px solid var(--pink)",
                            boxShadow: "0 0 20px rgba(247, 37, 120, 0.6)",
                            display: "grid",
                            placeItems: "center"
                          }}
                          title="Snap Photo"
                        >
                          <Camera size={26} color="var(--pink)" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={isRecording ? stopVideoRecording : startVideoRecording}
                          style={{
                            width: "65px",
                            height: "65px",
                            borderRadius: "50%",
                            background: isRecording ? "#ff2a4b" : "white",
                            border: "4px solid #ff2a4b",
                            boxShadow: "0 0 20px rgba(255, 42, 75, 0.6)",
                            display: "grid",
                            placeItems: "center"
                          }}
                          title={isRecording ? "Stop Recording" : "Start Recording"}
                        >
                          {isRecording ? (
                            <div style={{ width: "22px", height: "22px", background: "white", borderRadius: "4px" }} />
                          ) : (
                            <div style={{ width: "24px", height: "24px", background: "#ff2a4b", borderRadius: "50%" }} />
                          )}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Hidden Native File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Device Gallery Button */}
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <button
                type="button"
                className="btn-secondary btn-small"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} /> Pick Photo or Video from Phone / Gallery
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Preview & Publish Form */
          <form onSubmit={handlePublish}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", background: "#100d12", height: "260px", marginBottom: "16px" }}>
              {capturedMedia.type === "image" ? (
                <img
                  src={capturedMedia.url}
                  alt="Captured Look"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <video
                  src={capturedMedia.url}
                  controls
                  autoPlay
                  playsInline
                  loop
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              <button
                type="button"
                onClick={handleRetake}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <RotateCcw size={13} /> Retake
              </button>

              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  background: "var(--pink)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "14px",
                  fontSize: "11px",
                  fontWeight: 800
                }}
              >
                {capturedMedia.type === "video" ? "🎬 Video Reel" : "📸 Photo Look"}
              </div>
            </div>

            {/* Category and Service Link */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Beauty Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", background: "white" }}
                >
                  <option value="Hair">Hair & Braids</option>
                  <option value="Makeup">Makeup & Glam</option>
                  <option value="Nails">Nails & BIAB</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Skincare">Skincare</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Tagged Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bohemian Knotless Braids"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                />
              </div>
            </div>

            {/* Price & Client Tag */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Service Price (KSh)
                </label>
                <input
                  type="number"
                  placeholder="4500"
                  value={servicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                  Client / Model Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. @Grace K."
                  value={clientTag}
                  onChange={(e) => setClientTag(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
                />
              </div>
            </div>

            {/* Caption */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Caption & Transformation Notes
              </label>
              <textarea
                rows={2}
                required
                placeholder="Share details about the look, styling time, and products used..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none", fontFamily: "inherit" }}
              />
            </div>

            {/* Hashtags */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, marginBottom: "4px" }}>
                Hashtags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--border)", outline: "none" }}
              />
            </div>

            <button type="submit" className="btn-primary btn-full">
              <Sparkles size={16} /> Publish to Glow Feed & Portfolio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
