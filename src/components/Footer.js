import React from 'react'
import menu from '../images/menu.svg'
import add from '../images/add.svg'
import profile from '../images/profile.svg'
function Footer(props) {
    const {addnew} = props;
    return (
        <div className="footer">
            <img src={menu} alt=""/>
            <img src={add} alt="" onClick={()=>addnew()}/>
            <img src={profile} alt=""/>
        </div>
    )
}

export default Footer
