import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserSingleton from './12_UserSingleton';
import ThemeSingleton from './ThemeSingleton';
import PersonalSingleton from './PersonalSingleton';

import ServerURL from './10_ServerURL';
import useWindowSize from 'react-use/lib/useWindowSize';

import Sound, { LoadedSound } from './Sound';

async function UpdateInteraction(NewInteraction){
    await fetch(ServerURL.KIKServer()+`/Server/Personal/Create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            NewInteraction
        ),
    })
    .catch((error) => {
        console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror:', error);
    });

    await fetch(ServerURL.KIKServer()+`/Server/Personal/Read/${UserSingleton.getUserName().Username}`)
    .then(response => response.json())
    .then(Data => {
        PersonalSingleton.setPersonal(Data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

async function NewInteraction(NewInter){
    //let GameProgressLength = UserSingleton.getUserName().GameProgress.length;
    //let IDNum = parseInt(UserSingleton.getUserName().GameProgress[GameProgressLength-1].InteractionID.charAt(0))+1;

    let IDNum = (PersonalSingleton.getPersonal().length)+1;

    let CurrentDate = new Date();
    let IDDate = (""+CurrentDate.getFullYear()+"/"+(CurrentDate.getMonth()+1)+"/"+CurrentDate.getDate());
    let IDTime = (""+CurrentDate.getHours()+":"+CurrentDate.getMinutes()+":"+CurrentDate.getSeconds());

    let NewDate = NewInter.Date;
    let NewTime = NewInter.Time;
    let NewAction = NewInter.Action;
    let NewReason = NewInter.Reason;
    let NewAmount = NewInter.Amount;

    let Balance = 0;
    let NewBalance = Balance;

    if(PersonalSingleton.getPersonal().length > 0){
        
        Balance = PersonalSingleton.getPersonal()[(PersonalSingleton.getPersonal().length)-1].Balance;
        NewBalance = Balance;

        if(NewAction){
            NewBalance = parseInt(Balance) + parseInt(NewAmount);
        }
        else{
            NewBalance = parseInt(Balance) - parseInt(NewAmount);
        }
    }
    else{
        NewBalance = NewAmount;
    }


    let NewInteraction = {
        IntID: IDNum,
        Username: UserSingleton.getUserName().Username,
        IntDate: IDDate,
        IntTime: IDTime,
        Date: NewDate,
        Time: NewTime,
        Action: NewAction,
        Reason: NewReason,
        Amount: NewAmount,
        Balance: NewBalance
    };

    console.log(NewInteraction);
    UpdateInteraction(NewInteraction);
    createRoot(document.getElementById('PageHere')).render(<Table />);
}

function UserRecordBox(props){
    let Date = PersonalSingleton.getPersonal()[(props.index)-1].Date;
    let Time = PersonalSingleton.getPersonal()[(props.index)-1].Time;
    let Action = PersonalSingleton.getPersonal()[(props.index)-1].Action;
    let Reason = PersonalSingleton.getPersonal()[(props.index)-1].Reason;
    let Amount = PersonalSingleton.getPersonal()[(props.index)-1].Amount;
    let Balance = PersonalSingleton.getPersonal()[(props.index)-1].Balance;
    return(
        <>
            <tr>
                <td><a className="btn btn-dark m-1 fw-bold" style={{width:"95px", fontSize:"12px"}}>{Date}<br/>{Time}</a></td>
                <td className="w-50"><a className="btn btn-dark m-1 fw-bold w-100">{Reason}</a></td>
                <td><a className={`btn btn-dark text-${Action ? "success" : "danger"} m-1 fw-bold w-100`}>{Amount}</a></td>
                <td><a className="btn btn-dark m-1 fw-bold w-100">{Balance}</a></td>
            </tr>
        </>
    );
}

function PersonalRows(){
    let [PersonalLength, setPersonalLength] = useState(0);

    fetch(ServerURL.KIKServer()+`/Server/Personal/Read/${UserSingleton.getUserName().Username}`)
    .then(response => response.json())
    .then(Data => {
        PersonalSingleton.setPersonal(Data);
        setPersonalLength(Data.length);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    if(PersonalLength>0){

        let Personals = [];

        for(let L = 1; L <= PersonalLength; L++) {
            Personals.push(
                <UserRecordBox key={L} index={L}/>
            );
        }
        return(
            <>{Personals}</>
        );
    }
    else{
        return(
            <>
                <br/><br/><br/><br/>
                <a className={`btn btn-${ThemeSingleton.getTheme()} fw-bold fs-1 tex-center`}>Nothing Here Yet...</a>
            </>
        );
    }
}

function InputBar(){
    let { width, height } = useWindowSize();
    let DateRef = useRef();
    let TimeRef = useRef();
    let [ActionState, setActionState] = useState(null);
    let ReasonRef = useRef();
    let AmountRef = useRef();
    if(PersonalSingleton.getPersonal().length > 0){
        return(
                <div className="Overlay position-fixed top-0 start-0 p-5" style={{width:width, height:height}}>
                    <br/><br/><br/><br/><br/>
                    <a onClick={() => createRoot(document.getElementById('ModalHere')).render(<></>)}><i className="bi bi-x-circle-fill display-4"></i></a><br/><br/><br/>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntDate"><i className="bi bi-calendar"></i></span>
                        <input type="date" className="form-control" placeholder="Date" aria-label="Date" aria-describedby="IntDate" ref={DateRef}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntTime"><i className="bi bi-clock"></i></span>
                        <input type="time" className="form-control" placeholder="Time" aria-label="Time" aria-describedby="IntTime" ref={TimeRef}/>
                    </div>
                    <input type="radio" className="form-check-input m-3" name="flexRadioDefault" id="flexRadioDefault1" value={true} onChange={() => setActionState(true)}/>
                    <label className="form-check-label btn btn-lg btn-success" htmlFor="flexRadioDefault1">Credit</label>
                    <input type="radio" className="form-check-input m-3" name="flexRadioDefault" id="flexRadioDefault2" value={false} onChange={() => setActionState(false)} checked/>
                    <label className="form-check-label btn btn-lg btn-danger" htmlFor="flexRadioDefault2">Debit</label><br/><br/>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntReason"><i className="bi bi-pen"></i></span>
                        <input type="text" className="form-control" placeholder="Reason" aria-label="Reason" aria-describedby="IntReason" ref={ReasonRef}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntAmount"><i className="bi bi-123"></i></span>
                        <input type="number" className="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="IntAmount" ref={AmountRef}/>
                    </div>
                    <button type="button" className={`bi bi-floppy2-fill btn btn-${ThemeSingleton.getTheme()} btn-lg fw-bold w-100`} onClick={() => {
                        let NewInter;
                        if(DateRef.current.value && TimeRef.current.value && ReasonRef.current.value && AmountRef.current.value){
                            NewInter = {
                                Date: DateRef.current.value,
                                Time: TimeRef.current.value,
                                Action: ActionState,
                                Reason: ReasonRef.current.value,
                                Amount: AmountRef.current.value
                            }
                            NewInteraction(NewInter);
                        }
                        else{
                            alert("Please fill everything")
                        }
                    }}></button>
                </div>
        );
    }
    else{
        return(
                <div className="Overlay position-fixed top-0 start-0 p-5" style={{width:width, height:height}}>
                    <br/><br/><br/><br/><br/>
                    <a onClick={() => createRoot(document.getElementById('ModalHere')).render(<></>)}><i className="bi bi-x-circle-fill display-4"></i></a><br/><br/><br/>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntDate"><i className="bi bi-calendar"></i></span>
                        <input type="date" className="form-control" placeholder="Date" aria-label="Date" aria-describedby="IntDate" ref={DateRef}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntTime"><i className="bi bi-clock"></i></span>
                        <input type="time" className="form-control" placeholder="Time" aria-label="Time" aria-describedby="IntTime" ref={TimeRef}/>
                    </div>
                    <input type="radio" className="form-check-input m-3" name="flexRadioDefault" id="flexRadioDefault1" value={true} onChange={() => setActionState(true)} disabled/>
                    <label className="form-check-label btn btn-lg btn-success" htmlFor="flexRadioDefault1">Credit</label>
                    <input type="radio" className="form-check-input m-3" name="flexRadioDefault" id="flexRadioDefault2" value={false} onChange={() => setActionState(false)} disabled/>
                    <label className="form-check-label btn btn-lg btn-danger" htmlFor="flexRadioDefault2">Debit</label><br/><br/>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntBalance"><i className="bi bi-pen"></i></span>
                        <input type="text" className="form-control" placeholder="Balance" aria-label="Balance" aria-describedby="IntBalance" ref={ReasonRef} disabled/>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text btn btn-${ThemeSingleton.getTheme()}`} id="IntAmount"><i className="bi bi-123"></i></span>
                        <input type="number" className="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="IntAmount" ref={AmountRef}/>
                    </div>
                    <button type="button" className={`bi bi-floppy2-fill btn btn-${ThemeSingleton.getTheme()} btn-lg fw-bold w-100`} onClick={() => {
                        let NewInter;
                        if(DateRef.current.value && TimeRef.current.value && AmountRef.current.value){
                            NewInter = {
                                Date: DateRef.current.value,
                                Time: TimeRef.current.value,
                                Action: true,
                                Reason: "Balance",
                                Amount: AmountRef.current.value
                            }
                            NewInteraction(NewInter);
                        }
                        else{
                            alert("Please fill everything")
                        }
                    }}></button>
                </div>
        );
    }
}

export default function Table(){
    let { width, height } = useWindowSize();

    let scrollRef = useRef();
    useEffect(() => {
        let scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });

    return(
        <>
            <LoadedSound/><div id="ModalHere"></div>
            <div className="overflow-y-scroll" style={{height:`${height-200}px`, width:`${width-10}px`}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <PersonalRows/>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3 w-100" id="InputBar" onClick={() => createRoot(document.getElementById('ModalHere')).render(<InputBar />)}><i className={`bi bi-plus-circle-fill btn btn-lg btn-${ThemeSingleton.getTheme()} w-100`}></i></div>
        </>
    );
}