import React, { useState, useContext }  from "react";
import "./App.css";
import Items from "./components/Items";
import Task from "./components/Task";
import Welcome from "./components/Welcome";
import TaskAdded from "./components/TaskAdded"
import {TitleContext} from "./components/Items"

export const PopupContext = React.createContext();
export const Hompage = React.createContext();

function App() {
  const [ready, setIsReady] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [home, setHome] = useState(false);
  const [taskadded, settaskadded] = useState(false)
  const title = useContext(TitleContext);

//Open the welcome page
  const clickHandler = () => {
    setTimeout(() => {
      setIsReady(!ready);
    }, 500);
  };

  //Function to render the items 
  const render = () => {
    setTimeout(() => {
      setRenderList(!renderList);
    }, 100);
    if (ready && !renderList) {
      setHome(false);
    }
  };

  //Home button function
  const homepage = () => {
    setTimeout(() => {
      setHome(!home);
      if (renderList) {
        setRenderList(false);
      } else {
        setRenderList(true);
      }
    }, 100);
  };

  //Function to render taskpresent component
  const taskPresent = () => {
    if (title !== '') {
      settaskadded(!taskadded);
    }
  }
  return (
    <>
      <div className="">
        {taskadded ? <TaskAdded/>:
        home && ready ? (
          <PopupContext.Provider value={render}>
            <Task click={clickHandler} />
          </PopupContext.Provider>
        ) : renderList ? (
          <Hompage.Provider value={{homepage, taskPresent}}>
            <Items />
          </Hompage.Provider>
        ) : ready ? (
          <PopupContext.Provider value={render}>
            <Task click={clickHandler} />
          </PopupContext.Provider>
        ) : (
          <Welcome click={clickHandler} />
        )}
      </div>
    </>
  );
}

export default App;
