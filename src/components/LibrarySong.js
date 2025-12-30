import React from "react";



const LibrarySong = ({ song, songs, setCurrentSong, id}) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    console.log (id);
  }

  

  return (
    <div onClick={songSelectHandler} className="library-song">
      <img alt={song.name} src={song.cover}></img>  
      <div className="song-description">
      <h3>{song.name}</h3>
        <h4>{song.artiste}</h4>
        </div>
    </div>
  );
};

export default LibrarySong;