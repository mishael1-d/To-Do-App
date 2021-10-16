import React, { useState, useContext } from 'react';
import arrow from "../images/back-arrow.svg";
import Footer from "./Footer";
import Popup from "./Popup";
import {TitleContext} from './Items'

function TaskAdded({click}) {
  const [popup, setPopup] = useState(false);
  const title = useContext(TitleContext);
  const togglePopup = () => {
    setTimeout(() => {
      setPopup(!popup);
    }, 50);
  };
  return (
    <>
      <div className="container">
        <div className="taskadded">
          <img className='Backward_arrow'
            src={arrow}
            alt="Back"
            onClick={click}
          />
          <p>{title}</p>
          {popup && <Popup/>}
          <Footer className='task-footer' addnew={togglePopup}/>
        </div>
      </div>
    </>
  );
}

export default TaskAdded;
