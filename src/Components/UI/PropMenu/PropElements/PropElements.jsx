import React from 'react'
import classes from './PropElements.module.css'
import PropConstElement from '../PropConstElement/PropConstElement';
import PropInput from '../PropInput/PropInput';

const PropElements = ({visible, setVisible, focusElement, ...props}) => {
  const divClasses = [classes.menuDropdown];
    if(visible){
        divClasses.push(classes.menuDropdownActive);
    }
  if(!focusElement){
    focusElement = {}
  }
  return (
    <div className={divClasses.join(' ')} >
      {props.const ? 
        Object.keys(focusElement).map((key) => <PropConstElement key={key} Title={key} element={focusElement[key]}/>) 
      : 
        Object.keys(focusElement).map((key) => <PropInput key={key} id={focusElement.id} Title={key} element={focusElement[key]} changeComponentProperties={(e, key, id) => props.changeComponentProperties(e, key, id)}/>) 
      }
    </div>
  )
}

export default PropElements;