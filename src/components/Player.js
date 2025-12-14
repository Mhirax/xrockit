import React from "react";

const player = () => {
    return (
      <div className="player">
        <div className="time-control">
          <p>Start Time</p>
          <input type="range" />
</div>
      </div>
    );
}

export default player;