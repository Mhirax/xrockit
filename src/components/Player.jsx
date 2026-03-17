// src/components/Player.js
// 🔧 MODIFY THIS FILE - Add shuffle and repeat buttons

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom, // NEW: Import shuffle icon
  faRepeat, // NEW: Import repeat icon
  faRedoAlt, // NEW: Import repeat-one icon
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setSongs,
  setCurrentSong,
  // NEW PROPS:
  shuffle,
  toggleShuffle,
  repeat,
  cycleRepeat,
  skipTrackHandler, // Now coming from App.js
}) => {
  // ===== EXISTING activeLibraryHandler (keep as is) =====
  const activeLibraryHandler = (nextSong) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    console.log("Activated song:", nextSong.name);
  };

  // ===== EXISTING playSongHandler (keep as is) =====
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };

  // ===== EXISTING getTime (keep as is) =====
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // ===== EXISTING dragHandler (keep as is) =====
  const dragHandler = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // ===== NEW: Get the correct repeat icon =====
  const getRepeatIcon = () => {
    if (repeat === "one") return faRedoAlt; // Repeat one
    return faRepeat; // Repeat all
  };

  // ===== NEW: Get the correct repeat class =====
  const getRepeatClass = () => {
    if (repeat === "one") return "repeat one active";
    if (repeat === "all") return "repeat all active";
    return "repeat";
  };

  // src/components/Player.js
  // Make sure your JSX matches this structure

  return (
    <div className="player">
      {/* Progress bar */}
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      {/* MAIN CONTROLS - Skip and Play (Top row) */}
      <div className="main-controls">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>

      {/* MODE CONTROLS - Shuffle and Repeat (Bottom row) */}
      <div className="mode-controls">
        <FontAwesomeIcon
          onClick={toggleShuffle}
          className={`shuffle ${shuffle ? "active" : ""}`}
          icon={faRandom}
        />
        <FontAwesomeIcon
          onClick={cycleRepeat}
          className={`repeat ${repeat !== "off" ? "active" : ""} ${repeat === "one" ? "one" : ""}`}
          icon={repeat === "one" ? faRedoAlt : faRepeat}
        />
      </div>

      {/* STATUS INDICATORS */}
      <div className="status-indicators">
        {shuffle && <span className="badge">🔀 Shuffle On</span>}
        {repeat === "one" && <span className="badge">🔂 Repeat One</span>}
        {repeat === "all" && <span className="badge">🔁 Repeat All</span>}
      </div>
    </div>
  );
};;

export default Player;
