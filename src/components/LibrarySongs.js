import React from "react";

const LibrarySong = ({currentSong}) => {
  return (
    <div className="Librarys-ongs">
    <img alt={currentSong.name} src={currentSong.cover}></img>  
      <h3>{currentSong.name}</h2>
      <h4>{currentSong.artiste}</h3>
    </div>
  );
};

export default LibrarySong;