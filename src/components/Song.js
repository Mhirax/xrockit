import React from "react";

const Song = ({currentSong}) => {
  return (
    <div className="song-container">
      <img src={{currentSong.cover}}></img>
      <h1>{currentSong.cover}</h1>
      <h1>{currentSong.cover}</h1>
    </div>
  );
};

export default Song;