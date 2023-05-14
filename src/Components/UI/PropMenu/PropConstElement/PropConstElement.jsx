import React from 'react'
import classes from './PropConstElement.module.css'
const PropConstElement = ({Title, element, ...props}) => {


  return (
    <div className={classes.myInput}>
        <form style={{display:'flex'}}>
            <h4>{Title + ":"}</h4>
            <p style={{marginLeft:'auto'}}>{element}</p>
        </form>
    </div>
  )
}

export default PropConstElement