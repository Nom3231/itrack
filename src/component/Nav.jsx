import React from "react";
import '../Style/nav.css';

export default function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <h1 className="nav-logo">ITrack</h1>
      <div className="nav-links">
        <button
          onClick={() => setPage("home")}
          className={`nav-btn ${page === "home" ? "active" : ""}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setPage("log")}
          className={`nav-btn ${page === "log" ? "active" : ""}`}
        >
          Transaction Log
        </button>
      </div>
    </nav>
  );
}
