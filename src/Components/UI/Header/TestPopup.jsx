import React, { useState, useEffect } from 'react'
import classes from './Header.module.css';
import axios from 'axios';

function TestPopup(props) {
  const [test, setTest] = useState()
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/testlist/')
    .then(res => {
      console.log(res)
      setTest(res.data)
    })
    .catch(err => console.log(err));
  }, [])

  const loadTest = (i) => {
    // console.log()
    props.reset()
    props.setSimElements(JSON.parse(test[i].simElements))
    props.setTesting({isTest: true, answer: JSON.parse(test[i].table), title: test[i].title, id: test[i].id})
  }
  return (
    <div className={classes.savePopup} style={{overflowY: "scroll", height:"200px"}}>
        <h3 className={classes.noselect} style={{textAlign: 'center', width: '100%', borderBottom: "1px solid"}}>Выберите тест</h3> 
        {test ? test.map((t, i) =>
          (
            <div onClick={() => loadTest(i)} className={classes.TestPopupElement}>
              <label className={classes.noselect} style={{cursor: "pointer"}}>{i + 1}{")"}{t.title}</label>
            </div>
          )
        ) : null}
    </div>
  )
}

export default TestPopup