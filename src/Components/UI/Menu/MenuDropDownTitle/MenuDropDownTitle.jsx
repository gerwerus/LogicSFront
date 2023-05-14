import React from 'react';
import classes from './MenuDropDownTitle.module.css';

const MenuDropDownTitle = function (props) {
    return (
        <div style={{display: 'flex'}}>
            <h2 style={{textAlign: 'center', width: '100%'}}>{props.Title}</h2>            
            <button className={classes.miniBtn} onClick={() => props.setPlusMinus(!props.plusMinus)}> {props.plusMinus ? '-' : '+' }</button>           
        </div>  
    )
}

export default MenuDropDownTitle;