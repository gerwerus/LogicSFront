import React, { useState } from 'react'
import classes from './Header.module.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
function AutoPopup(props) {
  const [error, setError] = useState("")
  return (
    <div className={classes.savePopup}>
        <form onSubmit={(e) => {
          e.preventDefault()
          axios.post('http://127.0.0.1:8000/auth/token/login/', {username:e.target.username.value, password:e.target.password.value})
          .then(res => {
            props.setToken(res.data.auth_token)
            // setTest(res.data)
            setError("")
          })
          .catch(err => {
            setError("--Непредвиденная ошибка--")
            console.log(err)
            if(err.response){
              if(err.response.data.password){
                setError(JSON.stringify(err.response.data.password))
              }
              if(err.response.data.username){
                setError(JSON.stringify(err.response.data.username))
              }
              if(err.response.data.non_field_errors){
                setError(JSON.stringify(err.response.data.non_field_errors))
              }
            }
            
          });
        }}>
            <h3 style={{textAlign: 'center', width: '100%'}}>Авторизация</h3> 
            <input name="username" placeholder="Логин" className={classes.popupBtn} style={{width:'97%'}}/>
            <br></br>
            <input name='password' type="password" placeholder="Пароль" className={classes.popupBtn} style={{width:'97%'}}/>  
            <br></br>
            <input type="submit" className={classes.popupBtn}></input>
        </form>
        {error !== "" ?
          <p style={{textAlign: 'center', color: 'red', width: '200px'}}>{error.slice(2,-2)}</p>
          :
          null
        }
    </div>
  )
}

export default AutoPopup