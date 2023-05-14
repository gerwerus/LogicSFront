import React, { useEffect, useState } from 'react'
import classes from './Header.module.css';
import axios from 'axios';
function RegPopup() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [groups, setGroups] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/group/')
    .then(res => {
      setGroups(res.data)
    })
  }, [])
  return (
    <div className={classes.savePopup}>
        <form onSubmit={(e) => {
          e.preventDefault()
          axios.post('http://127.0.0.1:8000/api/v1/auth/users/', 
          {
            username:e.target.username.value, 
            password:e.target.password.value, 
            email: e.target.mail.value, 
            last_name: e.target.lastname.value,
            first_name: e.target.name.value,
            group: e.target.group.value
          })
          .then(res => {
            // console.log(res)
            setSuccess("Пользователь создан!")
            setError("")
          })
          .catch(err => {
            setError("Непредвиденная ошибка")
            if(err.response.data.password){
              setError("Пароль: "+ err.response.data.password)
            }
            if(err.response.data.username){
              setError("Username: " + err.response.data.username)
            }
            if(err.response.data.email){
              setError("Email: " + err.response.data.email)
            }
            if(err.response.data.last_name){
              setError("Фамилия:" + err.response.data.last_name)
            }
            if(err.response.data.first_name){
              setError("Имя:" + err.response.data.first_name)
            }
            if(err.response.data.group){
              setError("Группа:" + err.response.data.group)
            }
            setSuccess("")
          })
        }}>
            <h3 style={{textAlign: 'center', width: '100%'}}>Регистрация</h3> 
            <input name="username" placeholder="Логин" className={classes.popupBtn} style={{width:'97%'}}/>
            <br></br>
            <input name='lastname' placeholder="Фамилия" className={classes.popupBtn} style={{width:'97%'}}/>  
            <br></br>
            <input name='name' placeholder="Имя" className={classes.popupBtn} style={{width:'97%'}}/>  
            <br></br>
            <select name="group" className={classes.popupBtn}>
                <option value="">Выберите группу</option>
                {groups.map(el => (<option value={el.id}>{el.name}</option>))}
            </select>
            <input name='mail' placeholder="Email" className={classes.popupBtn} style={{width:'97%'}}/>  
            <br></br>
            <input name='password' placeholder="Пароль" className={classes.popupBtn} style={{width:'97%'}}/>
            <br></br>
            <input type="submit" className={classes.popupBtn}></input>
        </form>
        {error !== "" ?
          <p style={{textAlign: 'center', color: 'red', width: '200px'} }>{error}</p>
          :
          null
        }
        {success !== "" ?
          <p style={{textAlign: 'center', color: 'green', width: '200px'} }>{success}</p>
          :
          null
        }
    </div>
  )
}

export default RegPopup