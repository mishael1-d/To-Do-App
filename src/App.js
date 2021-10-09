import React from "react";
import "./App.css";
import { useState } from "react";
import Items from "./components/Items";
import Task from "./components/Task";
import Welcome from "./components/Welcome";
// import Items from "./components/Items";

export const PopupContext = React.createContext();
export const Hompage = React.createContext();
console.log(PopupContext.Provider.value);
function App() {
  const [ready, setIsReady] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [home, setHome] = useState(false);
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
  return (
    <>
      <div className="">
        {home && ready ? (
          <PopupContext.Provider value={render}>
            <Task click={clickHandler} />
          </PopupContext.Provider>
        ) : renderList ? (
          <Hompage.Provider value={homepage}>
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
