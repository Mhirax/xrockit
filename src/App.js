import React, { useState } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./util";



function App() {

  // state function
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1])
  const [isPlaying, setIsPlaying] = useState(false);


  return (
    <div className="App">
      <h2 className="head">WAVE-X SOUND ROCKITT</h2>

      <Song currentSong={currentSong} />

      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong} />
      
      <Library songs={songs} setCurrentSong={setCurrentSong} />    
    </div>
  );
}


export default App;

