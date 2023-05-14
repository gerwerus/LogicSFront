import React from 'react';
import classes from './MenuButton.module.css'

const MenuButton = function (props) {
    return (
        <button className={classes.menuBtn} onClick={() => props.addComponent(props.typeComponent)}>{props.children}</button>        
    )
}

export default MenuButton;