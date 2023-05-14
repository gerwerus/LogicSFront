import React from 'react'
import classes from './Error.module.css'
function Error(props) {
  return (
    <div className={classes.errorBlock}>{props.text}</div>
  )
}

export default Error