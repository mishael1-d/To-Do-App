import React from 'react'

function Scroll(props) {
    return (
        <div className="scroll"style={{overflowY:"scroll", height: "400px"}}>
            {props.children}
        </div>
    )
}

export default Scroll
