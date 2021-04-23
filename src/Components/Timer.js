import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp,handleAnalysis }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => handleAnalysis() });

   useEffect(()=>{
    start()
   },[])

   
  return (
    <div style={{textAlign: 'center',position:"relative",top:-95}}>
      <div style={{fontSize: '100px'}}>
        <span style={{backgroundColor:"#404549",padding:10,borderRadius:10,color:"white",fontSize:20}}>{hours}</span>
         <span style={{padding:10,borderRadius:10,fontSize:30,fontWeight:"bold"}}>:</span>
        <span style={{backgroundColor:"#404549",padding:10,borderRadius:10,color:"white",fontSize:20}}>{minutes}</span>
        <span style={{padding:10,borderRadius:10,fontSize:30,fontWeight:"bold"}}>:</span>
        <span style={{backgroundColor:"#404549",padding:10,borderRadius:10,color:"white",fontSize:20}}>{seconds}</span>
      </div>
    </div>
  );
}