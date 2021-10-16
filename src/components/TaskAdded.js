import React, { useState, useContext } from "react";
import arrow from "../images/back-arrow.svg";
import Footer from "./Footer";
import Popup from "./Popup";
import {TitleContext} from './Items'

function TaskAdded(props) {
  const { click} = props;
  const [popup, setPopup] = useState(false);
  const title = useContext(TitleContext);
  console.log(title);
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
          <p>lorem100
          </p>
          {popup && <Popup/>}
          <Footer className='task-footer'/>
        </div>
      </div>
    </>
  );
}

export default TaskAdded;
