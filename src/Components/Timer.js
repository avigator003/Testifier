import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import WatchLater from '@material-ui/icons/WatchLater';
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
      <span >
              <CButton shape="pill" color="success" style={{height:100,width:100,borderRadius:100}}>
               <WatchLater style={{fontSize:35}}/>
               <div style={{display:"flex",flexDirection:"row",padding:3,marginLeft:7}}>
                <p style={{fontSize:"15px", fontWeight:"bold",paddingLeft:3}}>{hours}</p>
                :<p style={{fontSize:"15px", fontWeight:"bold",paddingLeft:3}}>{minutes}</p>
                :<p style={{fontSize:"15px", fontWeight:"bold",paddingLeft:3}}>{seconds}</p>
                </div>
              </CButton>
        
        
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
