import React from "react";
import LibrarySong from "./LibrarySongs";
import { library } from "@fortawesome/fontawesome-svg-core";

const = () => {
    return (
        <div className="Library">
            <h2>Library</h2>
            <div className="Library-Songs">
               <LibrarySong />
            </div>
       </div>
   )
}

export default library;