import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserSingleton from './12_UserSingleton';

import EditProfile from './13_2_EditProfile';
import DeleteProfile from './13_3_DeleteProfile';
import Sound, { LoadedSound } from './Sound';
import Home from './2_0_Home';

import Theme from './ThemeSet';
import ThemeSingleton from './ThemeSingleton';
import Login from './9_1_Login';

export default function Shared(){

    if(!UserSingleton.getUserName()){
        return(<Login/>);
    }
    else{
        return(
        <div><br/>
        <LoadedSound/>
        <br/><br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"170px", cursor: 'auto'}}>{UserSingleton.getUserName().Username}</a></td>
                    </tr>
                    <tr>
                        <th><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"150px", cursor: 'auto'}}>Email</a></th>
                        <td><a className={`btn btn-${ThemeSingleton.getTheme()} m-2 fw-bold`} style={{width:"170px", cursor: 'auto'}}>{UserSingleton.getUserName().Email}</a></td>
                    </tr>
                </tbody>
            </table>
            <br/><hr/>
            <tr>
                <th><a className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => ReactDOM.render(<EditProfile />, document.getElementById('PageHere'))}>Edit</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => ReactDOM.render(<DeleteProfile />, document.getElementById('PageHere'))}>Delete</a></td>
            </tr><br/><br/>
        </div>
        );
    }
}