import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};


function Timer(props) {
  
    return (
        <div>
        <Countdown date={Date.now() + props.time} renderer={renderer}  onComplete={()=>console.log("completed")}/>
        </div>
    )
}

export default Timer
