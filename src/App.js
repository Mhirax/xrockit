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
  const [songs, setSongs] = useState(data());
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
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
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

    setCurrentSong(nextSong);
    updateActiveSongs(nextSong);
  };

  // ===== SONG END HANDLER =====
  const songEndHandler = () => {
    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log("Playback error:", err));
      }
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;

    if (shuffle) {
      nextSong = getRandomSong(currentSong.id);
    } else {
      if (repeat === "all") {
        nextSong = songs[(currentIndex + 1) % songs.length];
      } else {
        if (currentIndex === songs.length - 1) {
          setIsPlaying(false);
          return;
        } else {
          nextSong = songs[currentIndex + 1];
        }
      }
    }

    setCurrentSong(nextSong);
    updateActiveSongs(nextSong);

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

  // ===== TOGGLE FUNCTIONS - THESE WERE MISSING! =====
  const toggleShuffle = () => {
    setShuffle(!shuffle);
    console.log("Shuffle:", !shuffle ? "ON" : "OFF");
  };

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

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
    console.log("Lyrics:", !showLyrics ? "OPEN" : "CLOSED");
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
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setSongs={setSongs}
        shuffle={shuffle}
        toggleShuffle={toggleShuffle} // ✅ NOW DEFINED!
        repeat={repeat}
        cycleRepeat={cycleRepeat} // ✅ NOW DEFINED!
        skipTrackHandler={skipTrackHandler}
        showLyrics={showLyrics}
        toggleLyrics={toggleLyrics} // ✅ NOW DEFINED!
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
