import React, { useRef, useState, useEffect } from "react";
import "./styles/app.scss";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import LyricsPopup from "./components/LyricsPopup";
import data from "./data";

function App() {
  const audioRef = useRef(null);

  // ===== STATE DECLARATIONS =====
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Additional state
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");
  const [showLyrics, setShowLyrics] = useState(false);

  // ===== EFFECTS =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // AbortError just means a newer load/skip interrupted this play()
          if (err.name === "AbortError") return;
          console.log("Autoplay blocked:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying, audioRef]);

  // ===== HELPER FUNCTIONS =====
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    // duration is NaN until metadata loads
    const duration = e.target.duration || 0;
    setSongInfo((prev) => ({ ...prev, currentTime: current, duration }));
  };

  const updateActiveSongs = (selectedSong) => {
    const newSongs = songs.map((song) => ({
      ...song,
      active: song.id === selectedSong.id,
    }));
    setSongs(newSongs);
  };

  const getRandomSong = (excludeId) => {
    const otherSongs = songs.filter((song) => song.id !== excludeId);
    if (otherSongs.length === 0) return currentSong;
    const randomIndex = Math.floor(Math.random() * otherSongs.length);
    return otherSongs[randomIndex];
  };

  // ===== SKIP TRACK HANDLER =====
  // Shared by the library list: switch song and mark it active
  const selectSongHandler = (selectedSong) => {
    setCurrentSong(selectedSong);
    updateActiveSongs(selectedSong);
  };

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;

    if (shuffle) {
      nextSong = getRandomSong(currentSong.id);
    } else {
      if (direction === "skip-forward") {
        nextSong = songs[(currentIndex + 1) % songs.length];
      } else {
        nextSong = songs[(currentIndex - 1 + songs.length) % songs.length];
      }
    }

    selectSongHandler(nextSong);
  };

  // ===== SONG END HANDLER =====
  const songEndHandler = () => {
    const audio = audioRef.current;
    const replay = () => {
      audio.currentTime = 0;
      audio.play().catch((err) => console.log("Playback error:", err));
    };

    if (repeat === "one") {
      replay();
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;

    if (shuffle) {
      nextSong = getRandomSong(currentSong.id);
    } else if (repeat === "all") {
      nextSong = songs[(currentIndex + 1) % songs.length];
    } else if (currentIndex === songs.length - 1) {
      setIsPlaying(false);
      return;
    } else {
      nextSong = songs[currentIndex + 1];
    }

    // Same song again (single-song library): src won't change, so restart by hand
    if (nextSong.id === currentSong.id) {
      replay();
      return;
    }

    // The effect above starts playback once the new song is loaded
    selectSongHandler(nextSong);
  };

  // ===== TOGGLE FUNCTIONS =====
  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const cycleRepeat = () => {
    if (repeat === "off") {
      setRepeat("one");
    } else if (repeat === "one") {
      setRepeat("all");
    } else {
      setRepeat("off");
    }
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  // ===== RENDER =====
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
        audioRef={audioRef}
        shuffle={shuffle}
        toggleShuffle={toggleShuffle}
        repeat={repeat}
        cycleRepeat={cycleRepeat}
        skipTrackHandler={skipTrackHandler}
        showLyrics={showLyrics}
        toggleLyrics={toggleLyrics}
      />

      <Library
        songs={songs}
        selectSongHandler={selectSongHandler}
        libraryStatus={libraryStatus}
      />

      <LyricsPopup
        song={currentSong}
        show={showLyrics}
        onClose={() => setShowLyrics(false)}
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
