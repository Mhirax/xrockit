import React, { useState } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

//import utill
import data from "./util";

function App() {
  // state function
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <h1 className="title">WAVEX ROCKITT</h1>
      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong} />
      <Library />
    </div>
  );
}

export default App;

