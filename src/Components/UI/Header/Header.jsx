import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import exportFromJSON from 'export-from-json' 
import Popup from 'reactjs-popup';
import CreateTestPopup from './CreateTestPopup';
import TestPopup from './TestPopup';
import axios from 'axios';
import Project from './Project';
import Profile from './Profile';
import Tests from './Tests';
import Students from './Students';

const Header = function ({children, ...props}) {
    const [user, setUser] = useState("")
    const [token, setToken] = useState(() => {
        return window.localStorage.getItem('token') || ''
    })
    useEffect(() => {
        let id = 0
        axios.get('http://127.0.0.1:8000/api/v1/auth/users/',
        {
            headers: {
            Authorization: 'Token ' + token
            }
        })
        .then(res => {
            console.log(res.data[0].id);
            id = res.data[0].id
            window.localStorage.setItem('token', token);
            axios.get('http://127.0.0.1:8000/api/v1/user/' + id.toString() + '/', {
                headers: {
                Authorization: 'Token ' + token
                }
            })
            .then(res => {
                res.data.is_staff ? setUser("staff") : setUser("not")
            })
        })
        .catch(err => console.log(err));
        axios.get('http://127.0.0.1:8000/api/v1/user/' + id.toString() + '/', {
            headers: {
            Authorization: 'Token ' + token
            }
        })
        .then(res => {
            console.log(res.data)
            // res.data.is_staff ? setUser("staff") : setUser("not")
        })
        // .catch(err => console.log(err));
        
      }, [token]
    )
    const reset = () =>{
        props.setSimElements([])
        props.setTesting({isTest: false, answer: [], id: 0})
        props.setRight("Проверить")
    }
    const save = () => {
        exportFromJSON({data:props.simElements, exportType:'json'})
    }
    return (
        <header {...props} className={classes.myHdr}>
            {
                <div>
                    <Profile reset={reset} user={user} setUser={setUser} token={token} setToken={setToken}></Profile>
                    
                    <Project reset={reset} save={save} setSimElements={props.setSimElements}></Project>

                    <Tests user={user} token={token} reset={reset} {...props}></Tests>
                    {user === 'staff' ?  <Students user={user} token={token} reset={reset} {...props}></Students> : null}
                   
                </div>
            }
        </header>     
    )
}

export default Header;