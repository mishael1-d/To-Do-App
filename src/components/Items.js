import React, { useReducer, useState, useRef, useEffect, useContext } from "react";
import Footer1 from "./Footer1";
import add from "../images/add.svg";
import tick from "../images/tick.svg";
import del from "../images/del.svg";
import Modal from "./Modal";
import Scroll from "./Scroll";
import {Hompage} from '../App'

export const TitleContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newItem = [...state.items, action.payload];
    return {
      ...state,
      items: newItem,
      isModalOpen: true,
      modalContent: "item added",
      openSaveModal: false,
      type: "success",
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "please enter a value",
      openSaveModal: false,
      type: "danger",
    };
  }
  if (action.type === "NO_ITEM") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "can't submit empty list",
      openSaveModal: false,
      type: "danger",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
      openSaveModal: false,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItem = state.items.filter((item) => item.id !== action.payload);
    return {
      ...state,
      items: newItem,
      modalContent: "item removed",
      isModalOpen: true,
      openSaveModal: false,
      type: "danger",
    };
  }
  if (action.type === "COMPLETE_ITEM") {
    const newItem = state.items.filter((item) => item.id !== action.payload);
    return {
      ...state,
      items: newItem,
      modalContent: "item completed",
      isModalOpen: true,
      openSaveModal: false,
      type: "success",
    };
  }
  if (action.type === "DONE") {
    return {
      ...state,
      openSaveModal: true,
    };
  }
  if (action.type === "SUBMIT") {
    return {
      ...state,
      openSaveModal: false,
    };
  }
  if (action.type === "SAVE") {
    const title = action.payload;
    return {
      ...state,
      title: title,
      openSaveModal: false,
    };
  }
  throw new Error("no matching action");
};

const defaultState = {
  items: [],
  isModalOpen: false,
  modalContent: "",
  openSaveModal: false,
  type: "success",
  title: "",
};

const Items = () => {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [savetext, setSaveText] = useState("");
  const [textTitle, setTextTitle] = useState([]);
  const inputRef = useRef(null);
  const itemRef = useRef(null)
  const task_added = useContext(Hompage)
  

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const newItem = { id: new Date().getTime().toString(), input };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setInput("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (savetext) {
      const title = savetext;
      dispatch({ type: "SAVE", payload: title });
    }
    setSaveText("");
    state.openSaveModal = false;
  };

  const done = () => {
    if (state.items.length === 0) {
      dispatch({ type: "NO_ITEM" });
    } 
    if (state.items.length > 0) {
      dispatch({ type: "DONE" });
    }
    if (state.items.length > 0 && state.title) {
      dispatch({type: "SUBMIT"})
      task_added.taskPresent()
    }
    setTextTitle([...textTitle, state.title])
  };
  
  return (
    <>
      <div className="container1">
        <div className="items">
          {/* if modalopen state = true display the modal component */}
          {state.isModalOpen && (
            <Modal
              closeModal={closeModal}
              modalContent={state.modalContent}
              type={state.type}
            />
          )}
          {/* render title start */}
          {state.title && (
            <TitleContext.Provider value={state.title}>
            <h4
              style={{
                textAlign: "center",
                paddingTop: 10,
                color: "grey",
                fontStyle: "italic",
                textTransform: "capitalize"
              }}
            >
              {state.title}
              {console.log(state.title)}
            </h4>
            </TitleContext.Provider>
          )}
          {/* render title ends */}
          <input
            type="text"
            ref={inputRef}
            placeholder="Add an item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img className='add' src={add} alt="" onClick={handleSubmit} />
          <Scroll>
            {/* List of items start */}
            {state.items.map((item) => {
              return (
                <div className="item" key={item.id} ref={itemRef}>
                  <p>{item.input}</p>
                  <div className="action">
                    <img
                      src={del}
                      alt=""
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                    />
                    <img
                      src={tick}
                      alt=""
                      onClick={() =>
                        dispatch({ type: "COMPLETE_ITEM", payload: item.id })
                      }
                    />
                  </div>
                </div>
              );
            })}
            {/* List of items end */}
          </Scroll>
          {/* if opensavemodal = true then display the save btn else display the done btn --starts */}
          {state.openSaveModal ? (
            <div className="savemodal" ref={inputRef}>
              <input
                className="input"
                type="text"
                
                placeholder="** add a title"
                value={savetext}
                onChange={(e) => setSaveText(e.target.value)}
              />
              <button className="btn" onClick={handleSave}>
                save
              </button>
            </div>
          ) : (
            <button
              className="btn"
              onClick={done}
            >
              DONE
            </button>
          )}
          {/* if opensavemodal = true then display the save btn else display the done btn --ends */}
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default Items;
