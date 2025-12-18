import React, { useState } from "react"
//import styles
import "./styles/app.scss"
//Adding components 
import Player from "./components/Player";
import Song from "./components/Song";
//import utill
import data from "./util";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
}

export default App;

