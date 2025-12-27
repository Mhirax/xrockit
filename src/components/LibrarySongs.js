import React from "react";

const LibrarySong = ({currentSong}) => {
  return (
    <div className="Librarys-ongs">
      <img src={currentSong.cover}  />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artiste}</h3>
    </div>
  );
};

export default Song;