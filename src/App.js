import React, { useState, useRef } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
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


  return (
    <div className="App">
      <h2 className="head">WAVE-X SOUND ROCKITT</h2>

      <Song currentSong={currentSong} />

      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong} />
      
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        Song = {Song}
        id={Song.id}
        Key = {Song.id}
      />    
    </div>
  );
}


export default App;

