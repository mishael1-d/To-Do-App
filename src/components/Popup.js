import React, {useContext} from 'react'
import {PopupContext} from '../App'


function Popup() {
    const popup = useContext(PopupContext);
    return (
        <div className="popup">
            <ul>
                <li onClick={popup}>add new note</li>
                <li>add new task</li>
                <li>add new topic</li>
            </ul>
        </div>
    )
}

export default Popup
