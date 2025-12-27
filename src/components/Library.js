import React from "react";
import LibrarySong from "./LibrarySongs";


const Library = ({ songs }) => {
    return (
        <div className="Library">
            <h2>Library</h2>
            <div className="Library-songs">
                {songs.map((song) =>
                (<LibrarySong song={song} />
                ))}
            </div>
        </div>
    );
};

export default Library;