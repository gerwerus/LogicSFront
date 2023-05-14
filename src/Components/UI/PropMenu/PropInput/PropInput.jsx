import React from 'react'
import classes from './PropInput.module.css'

const PropInput = ({Title, element, ...props}) => {
  return (
    <div className={classes.myInput}>
        <form style={{display:'flex'}} onSubmit={e => e.preventDefault()}>
            <h4 style={{height:'20px'}}>{Title}</h4>
            <input 
              type="text" 
              value={element} 
              className={classes.propInput} 
              onChange={(e) => props.changeComponentProperties(e, Title, props.id)} 
            />
        </form>
    </div>
  )
}

export default PropInput