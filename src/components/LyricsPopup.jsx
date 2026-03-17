// src/components/LyricsPopup.jsx
// 🆕 CREATE THIS NEW FILE

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const LyricsPopup = ({ song, show, onClose }) => {
  if (!show) return null;

  // Use song lyrics if available, otherwise show message
  const lyrics =
    song.lyrics || `No lyrics available for "${song.name}" by ${song.artiste}`;

  return (
    <div className="lyrics-overlay" onClick={onClose}>
      <div className="lyrics-popup" onClick={(e) => e.stopPropagation()}>
        <div className="lyrics-header">
          <div>
            <h2>{song.name}</h2>
            <h3>{song.artiste}</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="lyrics-content">
          <pre>{lyrics}</pre>
        </div>
      </div>
    </div>
  );
};

export default LyricsPopup;
