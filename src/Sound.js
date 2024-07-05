import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Song1 from "./Audio/plucky.mp3";
import LoadedSoundEffect from './Audio/plucky.mp3';
import ThemeSet from './ThemeSet';
import ThemeSingleton from './ThemeSingleton';

export function LoadedSound(){
    return(<audio autoPlay><source src={LoadedSoundEffect} type="audio/mp3"/></audio>);
}

export default function Sound(){
    let [Music, setMusic] = useState(false);
    let audioRef1 = useRef(null);

    let Play = () => {
        setMusic(PrevMusic => !PrevMusic);
    };

    let Volume = (event) => {
        audioRef1.current.volume = event.target.value;
        if(event.target.value <= 0.01){
            setMusic(PrevMusic => !PrevMusic);
        }
    };

    return(
        <a style={{color: 'rgba(210, 226, 250, 1)'}}>
            <i onClick={Play} className={`btn btn-outline-${ThemeSingleton.getTheme()}`}>
                {
                    Music ? 
                        <i className="bi bi-music-note-beamed fs-6 text-white">
                            <audio autoPlay ref={audioRef1} loop><source src={Song1} type="audio/mp3"/></audio>
                        </i> 
                    :
                        <i className="bi bi-volume-mute-fill fs-6 text-white"></i>
                }
            </i>
                {
                    Music ? 
                        <a className={`btn btn-outline-${ThemeSingleton.getTheme()}`}><input type="range" min="0" max="1" step="0.01" onChange={Volume} /></a>
                    :
                        null
                }
        </a>
    );
}