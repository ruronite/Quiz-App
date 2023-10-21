import React, {useState, useEffect} from "react";

function Timer(props) {
  const [time, setTime] = useState(300000);
  const [color,setColor] = useState("black");
  const {handleSubmit} = props;

  useEffect(()=>{
    if (time <= -1000){
      alert("Time up!! Click OK to Submit")
      setTime(0);
      handleSubmit();

    }
    else {
      let timeInterval = setInterval(()=>{
        //console.log(`I ran ${time}`)
        if(time <= 60000){
          setColor("red")
        }
        setTime((prev)=>{
          return prev - 1000
        })
      }, 1000)
  
      return ()=>{
        clearInterval(timeInterval);
      }
    }    
  
  },[time])

  let minutes = Math.floor(time/(1000 * 60)).toString().padStart(2,"0");
  let seconds = (time % (60000)/1000).toString().padStart(2,"0");

  let timeStyle = {color: color};


  return (
    <div className="time">
      <div>
        <h5>Time:</h5>
        <p style={timeStyle}>{minutes} : {seconds}</p>
      </div>
    </div>
  );
}

export default Timer;
