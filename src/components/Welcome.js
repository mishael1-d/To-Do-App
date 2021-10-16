import React from "react";

function Welcome({click}) {
  return (
    <>
    
      <div className="container">
        <div className="welcome">
          <h4>to-do-list</h4>
          <p>
            Start your day well, failure to plan for the future <br /> is
            planning to fail.
          </p>
          <button className="btn" onClick={()=>{click()}}>
            let's go!!
          </button>
        </div>
      </div>
     
    </>
  );
}

export default Welcome;
