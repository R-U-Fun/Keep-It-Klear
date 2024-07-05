import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import UserSingleton from './12_UserSingleton';

import UserProfile from './13_1_UserProfile';

import ServerURL from './10_ServerURL';
import Cookies from 'js-cookie';
import useWindowSize from 'react-use/lib/useWindowSize';
import Homw from './2_0_Home';
import Sound, { LoadedSound } from './Sound';
import Home from './2_0_Home';

import ThemeSingleton from './ThemeSingleton';

async function EditHandle(NewUserName, NewEmail, OldPassword, NewPassword, NewConfirmPassword){
    let UserData = UserSingleton.getUserName();
    if(!NewUserName){
        NewUserName = UserData.Username;
    }
    if(!NewEmail){
        NewEmail = UserData.Email;
    }
    if(!NewPassword){
        NewPassword = UserData.Password;
    }
    if(!NewConfirmPassword){
        NewConfirmPassword = UserData.Password;
    }

    console.log(NewUserName);
    console.log(NewEmail);
    if(OldPassword === UserData.Password){

    if( NewPassword && NewConfirmPassword){
        if(NewPassword === NewConfirmPassword){
            window.location.reload(false);
            await fetch(ServerURL.KIKServer()+`/Server/User/Update/${UserData.Username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: NewUserName,
                    Password: NewPassword,
                    Email: NewEmail
                }),
            })
            .catch((error) => {
                console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror:', error);
            });

            Cookies.remove('KeepItKlearUser');
            UserSingleton.setUserName(null);
            createRoot(document.getElementById('HomeHere')).render(<Home />);
        }
        else{
            alert("Password & Confirm Password doesn't match");
            createRoot(document.getElementById('PageHere')).render(<EditProfile />);
        }
    }
    else{
        alert("Please fill Username, Password & Confirm Password");
        createRoot(document.getElementById('PageHere')).render(<EditProfile />);
    }
    }
    else{
        alert("Invalid Password");
    }
}

export default function EditProfile(){
    let { width, height } = useWindowSize();
    let UserData = UserSingleton.getUserName();
    const usernameRef = useRef();
    const emailRef = useRef();
    const oldpasswordRef = useRef();
    const passwordRef = useRef();
    const ConfirmpasswordRef = useRef();

    return(
        <div style={{height:`${height-200}px`}}>
        <LoadedSound/>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><input type="text" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder={`${UserData.Username}`} style={{width:"170px", cursor: 'auto'}} ref={usernameRef}/></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Email</a></th>
                        <td><input type="text" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder={`${UserData.Email}`} style={{width:"170px", cursor: 'auto'}} ref={emailRef}/></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Old Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Old Password" style={{width:"170px", cursor: 'auto'}} ref={oldpasswordRef}/></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="New Password" style={{width:"170px", cursor: 'auto'}} ref={passwordRef}/></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Confirm Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Confirm Password" style={{width:"170px", cursor: 'auto'}} ref={ConfirmpasswordRef}/></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <tr>
                <th><a className="btn btn-success m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => EditHandle(usernameRef.current.value, emailRef.current.value, oldpasswordRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}>Save</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => createRoot(document.getElementById('PageHere')).render(<UserProfile />)}>Cancel</a></td>
            </tr>
        </div>
    );
}