import React, { useState, useRef, useEffect } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./data";



function App() {
  //Ref to play audio
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

  
  // USEEFFECT function
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
  }, [isPlaying, currentSong]); 


  //timeupdate function
  const timeUpateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration }); //update our songinfo
  };

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

