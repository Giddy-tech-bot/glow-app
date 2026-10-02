import React from "react";
import { Home, Compass, Sparkles, CalendarDays, UserRound } from "lucide-react";

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${currentPage === "home" ? "active" : ""}`}
        onClick={() => onNavigate("home")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === "discover" || currentPage === "profile" ? "active" : ""}`}
        onClick={() => onNavigate("discover")}
      >
        <Compass size={20} />
        <span>Discover</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === "social" ? "active" : ""}`}
        onClick={() => onNavigate("social")}
      >
        <Sparkles size={20} />
        <span>Social</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === "bookings" ? "active" : ""}`}
        onClick={() => onNavigate("bookings")}
      >
        <CalendarDays size={20} />
        <span>Bookings</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === "profile-me" ? "active" : ""}`}
        onClick={() => onNavigate("profile-me")}
      >
        <UserRound size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
