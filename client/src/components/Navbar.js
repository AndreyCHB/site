import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo center">Приложение для контроля веса</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to ="/create">Вес сегодня</NavLink></li>
                    <li><NavLink to ="/links">Статистика</NavLink></li>
                    <li><a href ="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}