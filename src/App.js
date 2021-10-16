import React from "react";
import "./App.css";
import { useState, useContext } from "react";
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
  const clickHandler = () => {
    setTimeout(() => {
      setIsReady(!ready);
    }, 500);
  };
  const render = () => {
    setTimeout(() => {
      setRenderList(!renderList);
    }, 100);
    console.log("btn clicked");
    if (ready && !renderList) {
      setHome(false);
    }
  };
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
        {/* <Items/> */}
      </div>
    </>
  );
}

export default App;
