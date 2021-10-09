import React, { useReducer, useState, useRef, useEffect } from "react";
import Footer1 from "./Footer1";
import add from "../images/add.svg";
import tick from "../images/tick.svg";
import del from "../images/del.svg";
import Modal from "./Modal";
import Scroll from "./Scroll";

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
  if (action.type === "SAVE") {
    const title = action.payload
    return {
      title: title,
      openSaveModal: true,
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
  title: ""
};

const Items = () => {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [savetext, setSaveText] = useState("");
  const inputRef = useRef(null)

  useEffect(()=>{
    inputRef.current.focus()
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked a button");
    if (input) {
      const newItem = { id: new Date().getTime().toString(), input };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setInput("");
      console.log(newItem);
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  
  const handleSave = (e) => {
    e.preventDefault();
    if(savetext) {
      const title = savetext;
      dispatch({type: "SAVE", payload: title})
    }
  }
  return (
    <>
      <div className="container1">
        <div className="items">
          {state.isModalOpen && (
            <Modal
              closeModal={closeModal}
              modalContent={state.modalContent}
              type={state.type}
            />
          )}
          {!state.openSaveModal && <h4>{state.title}</h4>}
          <input
            type="text"
            ref={inputRef}
            placeholder="Add an item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img src={add} alt="" onClick={handleSubmit} />
          <Scroll>
            {state.items.map((item) => {
              return (
                <div className="item" key={item.id}>
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
          </Scroll>
          {state.openSaveModal ? (
            <div className="savemodal">
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
            <button className="btn" onClick={() => dispatch({ type: "DONE" })}>
              DONE
            </button>
          )}
          <Footer1/>
        </div>
      </div>
    </>
  );
};

export default Items;
