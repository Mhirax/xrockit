import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibraryStatus }) => { 
  return (
    <nav>
      <h1 className="header">MUSIC PLAYER</h1>
      <button onClick={() => setLibraryStatus(toggle => !toggle)}> 
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;