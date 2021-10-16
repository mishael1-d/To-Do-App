import React, { useState } from "react";
import arrow from "../images/back-arrow.svg";
import Footer from "./Footer";
import Popup from "./Popup";

function Task({click}) {
  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    setTimeout(() => {
      setPopup(!popup);
    }, 500);
  };
  return (
    <>
      <div className="container">
        <div className="task">
          <img
          className='Backward_arrow'
            src={arrow}
            alt="Back"
            onClick={ 
              click
            }
          />
          <p>no task yet</p>
          {popup && <Popup/>}
          <Footer addnew={togglePopup} />
        </div>
      </div>
    </>
  );
}

export default Task;
