// src/App.js
// 🔧 MODIFY THIS FILE - Add the new state and functions

import React, { useRef, useState, useEffect } from "react";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./data";

function App() {
  const audioRef = useRef(null);

  // ===== EXISTING STATE (keep all of this) =====
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // ===== NEW STATE FOR SHUFFLE & REPEAT =====
  const [shuffle, setShuffle] = useState(false); // true or false
  const [repeat, setRepeat] = useState("off"); // 'off', 'one', 'all'

  // ===== EXISTING useEffect (keep as is) =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playpromise = audio.play();
      if (playpromise !== undefined) {
        playpromise.catch((err) => {
          console.log("Autoplay blocked:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  // ===== EXISTING timeUpdateHandler (keep as is) =====
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  // ===== NEW: Helper function to update active songs =====
  const updateActiveSongs = (selectedSong) => {
    const newSongs = songs.map((song) => ({
      ...song,
      active: song.id === selectedSong.id,
    }));
    setSongs(newSongs);
  };

  // ===== NEW: Get random song for shuffle =====
  const getRandomSong = (excludeId) => {
    const otherSongs = songs.filter((song) => song.id !== excludeId);
    if (otherSongs.length === 0) return currentSong;
    const randomIndex = Math.floor(Math.random() * otherSongs.length);
    return otherSongs[randomIndex];
  };

  // ===== MODIFIED: Skip track handler with shuffle =====
  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;

    if (shuffle) {
      // SHUFFLE MODE: Pick random song
      nextSong = getRandomSong(currentSong.id);
    } else {
      // NORMAL MODE: Go to next/previous in order
      if (direction === "skip-forward") {
        nextSong = songs[(currentIndex + 1) % songs.length];
      } else {
        nextSong = songs[(currentIndex - 1 + songs.length) % songs.length];
      }
    }

    setCurrentSong(nextSong);
    updateActiveSongs(nextSong);
  };

  // ===== MODIFIED: Song end handler with repeat =====
  const songEndHandler = () => {
    // REPEAT ONE: Play same song again
    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log("Playback error:", err));
      }
      return; // Don't change song
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;

    if (shuffle) {
      // SHUFFLE MODE
      nextSong = getRandomSong(currentSong.id);
    } else {
      // NORMAL MODE
      if (repeat === "all") {
        // REPEAT ALL: Loop to first after last
        nextSong = songs[(currentIndex + 1) % songs.length];
      } else {
        // REPEAT OFF: Stop if last song
        if (currentIndex === songs.length - 1) {
          setIsPlaying(false);
          return; // Stop playback
        } else {
          nextSong = songs[currentIndex + 1];
        }
      }
    }

    setCurrentSong(nextSong);
    updateActiveSongs(nextSong);

    // Auto-play next song
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((err) => console.log("Autoplay error:", err));
        }
      }, 50);
    }
  };

  // ===== NEW: Toggle shuffle =====
  const toggleShuffle = () => {
    setShuffle(!shuffle);
    console.log("Shuffle:", !shuffle ? "ON" : "OFF");
  };

  // ===== NEW: Cycle through repeat modes =====
  const cycleRepeat = () => {
    if (repeat === "off") {
      setRepeat("one");
      console.log("Repeat: ONE");
    } else if (repeat === "one") {
      setRepeat("all");
      console.log("Repeat: ALL");
    } else {
      setRepeat("off");
      console.log("Repeat: OFF");
    }
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />

      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongs={setSongs}
        // NEW PROPS:
        shuffle={shuffle}
        toggleShuffle={toggleShuffle}
        repeat={repeat}
        cycleRepeat={cycleRepeat}
        skipTrackHandler={skipTrackHandler} // Pass the handler down
      />

      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        Song={Song}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong?.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
