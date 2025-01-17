import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import UserSingleton from './10_ServerURL';
import UserProfile from './13_1_UserProfile';

import ServerURL from './10_ServerURL';
import Cookies from 'js-cookie';
import useWindowSize from 'react-use/lib/useWindowSize';
import Sound, { LoadedSound } from './Sound';
import Home from './2_0_Home';

import ThemeSingleton from './ThemeSingleton';
import Theme from './ThemeSet';

async function DeleteHandle(OldPassword){
    let UserData = UserSingleton.getUserName();

    if(OldPassword === UserData.Password){
        if(window.confirm("Are you sure you want to delete your profile?\nDo you wish to continue?")) {
            await fetch(ServerURL.KIKServer()+`/Server/User/Delete/${UserData.Username}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .catch((error) => {
                console.log('Error:', error);
            });

            Cookies.remove('KeepItKlearUser');
            window.location.reload(false);
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
    const oldpasswordRef = useRef();

    return(
        <div style={{height:`${height-200}px`}}>
        <LoadedSound/>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"170px", cursor: 'auto'}}>{UserData.Username}</a></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Password" style={{width:"170px", cursor: 'auto'}} ref={oldpasswordRef}/></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <tr>
                <th><a className="btn btn-success m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => DeleteHandle(oldpasswordRef.current.value)}>Delete</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => createRoot(document.getElementById('PageHere')).render(<UserProfile />)}>Cancel</a></td>
            </tr>
        </div>
    );
}
