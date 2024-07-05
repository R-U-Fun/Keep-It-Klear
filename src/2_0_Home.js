import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './9_1_Login';
import UserSingleton from './12_UserSingleton';

import ServerURL from './10_ServerURL';

import Cookies from 'js-cookie';
import Sound, { LoadedSound } from './Sound';
import Table from './14_Table';

function CookieTrue(){
    return(
        <div className="container text-center">
            <div className="row gx-3 text-center justify-content-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                    <div className="card text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="PageHere">
                        <Table/>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        </div>
    );
}

function CookieHandle(CurrentUserName){
    fetch(ServerURL.KIKServer()+`/Server/User/Read/${CurrentUserName}`)
        .then(response => response.json())
        .then(Data => {
            console.log("LOGIN CHECK");
            UserSingleton.setUserName(Data);
            createRoot(document.getElementById('HomeHere')).render(<CookieTrue />);
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

export default function HomePage(){
    let KeepItKlearCookie = Cookies.get('KeepItKlearUser');

    let TrialGameRef = useRef(null);
    let scrollToTrialGame = () => {
        TrialGameRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    if (KeepItKlearCookie){
        console.log(KeepItKlearCookie);
        CookieHandle(KeepItKlearCookie);
    }   
    else{
        return(
        <div className="container text-center">
            <div className="row gx-3 text-center justify-content-center">
                <div className="col-lg-1"></div>
                <div className=" col-lg-10">
                    <div className="card text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="PageHere">
                        <Login/>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        </div>
        );
    }
}