import { useState,useEffect,useRef } from "react";
import './index.css';

function Stopwatch(){
    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setisElapsedTime] = useState(0);
    const startTime = useRef(0)
    const intervalId = useRef(null)

    useEffect(()=>{
        if(isRunning){
            intervalId.current = setInterval(()=>{
                setisElapsedTime(Date.now() - startTime.current)
            },10)
        }
        

        return ()=>{
        clearInterval(intervalId.current)
        }
    },[isRunning])

    

 
    function start(){
        setisRunning(true)
        startTime.current = Date.now() - elapsedTime;

    }
    function stop(){
        setisRunning(false)
    }
    function reset(){
        setisElapsedTime(0)
        setisRunning(false)
    }
    function formatTime(){
        let hours = Math.floor(elapsedTime  / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime %  1000) /10 );

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds=String(milliseconds).padStart(2,"0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls ">
                <button className="start-btn" onClick={start}>Start</button>
                <button className="stop-btn" onClick={stop}>Stop</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
            </div>
        </div>
        
    )

}
export default Stopwatch;