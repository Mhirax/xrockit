import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, selectSongHandler, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            selectSongHandler={selectSongHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
