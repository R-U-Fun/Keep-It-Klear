import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import Register from './9_2_Register';
import UserSingleton from './12_UserSingleton';
import Home from './2_0_Home';
import ThemeSingleton from './ThemeSingleton';

import ServerURL from './10_ServerURL';

import Cookies from 'js-cookie';

import useWindowSize from 'react-use/lib/useWindowSize';
import Sound, { LoadedSound } from './Sound';

async function LoginHandle(CurrentUserName, CurrentPassword){
    if(CurrentUserName && CurrentPassword){
        createRoot(document.getElementById('LoginLoading')).render(
            <>
                <br/><br/>
                <div className="spinner-border text-light fs-3" role="status"></div>
                <br/><br/>
            </>
        );

        await fetch(ServerURL.KIKServer()+`/Server/User/Read/${CurrentUserName}`)
        .then(response => response.json())
        .then(Data => {
            if(CurrentPassword === Data.Password){
                console.log("LOGIN CHECK");
                UserSingleton.setUserName(Data);

                let CookieName = Data.Username.toString();

                Cookies.set('KeepItKlearUser', CookieName, { expires: 7 });
                
                createRoot(document.getElementById('HomeHere')).render(<Home />);
            }
            else{
                alert("Invalid Username & Password");
                createRoot(document.getElementById('PageHere')).render(<Login />);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Invalid Username & Password");
            createRoot(document.getElementById('PageHere')).render(<Login />);
        });
    }
    else{
        alert("Please fill Username & Password");
    }
}

export default function Login(){
    let { width, height } = useWindowSize();
    
    const usernameRef = useRef();
    const passwordRef = useRef();
    return(
        <div style={{height:`${height-200}px`}}>
            <LoadedSound/>
            <br/><br/><br/><br/>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="basic-addon1"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ref={usernameRef}/>
            </div>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="basic-addon1"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" ref={passwordRef}/>
            </div>
            <div id="LoginLoading">
            <button type="button" className={`btn btn-${ThemeSingleton.getTheme()} btn-lg mt-3 fw-bold w-100`} onClick={() => LoginHandle(usernameRef.current.value, passwordRef.current.value)}><i className="bi bi-door-closed"></i> Login</button>
            <br/>
            <button type="button" className={`btn btn-${ThemeSingleton.getTheme()} btn-lg mt-3 fw-bold w-100`} onClick={() => createRoot(document.getElementById('PageHere')).render(<Register />)}><i className="bi bi-pen"></i> Register</button>
            </div>
            <br/><br/><br/><br/>
        </div>
    );
}