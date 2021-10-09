import React, {useContext} from 'react'
import menu from '../images/menu.svg'
import home from '../images/home.svg'
import profile from '../images/profile.svg'
import {Hompage} from '../App'
function Footer1() {
    const homepage = useContext(Hompage)
    return (
        <div className="footer">
            <img src={menu} alt=""/>
            <img src={home} alt="" onClick={homepage}/>
            <img src={profile} alt=""/>
        </div>
    )
}

export default Footer1
