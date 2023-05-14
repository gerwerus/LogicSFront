import React, { useState } from 'react'
import classes from './CheckAnswer.module.css'
import { truthTable } from '../../../Additional/Calculate'
import axios from 'axios'
function CheckAnswer(props) {
    const check = () => {
        const table = truthTable(props.simElements)
        const succses = JSON.stringify(table) === JSON.stringify(props.testing.answer)

        let id = 0
        axios.get('http://127.0.0.1:8000/api/v1/auth/users/',
        {
            headers: {
            Authorization: 'Token ' + window.localStorage.getItem('token')
            }
        })
        .then(res => {
            id = res.data[0].id
            let test_id = props.testing.id
            axios.post('http://127.0.0.1:8000/api/v1/studenttestlist/set/', {user: id, passTest: test_id, succses: succses}, {
                headers: {
                Authorization: 'Token ' + window.localStorage.getItem('token')
                }
            })
            .then(res => {
                if(res.data.succses){
                    props.setRight("Верно!")
                }
                else{
                    props.setRight("Неверно!")
                }
            })
            .catch(err => {
                // console.log(err)
                if(err.response){
                    if(err.response.data.non_field_errors){
                        if(err.response.data.non_field_errors[0] === 'You passed that set!'){
                            props.setRight("Тест уже решён!")
                        }
                    }
                    
                }
            })
        })
            
        
        
        
    }
    return (
        <div className={classes.checkBlock}>
            <button className={classes.popupBtn} onClick={() => check()} style={props.right === "Верно!" ? {WebkitTextFillColor: 'rgb(21, 120, 5)'} : {WebkitTextFillColor: 'black'}}>{props.right}</button>
            
        </div>
    )
}

export default CheckAnswer