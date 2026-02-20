import React, { useRef, useState, useEffect } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./data";

// working on my app rendering all components

function App() {
  //useRef is a react Hook or reference to store or access to DOM elements
  const audioRef = useRef(null);

  // state function
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // useEffects is a react hook that runs code after the components is rendered on screen
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // This function checks our React state
    //which says if "is playing" is "true" try to play audio and if it is "false" pause the audio
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

  //timeupdate function
  const timeUpateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //update react state to update song time info
   setSongInfo({ currentTime:current, duration:duration})
}

  //AUTOSKIP TO NEXT TRACK
  const songEndHandler = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);

    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.warn("Autoplay blocked:", err);
          });
        }
      }, 50); // 50ms is usually enough
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
        onLoadedMetadata={timeUpateHandler}
        onTimeUpdate={timeUpateHandler}
        ref={audioRef}
        src={currentSong?.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}


export default App;

