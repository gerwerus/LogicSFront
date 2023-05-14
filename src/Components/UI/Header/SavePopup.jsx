import React, { useRef } from 'react'
import classes from './Header.module.css';
const checkValid = (se) => {
  if(se === []) return true
  if(se.length === undefined) return false
  for(let i = 0; i < se.length; i++){
    if(se[i] === null) return false
    if(se[i].id === null) return false
    if(se[i].prop === null) return false
    if(se[i].x === null) return false
    if(se[i].y === null) return false
    if(se[i].focusElement === null) return false
    if(se[i].prop.type === null) return false
  }
  
  return true
}
const SavePopup = (props) => {
  const fileInput = useRef()
  const load = () => {
    let reader = new FileReader();
    const file = fileInput.current.files[0]
    if(file){
      if(file.type === 'application/json'){
        reader.readAsText(file)
        let rawLog
        reader.onload = function(e) {
          rawLog = reader.result;
          const se = JSON.parse(rawLog)
          if(checkValid(se)) {
            props.reset()
            props.setSimElements(se);
          }
        };
      }
      else{
        alert("Only json files accepted!")
      }
    }
  }
  return (
    <div className={classes.savePopup}>
        <h3 style={{textAlign: 'center', width: '100%'}}>Выберите файл</h3> 
        <input type='file' accept='.json' className={classes.inputFile} ref={fileInput}/>  
        <br></br>
        <button onClick={() => load()} className={classes.popupBtn}>Загрузить</button>
    </div>
  )
}

export default SavePopup