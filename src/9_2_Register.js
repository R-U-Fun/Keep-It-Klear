import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useRef } from 'react';
import Login from './9_1_Login';
import ThemeSingleton from './ThemeSingleton';

import useWindowSize from 'react-use/lib/useWindowSize';

import ServerURL from './10_ServerURL';

import Cookies from 'js-cookie';
import Sound, { LoadedSound, LoadingSound } from './Sound';

function RegisterHandle(NewUserName, NewEmail, NewPassword, NewConfirmPassword){
    if( NewUserName && NewPassword && NewConfirmPassword){
        if(NewPassword === NewConfirmPassword){
        createRoot(document.getElementById('RegisterLoading')).render(
            <>
                <br/><br/>
                <div className="spinner-border text-light fs-3" role="status"></div>
                <br/><br/>
            </>
        );
        fetch(ServerURL.KIKServer()+`/Server/User/View/${NewUserName}`)
        .then(response => response.json())
        .then(Data => {
            if(!Data){
                let NewUser = {
                    Username: NewUserName,
                    Password: NewPassword,
                    Email: NewEmail
                }

                console.log(NewUser);

                fetch(ServerURL.KIKServer()+'/Server/User/Create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            NewUser
                        )
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("REGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg");
                        console.log(data);
                        createRoot(document.getElementById('PageHere')).render(<Login />);
                    })
                    .catch(error => {
                        console.error(error);
                        console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror registering new user     "+error);
                    });
            }
            else{
                alert("Username Already Exists");
                createRoot(document.getElementById('PageHere')).render(<Register />);
            }
        
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Can Not Connect At The Moment: Server Update On Progress.");
            window.location.reload(false);
        });
        
        }
        else{
            alert("Password & Confirm Password doesn't match");
        }
    }
    else{
        alert("Please fill Username, Password & Confirm Password");
    }
}

export default function Register(){
    let { width, height } = useWindowSize();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ConfirmpasswordRef = useRef();

    return(
        <div style={{height:`${height-200}px`}}>
            <LoadedSound/>
            <br/><br/>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="Username"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="Username" ref={usernameRef}/>
            </div>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="Email"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="Email" ref={emailRef}/>
            </div>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="Password"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="Password" ref={passwordRef}/>
            </div>
            <div className="input-group mb-3">
                <span className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()}`} id="ConfirmPassword"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="ConfirmPassword" ref={ConfirmpasswordRef}/>
            </div>
            <div className="input-group mb-3">
                <details className={`input-group-text btn btn-lg btn-${ThemeSingleton.getTheme()} w-100`} >
                    <summary>Terms & Conditions</summary>
                    <div>
                    <p>By clicking 'Register'<br/>you are agreeing to Terms & Conditions of Keep It Klear</p>
                    </div>
                </details>
            </div>
            <div id="RegisterLoading">
            <button type="button" className={`btn btn-${ThemeSingleton.getTheme()} btn-lg m-2 fw-bold`} onClick={() => RegisterHandle(usernameRef.current.value, emailRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}><i className="bi bi-pen"></i> Register</button>
            <br/>
            </div>
        </div>
    );
}