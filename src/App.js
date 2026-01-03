import React, { useState, useRef } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./util";



function App() {
    //Ref
    const audioRef = useRef(null);

  // state function
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[5])
  const [isPlaying, setIsPlaying] = useState(false);
    //state
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
    });
  
  const timeUpateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration }); //update our songinfo
  };


  return (
    <div className="App">
      <h2 className="head">WAVE-X SOUND ROCKITT</h2>
      <Nav />

      <Song currentSong={currentSong} />

      <Player
        setIsPlaying={setIsPlaying}
        audioRef = {audioRef}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />

      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        Song={Song}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />

      <audio
        onLoadedMetadata={timeUpateHandler}
        onTimeUpdate={timeUpateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}


export default App;

