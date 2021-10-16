import React, { useState } from "react";

function SaveModal({ closeModal }) {
  const [text, setText] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    if (closeModal) {
      const save = text;
      setText(save);
    }
    setText("");
  };
  return (
    <>
      <div className="savemodal">
        <input
          className="input"
          type="text"
          placeholder="** add a title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" onClick={handleSave}>
          save
        </button>
      </div>
    </>
  );
}

export default SaveModal;
