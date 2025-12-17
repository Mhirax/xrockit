import React from "react";

const Song = ({currentSong}) => {
  return (
    <div className="song-container">
      <h1>{currentSong.cover}</h1>
      <h1></h1>
      <h1>Artist </h1>
    </div>
  );
};

export default Song;