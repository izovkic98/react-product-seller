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

    useEffect(() => {

        if (localStorage.getItem("language") == null) {
            localStorage.setItem("language", LOCALES.CROATIAN);
        }


    }, []);

    const onLanguageChanged = (e) => {
        e.preventDefault();
        if (localStorage.getItem("language") == LOCALES.CROATIAN) {
            localStorage.setItem("language", LOCALES.ENGLISH);

        } else {
            localStorage.setItem("language", LOCALES.CROATIAN);
        }
        window.location.reload(false);

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
                                <NavDropdown.Item href="/admin-reservations"><FormattedMessage id='reservations' /></NavDropdown.Item>
                                <NavDropdown.Item href="/admin-users"><FormattedMessage id='users' /></NavDropdown.Item>
                                <NavDropdown.Item href="/admin-parkings"><FormattedMessage id='parkings' /></NavDropdown.Item>
                            </NavDropdown>
                        }

                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">
                                <FormattedMessage id='home' />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/parking-calculator" className="nav-link">
                                <FormattedMessage id='calculator' />
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ backgroundColor: 'cadetblue', marginLeft: 20 + 'px', color: 'white' }}>

                            <Button onClick={(e) => onLanguageChanged(e)} className="nav-link" style={{ color: 'white' }} >
                                {localStorage.getItem("language") === LOCALES.ENGLISH ? 'CRO' : 'ENG'} 
                                <img src={`${localStorage.getItem("language") === LOCALES.ENGLISH ? CroFlag : EngFlag}`} className="lang-logo" alt="logo" />
                            </Button>
                        </li>
                    </div>


                    {!currentUser &&
                        <div className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                    <FormattedMessage id='sign_up' />
                                </NavLink>
                            </li>
                            <li className="nav-item" style={{ marginRight: 20, marginLeft: 20 }}>
                                <NavLink to="/login" className="nav-link">
                                    <FormattedMessage id='sign_in' />
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
                                    <FormattedMessage id='chng_password' />
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <a href="#" className="nav-link" style={{ marginRight: 20, marginLeft: 20 }} onClick={() => logout()}>
                                    <FormattedMessage id='sign_out' />
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
