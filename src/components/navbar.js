import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg" style={{'backgroundColor': '#4F9DDD'}}>
            <div className="navbar-brand" style={{'fontSize': '28px'}}>
                ОтчетностьDB
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" exact>
                        Сотрудники
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/reports">
                        Создать отчёт
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/history">
                        История
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar