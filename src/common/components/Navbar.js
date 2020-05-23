import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg" style={{'backgroundColor': '#4F9DDD'}}>
            <div className="navbar-brand" style={{'fontSize': '32px'}}>
                ОтчетностьDB
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" style={{'fontSize': '24px'}} to="/" exact>
                        Сотрудники
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" style={{'fontSize': '24px'}} to="/reports">
                        Создать отчёт
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" style={{'fontSize': '24px'}} to="/history">
                        История
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default NavBar