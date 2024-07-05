import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sound, { LoadedSound } from './Sound';
import DataSingleton from './DataSingleton';

export default function Header() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsNavbarOpen(false);
        }
    };

    useEffect(() => {
        if (isNavbarOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isNavbarOpen]);

    let NavBar = [];
    for (let L = 0; L < DataSingleton.getData().Header.NavLinks.length; L++) {
        NavBar.push(
            <li key={L} className="zoom nav-item">
                <a className="nav-link p-2 mx-3" onClick={() => {
                    let Component = DataSingleton.getData().Header.NavLinks[L].Render;
                    createRoot(document.getElementById('PageHere')).render(<Component />);
                    setIsNavbarOpen(false); 
                }}>
                    <i className={DataSingleton.getData().Header.NavLinks[L].Icon}></i>
                    <i className="me-2"></i>
                    {DataSingleton.getData().Header.NavLinks[L].Name}
                </a>
            </li>
        );
    }


    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" ref={navRef}>
                <a className="zoom">
                    {/* <i className={`${DataSingleton.getData().Header.Icon} text-white fs-2 ms-4 me-4`}></i> */}
                    <img src={DataSingleton.getData().Header.Ico} className={`text-white fs-2 ms-4 me-4`} width="50px" />
                </a>
                <a className="zoom navbar-brand fs-4 fw-bold font-arial">{DataSingleton.getData().Header.Title}</a>
                <button className="navbar-toggler me-2" type="button" aria-controls="navbarNav" aria-expanded={isNavbarOpen} aria-label="Toggle navigation" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        {NavBar}
                    </ul>
                    <a className="navbar-nav me-auto mb-2 mb-lg-0"></a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link p-2 mx-3">
                                <Sound />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
