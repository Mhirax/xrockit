// src/components/Player.js
// 🔧 MODIFY THIS FILE - Add lyrics button between shuffle and repeat

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
  faRepeat,
  faRedoAlt,
  faFileAlt, // NEW: Import lyrics icon
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
  shuffle,
  toggleShuffle,
  repeat,
  cycleRepeat,
  skipTrackHandler,
  // NEW props
  showLyrics,
  toggleLyrics,
}) => {
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
  };

  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getRepeatIcon = () => {
    if (repeat === "one") return faRedoAlt;
    return faRepeat;
  };

  const getRepeatClass = () => {
    if (repeat === "one") return "repeat one active";
    if (repeat === "all") return "repeat all active";
    return "repeat";
  };

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

      {/* MAIN CONTROLS */}
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

      {/* MODE CONTROLS - NOW WITH 3 BUTTONS */}
      <div className="mode-controls">
        {/* Shuffle */}
        <FontAwesomeIcon
          onClick={toggleShuffle}
          className={`shuffle ${shuffle ? "active" : ""}`}
          icon={faRandom}
        />

        {/* LYRICS - NEW button in the middle */}
        <FontAwesomeIcon
          onClick={toggleLyrics}
          className={`lyrics ${showLyrics ? "active" : ""}`}
          icon={faFileAlt}
        />

        {/* Repeat */}
        <FontAwesomeIcon
          onClick={cycleRepeat}
          className={getRepeatClass()}
          icon={getRepeatIcon()}
        />
      </div>

      {/* STATUS INDICATORS - Updated with lyrics */}
      <div className="status-indicators">
        {shuffle && <span className="badge shuffle-badge">🔀 Shuffle</span>}
        {showLyrics && <span className="badge lyrics-badge">📄 Lyrics</span>}
        {repeat === "one" && (
          <span className="badge repeat-one-badge">🔂 One</span>
        )}
        {repeat === "all" && (
          <span className="badge repeat-all-badge">🔁 All</span>
        )}
      </div>
    </div>
  );
};

export default Player;
