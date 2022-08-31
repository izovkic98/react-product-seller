import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from '../store/actions/user';
import { Role } from '../models/role';
import logo from './Skypark_logo.png';
import EngFlag from './eng.png';
import CroFlag from './cro.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";
import React, { Component } from "react";

const NavBar = () => {

    const currentUser = useSelector(state => state.user);
    const [lang, setLang] = useState(LOCALES.CROATIAN);

    useEffect(() => {

        if (localStorage.getItem("language") == null) {
            localStorage.setItem("language", LOCALES.CROATIAN);
        }

    }, []);

    const onLanguageChanged = (e) => {
        e.preventDefault();
        if (localStorage.getItem("language") == LOCALES.CROATIAN) {
            localStorage.setItem("language", LOCALES.ENGLISH);
            setLang(LOCALES.CROATIAN)

        } else {
            localStorage.setItem("language", LOCALES.CROATIAN);
            setLang(LOCALES.ENGLISH)
        }
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/login');
    };

    return (
        <React.Fragment>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <I18nProvider locale={localStorage.getItem("language")}>
                <a href="https://reactjs.org" className="navbar-brand ms-1">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>

                <div className="navbar-nav me-auto">
                    {currentUser?.role === Role.ADMIN &&
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/admin-reservations">Reservations</NavDropdown.Item>
                            <NavDropdown.Item href="/admin-users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="/admin-parkings">Parkings</NavDropdown.Item>
                        </NavDropdown>
                    }

                    <li className="nav-item">
                        <NavLink to="/home" className="nav-link">
                            <FormattedMessage id='home'/>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/parking-calculator" className="nav-link">
                            Calculator
                        </NavLink>
                    </li>
                    <li className="nav-item" style={{ backgroundColor: 'cadetblue', marginLeft: 20 + 'px', color: 'white' }}>

                        <Button onClick={(e) => onLanguageChanged(e)} className="nav-link" style={{ color: 'white' }} >
                            {lang} <img src={`${localStorage.getItem("language") === LOCALES.ENGLISH ? CroFlag : EngFlag}`} className="lang-logo" alt="logo" />
                        </Button>
                    </li>
                </div>


                {!currentUser &&
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">
                                Sign Up
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ marginRight: 20, marginLeft: 20 }}>
                            <NavLink to="/login" className="nav-link">
                                Sign In
                            </NavLink>
                        </li>
                    </div>
                }

                {currentUser &&
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link">
                                {currentUser.username}
                                {currentUser?.role === Role.ADMIN && <span> (admin)</span>}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/change-password" className="nav-link">
                                Change password
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <a href="#" className="nav-link" style={{ marginRight: 20, marginLeft: 20 }} onClick={() => logout()}>
                                Sign Out
                            </a>
                        </li>
                    </div>
                }

            </I18nProvider>
        </nav>
        </React.Fragment>
    );
};

export { NavBar };
