import React, { useEffect, useState } from 'react'
import classes from './Header.module.css';
import axios from 'axios';
function StudentTable({token}) {
    let prev = ""
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/studenttestlist/', {
            headers: {
            Authorization: 'Token ' + token
            }
        })
        .then(res => {
            setStudents(res.data)
        })
        .catch(err => {console.log(err)})
    }, [])
  return (
    <div className={classes.savePopup} style={{overflowY: "scroll", height:"300px"}}>
        <table style={{width:"800px"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Группа</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Тест</th>
                    <th>Попытка</th>
                    <th>Успех</th>
                </tr>
            </thead>                 
            <tbody>
                {students ? students.map((el, i) => {
                    return (
                        <tr>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{i + 1}</td>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{el.user.last_name}</td>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{el.user.first_name}</td>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{el.user.group.name}</td>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{el.passTime.slice(0, el.passTime.indexOf('T'))}</td>
                            <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#A0AE25" : "#92771C"}>{el.passTime.slice(el.passTime.indexOf('T') + 1, el.passTime.indexOf('T') + 9)}</td>
                            {el.succses ? 
                                    <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#57AB03" : "#407F01"}>{el.passTest.title}</td>
                                :
                                    <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#C90000" : "#890202"}>{el.passTest.title}</td>
                            }
                            {el.succses ? 
                                <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#57AB03" : "#407F01"}>{el.attempts}</td>
                                :
                                <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#C90000" : "#890202"}>{el.attempts}</td>
                            }
                            {el.succses ? 
                                <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#57AB03" : "#407F01"}>{"Решён"}</td>
                                :
                                <td style={{padding: "3px 5px"}} bgcolor={i % 2 == 0 ? "#C90000" : "#890202"}>{"Нерешён"}</td>
                            }

                            
                        </tr>
                    )
                })
                : 
                null
                }
            </tbody>
        </table>
    </div>
  )
}

export default StudentTable