import React from "react";

const LibrarySong = ({ song, selectSongHandler }) => {
  return (
    <div
      onClick={() => selectSongHandler(song)}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artiste}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
