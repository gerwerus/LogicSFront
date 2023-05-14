import React, { useState } from 'react'
import classes from './Header.module.css';
import { truthTable } from '../../../Additional/Calculate';
import axios from 'axios';
function CreateTestPopup({name = "Создать тест", title = "", defaultTable = null, id = null, simElements, token, ...props}) {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const inputs = simElements.filter(el => el.prop.type === 'Input')
    const outputs = simElements.filter(el => el.prop.type === 'Output')
    const table = truthTable(simElements)
    const createTest = (e) => {
        const title = e.target.title.value
        let flagError = false
        const newTable = table.map((el, index) => {
            const o = el.output.map((el, i) => {
                if(el.label) return {label: el.label, value: +(e.target[el.label][index].value === '1')}
                flagError = true
                return {error: "Empty label!"}
            })
            return {...el, output: o}
        })
        if(flagError){
            setSuccess("")
            setError("Отсутствует название элемента!")
            return
        }
        if(inputs.length === 0){
            setSuccess("")
            setError("Отсутствуют входы!")
            return
        }
        if(outputs.length === 0){
            setSuccess("")
            setError("Отсутствуют выходы!")
            return
        }
        axios.post('http://127.0.0.1:8000/api/v1/testlist/', {title: title, table: JSON.stringify(newTable), simElements: JSON.stringify(simElements)},
        {
            headers: {
            Authorization: 'Token ' + token
            }
        }
        )
        .then(res => {
            setSuccess("Тест создан!")
            setError("")
        })
        .catch(err => {
            setSuccess("")
            setError("Непредвиденная ошибка ")
            console.log(err)
            if(err.response){
                if(err.response.data.title){
                    setError("Заголовок пуст!") 
                }
            }
        })
    }

    const editTest = (e) => {
        const title = e.target.title.value
        let flagError = false
        const newTable = table.map((el, index) => {
            const o = el.output.map((el, i) => {
                if(el.label) return {label: el.label, value: +(e.target[el.label][index].value === '1')}
                flagError = true
                return {error: "Empty label!"}
            })
            return {...el, output: o}
        })
        if(flagError){
            setSuccess("")
            setError("Отсутствует название элемента!")
            return
        }
        if(inputs.length === 0){
            setSuccess("")
            setError("Отсутствуют входы!")
            return
        }
        if(outputs.length === 0){
            setSuccess("")
            setError("Отсутствуют выходы!")
            return
        }
        axios.patch('http://127.0.0.1:8000/api/v1/testlist/' + id + '/', {title: title, table: JSON.stringify(newTable), simElements: JSON.stringify(simElements)},
        {
            headers: {
            Authorization: 'Token ' + token
            }
        }
        )
        .then(res => {
            setSuccess("Тест отредактирован!")
            setError("")
        })
        .catch(err => {
            setSuccess("")
            setError("Непредвиденная ошибка ")
            console.log(err)
        })
    }
    const deleteTest = (e) => {
        axios.delete('http://127.0.0.1:8000/api/v1/testlist/' + id + '/',
        {
            headers: {
            Authorization: 'Token ' + token
            }
        }
        )
        .then(res => {
            props.reset()
            setSuccess("Тест удалён!")
            setError("")
        })
        .catch(err => {
            setSuccess("")
            setError("Ошибка удаления!")
        })
    }
    return (
        <div className={classes.savePopup} style={{overflowY: "scroll", height:"300px"}}>
            <form onSubmit={(e) => {
                e.preventDefault()
                defaultTable ? editTest(e) : createTest(e)
            }}>
                <h3 style={{textAlign: 'center', width: '100%'}}>{name}</h3> 
                <input placeholder='Название' name='title' defaultValue={title} />  
                <table>
                    <thead>
                        <tr>
                            {inputs.map(el => (<th>{el.mutableProp.label}</th>))}
                            {outputs.map(el => (<th>{el.mutableProp.label}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                    {defaultTable ? 
                        defaultTable.map(el => (
                            <tr bgcolor="gray">
                                {el.input.map(x => (<td>{x.value}</td>))}
                                {el.output.map(x => (<td><input name={x.label} defaultValue={x.value}/></td>))}
                            </tr>
                        ))
                        : 
                        table.map(el => (
                            <tr bgcolor="gray">
                                {el.input.map(x => (<td>{x.value}</td>))}
                                {el.output.map(x => (<td><input name={x.label}/></td>))}
                            </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
                <input type="submit" className={classes.popupBtn} style={{width: '40%'}}></input>
                {!defaultTable ? null : 
                    <button onClick={e => {
                    e.preventDefault()
                    deleteTest(e)
                }} className={classes.popupBtn} style={{width: '40%', marginLeft: "20%"}}>Удалить</button>
                }
            </form>
            {error !== "" ?
                <p style={{textAlign: 'center', color: 'red', width: '200px'}}>{error}</p>
                :
                null
                }
                {success !== "" ?
                <p style={{textAlign: 'center', color: 'green', width: '200px'}}>{success}</p>
                :
                null
            }
        </div>
    )
}

export default CreateTestPopup